import dayjs from "dayjs";
import { sendEmail } from "../lib/mailtrap";
import {
  buildReservationConfirmationHtml,
  buildReservationConfirmationText,
  formatOrderId,
} from "../email/reservation-confirmation";
import type { EventLocationType } from "./types";

const EMAIL_SUBJECT = "Porudžbina primljena – Paleto Events";

const formatOrderDate = (date: Date) =>
  dayjs(date).format("DD.MM YYYY. - HH:mm");

const formatEventDateTime = (date: Date, startTime: string) => {
  const dateStr = dayjs(date).format("DD.MM.YYYY.");
  const time = startTime || "—";
  return `${dateStr} u ${time}`;
};

export interface ReservationWithEvent {
  id: string;
  eventId: string;
  seats: number;
  createdAt: Date;
  event: {
    title: string;
    date: Date;
    startTime: string;
    price: number;
    currency: string;
    location: string;
  };
}

export interface SendConfirmationParams {
  reservations: ReservationWithEvent[];
  customerEmail: string;
  customerName?: string;
  customerPhone?: string;
}

const parseLocation = (location: string): EventLocationType =>
  location === "BELGRADE" || location === "NOVI_SAD" ? location : "NOVI_SAD";

export const sendReservationConfirmation = async (
  params: SendConfirmationParams
): Promise<void> => {
  const { reservations, customerEmail, customerName, customerPhone } = params;
  const first = reservations[0];
  const orderDate = formatOrderDate(first.createdAt);
  const total = reservations.reduce(
    (sum, r) => sum + r.event.price * r.seats,
    0
  );
  const location = parseLocation(first.event.location);

  const emailData = {
    orderId: formatOrderId(first.id),
    reservationId: first.id,
    orderDate,
    location,
    customerName: customerName ?? "",
    customerEmail,
    customerPhone: customerPhone ?? "",
    items: reservations.map((r) => ({
      title: r.event.title,
      dateTime: formatEventDateTime(r.event.date, r.event.startTime),
      price: r.event.price,
      currency: r.event.currency,
      quantity: r.seats,
      total: r.event.price * r.seats,
    })),
    total,
    currency: first.event.currency,
  };

  try {
    await sendEmail({
      to: customerEmail,
      subject: EMAIL_SUBJECT,
      text: buildReservationConfirmationText(emailData),
      html: buildReservationConfirmationHtml(emailData),
    });
  } catch (err) {
    console.error("Failed to send reservation confirmation email:", err);
    throw err;
  }
};
