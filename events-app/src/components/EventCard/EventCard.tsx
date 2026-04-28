"use client";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { CalendarDays, MapPin, Palette } from "lucide-react";
import type { EventItem } from "@/types/event";
import { LOCATION_LABELS } from "@/types/event";
import { eventToSlug, locationToCitySlug } from "@/lib/slug";
import { formatPrice } from "@/lib/price";
import { isDataImageSrc } from "@/lib/nextImage";
import { COLORS } from "@/lib/colors";
import {
  captureEventsListingReturnHref,
  useWorkshopNavigationStore,
} from "@/store/workshopNavigation";
import { EVENT_CARD_STYLES, EVENT_CARD_CSS } from "./EventCard.styles";

interface EventCardProps {
  event: EventItem;
  soldOut?: boolean;
  headingLevel?: 2 | 3;
  suppressWorkshopOrigin?: boolean;
}

const parseImageUrls = (json: string): string[] => {
  try {
    const arr = typeof json === "string" ? JSON.parse(json) : json;
    return Array.isArray(arr) ? arr.filter((u): u is string => typeof u === "string") : [];
  } catch {
    return [];
  }
};

const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='289' height='357' viewBox='0 0 289 357'%3E%3Crect fill='%23e4e4e7' width='289' height='357'/%3E%3Ctext fill='%2371717a' x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='16'%3ESlika događaja%3C/text%3E%3C/svg%3E";

dayjs.extend(utc);

const formatBadgeDate = (date: string) => {
  const d = dayjs.utc(date);
  if (!d.isValid()) return "—";
  return d.format("DD.MM.");
};

const formatDateTimeLine = (date: string, startTime: string) => {
  const d = dayjs.utc(date);
  if (!d.isValid()) return "—";
  const dateStr = d.format("DD.MM.YYYY.");
  const timeStr = startTime ? startTime.slice(0, 5) + "h" : "";
  return timeStr ? `${dateStr} | ${timeStr}` : dateStr;
};

export const EventCard = ({
  event,
  soldOut = false,
  headingLevel = 2,
  suppressWorkshopOrigin = false,
}: EventCardProps) => {
  const setWorkshopEntry = useWorkshopNavigationStore((s) => s.setWorkshopEntry);
  const images = parseImageUrls(event.imageUrls);
  const mainImage = images.length > 0 ? images[0] : PLACEHOLDER;
  const eventSlug = eventToSlug(event.title, event.date);
  const citySlug = locationToCitySlug(event.location);
  const eventUrl = `/${citySlug}/${eventSlug}`;
  const router = useRouter();

  const markEventsOrigin = () => {
    if (suppressWorkshopOrigin) return;
    setWorkshopEntry("events", captureEventsListingReturnHref());
  };
  const badgeDate = formatBadgeDate(event.date);
  const dateTimeLine = formatDateTimeLine(event.date, event.startTime);
  const locationLabel =
    event.location in LOCATION_LABELS
      ? LOCATION_LABELS[event.location as keyof typeof LOCATION_LABELS]
      : event.location;

  return (
    <article 
      className={EVENT_CARD_STYLES.card.container}
      style={{ backgroundColor: EVENT_CARD_CSS.colors.background }}
    >
      <div
        className={EVENT_CARD_STYLES.card.wrapper}
        onClick={() => {
          markEventsOrigin()
          router.push(eventUrl, { scroll: true })
        }}
      >
        <div className={`relative w-full overflow-hidden ${EVENT_CARD_STYLES.image.container}`}>
          <div className={EVENT_CARD_STYLES.dateBadge.wrapper}>
            <span
              className={EVENT_CARD_STYLES.dateBadge.text}
              style={{ color: EVENT_CARD_CSS.colors.textPrimary }}
            >
              {badgeDate}
            </span>
          </div>
          <Image
            src={mainImage}
            alt={event.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
            unoptimized={isDataImageSrc(mainImage)}
          />
        </div>

        <div 
          className={EVENT_CARD_STYLES.content.container}
          style={{ borderColor: EVENT_CARD_CSS.colors.primaryBorder }}
        >
          <div className={EVENT_CARD_STYLES.content.inner}>
            {headingLevel === 2 ? (
              <h2
                className={`
                  ${EVENT_CARD_STYLES.title.base}
                  ${EVENT_CARD_STYLES.title.text}
                  ${soldOut ? EVENT_CARD_STYLES.title.soldOut : EVENT_CARD_STYLES.title.available}
                `}
                style={{
                  fontFamily: "var(--font-comfortaa), 'Comfortaa', sans-serif",
                  color: EVENT_CARD_CSS.colors.textPrimary,
                }}
              >
                {event.title}
              </h2>
            ) : (
              <h3
                className={`
                  ${EVENT_CARD_STYLES.title.base}
                  ${EVENT_CARD_STYLES.title.text}
                  ${soldOut ? EVENT_CARD_STYLES.title.soldOut : EVENT_CARD_STYLES.title.available}
                `}
                style={{
                  fontFamily: "var(--font-comfortaa), 'Comfortaa', sans-serif",
                  color: EVENT_CARD_CSS.colors.textPrimary,
                }}
              >
                {event.title}
              </h3>
            )}

            <div className={EVENT_CARD_STYLES.infoRow} style={{ color: COLORS.text.secondary }}>
              <CalendarDays className={EVENT_CARD_STYLES.infoIcon} style={{ color: COLORS.primary }} />
              <span>{dateTimeLine}</span>
            </div>

            <div className={EVENT_CARD_STYLES.infoRow} style={{ color: COLORS.text.secondary }}>
              <MapPin className={EVENT_CARD_STYLES.infoIcon} style={{ color: COLORS.primary }} />
              <span>{locationLabel}</span>
            </div>

            <div className={EVENT_CARD_STYLES.infoRow} style={{ color: COLORS.text.secondary }}>
              <Palette className={EVENT_CARD_STYLES.infoIcon} style={{ color: COLORS.primary }} />
              <span>{formatPrice(event.price, event.currency)}</span>
            </div>
          </div>

          {soldOut ? (
            <Link href={eventUrl} className="block" onClick={markEventsOrigin}>
              <motion.span
                className={`${EVENT_CARD_STYLES.button.base} ${EVENT_CARD_STYLES.button.soldOut} block cursor-pointer`}
                style={{ borderColor: EVENT_CARD_CSS.colors.primaryBorder }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span
                  className={`${EVENT_CARD_STYLES.buttonText.base} ${EVENT_CARD_STYLES.buttonText.soldOut}`}
                  style={{
                    fontFamily: "var(--font-geist-sans), 'Neue Haas Unica', sans-serif",
                    color: EVENT_CARD_CSS.colors.primary,
                  }}
                >
                  Rasprodato
                </span>
              </motion.span>
            </Link>
          ) : (
            <Link href={eventUrl} className="block" onClick={markEventsOrigin}>
              <motion.span
                className={`${EVENT_CARD_STYLES.button.base} ${EVENT_CARD_STYLES.button.available} block cursor-pointer`}
                style={{
                  backgroundColor: EVENT_CARD_CSS.colors.primary,
                  borderColor: EVENT_CARD_CSS.colors.primaryBorder,
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span
                  className={`${EVENT_CARD_STYLES.buttonText.base} ${EVENT_CARD_STYLES.buttonText.available}`}
                  style={{
                    fontFamily: "var(--font-geist-sans), 'Neue Haas Unica', sans-serif",
                    color: EVENT_CARD_CSS.colors.textWhite,
                  }}
                >
                  REZERVIŠITE
                </span>
              </motion.span>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};
