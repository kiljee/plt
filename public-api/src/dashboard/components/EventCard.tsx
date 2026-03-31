import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import { Link } from "react-router-dom";

dayjs.extend(utc);
import { toast } from "sonner";
import { type Event } from "wasp/entities";
import {
  deleteReservation,
  getReservationsForEvent,
  useAction,
  useQuery,
} from "wasp/client/operations";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { ReservationLocationCircle } from "../../reservations/ReservationLocationCircle";

interface EventCardProps {
  event: Event;
}

export const EventCard = ({ event }: EventCardProps) => {
  const { data: reservations, refetch } = useQuery(getReservationsForEvent, {
    eventId: event.id,
  });
  const deleteReservationAction = useAction(deleteReservation);

  const handleDelete = async (reservationId: string) => {
    if (!window.confirm("Obrisati rezervaciju?")) return;
    try {
      await deleteReservationAction({ id: reservationId });
      refetch();
    } catch (err: unknown) {
      toast.error(`Greška: ${String(err)}`);
    }
  };

  const dateFormatted = dayjs.utc(event.date).format("DD.MM.YYYY");
  const imageUrls: string[] = (() => {
    try {
      return typeof event.imageUrls === "string"
        ? JSON.parse(event.imageUrls)
        : [];
    } catch {
      return [];
    }
  })();

  return (
    <Card>
      <CardHeader className="border-b pb-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold leading-tight">
              {event.title}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {dateFormatted} · {event.startTime} – {event.endTime}
            </p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {event.location === "BELGRADE" ? "Beograd" : "Novi Sad"} ·{" "}
              {event.ageCategory} · {event.capacity} mesta
            </p>
          </div>
          {imageUrls.length > 0 && (
            <div className="flex gap-1">
              {imageUrls.slice(0, 3).map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt=""
                  className="h-12 w-12 rounded-md object-cover"
                />
              ))}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-medium">
          <span>Rezervacije ({reservations?.length ?? 0})</span>
          <Button asChild size="sm" variant="ghost" className="h-auto p-0 text-primary">
            <Link to={`/rezervacije?eventId=${event.id}`}>Pogledaj sve</Link>
          </Button>
        </h3>
        {!reservations || reservations.length === 0 ? (
          <p className="rounded-lg bg-muted px-3 py-4 text-sm text-muted-foreground">
            Nema rezervacija
          </p>
        ) : (
          <ul className="space-y-2">
            {reservations.map((r) => (
              <li
                key={r.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg border bg-muted/50 px-2 py-2 sm:flex-nowrap sm:gap-3"
              >
                <ReservationLocationCircle location={event.location} />
                <div className="min-w-0 flex-1">
                  <span className="font-medium">{r.email}</span>
                  {r.name && (
                    <span className="ml-2 text-muted-foreground">· {r.name}</span>
                  )}
                  <span className="ml-2 text-xs text-muted-foreground">
                    {dayjs(r.createdAt).format("DD.MM.YYYY HH:mm")}
                    {(r as { seats?: number }).seats && (r as { seats: number }).seats > 1
                      ? ` · ${(r as { seats: number }).seats} mesta`
                      : ""}
                  </span>
                </div>
                <div className="flex gap-1">
                  <Button asChild size="sm" variant="outline">
                    <Link
                      to={`/rezervacije?eventId=${encodeURIComponent(event.id)}&reservationId=${encodeURIComponent(r.id)}`}
                    >
                      Otvori
                    </Link>
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(r.id)}
                  >
                    Obriši
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};
