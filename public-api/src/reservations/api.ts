import dayjs from "dayjs";
import type { CreateReservationPublic } from "wasp/server/api";
import { sendEmail } from "../lib/mailtrap";
import {
  buildReservationConfirmationHtml,
  buildReservationConfirmationText,
  formatOrderId,
} from "../email/reservation-confirmation";

const formatOrderDate = (date: Date) =>
  dayjs(date).format("DD.MM YYYY. - HH:mm")

const formatEventDateTime = (date: Date, startTime: string) => {
  const dateStr = dayjs(date).format("DD.MM.YYYY.")
  const time = startTime || "—"
  return `${dateStr} u ${time}`
}

export const createReservationPublic: CreateReservationPublic = async (
  req,
  res,
  context,
) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const body =
    typeof req.body === "object" && req.body !== null
      ? (req.body as {
          eventId?: string;
          email?: string;
          name?: string;
          phone?: string;
          seats?: number;
        })
      : {};
  const eventId = body.eventId;
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const name =
    typeof body?.name === "string" ? body.name.trim() || undefined : undefined;
  const phone =
    typeof body?.phone === "string" ? body.phone.trim() || undefined : undefined;
  const seats = typeof body?.seats === "number" && body.seats > 0
    ? Math.min(body.seats, 99)
    : 1;

  if (!eventId || !email) {
    res.status(400).json({ error: "eventId i email su obavezni" });
    return;
  }

  const event = await context.entities.Event.findUnique({
    where: { id: eventId },
  });

  if (!event) {
    res.status(404).json({ error: "Događaj nije pronađen" });
    return;
  }

  const reservations = await context.entities.Reservation.findMany({
    where: { eventId, status: { in: ["PENDING", "CONFIRMED"] } },
  });
  const totalReserved = reservations.reduce((s, r) => s + (r.seats ?? 1), 0);
  if (totalReserved + seats > event.capacity) {
    res.status(400).json({ error: "Nema dovoljno slobodnih mesta" });
    return;
  }

  const reservation = await context.entities.Reservation.create({
    data: {
      eventId,
      email,
      name,
      phone,
      seats,
      status: "PENDING",
    },
  });

  const seatsCount = reservation.seats ?? 1
  const totalAmount = event.price * seatsCount

  const location: "BELGRADE" | "NOVI_SAD" =
    event.location === "NOVI_SAD" || event.location === "BELGRADE"
      ? event.location
      : "NOVI_SAD"

  const emailData = {
    orderId: formatOrderId(reservation.id),
    reservationId: reservation.id,
    orderDate: formatOrderDate(reservation.createdAt),
    location,
    customerName: name ?? "",
    customerEmail: email,
    customerPhone: phone ?? "",
    items: [
      {
        title: event.title,
        dateTime: formatEventDateTime(event.date, event.startTime),
        price: event.price,
        currency: event.currency,
        quantity: seatsCount,
        total: totalAmount,
      },
    ],
    total: totalAmount,
    currency: event.currency,
  }

  try {
    await sendEmail({
      to: email,
      subject: "Porudžbina primljena – Paleto Events",
      text: buildReservationConfirmationText(emailData),
      html: buildReservationConfirmationHtml(emailData),
    })
  } catch (err) {
    console.error("Failed to send reservation confirmation email:", err)
  }

  res.status(201).json({
    id: reservation.id,
    eventId: reservation.eventId,
    email: reservation.email,
    name: reservation.name,
    phone: reservation.phone,
    seats: reservation.seats,
    status: reservation.status,
    createdAt: reservation.createdAt,
  });
};
