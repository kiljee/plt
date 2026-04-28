"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { EventLocation, LOCATION_LABELS, type EventItem } from "@/types/event";
import { eventToSlug, locationToCitySlug } from "@/lib/slug";
import { isDataImageSrc } from "@/lib/nextImage";
import { COLORS } from "@/lib/colors";
import { useWorkshopNavigationStore } from "@/store/workshopNavigation";
import { CALENDAR_EVENT_PILL } from "./CalendarEventPill.styles";

const parseImageUrls = (json: string): string[] => {
  try {
    const arr = typeof json === "string" ? JSON.parse(json) : json;
    return Array.isArray(arr) ? arr.filter((u): u is string => typeof u === "string") : [];
  } catch {
    return [];
  }
};

const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Crect fill='%23e4e4e7' width='60' height='60'/%3E%3C/svg%3E";

const formatTimeRangeLabel = (startTime: string, endTime: string): string | null => {
  const s = startTime?.trim() ? startTime.slice(0, 5) : "";
  const e = endTime?.trim() ? endTime.slice(0, 5) : "";
  if (s && e) return `${s} – ${e}`;
  if (s) return s;
  return null;
};

interface CalendarEventPillProps {
  event: EventItem;
  backgroundColor: string;
  calendarReturnHref: string;
}

export const CalendarEventPill = memo(({ event, backgroundColor, calendarReturnHref }: CalendarEventPillProps) => {
  const setWorkshopEntry = useWorkshopNavigationStore((s) => s.setWorkshopEntry);
  const images = parseImageUrls(event.imageUrls);
  const src = images.length > 0 ? images[0] : PLACEHOLDER;
  const citySlug = locationToCitySlug(event.location);
  const slug = eventToSlug(event.title, event.date);
  const href = `/${citySlug}/${slug}`;
  const timeLabel = formatTimeRangeLabel(event.startTime, event.endTime);
  const placesLeft = event.placesLeft !== undefined ? event.placesLeft : event.capacity;
  const isFull = placesLeft <= 0;
  const locationTagBg =
    event.location === EventLocation.NOVI_SAD
      ? COLORS.calendar.locationNoviSad
      : COLORS.calendar.locationBelgrade;
  const locationLabel =
    event.location in LOCATION_LABELS
      ? LOCATION_LABELS[event.location as keyof typeof LOCATION_LABELS]
      : event.location;

  return (
    <Link
      href={href}
      className={CALENDAR_EVENT_PILL.link}
      style={{ backgroundColor }}
      scroll={false}
      onClick={() => setWorkshopEntry("calendar", calendarReturnHref)}
    >
      <div className={CALENDAR_EVENT_PILL.imageColumn}>
        <div className={CALENDAR_EVENT_PILL.imageWrap}>
          {(timeLabel || isFull) && (
            <div className={CALENDAR_EVENT_PILL.badgeStack}>
              {timeLabel ? (
                <div className={CALENDAR_EVENT_PILL.overlayBadge}>
                  <span
                    className={CALENDAR_EVENT_PILL.overlayBadgeText}
                    style={{ color: COLORS.text.primary }}
                  >
                    {timeLabel}
                  </span>
                </div>
              ) : null}
              {isFull ? (
                <div className={CALENDAR_EVENT_PILL.overlayBadge}>
                  <span
                    className={CALENDAR_EVENT_PILL.overlayBadgeText}
                    style={{ color: COLORS.text.primary }}
                  >
                    Popunjena
                  </span>
                </div>
              ) : null}
            </div>
          )}
          <Image
            src={src}
            alt={event.title}
            fill
            className="object-cover"
            sizes="72px"
            unoptimized={isDataImageSrc(src)}
          />
        </div>
        <span
          className={CALENDAR_EVENT_PILL.cityTag}
          style={{ backgroundColor: locationTagBg, color: COLORS.text.white }}
        >
          {locationLabel}
        </span>
      </div>
      <div className={CALENDAR_EVENT_PILL.textCol}>
        {timeLabel ? (
          <span
            className={CALENDAR_EVENT_PILL.mobileTime}
            style={{ color: COLORS.text.primary }}
          >
            {timeLabel}
          </span>
        ) : null}
        {isFull ? (
          <span
            className={CALENDAR_EVENT_PILL.mobileFull}
            style={{ color: COLORS.text.primary }}
          >
            Popunjena
          </span>
        ) : null}
        <p className={CALENDAR_EVENT_PILL.textLine} style={{ color: COLORS.calendar.eventText }}>
          {event.title}
        </p>
      </div>
    </Link>
  );
});

CalendarEventPill.displayName = "CalendarEventPill";
