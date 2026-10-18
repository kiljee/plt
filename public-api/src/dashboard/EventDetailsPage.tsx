import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import { Link, useParams } from "react-router-dom";

dayjs.extend(utc);
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import {
  getAdminEventById,
  updateEvent,
  deleteEvent,
  useQuery,
  useAction,
} from "wasp/client/operations";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  CreateEventForm,
  type EventFormSubmitPayload,
  mapEventToFormValues,
} from "../events/components/CreateEventForm";
import { useRequireAdmin } from "../hooks/useRequireAdmin";

const SUCCESS_MESSAGE = "Radionica je uspešno ažurirana.";

export const EventDetailsPage = () => {
  const { isLoading: isAuthLoading, isAdmin } = useRequireAdmin();
  const { id } = useParams();
  const eventId = id ?? "";
  const {
    data: event,
    isLoading,
    refetch,
  } = useQuery(getAdminEventById, {
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
    if (
      !window.confirm(
        "Da li ste sigurni da želite da obrišete ovu radionicu? Sve slike će biti obrisane.",
      )
    )
      return;
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
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        <Button asChild variant="ghost" size="sm" className="-ml-2 mb-4">
          <Link to="/">
            <ArrowLeft aria-hidden />
            Nazad na radionice
          </Link>
        </Button>
        <p className="text-muted-foreground">Radionica nije pronađena.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-4 sm:mb-6">
          <Button asChild variant="ghost" size="sm" className="-ml-2">
            <Link to="/">
              <ArrowLeft aria-hidden />
              Nazad na radionice
            </Link>
          </Button>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <h1 className="min-w-0 break-words text-xl font-bold tracking-tight sm:text-3xl">
              {event?.title ?? "Radionica"}
            </h1>
            <div className="flex gap-2">
              <Button asChild variant="outline" className="flex-1 sm:flex-none">
                <Link to={`/rezervacije?eventId=${eventId}`}>Rezervacije</Link>
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                className="flex-1 sm:flex-none"
              >
                Obriši radionicu
              </Button>
            </div>
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
              <CardHeader className="p-4 pb-3 sm:p-6 sm:pb-3">
                <CardTitle>Detalji</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-x-3 gap-y-4 p-4 pt-0 text-sm sm:p-6 sm:pt-0 lg:flex lg:flex-col lg:gap-3">
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
                    {event.price === 0
                      ? "Besplatno"
                      : `${event.price} ${event.currency}`}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 pb-3 sm:p-6 sm:pb-3">
                <CardTitle>Izmena</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
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
