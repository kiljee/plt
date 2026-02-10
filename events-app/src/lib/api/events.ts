import {
  APP_BASE_URL,
  EVENTS_NEXT_ROUTE,
  EVENTS_REVALIDATE_SECONDS,
} from "@/config/api";
import type { EventItem, EventLocation } from "@/types/event";

const EVENTS_BASE = `${APP_BASE_URL.replace(/\/$/, "")}${EVENTS_NEXT_ROUTE}`;

export const getEvents = async (
  location?: EventLocation,
): Promise<EventItem[]> => {
  const url = location
    ? `${EVENTS_BASE}?location=${encodeURIComponent(location)}`
    : EVENTS_BASE;
  const res = await fetch(url, {
    next: { revalidate: EVENTS_REVALIDATE_SECONDS },
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const msg = (body as { error?: string })?.error ?? res.statusText;
    throw new Error(msg);
  }

  const data = await res.json();
  if (!Array.isArray(data)) {
    throw new Error("Invalid response");
  }

  return data as EventItem[];
};
