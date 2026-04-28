"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
  EventLocation,
  LOCATION_LABELS,
  type EventItem,
} from "@/types/event";
import { eventToSlug, locationToCitySlug } from "@/lib/slug";
import { isDataImageSrc } from "@/lib/nextImage";
import { COLORS } from "@/lib/colors";
import { useWorkshopNavigationStore } from "@/store/workshopNavigation";
import { CALENDAR_AGENDA_ITEM } from "./CalendarAgendaItem.styles";

const parseImageUrls = (json: string): string[] => {
  try {
    const arr = typeof json === "string" ? JSON.parse(json) : json
    return Array.isArray(arr)
      ? arr.filter((u): u is string => typeof u === "string")
      : []
  } catch {
    return []
  }
}

const formatTimeRange = (startTime: string, endTime: string): string | null => {
  const s = startTime?.trim() ? startTime.slice(0, 5) : ""
  const e = endTime?.trim() ? endTime.slice(0, 5) : ""
  if (s && e) return `${s} – ${e}`
  if (s) return s
  return null
}

interface CalendarAgendaItemProps {
  event: EventItem;
  calendarReturnHref: string;
}

export const CalendarAgendaItem = ({
  event,
  calendarReturnHref,
}: CalendarAgendaItemProps) => {
  const setWorkshopEntry = useWorkshopNavigationStore((s) => s.setWorkshopEntry);
  const slug = eventToSlug(event.title, event.date)
  const href = `/${locationToCitySlug(event.location)}/${slug}`
  const timeLabel = formatTimeRange(event.startTime, event.endTime)
  const placesLeft =
    event.placesLeft !== undefined ? event.placesLeft : event.capacity
  const isFull = placesLeft <= 0
  const locationLabel =
    event.location in LOCATION_LABELS
      ? LOCATION_LABELS[event.location as EventLocation]
      : event.location
  const tagBg =
    event.location === EventLocation.NOVI_SAD
      ? COLORS.calendar.locationNoviSad
      : COLORS.calendar.locationBelgrade

  const images = parseImageUrls(event.imageUrls).filter((u) => u.trim().length > 0)
  const imageSrc = images.length > 0 ? images[0] : null

  return (
    <Link
      href={href}
      className={CALENDAR_AGENDA_ITEM.link}
      style={{
        borderColor: COLORS.calendar.border,
        backgroundColor: COLORS.calendar.surface,
      }}
      scroll={false}
      onClick={() => setWorkshopEntry("calendar", calendarReturnHref)}
    >
      {imageSrc ? (
        <div className={CALENDAR_AGENDA_ITEM.thumbWrap}>
          <Image
            src={imageSrc}
            alt=""
            fill
            className={CALENDAR_AGENDA_ITEM.thumbImage}
            sizes="(max-width: 640px) 60px, 80px"
            unoptimized={isDataImageSrc(imageSrc)}
          />
        </div>
      ) : null}
      <span className={CALENDAR_AGENDA_ITEM.body}>
        <span className={CALENDAR_AGENDA_ITEM.topRow}>
          {timeLabel ? (
            <span
              className={CALENDAR_AGENDA_ITEM.timeLabel}
              style={{ color: COLORS.calendar.monthTitle }}
            >
              {timeLabel}
            </span>
          ) : null}
          <span
            className={CALENDAR_AGENDA_ITEM.locationTag}
            style={{ backgroundColor: tagBg, color: COLORS.text.white }}
          >
            {locationLabel}
          </span>
        </span>
        <span className={CALENDAR_AGENDA_ITEM.titleRow}>
          <span
            className={CALENDAR_AGENDA_ITEM.titleText}
            style={{ color: COLORS.calendar.eventText }}
          >
            {event.title}
          </span>
          {isFull ? (
            <span
              className={CALENDAR_AGENDA_ITEM.badgeFull}
              style={{
                backgroundColor: COLORS.calendar.chipPink,
                color: COLORS.text.primary,
              }}
            >
              Popunjena
            </span>
          ) : null}
        </span>
      </span>
      <ChevronRight
        className={CALENDAR_AGENDA_ITEM.chevronIcon}
        strokeWidth={2}
        aria-hidden
      />
    </Link>
  )
}
