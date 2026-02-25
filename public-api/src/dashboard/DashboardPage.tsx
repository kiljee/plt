import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAdminEvents, useQuery } from "wasp/client/operations";
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

const PAGE_SIZE = 10;

export const DashboardPage = () => {
  const [page, setPage] = useState(1);
  const { open: openAddEventModal, onSuccessRef } = useAddEventModal();

  const { data, isLoading, refetch } = useQuery(getAdminEvents, {
    page,
    pageSize: PAGE_SIZE,
  });

  useEffect(() => {
    onSuccessRef.current = refetch;
    return () => {
      onSuccessRef.current = null;
    };
  }, [refetch, onSuccessRef]);

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
                <CardTitle>
                  Sve radionice
                  {totalCount > 0 && (
                    <span className="ml-2 text-muted-foreground">
                      ({totalCount})
                    </span>
                  )}
                </CardTitle>
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
