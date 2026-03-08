const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result as string
      const base64 = dataUrl?.split(',')[1] ?? ''
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
  const base64 = await fileToBase64(file)
  const mimeType = file.type || 'image/jpeg'
  const { url } = await uploadAction({ base64, mimeType })
  return url
}
