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
  'image/png': 'png',
  'image/webp': 'webp',
}

const client = new Minio.Client({
  endPoint: ENDPOINT,
  port: PORT,
  useSSL: USE_SSL,
  accessKey: ACCESS_KEY,
  secretKey: SECRET_KEY,
})

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

  const key = `events/${randomUUID()}.${ext}`
  await client.putObject(BUCKET, key, buffer, buffer.length, {
    'Content-Type': mimeType || `image/${ext}`,
  })

  return getPublicUrl(key)
}

const getKeyFromUrl = (url: string): string | null => {
  const bucket = process.env.MINIO_BUCKET ?? 'paleto-events'
  const idx = url.indexOf(`/${bucket}/`)
  if (idx === -1) return null
  return url.slice(idx + bucket.length + 2).split('?')[0] || null
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

export const deleteSingleImage = async (imageUrl: string): Promise<void> => {
  const key = getKeyFromUrl(imageUrl)
  if (!key) return
  await client.removeObject(BUCKET, key)
}
