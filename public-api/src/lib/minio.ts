import * as Minio from 'minio'
import { randomUUID } from 'crypto'

const ENDPOINT = process.env.MINIO_ENDPOINT ?? 'localhost'
const PORT = process.env.MINIO_PORT ? Number(process.env.MINIO_PORT) : 9000
const ACCESS_KEY = process.env.MINIO_ACCESS_KEY ?? 'minioadmin'
const SECRET_KEY = process.env.MINIO_SECRET_KEY ?? 'minioadmin'
const BUCKET = process.env.MINIO_BUCKET ?? 'paleto-events'
const USE_SSL = process.env.MINIO_USE_SSL === 'true'

const ALLOWED_EXTENSIONS = ['jpeg', 'jpg', 'png', 'webp'] as const
const MIME_TO_EXT: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/pjpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
}
const CONTENT_TYPE_BY_EXT: Record<string, string> = {
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
}
const OBJECT_CACHE_CONTROL = 'public, max-age=31536000, immutable'
const PUT_ATTEMPTS = 2

const publicReadPolicy = () =>
  JSON.stringify({
    Version: '2012-10-17',
    Statement: [
      {
        Effect: 'Allow',
        Principal: { AWS: ['*'] },
        Action: ['s3:GetObject'],
        Resource: [`arn:aws:s3:::${BUCKET}/*`],
      },
    ],
  })

const client = new Minio.Client({
  endPoint: ENDPOINT,
  port: PORT,
  useSSL: USE_SSL,
  accessKey: ACCESS_KEY,
  secretKey: SECRET_KEY,
})

const isBucketAlreadyExists = (err: unknown): boolean => {
  if (!err || typeof err !== 'object' || !('code' in err)) return false
  const code = (err as { code?: string }).code
  return code === 'BucketAlreadyOwnedByYou' || code === 'BucketAlreadyExists'
}

let ensurePromise: Promise<void> | null = null

const applyPublicBucketPolicy = async () => {
  const exists = await client.bucketExists(BUCKET)
  if (!exists) {
    try {
      await client.makeBucket(BUCKET, 'us-east-1')
    } catch (err) {
      if (!isBucketAlreadyExists(err)) throw err
    }
  }
  await client.setBucketPolicy(BUCKET, publicReadPolicy())
}

export const ensurePublicBucket = (): Promise<void> => {
  if (ensurePromise) return ensurePromise
  ensurePromise = applyPublicBucketPolicy().catch((err: unknown) => {
    ensurePromise = null
    throw err
  })
  return ensurePromise
}

const getContentType = (mimeType: string, ext: string): string => {
  const normalized = mimeType?.toLowerCase()
  if (normalized === 'image/jpg' || normalized === 'image/jpeg' || normalized === 'image/pjpeg') {
    return 'image/jpeg'
  }
  if (normalized === 'image/png' || normalized === 'image/webp') return normalized
  return CONTENT_TYPE_BY_EXT[ext] ?? 'image/jpeg'
}

const getExtFromMimeOrName = (mimeType: string, originalName?: string): string => {
  const fromMime = MIME_TO_EXT[mimeType?.toLowerCase()]
  if (fromMime) return fromMime
  if (originalName) {
    const ext = originalName.split('.').pop()?.toLowerCase()
    if (ext && ALLOWED_EXTENSIONS.includes(ext as (typeof ALLOWED_EXTENSIONS)[number])) {
      return ext
    }
  }
  return 'jpg'
}

const getPublicUrl = (key: string): string => {
  const base = process.env.MINIO_PUBLIC_URL?.replace(/\/$/, '')
  if (base) return `${base}/${BUCKET}/${key}`
  const protocol = USE_SSL ? 'https' : 'http'
  const portPart = (PORT === 80 && !USE_SSL) || (PORT === 443 && USE_SSL) ? '' : `:${PORT}`
  return `${protocol}://${ENDPOINT}${portPart}/${BUCKET}/${key}`
}

export const uploadEventImage = async (
  buffer: Buffer,
  mimeType: string,
  originalName?: string,
): Promise<string> => {
  const ext = getExtFromMimeOrName(mimeType, originalName)
  if (!ALLOWED_EXTENSIONS.includes(ext as (typeof ALLOWED_EXTENSIONS)[number])) {
    throw new Error(`Unsupported image type: ${ext}. Allowed: ${ALLOWED_EXTENSIONS.join(', ')}`)
  }

  if (!buffer.length) {
    throw new Error('Empty image')
  }

  await ensurePublicBucket().catch((err: unknown) => {
    console.error('MinIO public bucket setup failed', err)
  })

  const key = `events/${randomUUID()}.${ext}`
  const contentType = getContentType(mimeType, ext)
  let lastError: unknown
  for (let attempt = 0; attempt < PUT_ATTEMPTS; attempt += 1) {
    try {
      await client.putObject(BUCKET, key, buffer, buffer.length, {
        'Content-Type': contentType,
        'Cache-Control': OBJECT_CACHE_CONTROL,
      })
      return getPublicUrl(key)
    } catch (err) {
      lastError = err
      if (attempt < PUT_ATTEMPTS - 1) {
        await new Promise((resolve) => setTimeout(resolve, 250))
      }
    }
  }
  throw lastError
}

const getKeyFromUrl = (url: string): string | null => {
  const bucket = process.env.MINIO_BUCKET ?? 'paleto-events'
  const idx = url.indexOf(`/${bucket}/`)
  if (idx === -1) return null
  const path = url.slice(idx + bucket.length + 2).split('?')[0]?.split('#')[0]
  if (!path) return null
  try {
    return decodeURIComponent(path)
  } catch {
    return path
  }
}

export const deleteEventImages = async (imageUrls: string[]): Promise<void> => {
  if (!imageUrls?.length) return
  const urls = Array.isArray(imageUrls) ? imageUrls : []
  await Promise.all(
    urls.map(async (url) => {
      const key = getKeyFromUrl(url)
      if (!key) return
      try {
        await client.removeObject(BUCKET, key)
      } catch {
        // ignore single object delete errors
      }
    }),
  )
}
