import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { EventLocation } from "@/types/event";

dayjs.extend(utc);

export type LocationFilter = EventLocation | undefined;

export const buildCalendarHref = (
  year: number,
  month: number,
  loc: LocationFilter,
): string => {
  const p = new URLSearchParams();
  p.set("year", String(year));
  p.set("month", String(month));
  if (loc) p.set("location", loc);
  return `/kalendar?${p.toString()}`;
};

export const buildCurrentMonthCalendarHref = (loc: LocationFilter): string => {
  const now = dayjs.utc();
  return buildCalendarHref(now.year(), now.month() + 1, loc);
};

export const buildEventsListHref = (loc: LocationFilter): string => {
  if (!loc) return "/";
  return `/?location=${encodeURIComponent(loc)}`;
};
