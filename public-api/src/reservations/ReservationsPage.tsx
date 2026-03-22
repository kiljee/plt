import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import {
  getReservationsAdmin,
  getAdminEventById,
  deleteReservation,
  useQuery,
  useAction,
} from "wasp/client/operations";
import { useRequireAdmin } from "../hooks/useRequireAdmin";
import { StatusFilter, type StatusFilterType } from "./types";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Input } from "../components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";

const PAGE_SIZE = 10;
const STATUS_LABELS: Record<string, string> = {
  PENDING: "Nepotvrđena",
  CONFIRMED: "Potvrđena",
  CANCELLED: "Otkazana",
};

const TAB_OPTIONS: { value: StatusFilterType; label: string }[] = [
  { value: StatusFilter.ACTIVE, label: "Aktivne" },
  { value: StatusFilter.PENDING, label: "Nepotvrđene" },
  { value: StatusFilter.CONFIRMED, label: "Potvrđene" },
  { value: StatusFilter.CANCELLED, label: "Otkazane" },
];


const formatAmount = (price: number, currency: string, seats: number) =>
  `${price * seats} ${currency}`;

export const ReservationsPage = () => {
  const { isLoading: isAuthLoading, isAdmin } = useRequireAdmin();
  const [searchParams] = useSearchParams()
  const eventId = searchParams.get("eventId") ?? undefined

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchDebounced, setSearchDebounced] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilterType>(StatusFilter.ACTIVE);

  const { data, isLoading, refetch } = useQuery(getReservationsAdmin, {
    page,
    pageSize: PAGE_SIZE,
    search: searchDebounced || undefined,
    statusFilter,
    eventId,
  });
  const { data: event } = useQuery(getAdminEventById,   { id: eventId || "" });

  useEffect(() => {
    setPage(1);
  }, [eventId]);
  const deleteAction = useAction(deleteReservation);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const reservations = data?.reservations ?? [];

  const handleDelete = async (reservationId: string) => {
    if (!window.confirm("Obrisati rezervaciju? Mesta će biti oslobođena.")) return;
    setDeletingId(reservationId);
    try {
      await deleteAction({ id: reservationId });
      toast.success("Rezervacija je obrisana. Mesta su oslobođena.");
      refetch();
    } catch (err: unknown) {
      toast.error(`Greška: ${String(err)}`);
    } finally {
      setDeletingId(null);
    }
  };
  const totalCount = data?.totalCount ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchDebounced(search);
    setPage(1);
  };

  if (isAuthLoading || !isAdmin) return null;

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {eventId ? `Rezervacije: ${event?.title ?? "Radionica"}` : "Rezervacije"}
            </h1>
            <p className="mt-1 text-muted-foreground">
              {eventId
                ? "Rezervacije za izabranu radionicu"
                : "Pregled svih rezervacija sa filterima i pretragom"}
            </p>
            <nav className="mt-2 flex gap-4 text-sm">
            <Link
              to="/rezervacije"
              className={eventId ? "text-muted-foreground hover:text-foreground" : "font-medium text-foreground"}
            >
              Rezervacije
            </Link>
            <Link
              to="/rezervacije/blacklist"
              className="text-muted-foreground hover:text-foreground"
            >
              Blacklist emailova
            </Link>
          </nav>
          </div>
          <div className="flex flex-wrap gap-2">
            {eventId && (
              <Button asChild variant="outline">
                <Link to="/rezervacije">Sve rezervacije</Link>
              </Button>
            )}
            <Button asChild variant="outline">
              <Link to="/rezervacije/blacklist">Blacklist</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/">← Nazad na dashboard</Link>
            </Button>
          </div>
        </header>

        <Card>
          <CardHeader className="border-b">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2">
                {TAB_OPTIONS.map((opt) => (
                  <Button
                    key={opt.value}
                    variant={statusFilter === opt.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setStatusFilter(opt.value);
                      setPage(1);
                    }}
                  >
                    {opt.label}
                  </Button>
                ))}
              </div>
              <form
                onSubmit={handleSearchSubmit}
                className="flex gap-2"
              >
                <Input
                  placeholder="Pretraži po ID, emailu, imenu, telefonu..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="max-w-xs"
                />
                <Button type="submit" size="sm">
                  Pretraži
                </Button>
              </form>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {isLoading && (
              <p className="py-8 text-center text-muted-foreground">
                Učitavanje…
              </p>
            )}

            {!isLoading && reservations.length === 0 && (
              <p className="py-8 text-center text-muted-foreground">
                Nema rezervacija za izabrane filtere.
              </p>
            )}

            {!isLoading && reservations.length > 0 && (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="border-b text-xs uppercase tracking-wide text-muted-foreground">
                      <tr>
                        <th className="px-2 py-3 font-medium">ID</th>
                        <th className="px-2 py-3 font-medium">Datum rezervacije</th>
                        <th className="px-2 py-3 font-medium">Radionica / Datum</th>
                        <th className="px-2 py-3 font-medium">Email</th>
                        <th className="px-2 py-3 font-medium">Telefon</th>
                        <th className="px-2 py-3 font-medium">Broj mesta</th>
                        <th className="px-2 py-3 font-medium">Iznos</th>
                        <th className="px-2 py-3 font-medium">Status</th>
                        <th className="px-2 py-3 font-medium text-right">
                          Akcije
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {reservations.map((r) => {
                        const res = r as typeof r & { event: { title: string; date: Date; startTime: string; endTime: string; price: number; currency: string } };
                        const seats = res.seats ?? 1;
                        return (
                          <tr key={res.id} className="hover:bg-muted/30">
                            <td className="px-2 py-3 font-mono text-xs text-muted-foreground">
                              {res.id.slice(0, 8)}
                            </td>
                            <td className="px-2 py-3 text-muted-foreground">
                              {dayjs(res.createdAt).format("DD.MM.YYYY HH:mm")}
                            </td>
                            <td className="px-2 py-3 max-w-[200px]">
                              <div className="font-medium truncate" title={res.event?.title}>{res.event?.title ?? "—"}</div>
                              {res.event?.date && (
                                <div className="text-xs text-muted-foreground">
                                  {dayjs(res.event.date).format("DD.MM.YYYY.")}
                                  {res.event.startTime && ` | ${res.event.startTime.slice(0, 5)}h`}
                                  {res.event.endTime && ` – ${res.event.endTime.slice(0, 5)}h`}
                                </div>
                              )}
                            </td>
                            <td className="px-2 py-3">{res.email}</td>
                            <td className="px-2 py-3 text-muted-foreground">
                              {res.phone ?? "—"}
                            </td>
                            <td className="px-2 py-3">{seats}</td>
                            <td className="px-2 py-3">
                              {res.event
                                ? formatAmount(res.event.price, res.event.currency, seats)
                                : "—"}
                            </td>
                            <td className="px-2 py-3">
                              <span
                                className={
                                  res.status === "CONFIRMED"
                                    ? "text-green-600"
                                    : res.status === "CANCELLED"
                                    ? "text-red-600"
                                    : "text-amber-600"
                                }
                              >
                                {STATUS_LABELS[res.status] ?? res.status}
                              </span>
                            </td>
                            <td className="px-2 py-3 text-right">
                              <div className="flex justify-end gap-1">
                                <Button asChild size="sm" variant="outline">
                                  <Link to={`/rezervacije/${res.id}`}>
                                    Otvori
                                  </Link>
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleDelete(res.id)}
                                  disabled={deletingId === res.id}
                                >
                                  {deletingId === res.id ? "…" : "Obriši"}
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
      </div>
    </div>
  );
};
