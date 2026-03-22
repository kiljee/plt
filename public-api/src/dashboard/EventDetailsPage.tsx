import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import { Link, useLocation, useParams } from "react-router-dom";

dayjs.extend(utc);
import { toast } from "sonner";
import {
  getAdminEventById,
  updateEvent,
  deleteEvent,
  useQuery,
  useAction,
} from "wasp/client/operations";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
  CreateEventForm,
  type EventFormSubmitPayload,
  mapEventToFormValues,
} from "../events/components/CreateEventForm";
import { useRequireAdmin } from "../hooks/useRequireAdmin";

const SUCCESS_MESSAGE = "Radionica je uspešno ažurirana.";

type RadionicaLocationState = {
  fromCalendar?: boolean;
  calendarReturn?: { view: string; dateIso: string };
};

export const EventDetailsPage = () => {
  const { isLoading: isAuthLoading, isAdmin } = useRequireAdmin();
  const location = useLocation();
  const { id } = useParams();
  const eventId = id ?? "";
  const { data: event, isLoading, refetch } = useQuery(getAdminEventById, {
    id: eventId,
  });

  const deleteEventAction = useAction(deleteEvent);

  const handleUpdate = async (payload: EventFormSubmitPayload) => {
    try {
      await updateEvent({ id: eventId, ...payload });
      toast.success(SUCCESS_MESSAGE);
      refetch();
    } catch (err: unknown) {
      toast.error(`Greška: ${String(err)}`);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Da li ste sigurni da želite da obrišete ovu radionicu? Sve slike će biti obrisane.")) return;
    try {
      await deleteEventAction({ id: eventId });
      toast.success("Radionica je obrisana.");
      window.location.href = "/";
    } catch (err: unknown) {
      toast.error(`Greška: ${String(err)}`);
    }
  };

  if (isAuthLoading || !isAdmin) return null;

  if (!eventId) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-muted-foreground">
          Radionica nije pronađena.
        </p>
      </div>
    );
  }

  const locState = location.state as RadionicaLocationState | null;
  const fromCalendar = locState?.fromCalendar === true;
  const backTo = fromCalendar ? "/kalendar" : "/";
  const backLabel = fromCalendar
    ? "← Nazad na kalendar"
    : "← Nazad na radionice";
  const kalendarRestoreState =
    fromCalendar && locState?.calendarReturn
      ? {
          calendarInitialView: locState.calendarReturn.view,
          calendarInitialDate: locState.calendarReturn.dateIso,
        }
      : undefined;

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <Link
              to={backTo}
              state={kalendarRestoreState}
              className="text-sm text-muted-foreground hover:underline"
            >
              {backLabel}
            </Link>
            <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              {event?.title ?? "Radionica"}
            </h1>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link to={`/rezervacije?eventId=${eventId}`}>Rezervacije</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/">Sve radionice</Link>
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Obriši radionicu
            </Button>
          </div>
        </div>

        {isLoading && (
          <p className="py-10 text-center text-muted-foreground">Učitavanje…</p>
        )}

        {!isLoading && !event && (
          <p className="py-10 text-center text-muted-foreground">
            Radionica nije pronađena.
          </p>
        )}

        {!isLoading && event && (
          <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
            <Card>
              <CardHeader>
                <CardTitle>Detalji</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Datum</span>
                  <div className="font-medium">
                    {dayjs.utc(event.date).format("DD.MM.YYYY")}
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Termin</span>
                  <div className="font-medium">
                    {event.startTime} – {event.endTime}
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Lokacija</span>
                  <div className="font-medium">
                    {event.location === "NOVI_SAD" ? "Novi Sad" : "Beograd"}
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Kapacitet</span>
                  <div className="font-medium">{event.capacity}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Cena</span>
                  <div className="font-medium">
                    {event.price === 0 ? "Besplatno" : `${event.price} ${event.currency}`}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Izmena</CardTitle>
              </CardHeader>
              <CardContent>
                <CreateEventForm
                  key={event.id}
                  title="Izmeni radionicu"
                  submitLabel="Sačuvaj izmene"
                  initialValues={mapEventToFormValues(event)}
                  onSubmit={handleUpdate}
                  resetOnSuccess={false}
                />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
