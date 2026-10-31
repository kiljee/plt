import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import { EVENTS_SITE_URL } from "../email/reservation-rejection/constants";
import { formatEventDateTime } from "../lib/date";
import { formatReservationCode } from "../lib/reservationCode";
import { ReservationStatus } from "./types";

dayjs.extend(utc);
dayjs.extend(timezone);

export const FOLLOW_UP_MINUTES = 3;
const WORKSHOP_TIMEZONE = "Europe/Belgrade";
const CODE_PATTERN = /^[0-9a-f]{8}$/;

export const followUpDueFrom = (from: Date): Date =>
  dayjs(from).add(FOLLOW_UP_MINUTES, "minute").toDate();

export const followUpLinks = (
  reservationId: string,
): { code: string; extendUrl: string; cancelUrl: string } => {
  const code = formatReservationCode(reservationId);
  const base = EVENTS_SITE_URL.replace(/\/$/, "");
  return {
    code,
    extendUrl: `${base}/produzavam/${code}`,
    cancelUrl: `${base}/odustajem/${code}`,
  };
};

export const normalizeReservationCode = (raw: unknown): string | null => {
  if (typeof raw !== "string") return null;
  const code = raw.trim().toLowerCase();
  if (!CODE_PATTERN.test(code)) return null;
  return code;
};

export const hasWorkshopStarted = (
  date: Date,
  startTime: string,
  now: dayjs.Dayjs = dayjs(),
): boolean => {
  const dateStr = dayjs.utc(date).format("YYYY-MM-DD");
  const timeMatch = startTime.trim().match(/^(\d{1,2}):(\d{2})/);
  const time = timeMatch
    ? `${timeMatch[1].padStart(2, "0")}:${timeMatch[2]}`
    : "23:59";
  const start = dayjs.tz(
    `${dateStr} ${time}`,
    "YYYY-MM-DD HH:mm",
    WORKSHOP_TIMEZONE,
  );
  if (!start.isValid()) return false;
  return !now.isBefore(start);
};

export type FollowUpReason =
  | "invalid"
  | "inactive"
  | "confirmed"
  | "cancelled"
  | "already_extended"
  | "event_passed"
  | "not_pending";

export type FollowUpReservation = {
  id: string;
  status: string;
  seats: number | null;
  email: string;
  name: string | null;
  followUpSentAt: Date | null;
  extendedAt: Date | null;
  event: {
    title: string;
    date: Date;
    startTime: string;
    location: string;
  };
};

export type FollowUpPayload = {
  code: string;
  status: string;
  eventTitle: string;
  eventDateTime: string;
  seats: number;
  locationLabel: string;
  followUpSent: boolean;
  extended: boolean;
  eventPassed: boolean;
  canExtend: boolean;
  canCancel: boolean;
};

const locationLabel = (location: string): string =>
  location === "BELGRADE" ? "Beograd" : "Novi Sad";

export const buildFollowUpPayload = (
  reservation: FollowUpReservation,
): FollowUpPayload => {
  const followUpSent = reservation.followUpSentAt != null;
  const extended = reservation.extendedAt != null;
  const eventPassed = hasWorkshopStarted(
    reservation.event.date,
    reservation.event.startTime,
  );
  const pending = reservation.status === ReservationStatus.PENDING;

  return {
    code: formatReservationCode(reservation.id),
    status: reservation.status,
    eventTitle: reservation.event.title,
    eventDateTime: formatEventDateTime(
      reservation.event.date,
      reservation.event.startTime,
    ),
    seats: reservation.seats ?? 1,
    locationLabel: locationLabel(reservation.event.location),
    followUpSent,
    extended,
    eventPassed,
    canExtend: pending && followUpSent && !extended && !eventPassed,
    canCancel: pending && followUpSent,
  };
};

export const reasonForExtend = (payload: FollowUpPayload): FollowUpReason => {
  if (payload.status === ReservationStatus.CONFIRMED) return "confirmed";
  if (payload.status === ReservationStatus.CANCELLED) return "cancelled";
  if (!payload.followUpSent) return "inactive";
  if (payload.extended) return "already_extended";
  if (payload.eventPassed) return "event_passed";
  if (payload.status !== ReservationStatus.PENDING) return "not_pending";
  return "not_pending";
};

export const reasonForCancel = (payload: FollowUpPayload): FollowUpReason => {
  if (payload.status === ReservationStatus.CONFIRMED) return "confirmed";
  if (payload.status === ReservationStatus.CANCELLED) return "cancelled";
  if (!payload.followUpSent) return "inactive";
  return "not_pending";
};

export const messageForReason = (reason: FollowUpReason): string => {
  if (reason === "inactive") return "Link još nije aktivan.";
  if (reason === "confirmed") return "Rezervacija je već potvrđena.";
  if (reason === "cancelled") return "Rezervacija je već otkazana.";
  if (reason === "already_extended") return "Rok je već produžen.";
  if (reason === "event_passed") return "Termin radionice je prošao.";
  if (reason === "invalid") return "Link nije važeći.";
  return "Rezervacija se više ne može menjati.";
};
