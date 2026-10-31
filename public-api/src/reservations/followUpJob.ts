import dayjs from "dayjs";
import type { CheckPendingReservationFollowUps } from "wasp/server/jobs";
import {
  buildReservationFollowUpHtml,
  buildReservationFollowUpText,
} from "../email/reservation-follow-up";
import { formatEventDateTime } from "../lib/date";
import { sendEmail } from "../lib/mailtrap";
import {
  followUpLinks,
  hasWorkshopStarted,
} from "./followUp";
import { ReservationStatus } from "./types";

type FollowUpJobInput = {
  run: boolean;
};

export const checkPendingReservationFollowUps: CheckPendingReservationFollowUps<
  FollowUpJobInput,
  { sent: number }
> = async (_args, context) => {
  const now = dayjs().toDate();
  const due = await context.entities.Reservation.findMany({
    where: {
      status: ReservationStatus.PENDING,
      followUpDueAt: { lte: now },
      followUpSentAt: null,
    },
    include: { event: true },
  });

  let sent = 0;

  for (const reservation of due) {
    if (hasWorkshopStarted(reservation.event.date, reservation.event.startTime)) {
      await context.entities.Reservation.updateMany({
        where: {
          id: reservation.id,
          status: ReservationStatus.PENDING,
          followUpSentAt: null,
        },
        data: { followUpDueAt: null },
      });
      continue;
    }

    const claimedAt = dayjs().toDate();
    const claimed = await context.entities.Reservation.updateMany({
      where: {
        id: reservation.id,
        status: ReservationStatus.PENDING,
        followUpSentAt: null,
      },
      data: { followUpSentAt: claimedAt },
    });
    if (claimed.count !== 1) continue;

    const links = followUpLinks(reservation.id);
    const eventDateTime = formatEventDateTime(
      reservation.event.date,
      reservation.event.startTime,
    );
    const emailData = {
      orderId: links.code,
      customerName: reservation.name ?? "",
      eventTitle: reservation.event.title,
      eventDateTime,
      seats: reservation.seats ?? 1,
      extendUrl: links.extendUrl,
      cancelUrl: links.cancelUrl,
    };

    try {
      await sendEmail({
        to: reservation.email,
        subject: "Rezervacija nije potvrđena – Paleto.rs",
        text: buildReservationFollowUpText(emailData),
        html: buildReservationFollowUpHtml(emailData),
      });
      sent += 1;
    } catch (err) {
      console.error("Failed to send reservation follow-up email:", err);
      await context.entities.Reservation.update({
        where: { id: reservation.id },
        data: { followUpSentAt: null },
      });
    }
  }

  return { sent };
};
