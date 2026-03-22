import dayjs from "dayjs"
import utc from "dayjs/plugin/utc.js"
import { Copy } from "lucide-react"
import { useState } from "react"
import { getAdminEvents, useQuery } from "wasp/client/operations"
import { type Event } from "wasp/entities"
import { Button } from "../../components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination"
dayjs.extend(utc)

const PAGE_SIZE = 10

const LOCATION_LABELS: Record<string, string> = {
  BELGRADE: "Beograd",
  NOVI_SAD: "Novi Sad",
}

const formatDate = (d: Date | string) =>
  dayjs.utc(d).format("DD.MM.YYYY")

interface EventDuplicatePanelProps {
  onDuplicate: (event: Event) => void
}

export const EventDuplicatePanel = ({ onDuplicate }: EventDuplicatePanelProps) => {
  const [page, setPage] = useState(1)

  const { data, isLoading } = useQuery(getAdminEvents, {
    page,
    pageSize: PAGE_SIZE,
  })

  const events: Event[] = data?.events ?? []
  const totalCount = data?.totalCount ?? 0
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))
  const hasPrev = page > 1
  const hasNext = page < totalPages

  return (
    <div className="flex w-full flex-col border-t border-zinc-200 bg-zinc-50/50 pt-4 sm:w-80 sm:shrink-0 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
      <h3 className="mb-3 text-sm font-medium text-zinc-700">
        Dupliciraj iz postojeće
      </h3>

      {isLoading ? (
        <p className="text-sm text-zinc-500">Učitavanje…</p>
      ) : events.length === 0 ? (
        <p className="text-sm text-zinc-500">Nema radionica.</p>
      ) : (
        <>
          <ul className="flex flex-col gap-1.5">
            {events.map((ev) => (
              <li
                key={ev.id}
                className="flex items-center justify-between gap-2 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-zinc-900">{ev.title}</p>
                  <p className="text-xs text-zinc-500">
                    {formatDate(ev.date)} · {LOCATION_LABELS[ev.location] ?? ev.location}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 shrink-0"
                  onClick={() => onDuplicate(ev)}
                  title="Dupliciraj"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>

          {totalPages > 1 && (
            <Pagination className="mt-3">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (hasPrev) setPage((p) => p - 1)
                    }}
                    className={!hasPrev ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                <PaginationItem>
                  <span className="px-2 text-sm text-zinc-600">
                    {page} / {totalPages}
                  </span>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (hasNext) setPage((p) => p + 1)
                    }}
                    className={!hasNext ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </div>
  )
}
