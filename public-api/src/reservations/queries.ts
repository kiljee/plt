import { type Reservation } from "wasp/entities";
import { HttpError } from "wasp/server";
import { type GetReservationsForEvent } from "wasp/server/operations";

export const getReservationsForEvent: GetReservationsForEvent<
  { eventId: string },
  Reservation[]
> = async ({ eventId }, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  const user = await context.entities.User.findUnique({
    where: { id: context.user.id },
    select: { isAdmin: true },
  });

  if (!user?.isAdmin) {
    throw new HttpError(403, "Samo admin može videti rezervacije.");
  }

  return context.entities.Reservation.findMany({
    where: { eventId },
    orderBy: { createdAt: "desc" },
  });
};
