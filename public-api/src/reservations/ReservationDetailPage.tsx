import dayjs from "dayjs";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  getReservationById,
  confirmReservation,
  deleteReservation,
  useQuery,
  useAction,
} from "wasp/client/operations";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Nepotvrđena",
  CONFIRMED: "Potvrđena",
  CANCELLED: "Otkazana",
};

export const ReservationDetailPage = () => {
  const { id } = useParams();
  const reservationId = id ?? "";
  const { data: reservation, isLoading, refetch } = useQuery(
    getReservationById,
    { id: reservationId },
  );
  const navigate = useNavigate();
  const confirmAction = useAction(confirmReservation);
  const deleteAction = useAction(deleteReservation);
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleConfirm = async () => {
    setConfirming(true);
    try {
      await confirmAction({ id: reservationId });
      toast.success("Rezervacija je potvrđena. Email je poslat korisniku.");
      refetch();
    } catch (err: unknown) {
      toast.error(`Greška: ${String(err)}`);
    } finally {
      setConfirming(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Obrisati rezervaciju? Mesta će biti oslobođena.")) return;
    setDeleting(true);
    try {
      await deleteAction({ id: reservationId });
      toast.success("Rezervacija je obrisana. Mesta su oslobođena.");
      navigate("/rezervacije");
    } catch (err: unknown) {
      toast.error(`Greška: ${String(err)}`);
    } finally {
      setDeleting(false);
    }
  };

  if (!reservationId) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-muted-foreground">Rezervacija nije pronađena.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link
            to="/rezervacije"
            className="text-sm text-muted-foreground hover:underline"
          >
            ← Nazad na rezervacije
          </Link>
          <Button asChild variant="outline">
            <Link to="/rezervacije">Sve rezervacije</Link>
          </Button>
        </div>

        {isLoading && (
          <p className="py-10 text-center text-muted-foreground">Učitavanje…</p>
        )}

        {!isLoading && !reservation && (
          <p className="py-10 text-center text-muted-foreground">
            Rezervacija nije pronađena.
          </p>
        )}

        {!isLoading && reservation && (
          <Card>
            <CardHeader>
              <CardTitle>Detalji rezervacije</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <span className="text-muted-foreground text-sm">
                  Datum rezervisanja
                </span>
                <div className="font-medium">
                  {dayjs(reservation.createdAt).format("DD.MM.YYYY HH:mm")}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground text-sm">Radionica</span>
                <div className="font-medium">
                  {(reservation as { event?: { title: string } }).event?.title ??
                    "—"}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground text-sm">Email</span>
                <div className="font-medium">{reservation.email}</div>
              </div>
              <div>
                <span className="text-muted-foreground text-sm">Ime</span>
                <div className="font-medium">
                  {reservation.name ?? "—"}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground text-sm">Telefon</span>
                <div className="font-medium">
                  {reservation.phone ?? "—"}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground text-sm">Broj mesta</span>
                <div className="font-medium">{reservation.seats ?? 1}</div>
              </div>
              <div>
                <span className="text-muted-foreground text-sm">
                  Iznos za uplatu
                </span>
                <div className="font-medium">
                  {(() => {
                    const ev = (reservation as { event?: { price: number; currency: string } }).event;
                    const seats = reservation.seats ?? 1;
                    return ev ? `${ev.price * seats} ${ev.currency}` : "—";
                  })()}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground text-sm">Status</span>
                <div className="font-medium">
                  <span
                    className={
                      reservation.status === "CONFIRMED"
                        ? "text-green-600"
                        : reservation.status === "CANCELLED"
                        ? "text-red-600"
                        : "text-amber-600"
                    }
                  >
                    {STATUS_LABELS[reservation.status] ?? reservation.status}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {reservation.status === "PENDING" && (
                  <Button
                    onClick={handleConfirm}
                    disabled={confirming}
                  >
                    {confirming
                      ? "Obrada…"
                      : "Potvrdi rezervaciju (pošalji email)"}
                  </Button>
                )}
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={deleting}
                >
                  {deleting ? "Brisanje…" : "Obriši rezervaciju"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
