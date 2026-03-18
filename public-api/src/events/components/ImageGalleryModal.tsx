import { useEffect, useState } from "react"
import { useQuery } from "wasp/client/operations"
import { getUploadedImages } from "wasp/client/operations"
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

  useEffect(() => {
    if (open) setPage(1)
  }, [open])

  const { data, isLoading } = useQuery(getUploadedImages, {
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
                >
                  <img
                    src={url}
                    alt=""
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
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
