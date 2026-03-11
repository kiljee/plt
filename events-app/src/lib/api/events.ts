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
const DEFAULT_PAGE_SIZE = 12;

export interface GetEventsResult {
  events: EventItem[];
  totalCount: number;
}

const buildEventsUrl = (
  location?: EventLocation,
  page?: number,
  pageSize?: number,
): string => {
  const params = new URLSearchParams();
  if (location) params.set("location", location);
  const p = Math.max(1, page ?? 1);
  const ps = Math.max(1, pageSize ?? DEFAULT_PAGE_SIZE);
  params.set("page", String(p));
  params.set("pageSize", String(ps));
  return `${EVENTS_BASE}?${params.toString()}`;
};

export const getEvents = cache(async (
  location?: EventLocation,
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
): Promise<GetEventsResult> => {
  const url = buildEventsUrl(location, page, pageSize);
  try {
    const res = await fetch(url, {
      next: { revalidate: EVENTS_REVALIDATE_SECONDS, tags: ["events"] },
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      const msg = (body as { error?: string })?.error ?? res.statusText;
      throw new Error(msg);
    }

    const data = (await res.json()) as { events?: unknown[]; totalCount?: number };
    if (!Array.isArray(data?.events) || typeof data?.totalCount !== "number") {
      throw new Error("Invalid response");
    }

    const events = (data.events as Record<string, unknown>[]).map((item) =>
      normalizeEventItem(item),
    );
    return { events, totalCount: data.totalCount };
  } catch (err) {
    const cause = err instanceof Error ? err.cause : undefined;
    const code = cause && typeof cause === "object" && "code" in cause ? (cause as { code?: string }).code : undefined;
    const isNetworkError =
      err instanceof TypeError && (code === "ECONNREFUSED" || (err.message ?? "").includes("fetch failed"));
    if (isNetworkError) {
      console.warn("Backend unreachable (is Wasp running?). Returning empty events.");
      return { events: [], totalCount: 0 };
    }
    throw err;
  }
});

export const getEventBySlug = cache(async (
  city: string,
  slug: string,
): Promise<EventDetailItem | null> => {
  const base = WASP_API_BASE_URL.replace(/\/$/, "");
  const url = `${base}${EVENTS_BY_SLUG_ENDPOINT}?city=${encodeURIComponent(city)}&slug=${encodeURIComponent(slug)}`;
  try {
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
  } catch (err) {
    const cause = err instanceof Error ? err.cause : undefined;
    const code = cause && typeof cause === "object" && "code" in cause ? (cause as { code?: string }).code : undefined;
    const isNetworkError =
      err instanceof TypeError && (code === "ECONNREFUSED" || (err.message ?? "").includes("fetch failed"));
    if (isNetworkError) {
      console.warn("Backend unreachable (is Wasp running?). Returning null.");
      return null;
    }
    throw err;
  }
});

export const loadEventPageData = cache(
  async (city: string, slug: string, location: EventLocation) => {
    const [event, result] = await Promise.all([
      getEventBySlug(city, slug),
      getEvents(location, 1, 50),
    ]);
    return { event, events: result.events };
  },
);
