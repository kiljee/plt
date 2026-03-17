"use client";

import { useState, useEffect } from "react";
import { eventToSlug, locationToCitySlug } from "@/lib/slug";
import { EventLocation } from "@/types/event";

const API_BASE =
  typeof process !== "undefined"
    ? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001"
    : "";
const MAX_LINKS = 4;

interface WorkshopLink {
  href: string;
  label: string;
}

const fetchEvents = async (
  location: string,
): Promise<{ title: string; date: string; location: string }[]> => {
  const url = `${API_BASE}/api/events?location=${location}&page=1&pageSize=${MAX_LINKS}`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) return [];
  const data = (await res.json()) as { events?: { title?: string; date?: string; location?: string }[] };
  return Array.isArray(data.events) ? data.events : [];
};

export const useWorkshopLinks = (): WorkshopLink[] => {
  const [links, setLinks] = useState<WorkshopLink[]>([]);

  useEffect(() => {
    if (!API_BASE) {
      setLinks([]);
      return;
    }
    let cancelled = false;
    const run = async () => {
      try {
        const [bg, ns] = await Promise.all([
          fetchEvents(EventLocation.BELGRADE),
          fetchEvents(EventLocation.NOVI_SAD),
        ]);
        if (cancelled) return;
        const merged = [...bg, ...ns].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );
        const slice = merged.slice(0, MAX_LINKS);
        const loc =
          (l: string): EventLocation =>
          l === EventLocation.NOVI_SAD ? EventLocation.NOVI_SAD : EventLocation.BELGRADE;
        setLinks(
          slice.map((e) => ({
            href: `/${locationToCitySlug(loc(e.location))}/${eventToSlug(e.title, e.date)}`,
            label: e.title ?? "",
          })),
        );
      } catch {
        if (!cancelled) setLinks([]);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return links;
};
