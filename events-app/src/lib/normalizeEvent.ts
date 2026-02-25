import { EventLocation } from "@/types/event";
import type { EventItem, EventDetailItem } from "@/types/event";

const ensureString = (v: unknown, fallback = ""): string =>
  typeof v === "string" ? v : fallback;

const ensureNumber = (v: unknown, fallback = 0): number =>
  typeof v === "number" && !Number.isNaN(v) ? v : fallback;

export const normalizeEventItem = (raw: Record<string, unknown>): EventItem => ({
  id: ensureString(raw.id),
  title: ensureString(raw.title),
  description: ensureString(raw.description),
  location:
    raw.location === EventLocation.NOVI_SAD
      ? EventLocation.NOVI_SAD
      : EventLocation.BELGRADE,
  date: ensureString(raw.date),
  startTime: ensureString(raw.startTime),
  endTime: ensureString(raw.endTime),
  ageCategory: ensureString(raw.ageCategory, "Adults"),
  capacity: ensureNumber(raw.capacity, 10),
  imageUrls: ensureString(raw.imageUrls, "[]"),
  price: ensureNumber(raw.price),
  currency: ensureString(raw.currency, "RSD"),
  createdAt: ensureString(raw.createdAt),
  placesLeft: typeof raw.placesLeft === "number" ? raw.placesLeft : undefined,
});

export const normalizeEventDetailItem = (
  raw: Record<string, unknown>,
): EventDetailItem => {
  const base = normalizeEventItem(raw);
  const placesLeft =
    typeof raw.placesLeft === "number" ? raw.placesLeft : base.capacity;
  return { ...base, placesLeft };
};
