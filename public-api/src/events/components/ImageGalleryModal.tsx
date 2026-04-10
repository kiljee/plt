import { useEffect, useState } from "react"
import { useQuery, useAction } from "wasp/client/operations"
import { getUploadedImages, deleteGalleryImage } from "wasp/client/operations"
import { toast } from "sonner"
import { X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination"

const PAGE_SIZE = 20

interface ImageGalleryModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (url: string) => void
}

export const ImageGalleryModal = ({
  open,
  onOpenChange,
  onSelect,
}: ImageGalleryModalProps) => {
  const [page, setPage] = useState(1)
  const [deletingUrl, setDeletingUrl] = useState<string | null>(null)
  const deleteAction = useAction(deleteGalleryImage)

  useEffect(() => {
    if (open) setPage(1)
  }, [open])

  const { data, isLoading, refetch } = useQuery(getUploadedImages, {
    page,
    pageSize: PAGE_SIZE,
  })

  const images = data?.images ?? []
  const totalCount = data?.totalCount ?? 0
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))
  const hasPrev = page > 1
  const hasNext = page < totalPages

  const handleSelect = (url: string) => {
    onSelect(url)
    onOpenChange(false)
  }

  const handleDelete = async (url: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!window.confirm("Obrisati sliku iz galerije i sa servera?")) return
    setDeletingUrl(url)
    try {
      await deleteAction({ imageUrl: url })
      toast.success("Slika je obrisana.")
      await refetch()
    } catch (err: unknown) {
      toast.error(`Greška: ${String(err)}`)
    } finally {
      setDeletingUrl(null)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[85vh] max-w-3xl flex-col gap-4 p-6">
        <DialogHeader>
          <DialogTitle>Izaberi sliku iz galerije</DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <p className="py-8 text-center text-sm text-zinc-500">Učitavanje…</p>
        ) : images.length === 0 ? (
          <p className="py-8 text-center text-sm text-zinc-500">
            Nema učitanih slika. Prvo otpremite slike na neku radionicu.
          </p>
        ) : (
          <>
            <div className="grid max-h-[60vh] grid-cols-3 gap-2 overflow-y-auto sm:grid-cols-4 md:grid-cols-5">
              {images.map(({ url }) => (
                <button
                  key={url}
                  type="button"
                  className="group relative aspect-square overflow-hidden rounded-md border border-zinc-200 bg-zinc-100 transition-colors hover:border-primary-500 hover:ring-2 hover:ring-primary-500/30 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  onClick={() => handleSelect(url)}
                  disabled={deletingUrl === url}
                >
                  <img
                    src={url}
                    alt=""
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <span
                    role="button"
                    tabIndex={0}
                    className="absolute right-1 top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white opacity-0 shadow transition-opacity group-hover:opacity-100 hover:bg-red-700 focus:opacity-100"
                    title="Obriši sliku"
                    onClick={(e) => handleDelete(url, e)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleDelete(url, e as unknown as React.MouseEvent)
                    }}
                  >
                    <X className="h-3.5 w-3.5" />
                  </span>
                  {deletingUrl === url && (
                    <span className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 text-xs font-medium text-white">
                      Brisanje…
                    </span>
                  )}
                </button>
              ))}
            </div>
            {totalPages > 1 && (
              <Pagination className="mt-1">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        if (hasPrev) setPage((p) => p - 1)
                      }}
                      className={
                        !hasPrev ? "pointer-events-none opacity-50" : ""
                      }
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <span className="px-2 text-sm text-zinc-600">
                      {page} / {totalPages} ({totalCount} slika)
                    </span>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        if (hasNext) setPage((p) => p + 1)
                      }}
                      className={
                        !hasNext ? "pointer-events-none opacity-50" : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
