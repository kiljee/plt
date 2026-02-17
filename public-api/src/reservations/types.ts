export const ReservationStatus = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  CANCELLED: "CANCELLED",
} as const;

export type ReservationStatusType =
  (typeof ReservationStatus)[keyof typeof ReservationStatus];

export const ActiveReservationStatuses = [
  ReservationStatus.PENDING,
  ReservationStatus.CONFIRMED,
] as const;

export const StatusFilter = {
  ACTIVE: "ACTIVE",
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  CANCELLED: "CANCELLED",
} as const;

export type StatusFilterType =
  (typeof StatusFilter)[keyof typeof StatusFilter];

export const EventLocation = {
  BELGRADE: "BELGRADE",
  NOVI_SAD: "NOVI_SAD",
} as const;

export type EventLocationType =
  (typeof EventLocation)[keyof typeof EventLocation];

export const MAX_SEATS_PER_ITEM = 99;

export interface BulkReservationItem {
  eventId: string;
  seats: number;
}

export interface BulkReservationRequest {
  items: BulkReservationItem[];
  email: string;
  name?: string;
  phone?: string;
}

export interface BulkReservationRequestBody {
  items?: Array<{ eventId?: string; seats?: number }>;
  email?: string;
  name?: string;
  phone?: string;
}

const isBulkRequestBody = (v: object): v is BulkReservationRequestBody =>
  !Array.isArray(v);

const parseItem = (
  item: { eventId?: string; seats?: number }
): BulkReservationItem | undefined => {
  const eventId = typeof item.eventId === "string" ? item.eventId : "";
  if (!eventId) return undefined;
  const seats =
    typeof item.seats === "number" && item.seats > 0
      ? Math.min(item.seats, MAX_SEATS_PER_ITEM)
      : 1;
  return { eventId, seats };
};

const parseString = (v: string | undefined): string =>
  typeof v === "string" ? v.trim() : "";

const parseOptionalString = (v: string | undefined): string | undefined => {
  const s = typeof v === "string" ? v.trim() : "";
  return s || undefined;
};

export const parseBulkRequestBody = (
  body: object
): Partial<BulkReservationRequest> => {
  if (!isBulkRequestBody(body)) return {};

  const items = (Array.isArray(body.items) ? body.items : [])
    .map(parseItem)
    .filter((i): i is BulkReservationItem => i !== undefined);

  return {
    items,
    email: parseString(body.email),
    name: parseOptionalString(body.name),
    phone: parseOptionalString(body.phone),
  };
};
