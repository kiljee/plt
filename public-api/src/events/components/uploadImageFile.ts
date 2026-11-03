import imageCompression from "browser-image-compression"

const MAX_SIZE_BYTES = 3 * 1024 * 1024
const HEIC_MIME_TYPES = [
  "image/heic",
  "image/heif",
  "image/heic-sequence",
  "image/heif-sequence",
]
const HEIC_JPEG_QUALITY = 0.9

const COMPRESSION_OPTIONS = {
  maxSizeMB: 1.5,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
  initialQuality: 0.85,
}

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result as string
      const base64 = dataUrl?.split(",")[1] ?? ""
      resolve(base64)
    }
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })

export type UploadEventImageFn = (args: {
  base64: string
  mimeType: string
}) => Promise<{ url: string }>

const isHeicFile = (file: File): boolean => {
  const mimeType = file.type.toLowerCase()
  if (HEIC_MIME_TYPES.includes(mimeType)) return true
  return /\.(heic|heif)$/i.test(file.name)
}

const convertHeicToJpeg = async (file: File): Promise<File> => {
  const { default: heic2any } = await import("heic2any")
  const converted = await heic2any({
    blob: file,
    toType: "image/jpeg",
    quality: HEIC_JPEG_QUALITY,
  })
  const blob = Array.isArray(converted) ? converted[0] : converted
  if (!blob) throw new Error("HEIC konverzija nije uspela.")
  const name = file.name.replace(/\.(heic|heif)$/i, "") || "image"
  return new File([blob], `${name}.jpg`, { type: "image/jpeg" })
}

export const uploadImageFile = async (
  file: File,
  uploadAction: UploadEventImageFn,
): Promise<string> => {
  let fileToUpload = isHeicFile(file) ? await convertHeicToJpeg(file) : file
  if (fileToUpload.size > MAX_SIZE_BYTES) {
    fileToUpload = await imageCompression(fileToUpload, COMPRESSION_OPTIONS)
  }
  const base64 = await fileToBase64(fileToUpload)
  const mimeType = fileToUpload.type || "image/jpeg"
  const { url } = await uploadAction({ base64, mimeType })
  return url
}
