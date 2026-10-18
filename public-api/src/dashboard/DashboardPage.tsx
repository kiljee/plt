import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import { useEffect, useState } from "react";

dayjs.extend(utc);
import { Link } from "react-router-dom";
import {
  getAdminEvents,
  updateEventStatus,
  useQuery,
} from "wasp/client/operations";
import { toast } from "sonner";
import { ArrowDown, ArrowUp, Plus } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";
import { useRequireAdmin } from "../hooks/useRequireAdmin";
import { useAddEventModal } from "../shared/context/AddEventModalContext";
import { EventStatus } from "../events/constants";
import type { EventDateOrder } from "../events/queries";
import { EventLocation, type EventLocationType } from "../reservations/types";

const PAGE_SIZE = 10;
const OCCUPANCY_CIRCLE_RADIUS = 13;
const OCCUPANCY_CIRCLE_CIRCUMFERENCE = 2 * Math.PI * OCCUPANCY_CIRCLE_RADIUS;

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

const LOCATION_LABELS: Record<EventLocationType, string> = {
  [EventLocation.BELGRADE]: "Beograd",
  [EventLocation.NOVI_SAD]: "Novi Sad",
};

type StatusFilterValue = "all" | EventStatus;
type LocationFilterValue = "all" | EventLocationType;

const STATUS_FILTER_OPTIONS: { value: StatusFilterValue; label: string }[] = [
  { value: "all", label: "Sve" },
  { value: EventStatus.ACTIVE, label: "Aktivne" },
  { value: EventStatus.INACTIVE, label: "Neaktivne" },
];

const LOCATION_FILTER_OPTIONS: {
  value: LocationFilterValue;
  label: string;
}[] = [
  { value: "all", label: "Sve lokacije" },
  {
    value: EventLocation.NOVI_SAD,
    label: LOCATION_LABELS[EventLocation.NOVI_SAD],
  },
  {
    value: EventLocation.BELGRADE,
    label: LOCATION_LABELS[EventLocation.BELGRADE],
  },
];

