import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Trash2, X } from "lucide-react";
import { toast } from "sonner";
import {
  getReservationById,
  confirmReservation,
  rejectReservation,
  deleteReservation,
  useQuery,
  useAction,
} from "wasp/client/operations";
import { Button } from "../components/ui/button";
import { ReservationLocationCircle } from "./ReservationLocationCircle";

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Nepotvrđena",
  CONFIRMED: "Potvrđena",
  CANCELLED: "Otkazana",
};

interface ReservationDetailPanelInnerProps {
  reservationId: string;
  onClose: () => void;
  onChanged: () => void;
}

const ReservationDetailPanelInner = ({
  reservationId,
  onClose,
  onChanged,
}: ReservationDetailPanelInnerProps) => {
  const { data: reservation, isLoading, refetch } = useQuery(
    getReservationById,
    { id: reservationId },
  );
  const confirmAction = useAction(confirmReservation);
  const rejectAction = useAction(rejectReservation);
  const deleteAction = useAction(deleteReservation);
  const [confirming, setConfirming] = useState(false);
  const [rejecting, setRejecting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const handleConfirm = async () => {
    setConfirming(true);
    try {
      await confirmAction({ id: reservationId });
      toast.success("Rezervacija je potvrđena. Email je poslat korisniku.");
      await refetch();
      onChanged();
    } catch (err: unknown) {
      toast.error(`Greška: ${String(err)}`);
    } finally {
      setConfirming(false);
    }
  };

  const handleReject = async () => {
    if (
      !window.confirm(
        "Odbij rezervaciju? Korisniku će biti poslat email. Mesta će biti oslobođena.",
      )
    ) {
      return;
    }
    setRejecting(true);
    try {
      await rejectAction({ id: reservationId });
      toast.success("Rezervacija je odbijena. Email je poslat korisniku.");
      await refetch();
      onChanged();
    } catch (err: unknown) {
      toast.error(`Greška: ${String(err)}`);
    } finally {
      setRejecting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Obrisati rezervaciju? Mesta će biti oslobođena.")) return;
    setDeleting(true);
    try {
      await deleteAction({ id: reservationId });
      toast.success("Rezervacija je obrisana. Mesta su oslobođena.");
      onChanged();
      onClose();
    } catch (err: unknown) {
      toast.error(`Greška: ${String(err)}`);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <button
        type="button"
        className="hidden cursor-default bg-black/40 sm:fixed sm:inset-0 sm:z-50 sm:block"
        onClick={onClose}
        aria-label="Zatvori prikaz rezervacije"
      />
      <aside
        className="fixed inset-0 z-[51] flex w-full flex-col bg-background shadow-2xl sm:inset-y-0 sm:left-auto sm:right-0 sm:max-w-md sm:border-l"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reservation-panel-title"
      >
        <div className="flex items-start justify-between gap-3 border-b px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:pt-3">
          <div className="flex min-w-0 items-center gap-3">
            {reservation && (
              <ReservationLocationCircle
                location={reservation.event?.location ?? "BELGRADE"}
              />
            )}
            <h2
              id="reservation-panel-title"
              className="text-lg font-semibold leading-tight"
            >
              Detalji rezervacije
            </h2>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="shrink-0"
            onClick={onClose}
            aria-label="Zatvori panel"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          {isLoading && (
            <p className="py-8 text-center text-muted-foreground">Učitavanje…</p>
          )}

          {!isLoading && !reservation && (
            <p className="py-8 text-center text-muted-foreground">
              Rezervacija nije pronađena.
            </p>
          )}

          {!isLoading && reservation && (
            <div className="space-y-4">
              <div>
                <span className="text-sm text-muted-foreground">Datum rezervisanja</span>
                <div className="font-medium">
                  {dayjs(reservation.createdAt).format("DD.MM.YYYY HH:mm")}
                </div>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Radionica</span>
                <div className="font-medium">{reservation.event?.title ?? "—"}</div>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Email</span>
                <div className="font-medium">{reservation.email}</div>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Ime</span>
                <div className="font-medium">{reservation.name ?? "—"}</div>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Telefon</span>
                <div className="font-medium">{reservation.phone ?? "—"}</div>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Broj mesta</span>
                <div className="font-medium">{reservation.seats ?? 1}</div>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Iznos za uplatu</span>
                <div className="font-medium">
                  {reservation.event
                    ? `${reservation.event.price * (reservation.seats ?? 1)} ${reservation.event.currency}`
                    : "—"}
                </div>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Status</span>
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

              <div className="flex flex-col gap-2 pt-4 sm:flex-row sm:flex-wrap">
                {reservation.status === "PENDING" && (
                  <>
                    <Button
                      onClick={handleConfirm}
                      disabled={confirming || rejecting}
                    >
                      {confirming
                        ? "Obrada…"
                        : "Potvrdi rezervaciju (pošalji email)"}
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={handleReject}
                      disabled={rejecting || confirming}
                    >
                      {rejecting ? "Obrada…" : "Odbij rezervaciju (pošalji email)"}
                    </Button>
                  </>
                )}
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={deleting}
                  className="gap-2"
                >
                  <Trash2 className="h-4 w-4 shrink-0" aria-hidden />
                  {deleting ? "Brisanje…" : "Obriši rezervaciju"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

interface ReservationDetailPanelProps {
  reservationId: string | null;
  onClose: () => void;
  onChanged: () => void;
}

export const ReservationDetailPanel = ({
  reservationId,
  onClose,
  onChanged,
}: ReservationDetailPanelProps) => {
  if (!reservationId) return null;
  return (
    <ReservationDetailPanelInner
      reservationId={reservationId}
      onClose={onClose}
      onChanged={onChanged}
    />
  );
};
