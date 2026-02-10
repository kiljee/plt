import { HttpError } from "wasp/server";
import { type DeleteReservation } from "wasp/server/operations";

export const deleteReservation: DeleteReservation<{ id: string }> = async (
  { id },
  context,
) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  const user = await context.entities.User.findUnique({
    where: { id: context.user.id },
    select: { isAdmin: true },
  });

  if (!user?.isAdmin) {
    throw new HttpError(403, "Samo admin može brisati rezervacije.");
  }

  return context.entities.Reservation.delete({
    where: { id },
  });
};
