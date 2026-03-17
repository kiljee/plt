import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const SERBIAN_TO_LATIN: Record<string, string> = {
  ć: "c",
  Ć: "c",
  č: "c",
  Č: "c",
  š: "s",
  Š: "s",
  ž: "z",
  Ž: "z",
  đ: "d",
  Đ: "d",
};

const toPlainLatin = (s: string): string =>
  Array.from(s, (c) => SERBIAN_TO_LATIN[c] ?? c).join("");

export const slugify = (s: string): string =>
  toPlainLatin(s)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

export const eventToSlug = (title: string, date: string): string => {
  const d = dayjs.utc(date);
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
