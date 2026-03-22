import { sendEmail } from "../lib/mailtrap";
import {
  formatOrderDate,
  formatEventDateTime,
} from "../lib/date";
import {
  buildReservationConfirmationHtml,
  buildReservationConfirmationText,
  buildReservationThankYouHtml,
  buildReservationThankYouText,
  formatOrderId,
} from "../email/reservation-confirmation";
import type { EventLocationType } from "./types";

const locationToCityName = (location: EventLocationType): string =>
  location === "BELGRADE" ? "Beograd" : "Novi Sad";

const getEmailSubject = (location: EventLocationType): string =>
  `Porudžbina primljena – Paleto.rs · ${locationToCityName(location)}`;

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
      subject: getEmailSubject(location),
      text: buildReservationConfirmationText(emailData),
      html: buildReservationConfirmationHtml(emailData),
    });
  } catch (err) {
    console.error("Failed to send reservation confirmation email:", err);
    throw err;
  }
};

const SHORT_EMAIL_SUBJECT = "Rezervacija primljena – Paleto.rs";

export interface SendShortEmailParams {
  customerEmail: string;
  customerName?: string;
}

export const sendReservationShortEmail = async (
  params: SendShortEmailParams
): Promise<void> => {
  const { customerEmail, customerName } = params;
  const data = { customerName: customerName ?? "" };
  try {
    await sendEmail({
      to: customerEmail,
      subject: SHORT_EMAIL_SUBJECT,
      text: buildReservationThankYouText(data),
      html: buildReservationThankYouHtml(data),
    });
  } catch (err) {
    console.error("Failed to send reservation short email:", err);
    throw err;
  }
};

const ADMIN_EMAIL = "info@paleto.rs";

export interface SendAdminNotificationParams {
  customerName: string;
  customerEmail: string;
  reservations: ReservationWithEvent[];
}

export const sendAdminReservationNotification = async (
  params: SendAdminNotificationParams
): Promise<void> => {
  const { customerName, customerEmail, reservations } = params;
  const totalSeats = reservations.reduce((sum, r) => sum + r.seats, 0);
  const location = parseLocation(reservations[0].event.location);
  const cityName = locationToCityName(location);

  const itemLines = reservations
    .map(
      (r) =>
        `- ${r.event.title} (${formatEventDateTime(r.event.date, r.event.startTime)}) – ${r.seats} mesta`
    )
    .join("\n");

  const text = `Nova rezervacija

Ime: ${customerName || "—"}
E-mail: ${customerEmail}
Ukupno mesta: ${totalSeats}
Grad: ${cityName}

Rezervisane radionice:
${itemLines}
`;

  try {
    await sendEmail({
      to: ADMIN_EMAIL,
      subject: `Nova rezervacija – ${customerName || customerEmail} (${totalSeats} mesta)`,
      text,
      html: `<pre style="font-family: sans-serif; font-size: 14px; line-height: 1.6;">${text}</pre>`,
    });
  } catch (err) {
    console.error("Failed to send admin notification email:", err);
  }
};