export const DashboardPage = () => {
  const { isLoading: isAuthLoading, isAdmin } = useRequireAdmin();
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<StatusFilterValue>(
    EventStatus.ACTIVE,
  );
  const [locationFilter, setLocationFilter] =
    useState<LocationFilterValue>("all");
  const [eventDateOrder, setEventDateOrder] = useState<EventDateOrder>("asc");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const { open: openAddEventModal, onSuccessRef } = useAddEventModal();

  const { data, isLoading, refetch } = useQuery(getAdminEvents, {
    page,
    pageSize: PAGE_SIZE,
    statusFilter: statusFilter === "all" ? undefined : statusFilter,
    locationFilter: locationFilter === "all" ? undefined : locationFilter,
    eventDateOrder,
  });

  useEffect(() => {
    onSuccessRef.current = () => {
      void refetch();
    };
    return () => {
      onSuccessRef.current = null;
    };
  }, [refetch, onSuccessRef]);

  useEffect(() => {
    setPage(1);
  }, [statusFilter, locationFilter, eventDateOrder]);

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

  const renderStatusSelect = (eventId: string, status: EventStatus) => (
    <select
      value={status}
      disabled={updatingId === eventId}
      onChange={(e) => {
        const value = e.target.value as EventStatus;
        if (value === "ACTIVE" || value === "INACTIVE") {
          handleStatusChange(eventId, value);
        }
      }}
      aria-label="Status radionice"
      className={`rounded-md border px-2 py-1 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary ${STATUS_BADGE_CLASS[status]} border-transparent disabled:opacity-60`}
    >
      <option value="ACTIVE">{STATUS_LABELS.ACTIVE}</option>
      <option value="INACTIVE">{STATUS_LABELS.INACTIVE}</option>
    </select>
  );

  const events = data?.events ?? [];
  const totalCount = data?.totalCount ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  if (isAuthLoading || !isAdmin) return null;

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-6xl px-2 py-2 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-1 flex items-center justify-between gap-2 sm:mb-6 sm:gap-3">
          <h1 className="text-lg font-semibold tracking-tight sm:text-2xl">
            Radionice
            {totalCount > 0 ? (
              <span className="ml-2 font-normal text-muted-foreground">
                ({totalCount})
              </span>
            ) : null}
          </h1>
          <Button
            type="button"
            size="sm"
            onClick={openAddEventModal}
            className="shrink-0"
          >
            <Plus aria-hidden />
            <span className="hidden sm:inline">Dodaj radionicu</span>
            <span className="sm:hidden">Dodaj</span>
          </Button>
        </div>

        <Card className="rounded-none border-0 bg-transparent shadow-none sm:rounded-xl sm:border sm:bg-card sm:shadow">
          <CardHeader className="border-b-0 px-0 py-1 sm:border-b sm:px-6 sm:py-3">
            <div className="flex flex-wrap items-center gap-1 sm:gap-2">
              <div
                className="flex w-full gap-1 sm:inline-flex sm:w-auto sm:rounded-md sm:border sm:border-border sm:bg-background sm:p-0.5"
                role="group"
                aria-label="Filter po statusu"
              >
                {STATUS_FILTER_OPTIONS.map((opt) => (
                  <Button
                    key={`st-${opt.value}`}
                    variant={statusFilter === opt.value ? "default" : "ghost"}
                    size="sm"
                    type="button"
                    className="h-6 flex-1 whitespace-nowrap px-2 sm:h-7 sm:flex-none sm:px-2.5"
                    onClick={() => setStatusFilter(opt.value)}
                    aria-pressed={statusFilter === opt.value}
                  >
                    {opt.label}
                  </Button>
                ))}
              </div>

              <select
                value={locationFilter}
                onChange={(e) =>
                  setLocationFilter(e.target.value as LocationFilterValue)
                }
                aria-label="Filter po lokaciji"
                className="h-7 min-w-0 flex-1 rounded-md border border-input bg-background px-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary sm:h-8 sm:flex-none"
              >
                {LOCATION_FILTER_OPTIONS.map((opt) => (
                  <option key={`loc-${opt.value}`} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>

              <Button
                type="button"
                size="sm"
                variant="outline"
                className="h-7 shrink-0 border-0 bg-transparent px-2 shadow-none hover:bg-muted sm:h-8 sm:border sm:bg-background sm:shadow-sm"
                onClick={() =>
                  setEventDateOrder((prev) => (prev === "asc" ? "desc" : "asc"))
                }
                aria-label={
                  eventDateOrder === "asc"
                    ? "Sortirano rastuće po datumu. Prebaci na opadajuće."
                    : "Sortirano opadajuće po datumu. Prebaci na rastuće."
                }
                title={
                  eventDateOrder === "asc"
                    ? "Rastuće po datumu i vremenu"
                    : "Opadajuće po datumu i vremenu"
                }
              >
                {eventDateOrder === "asc" ? (
                  <ArrowUp aria-hidden />
                ) : (
                  <ArrowDown aria-hidden />
                )}
                Datum
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0 sm:p-6">
            {isLoading && (
              <p className="py-6 text-center text-muted-foreground sm:py-8">
                Učitavanje…
              </p>
            )}

            {!isLoading && events.length === 0 && (
              <div className="flex flex-col items-center gap-3 py-6 sm:gap-4 sm:py-8">
                <p className="text-center text-muted-foreground">
                  Nema radionica. Kliknite „Dodaj radionicu” da kreirate prvu.
                </p>
                <Button onClick={openAddEventModal}>
                  <Plus aria-hidden />
                  Dodaj radionicu
                </Button>
              </div>
            )}

            {!isLoading && events.length > 0 && (
              <>
                <ul className="space-y-1 md:hidden">
                  {events.map((event) => {
                    const dateLabel = dayjs
                      .utc(event.date)
                      .format("DD.MM.YYYY");
                    const timeLabel = event.startTime
                      ? `${event.startTime}–${event.endTime}`
                      : "";
                    const locationLabel =
                      event.location === EventLocation.NOVI_SAD
                        ? LOCATION_LABELS[EventLocation.NOVI_SAD]
                        : LOCATION_LABELS[EventLocation.BELGRADE];
                    const status =
                      (event as { status?: EventStatus }).status ??
                      EventStatus.ACTIVE;
                    const reservedCount =
                      (event as { reservedCount?: number }).reservedCount ?? 0;
                    const occupancyPercent =
                      event.capacity > 0
                        ? Math.min(
                            100,
                            Math.round((reservedCount / event.capacity) * 100),
                          )
                        : 0;
                    return (
                      <li
                        key={event.id}
                        className="relative rounded-lg border border-border px-2 py-1.5"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <Link
                            to={`/radionica/${event.id}`}
                            className="min-w-0 truncate text-sm font-semibold leading-snug text-primary after:absolute after:inset-0 after:content-['']"
                            aria-label={`Otvori radionicu ${event.title}`}
                          >
                            {event.title}
                          </Link>
                          <span className="relative z-10 shrink-0">
                            {renderStatusSelect(event.id, status)}
                          </span>
                        </div>
                        <div className="mt-0.5 flex items-center justify-between gap-2">
                          <p className="min-w-0 truncate text-[13px]">
                            <span className="font-medium text-foreground">
                              {dateLabel}
                              {timeLabel ? ` · ${timeLabel}` : ""}
                            </span>{" "}
                            <span className="text-muted-foreground">
                              · {locationLabel}
                            </span>
                          </p>
                          <span className="flex shrink-0 items-center gap-1.5">
                            <span
                              className="relative inline-flex h-8 w-8 shrink-0 items-center justify-center"
                              role="img"
                              aria-label={`Rezervisano ${reservedCount} od ${event.capacity}, popunjeno ${occupancyPercent}%`}
                              title={`Popunjeno ${occupancyPercent}%`}
                            >
                              <svg
                                className="h-8 w-8 -rotate-90"
                                viewBox="0 0 32 32"
                                aria-hidden
                              >
                                <circle
                                  cx="16"
                                  cy="16"
                                  r={OCCUPANCY_CIRCLE_RADIUS}
                                  fill="none"
                                  strokeWidth="3"
                                  className="stroke-zinc-200"
                                />
                                <circle
                                  cx="16"
                                  cy="16"
                                  r={OCCUPANCY_CIRCLE_RADIUS}
                                  fill="none"
                                  strokeWidth="3"
                                  strokeLinecap="round"
                                  strokeDasharray={
                                    OCCUPANCY_CIRCLE_CIRCUMFERENCE
                                  }
                                  strokeDashoffset={
                                    OCCUPANCY_CIRCLE_CIRCUMFERENCE *
                                    (1 - occupancyPercent / 100)
                                  }
                                  className="stroke-[#D14D8A]"
                                />
                              </svg>
                              <span className="absolute text-[8px] font-semibold tabular-nums text-foreground">
                                {reservedCount}/{event.capacity}
                              </span>
                            </span>
                            <Button
                              asChild
                              size="sm"
                              className="relative z-10 h-6 shrink-0 border-0 bg-[#D14D8A] px-2 text-[11px] font-semibold text-white shadow-none hover:bg-[#bd3f7a] hover:text-white"
                            >
                              <Link
                                to={`/rezervacije?eventId=${event.id}`}
                                aria-label={`Rezervacije za ${event.title}`}
                                title="Rezervacije"
                              >
                                REZ
                              </Link>
                            </Button>
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <div className="hidden overflow-x-auto md:block">
                  <table className="w-full text-left text-sm">
                    <thead className="border-b text-xs uppercase tracking-wide text-muted-foreground">
                      <tr>
                        <th className="px-2 py-3 font-medium">Naziv</th>
                        <th className="px-2 py-3 font-medium">Status</th>
                        <th className="px-2 py-3 font-medium">Termin</th>
                        <th className="px-2 py-3 font-medium">Lokacija</th>
                        <th className="px-2 py-3 font-medium">Kapacitet</th>
                        <th className="px-2 py-3 font-medium">Rezervisano</th>
                        <th className="px-2 py-3 text-right font-medium">
                          Akcije
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {events.map((event) => {
                        const dateLabel = dayjs
                          .utc(event.date)
                          .format("DD.MM.YYYY");
                        const timeLabel = event.startTime
                          ? `${event.startTime}–${event.endTime}`
                          : "";
                        const locationLabel =
                          event.location === EventLocation.NOVI_SAD
                            ? LOCATION_LABELS[EventLocation.NOVI_SAD]
                            : LOCATION_LABELS[EventLocation.BELGRADE];
                        const status =
                          (event as { status?: EventStatus }).status ??
                          EventStatus.ACTIVE;

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
                              {renderStatusSelect(event.id, status)}
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
                              {(event as { reservedCount?: number })
                                .reservedCount ?? 0}
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
                  <Pagination className="mt-4 sm:mt-8">
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
