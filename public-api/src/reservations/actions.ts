import { HttpError } from "wasp/server";
import { sendEmail } from "../lib/mailtrap";
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

  const amountToPay = reservation.event.price * (reservation.seats ?? 1);
  const eventDate = reservation.event.date instanceof Date
    ? reservation.event.date.toLocaleDateString("sr-RS")
    : String(reservation.event.date);

  await sendEmail({
    to: reservation.email,
    subject: "Rezervacija potvrđena – Paleto Events",
    text: `Poštovani,\n\nVaša rezervacija za radionicu "${reservation.event.title}" (${eventDate}) je uspešno potvrđena.\n\nBroj mesta: ${reservation.seats ?? 1}\nIznos za uplatu: ${amountToPay} ${reservation.event.currency}\n\nHvala za poverenje!`,
    html: `<p>Poštovani,</p><p>Vaša rezervacija za radionicu <strong>${reservation.event.title}</strong> (${eventDate}) je uspešno potvrđena.</p><p><strong>Broj mesta:</strong> ${reservation.seats ?? 1}<br><strong>Iznos za uplatu:</strong> ${amountToPay} ${reservation.event.currency}</p><p>Hvala za poverenje!</p>`,
  })

  return updated;
};
