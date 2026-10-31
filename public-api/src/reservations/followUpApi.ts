import dayjs from "dayjs";
import type {
  CancelReservationPublic,
  ExtendReservationPublic,
  GetReservationFollowUpPublic,
} from "wasp/server/api";
import { sendEmail } from "../lib/mailtrap";
import { formatEventDateTime } from "../lib/date";
import { formatReservationCode } from "../lib/reservationCode";
import {
  buildReservationCustomerCancelHtml,
  buildReservationCustomerCancelText,
} from "../email/reservation-follow-up";
import {
  buildFollowUpPayload,
  followUpDueFrom,
  messageForReason,
  normalizeReservationCode,
  reasonForCancel,
  reasonForExtend,
  type FollowUpPayload,
  type FollowUpReason,
  type FollowUpReservation,
} from "./followUp";
import { ReservationStatus } from "./types";

type FollowUpContext = {
  entities: {
    Reservation: {
      findMany: (args: {
        where: { id: { startsWith: string } };
        include: { event: true };
        take: number;
      }) => Promise<FollowUpReservation[]>;
      updateMany: (args: {
        where: Record<string, unknown>;
        data: Record<string, unknown>;
      }) => Promise<{ count: number }>;
    };
  };
};

const readQueryCode = (query: { code?: string | string[] }): string | null => {
  const raw = query.code;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return normalizeReservationCode(value);
};

const readBodyCode = (body: unknown): string | null => {
  if (typeof body !== "object" || body === null) return null;
  return normalizeReservationCode((body as { code?: unknown }).code);
};

const findReservationByCode = async (
  context: FollowUpContext,
  code: string,
): Promise<FollowUpReservation | null> => {
  const matches = await context.entities.Reservation.findMany({
    where: { id: { startsWith: code } },
    include: { event: true },
    take: 2,
  });
  if (matches.length !== 1) return null;
  const match = matches[0];
  if (formatReservationCode(match.id).toLowerCase() !== code) return null;
  return match;
};

const reject = (
  res: { status: (code: number) => { json: (body: unknown) => void } },
  status: number,
  reason: FollowUpReason,
) => {
  res.status(status).json({ error: messageForReason(reason), reason });
};

export const getReservationFollowUpPublic: GetReservationFollowUpPublic = async (
  req,
  res,
  context,
) => {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const code = readQueryCode(req.query as { code?: string | string[] });
  if (!code) {
    reject(res, 400, "invalid");
    return;
  }

  const reservation = await findReservationByCode(context, code);
  if (!reservation) {
    reject(res, 404, "invalid");
    return;
  }

  const payload: FollowUpPayload = buildFollowUpPayload(reservation);
  res.status(200).json(payload);
};

export const extendReservationPublic: ExtendReservationPublic = async (
  req,
  res,
  context,
) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const code = readBodyCode(req.body);
  if (!code) {
    reject(res, 400, "invalid");
    return;
  }

  const reservation = await findReservationByCode(context, code);
  if (!reservation) {
    reject(res, 404, "invalid");
    return;
  }

  const payload = buildFollowUpPayload(reservation);
  if (!payload.canExtend) {
    reject(res, 409, reasonForExtend(payload));
    return;
  }

  const now = dayjs().toDate();
  const updated = await context.entities.Reservation.updateMany({
    where: {
      id: reservation.id,
      status: ReservationStatus.PENDING,
      followUpSentAt: { not: null },
      extendedAt: null,
    },
    data: {
      extendedAt: now,
      followUpDueAt: followUpDueFrom(now),
    },
  });

  if (updated.count !== 1) {
    const fresh = await findReservationByCode(context, code);
    reject(res, 409, fresh ? reasonForExtend(buildFollowUpPayload(fresh)) : "invalid");
    return;
  }

  res.status(200).json({ ok: true });
};

export const cancelReservationPublic: CancelReservationPublic = async (
  req,
  res,
  context,
) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const code = readBodyCode(req.body);
  if (!code) {
    reject(res, 400, "invalid");
    return;
  }

  const reservation = await findReservationByCode(context, code);
  if (!reservation) {
    reject(res, 404, "invalid");
    return;
  }

  const payload = buildFollowUpPayload(reservation);
  if (!payload.canCancel) {
    reject(res, 409, reasonForCancel(payload));
    return;
  }

  const updated = await context.entities.Reservation.updateMany({
    where: {
      id: reservation.id,
      status: ReservationStatus.PENDING,
      followUpSentAt: { not: null },
    },
    data: { status: ReservationStatus.CANCELLED },
  });

  if (updated.count !== 1) {
    const fresh = await findReservationByCode(context, code);
    reject(res, 409, fresh ? reasonForCancel(buildFollowUpPayload(fresh)) : "invalid");
    return;
  }

  const emailData = {
    orderId: payload.code,
    customerName: reservation.name ?? "",
    eventTitle: reservation.event.title,
    eventDateTime: formatEventDateTime(
      reservation.event.date,
      reservation.event.startTime,
    ),
  };

  try {
    await sendEmail({
      to: reservation.email,
      subject: "Rezervacija otkazana – Paleto.rs",
      text: buildReservationCustomerCancelText(emailData),
      html: buildReservationCustomerCancelHtml(emailData),
    });
  } catch (err) {
    console.error("Failed to send reservation cancellation email:", err);
  }

  res.status(200).json({ ok: true });
};
