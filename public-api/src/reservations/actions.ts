import { HttpError } from "wasp/server";
import { sendEmail } from "../lib/mailtrap";
import {
  formatOrderDate,
  formatEventDateTime,
} from "../lib/date";
import {
  buildReservationConfirmationHtml,
  buildReservationConfirmationText,
  formatOrderId,
} from "../email/reservation-confirmation";
import {
  type DeleteReservation,
  type ConfirmReservation,
} from "wasp/server/operations";

export const deleteReservation: DeleteReservation<{ id: string }> = async (
  { id },
  context,
) => {
  if (!context.user) throw new HttpError(401);
  const user = await context.entities.User.findUnique({
    where: { id: context.user.id },
    select: { isAdmin: true },
  });
  if (!user?.isAdmin) throw new HttpError(403, "Samo admin može izvršiti ovu akciju.");
  return context.entities.Reservation.delete({
    where: { id },
  });
};

export const confirmReservation: ConfirmReservation<{ id: string }> = async (
  { id },
  context,
) => {
  if (!context.user) throw new HttpError(401);
  const user = await context.entities.User.findUnique({
    where: { id: context.user.id },
    select: { isAdmin: true },
  });
  if (!user?.isAdmin) throw new HttpError(403, "Samo admin može izvršiti ovu akciju.");

  const reservation = await context.entities.Reservation.findUnique({
    where: { id },
    include: { event: true },
  });

  if (!reservation) throw new HttpError(404, "Rezervacija nije pronađena.");
  if (reservation.status === "CONFIRMED") {
    return reservation;
  }

  const updated = await context.entities.Reservation.update({
    where: { id },
    data: { status: "CONFIRMED" },
  });

  const event = reservation.event;
  const seats = reservation.seats ?? 1;
  const total = event.price * seats;
  const location: "BELGRADE" | "NOVI_SAD" =
    event.location === "BELGRADE" || event.location === "NOVI_SAD"
      ? event.location
      : "NOVI_SAD";

  const emailData = {
    orderId: formatOrderId(reservation.id),
    reservationId: reservation.id,
    orderDate: formatOrderDate(reservation.createdAt),
    location,
    customerName: reservation.name ?? "",
    customerEmail: reservation.email,
    customerPhone: reservation.phone ?? "",
    items: [
      {
        title: event.title,
        dateTime: formatEventDateTime(event.date, event.startTime),
        price: event.price,
        currency: event.currency,
        quantity: seats,
        total,
      },
    ],
    total,
    currency: event.currency,
    variant: "confirmed" as const,
  };

  const cityName = location === "BELGRADE" ? "Beograd" : "Novi Sad";
  await sendEmail({
    to: reservation.email,
    subject: `Rezervacija potvrđena – Paleto.rs · ${cityName}`,
    text: buildReservationConfirmationText(emailData),
    html: buildReservationConfirmationHtml(emailData),
  });

  return updated;
};
