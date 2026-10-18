import { EventStatus } from "../events/constants";

export const EventAvailabilityErrorCode = {
  EVENT_NOT_ACTIVE: "EVENT_NOT_ACTIVE",
  EVENT_SOLD_OUT: "EVENT_SOLD_OUT",
  EVENT_NOT_ENOUGH_SEATS: "EVENT_NOT_ENOUGH_SEATS",
  EVENT_INVALID_CAPACITY: "EVENT_INVALID_CAPACITY",
} as const;

export type EventAvailabilityErrorCodeType =
  (typeof EventAvailabilityErrorCode)[keyof typeof EventAvailabilityErrorCode];

export interface EventAvailabilityEvent {
  title: string;
  status: string;
  capacity: number;
}

export type EventAvailabilityResult =
  | { isAvailable: true; availableSeats: number }
  | {
      isAvailable: false;
      code: EventAvailabilityErrorCodeType;
      error: string;
      availableSeats: number;
    };

export const getEventAvailability = (
  event: EventAvailabilityEvent,
  alreadyReservedSeats: number,
  requestedSeats: number,
): EventAvailabilityResult => {
  if (event.status !== EventStatus.ACTIVE) {
    return {
      isAvailable: false,
      code: EventAvailabilityErrorCode.EVENT_NOT_ACTIVE,
      error: `Radionica "${event.title}" više nije aktivna i ne može se rezervisati`,
      availableSeats: 0,
    };
  }

  if (!Number.isInteger(event.capacity) || event.capacity < 1) {
    return {
      isAvailable: false,
      code: EventAvailabilityErrorCode.EVENT_INVALID_CAPACITY,
      error: `Radionica "${event.title}" nema validan kapacitet`,
      availableSeats: 0,
    };
  }

  const availableSeats = Math.max(0, event.capacity - alreadyReservedSeats);

  if (availableSeats <= 0) {
    return {
      isAvailable: false,
      code: EventAvailabilityErrorCode.EVENT_SOLD_OUT,
      error: `Radionica "${event.title}" je rasprodata`,
      availableSeats,
    };
  }

  if (requestedSeats > availableSeats) {
    return {
      isAvailable: false,
      code: EventAvailabilityErrorCode.EVENT_NOT_ENOUGH_SEATS,
      error: `Za radionicu "${event.title}" je ostalo još samo ${availableSeats} mesta`,
      availableSeats,
    };
  }

  return { isAvailable: true, availableSeats };
};

export const getAvailabilityHttpStatus = (
  code: EventAvailabilityErrorCodeType,
): number =>
  code === EventAvailabilityErrorCode.EVENT_INVALID_CAPACITY ? 400 : 409;
