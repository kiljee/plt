import imageCompression from "browser-image-compression"

const MAX_SIZE_BYTES = 3 * 1024 * 1024

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

export const uploadImageFile = async (
  file: File,
  uploadAction: UploadEventImageFn,
): Promise<string> => {
  let fileToUpload = file
  if (file.size > MAX_SIZE_BYTES) {
    fileToUpload = await imageCompression(file, COMPRESSION_OPTIONS)
  }
  const base64 = await fileToBase64(fileToUpload)
  const mimeType = fileToUpload.type || "image/jpeg"
  const { url } = await uploadAction({ base64, mimeType })
  return url
}
