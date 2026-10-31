import dayjs from "dayjs";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import {
  getReservationsAdmin,
  getAdminEventById,
  getReservationsForEvent,
  deleteReservation,
  useQuery,
  useAction,
} from "wasp/client/operations";
import { useRequireAdmin } from "../hooks/useRequireAdmin";
import { formatEventDateTime } from "../lib/date";
import { formatReservationCode } from "../lib/reservationCode";
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
import { ReservationDetailPanel } from "./ReservationDetailPanel";
import { ReservationLocationCircle } from "./ReservationLocationCircle";
import { ReservationShareActions } from "./ReservationShareActions";
import { StatusFilter, type StatusFilterType } from "./types";
import {
  reservationExpectedAmount,
  summarizeOptionSelections,
} from "../events/workshopOptions";

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

const formatReservationAmount = (
  expectedAmount: number | null | undefined,
  price: number,
  currency: string,
  seats: number,
) =>
  `${reservationExpectedAmount(expectedAmount, price, seats)} ${currency}`;

type ReservationEvent = {
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  price: number;
  currency: string;
  location: string;
};

export const ReservationsPage = () => {
  const { isLoading: isAuthLoading, isAdmin } = useRequireAdmin();
  const [searchParams, setSearchParams] = useSearchParams();
  const eventId = searchParams.get("eventId") ?? undefined;
  const detailReservationId = searchParams.get("reservationId");

  const closeReservationPanel = () => {
    setSearchParams(
      (prev) => {
        const p = new URLSearchParams(prev);
        p.delete("reservationId");
        return p;
      },
      { replace: true },
    );
  };

  const openReservationPanel = (id: string) => {
    setSearchParams(
      (prev) => {
        const p = new URLSearchParams(prev);
        p.set("reservationId", id);
        return p;
      },
      { replace: false },
    );
  };

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchDebounced, setSearchDebounced] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilterType>(
    StatusFilter.ACTIVE,
  );

  const { data, isLoading, refetch } = useQuery(getReservationsAdmin, {
    page,
    pageSize: PAGE_SIZE,
    search: searchDebounced || undefined,
    statusFilter,
    eventId,
  });
  const { data: event } = useQuery(getAdminEventById, { id: eventId || "" });
  const { data: eventReservations = [] } = useQuery(getReservationsForEvent, {
    eventId: eventId || "",
  });

  useEffect(() => {
    setPage(1);
  }, [eventId]);
  const deleteAction = useAction(deleteReservation);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const reservations = data?.reservations ?? [];

  const shareReservations = eventId
    ? eventReservations.filter((r) => {
        if (statusFilter === StatusFilter.ACTIVE) {
          return r.status === "PENDING" || r.status === "CONFIRMED";
        }
        return r.status === statusFilter;
      })
    : [];

  const eventDateLabel = event?.date
    ? formatEventDateTime(event.date, event.startTime ?? "")
    : null;

  const handleDelete = async (reservationId: string) => {
    if (!window.confirm("Obrisati rezervaciju? Mesta će biti oslobođena."))
      return;
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
      <ReservationDetailPanel
        reservationId={detailReservationId}
        onClose={closeReservationPanel}
        onChanged={() => void refetch()}
      />
      <div className="mx-auto max-w-6xl px-2 py-3 sm:px-6 sm:py-8 lg:px-8">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="-ml-2 mb-1 sm:mb-2"
        >
          <Link to="/">
            <ArrowLeft aria-hidden />
            Nazad na radionice
          </Link>
        </Button>
        <header className="mb-2 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div className="min-w-0">
            <h1 className="text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl">
              {eventId
                ? `Rezervacije: ${event?.title ?? "Radionica"}`
                : "Rezervacije"}
            </h1>
            <p className="mt-0.5 text-xs text-muted-foreground sm:mt-1 sm:text-base">
              {eventId
                ? event?.date
                  ? formatEventDateTime(event.date, event.startTime ?? "")
                  : "Rezervacije za izabranu radionicu"
                : "Pregled svih rezervacija sa filterima i pretragom"}
            </p>
            <nav className="mt-1 flex flex-wrap gap-2 text-xs sm:mt-2 sm:gap-4 sm:text-sm">
              <Link
                to="/rezervacije"
                className={
                  eventId
                    ? "text-muted-foreground hover:text-foreground"
                    : "font-medium text-foreground"
                }
              >
                Rezervacije
              </Link>
              <Link
                to="/rezervacije/blacklist"
                className="text-muted-foreground hover:text-foreground"
              >
                Blacklist emailova
              </Link>
              <Link
                to="/izvestaj"
                className="text-muted-foreground hover:text-foreground"
              >
                Izveštaj
              </Link>
            </nav>
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {eventId && (
              <ReservationShareActions
                reservations={shareReservations.map((reservation) => ({
                  id: reservation.id,
                  name: reservation.name,
                  email: reservation.email,
                  phone: reservation.phone,
                  seats: reservation.seats,
                  status: reservation.status,
                  amountPaid: reservation.amountPaid,
                  price: event?.price ?? null,
                  currency: event?.currency ?? null,
                  expectedAmount: reservation.expectedAmount,
                  optionSummary:
                    summarizeOptionSelections(reservation.optionSelections) ||
                    null,
                }))}
                eventTitle={event?.title}
                eventDate={eventDateLabel}
              />
            )}
            <Button asChild variant="outline" size="sm">
              <Link to="/rezervacije/blacklist">Blacklist</Link>
            </Button>
          </div>
        </header>

        <Card>
          <CardHeader className="border-b p-2 sm:p-6">
            <div className="flex flex-col gap-2 sm:gap-4">
              <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-0.5 sm:gap-2 sm:pb-1">
                {TAB_OPTIONS.map((opt) => (
                  <Button
                    key={opt.value}
                    variant={statusFilter === opt.value ? "default" : "outline"}
                    size="sm"
                    className="shrink-0"
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
                className="flex w-full gap-1.5 sm:flex-row sm:items-center sm:gap-2"
              >
                <Input
                  placeholder="Pretraži po šifri, emailu, imenu, telefonu..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="min-w-0 flex-1 sm:max-w-xs sm:flex-none"
                />
                <Button type="submit" size="sm" className="shrink-0">
                  Pretraži
                </Button>
              </form>
            </div>
          </CardHeader>
          <CardContent className="p-2 sm:p-6">
            {isLoading && (
              <p className="py-6 text-center text-muted-foreground sm:py-8">
                Učitavanje…
              </p>
            )}

            {!isLoading && reservations.length === 0 && (
              <p className="py-6 text-center text-muted-foreground sm:py-8">
                Nema rezervacija za izabrane filtere.
              </p>
            )}

            {!isLoading && reservations.length > 0 && (
              <>
                <ul className="space-y-2 md:hidden">
                  {reservations.map((r) => {
                    const res = r as typeof r & { event: ReservationEvent };
                    const seats = res.seats ?? 1;
                    const loc = res.event?.location ?? "BELGRADE";
                    const code = formatReservationCode(res.id);
                    const optionSummary = summarizeOptionSelections(
                      res.optionSelections,
                    );
                    return (
                      <li
                        key={res.id}
                        className="rounded-lg border bg-background p-2.5"
                      >
                        <div className="flex items-start gap-2">
                          <ReservationLocationCircle location={loc} />
                          <div className="min-w-0 flex-1">
                            <div className="font-semibold leading-tight">
                              {res.name ?? "—"}
                            </div>
                            <div className="mt-0.5 font-mono text-sm tracking-wide text-foreground">
                              {code}
                            </div>
                            {!eventId && res.event?.title && (
                              <div className="mt-0.5 text-sm text-muted-foreground">
                                <div className="truncate">
                                  {res.event.title}
                                </div>
                                {res.event.date && (
                                  <div className="text-xs">
                                    {formatEventDateTime(
                                      res.event.date,
                                      res.event.startTime ?? "",
                                    )}
                                  </div>
                                )}
                              </div>
                            )}
                            <div className="mt-0.5 text-xs text-muted-foreground">
                              {dayjs(res.createdAt).format("DD.MM.YYYY HH:mm")}
                              {" · "}
                              {seats} {seats === 1 ? "mesto" : "mesta"}
                              {res.event
                                ? ` · ${formatReservationAmount(res.expectedAmount, res.event.price, res.event.currency, seats)}`
                                : ""}
                            </div>
                            {optionSummary ? (
                              <div className="mt-0.5 text-xs text-muted-foreground">
                                {optionSummary}
                              </div>
                            ) : null}
                            <div className="mt-0.5 text-xs">
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
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 flex flex-wrap items-center justify-end gap-1.5 border-t pt-2">
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => openReservationPanel(res.id)}
                          >
                            Otvori
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
                      </li>
                    );
                  })}
                </ul>

                <div className="hidden overflow-x-auto md:block">
                  <table className="w-full text-left text-sm">
                    <thead className="border-b text-xs uppercase tracking-wide text-muted-foreground">
                      <tr>
                        <th className="w-12 px-1 py-3 font-medium" scope="col">
                          <span className="sr-only">Lokacija</span>
                        </th>
                        <th className="px-2 py-3 font-medium">Ime i prezime</th>
                        <th className="px-2 py-3 font-medium">Šifra</th>
                        {!eventId && (
                          <th className="px-2 py-3 font-medium">
                            Radionica / Datum
                          </th>
                        )}
                        <th className="px-2 py-3 font-medium">Email</th>
                        <th className="px-2 py-3 font-medium">Telefon</th>
                        <th className="px-2 py-3 font-medium">Mesta</th>
                        <th className="px-2 py-3 font-medium">Iznos</th>
                        <th className="px-2 py-3 font-medium">Status</th>
                        <th className="px-2 py-3 text-right font-medium">
                          Akcije
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {reservations.map((r) => {
                        const res = r as typeof r & { event: ReservationEvent };
                        const seats = res.seats ?? 1;
                        const loc = res.event?.location ?? "BELGRADE";
                        const code = formatReservationCode(res.id);
                        const optionSummary = summarizeOptionSelections(
                          res.optionSelections,
                        );
                        return (
                          <tr key={res.id} className="hover:bg-muted/30">
                            <td className="px-1 py-3 align-middle">
                              <ReservationLocationCircle location={loc} />
                            </td>
                            <td className="px-2 py-3 font-medium">
                              {res.name ?? "—"}
                            </td>
                            <td className="px-2 py-3">
                              <span className="font-mono tracking-wide">
                                {code}
                              </span>
                            </td>
                            {!eventId && (
                              <td className="max-w-[220px] px-2 py-3">
                                <div
                                  className="truncate font-medium"
                                  title={res.event?.title}
                                >
                                  {res.event?.title ?? "—"}
                                </div>
                                {res.event?.date && (
                                  <div className="text-xs text-muted-foreground">
                                    {formatEventDateTime(
                                      res.event.date,
                                      res.event.startTime ?? "",
                                    )}
                                  </div>
                                )}
                              </td>
                            )}
                            <td className="px-2 py-3">{res.email}</td>
                            <td className="px-2 py-3 text-muted-foreground">
                              {res.phone ?? "—"}
                            </td>
                            <td className="px-2 py-3">{seats}</td>
                            <td className="px-2 py-3">
                              {res.event ? (
                                <>
                                  <div>
                                    {formatReservationAmount(
                                      res.expectedAmount,
                                      res.event.price,
                                      res.event.currency,
                                      seats,
                                    )}
                                  </div>
                                  {optionSummary ? (
                                    <div className="text-xs text-muted-foreground">
                                      {optionSummary}
                                    </div>
                                  ) : null}
                                </>
                              ) : (
                                "—"
                              )}
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
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="outline"
                                  onClick={() => openReservationPanel(res.id)}
                                >
                                  Otvori
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
                  <Pagination className="mt-3 sm:mt-8">
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
                        <span className="px-2 text-sm text-muted-foreground sm:px-3">
                          {page}/{totalPages} ({totalCount})
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
