import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAdminEvents,
  updateEventStatus,
  useQuery,
} from "wasp/client/operations";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";
import { useAddEventModal } from "../shared/context/AddEventModalContext";
import { EventStatus } from "../events/constants";

const PAGE_SIZE = 10;

const STATUS_LABELS: Record<EventStatus, string> = {
  [EventStatus.ACTIVE]: "Aktivna",
  [EventStatus.INACTIVE]: "Neaktivna",
};

const STATUS_BADGE_CLASS: Record<EventStatus, string> = {
  [EventStatus.ACTIVE]:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  [EventStatus.INACTIVE]:
    "bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300",
};

type StatusFilterValue = "all" | EventStatus;

const STATUS_FILTER_OPTIONS: { value: StatusFilterValue; label: string }[] = [
  { value: "all", label: "Sve" },
  { value: EventStatus.ACTIVE, label: "Aktivne" },
  { value: EventStatus.INACTIVE, label: "Neaktivne" },
];

export const DashboardPage = () => {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<StatusFilterValue>("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const { open: openAddEventModal, onSuccessRef } = useAddEventModal();

  const { data, isLoading, refetch } = useQuery(getAdminEvents, {
    page,
    pageSize: PAGE_SIZE,
    statusFilter: statusFilter === "all" ? undefined : statusFilter,
  });

  useEffect(() => {
    onSuccessRef.current = refetch;
    return () => {
      onSuccessRef.current = null;
    };
  }, [refetch, onSuccessRef]);

  useEffect(() => {
    setPage(1);
  }, [statusFilter]);

  const handleStatusChange = async (eventId: string, status: EventStatus) => {
    setUpdatingId(eventId);
    try {
      await updateEventStatus({ id: eventId, status });
      toast.success("Status je ažuriran.");
      refetch();
    } catch (err) {
      toast.error(`Greška: ${String(err)}`);
    } finally {
      setUpdatingId(null);
    }
  };

  const events = data?.events ?? [];
  const totalCount = data?.totalCount ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_280px]">
          <section className="order-1">
            <Card>
              <CardHeader className="border-b">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <CardTitle>
                    Sve radionice
                    {totalCount > 0 && (
                      <span className="ml-2 text-muted-foreground">
                        ({totalCount})
                      </span>
                    )}
                  </CardTitle>
                  <div className="flex gap-2">
                    {STATUS_FILTER_OPTIONS.map((opt) => (
                      <Button
                        key={opt.value}
                        variant={statusFilter === opt.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setStatusFilter(opt.value)}
                      >
                        {opt.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                {isLoading && (
                  <p className="py-8 text-center text-muted-foreground">
                    Učitavanje…
                  </p>
                )}

                {!isLoading && events.length === 0 && (
                  <div className="flex flex-col items-center gap-4 py-8">
                    <p className="text-center text-muted-foreground">
                      Nema radionica. Kliknite „Dodaj radionicu” da kreirate prvu.
                    </p>
                    <Button onClick={openAddEventModal}>Dodaj radionicu</Button>
                  </div>
                )}

                {!isLoading && events.length > 0 && (
                  <>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead className="border-b text-xs uppercase tracking-wide text-muted-foreground">
                          <tr>
                            <th className="px-2 py-3 font-medium">Naziv</th>
                            <th className="px-2 py-3 font-medium">Status</th>
                            <th className="px-2 py-3 font-medium">Termin</th>
                            <th className="px-2 py-3 font-medium">Lokacija</th>
                            <th className="px-2 py-3 font-medium">Kapacitet</th>
                            <th className="px-2 py-3 font-medium">Rezervisano</th>
                            <th className="px-2 py-3 font-medium text-right">
                              Akcije
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {events.map((event) => {
                            const dateLabel = dayjs(event.date).format(
                              "DD.MM.YYYY",
                            );
                            const timeLabel = event.startTime
                              ? `${event.startTime}–${event.endTime}`
                              : "";
                            const locationLabel =
                              event.location === "NOVI_SAD"
                                ? "Novi Sad"
                                : "Beograd";
                            const status = (event as { status?: EventStatus })
                              .status ?? EventStatus.ACTIVE;

                            return (
                              <tr key={event.id} className="hover:bg-muted/30">
                                <td className="px-2 py-3">
                                  <Link
                                    to={`/radionica/${event.id}`}
                                    className="font-medium text-primary hover:underline"
                                  >
                                    {event.title}
                                  </Link>
                                </td>
                                <td className="px-2 py-3">
                                  <select
                                    value={status}
                                    disabled={updatingId === event.id}
                                    onChange={(e) => {
                                      const value = e.target
                                        .value as EventStatus;
                                      if (
                                        value === "ACTIVE" ||
                                        value === "INACTIVE"
                                      ) {
                                        handleStatusChange(event.id, value);
                                      }
                                    }}
                                    className={`rounded-md border px-2 py-1 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary ${STATUS_BADGE_CLASS[status]} border-transparent disabled:opacity-60`}
                                  >
                                    <option value="ACTIVE">
                                      {STATUS_LABELS.ACTIVE}
                                    </option>
                                    <option value="INACTIVE">
                                      {STATUS_LABELS.INACTIVE}
                                    </option>
                                  </select>
                                </td>
                                <td className="px-2 py-3 text-muted-foreground">
                                  <div>{dateLabel}</div>
                                  {timeLabel && <div>{timeLabel}</div>}
                                </td>
                                <td className="px-2 py-3 text-muted-foreground">
                                  {locationLabel}
                                </td>
                                <td className="px-2 py-3 text-muted-foreground">
                                  {event.capacity}
                                </td>
                                <td className="px-2 py-3 text-muted-foreground">
                                  {(event as { reservedCount?: number }).reservedCount ?? 0}
                                </td>
                                <td className="px-2 py-3 text-right">
                                  <div className="flex justify-end gap-1">
                                    <Button asChild size="sm" variant="outline">
                                      <Link to={`/rezervacije?eventId=${event.id}`}>
                                        Rezervacije
                                      </Link>
                                    </Button>
                                    <Button asChild size="sm">
                                      <Link to={`/radionica/${event.id}`}>
                                        Otvori
                                      </Link>
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {totalPages > 1 && (
                      <Pagination className="mt-8">
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                if (hasPrev) setPage((p) => p - 1);
                              }}
                              className={
                                !hasPrev
                                  ? "pointer-events-none opacity-50"
                                  : undefined
                              }
                            />
                          </PaginationItem>
                          <PaginationItem>
                            <span className="px-3 text-sm text-muted-foreground">
                              Strana {page} od {totalPages} ({totalCount} ukupno)
                            </span>
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationNext
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                if (hasNext) setPage((p) => p + 1);
                              }}
                              className={
                                !hasNext
                                  ? "pointer-events-none opacity-50"
                                  : undefined
                              }
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </section>

          <aside className="order-2">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                  Meni
                </CardTitle>
                <CardDescription>Brza navigacija</CardDescription>
              </CardHeader>
              <CardContent>
                <nav className="flex flex-col gap-2">
                  <Link
                    to="/"
                    className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
                  >
                    Radionice
                  </Link>
                  <Button
                    type="button"
                    variant="outline"
                    className="justify-start"
                    onClick={openAddEventModal}
                  >
                    Dodaj radionicu
                  </Button>
                  <Link
                    to="/rezervacije"
                    className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                  >
                    Rezervacije
                  </Link>
                </nav>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
};
