import { Navigate, useParams } from "react-router-dom";
import { useRequireAdmin } from "../hooks/useRequireAdmin";

export const ReservationDetailPage = () => {
  const { isLoading: isAuthLoading, isAdmin } = useRequireAdmin();
  const { id } = useParams();

  if (isAuthLoading || !isAdmin) return null;

  const reservationId = id?.trim() ?? "";
  if (!reservationId) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-muted-foreground">Rezervacija nije pronađena.</p>
      </div>
    );
  }

  return (
    <Navigate to={`/rezervacije?reservationId=${encodeURIComponent(reservationId)}`} replace />
  );
};
