import { cache } from "react";
import {
  EVENTS_ENDPOINT,
  EVENTS_REVALIDATE_SECONDS,
  WASP_API_BASE_URL,
  EVENTS_BY_SLUG_ENDPOINT,
} from "@/config/api";
import { normalizeEventDetailItem, normalizeEventItem } from "@/lib/normalizeEvent";
import type { EventItem, EventDetailItem, EventLocation } from "@/types/event";

const EVENTS_BASE = `${WASP_API_BASE_URL.replace(/\/$/, "")}${EVENTS_ENDPOINT}`;

export const getEvents = cache(async (
  location?: EventLocation,
): Promise<EventItem[]> => {
  const url = location
    ? `${EVENTS_BASE}?location=${encodeURIComponent(location)}`
    : EVENTS_BASE;
  const res = await fetch(url, {
    next: { revalidate: EVENTS_REVALIDATE_SECONDS, tags: ["events"] },
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

  return data.map((item: Record<string, unknown>) =>
    normalizeEventItem(item),
  );
});

export const getEventBySlug = cache(async (
  city: string,
  slug: string,
): Promise<EventDetailItem | null> => {
  const base = WASP_API_BASE_URL.replace(/\/$/, "");
  const url = `${base}${EVENTS_BY_SLUG_ENDPOINT}?city=${encodeURIComponent(city)}&slug=${encodeURIComponent(slug)}`;
  const res = await fetch(url, {
    next: { revalidate: EVENTS_REVALIDATE_SECONDS, tags: ["events"] },
    headers: { Accept: "application/json" },
  });

  if (res.status === 404) return null;
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const msg = (body as { error?: string })?.error ?? res.statusText;
    throw new Error(msg);
  }

  const data = await res.json();
  return normalizeEventDetailItem(data as Record<string, unknown>);
});

export const loadEventPageData = cache(
  async (city: string, slug: string, location: EventLocation) => {
    const [event, events] = await Promise.all([
      getEventBySlug(city, slug),
      getEvents(location),
    ]);
    return { event, events };
  },
);
