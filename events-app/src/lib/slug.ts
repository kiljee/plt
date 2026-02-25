import dayjs from "dayjs";

export const slugify = (s: string): string =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

export const eventToSlug = (title: string, date: string): string => {
  const d = dayjs(date);
  const formatted = d.format("DD-MM-YYYY");
  const base = slugify(title);
  return `${base}-${formatted}`;
};

import { EventLocation } from "@/types/event";

export const LOCATION_TO_SLUG: Record<EventLocation, string> = {
  [EventLocation.BELGRADE]: "beograd",
  [EventLocation.NOVI_SAD]: "novi-sad",
};

export const CITY_SLUGS = ["beograd", "novi-sad"] as const;
export type CitySlug = (typeof CITY_SLUGS)[number];

export const locationToCitySlug = (location: EventLocation): CitySlug =>
  LOCATION_TO_SLUG[location] as CitySlug;

export const citySlugToLocation = (city: string): EventLocation | null => {
  if (city === LOCATION_TO_SLUG[EventLocation.NOVI_SAD]) return EventLocation.NOVI_SAD;
  if (city === LOCATION_TO_SLUG[EventLocation.BELGRADE]) return EventLocation.BELGRADE;
  return null;
};
