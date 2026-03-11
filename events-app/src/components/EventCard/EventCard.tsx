"use client";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Link from "next/link";
import Image from "next/image";
import type { EventItem } from "@/types/event";
import { LOCATION_LABELS } from "@/types/event";
import { eventToSlug, locationToCitySlug } from "@/lib/slug";
import { formatPrice } from "@/lib/price";
import { COLORS } from "@/lib/colors";
import { EVENT_CARD_STYLES, EVENT_CARD_CSS } from "./EventCard.styles";

interface EventCardProps {
  event: EventItem;
  soldOut?: boolean;
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

const formatEventDate = (date: string) =>
  dayjs.utc(date).isValid() ? dayjs.utc(date).format("DD.MM.YYYY") : "—";

export const EventCard = ({ event, soldOut = false }: EventCardProps) => {
  const images = parseImageUrls(event.imageUrls);
  const mainImage = images.length > 0 ? images[0] : PLACEHOLDER;
  const eventSlug = eventToSlug(event.title, event.date);
  const citySlug = locationToCitySlug(event.location);
  const eventUrl = `/${citySlug}/${eventSlug}`;
  const formattedDate = formatEventDate(event.date);


  return (
    <article 
      className={EVENT_CARD_STYLES.card.container}
      style={{ backgroundColor: EVENT_CARD_CSS.colors.background }}
    >
      <div className={EVENT_CARD_STYLES.card.wrapper}>
        {/* Image */}
        <div className={`relative w-full overflow-hidden ${EVENT_CARD_STYLES.image.container}`}>
          <Image
            src={mainImage}
            alt={event.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            unoptimized={mainImage.startsWith("http") || mainImage.startsWith("data:")}
          />
        </div>

        {/* Content */}
        <div 
          className={EVENT_CARD_STYLES.content.container}
          style={{ borderColor: EVENT_CARD_CSS.colors.primaryBorder }}
        >
          <div className={EVENT_CARD_STYLES.content.inner}>
            {/* Title */}
            <h3 
              className={`
                ${EVENT_CARD_STYLES.title.base} 
                ${EVENT_CARD_STYLES.title.text}
                ${soldOut ? EVENT_CARD_STYLES.title.soldOut : EVENT_CARD_STYLES.title.available}
              `}
              style={{ 
                fontFamily: "var(--font-comfortaa), 'Comfortaa', sans-serif",
                color: EVENT_CARD_CSS.colors.textPrimary
              }}
            >
               {formattedDate} - {event.title}
            </h3>

            {/* Price · Grad */}
            <div className={EVENT_CARD_STYLES.priceContainer}>
              <span 
                className={EVENT_CARD_STYLES.price}
                style={{ 
                  fontFamily: "var(--font-geist-sans), 'Neue Haas Unica', sans-serif",
                  color: EVENT_CARD_CSS.colors.textPrimary
                }}
              >
                {formatPrice(event.price, event.currency)}
                <span
                  className={EVENT_CARD_STYLES.priceCity}
                  style={{ color: COLORS.text.label }}
                >
                  {" · "}
                  {event.location in LOCATION_LABELS
                    ? LOCATION_LABELS[event.location as keyof typeof LOCATION_LABELS]
                    : event.location}
                </span>
              </span>
            </div>
          </div>

          {/* Button - always clickable to see details */}
          {soldOut ? (
            <Link
              href={eventUrl}
              className={`${EVENT_CARD_STYLES.button.base} ${EVENT_CARD_STYLES.button.soldOut} block`}
              style={{ borderColor: EVENT_CARD_CSS.colors.primaryBorder }}
            >
              <span
                className={`${EVENT_CARD_STYLES.buttonText.base} ${EVENT_CARD_STYLES.buttonText.soldOut}`}
                style={{
                  fontFamily: "var(--font-geist-sans), 'Neue Haas Unica', sans-serif",
                  color: EVENT_CARD_CSS.colors.primary,
                }}
              >
                Sold out
              </span>
            </Link>
          ) : (
            <Link
              href={eventUrl}
              className={`${EVENT_CARD_STYLES.button.base} ${EVENT_CARD_STYLES.button.available} block`}
              style={{
                backgroundColor: EVENT_CARD_CSS.colors.primary,
                borderColor: EVENT_CARD_CSS.colors.primaryBorder,
              }}
            >
              <span
                className={`${EVENT_CARD_STYLES.buttonText.base} ${EVENT_CARD_STYLES.buttonText.available}`}
                style={{
                  fontFamily: "var(--font-geist-sans), 'Neue Haas Unica', sans-serif",
                  color: EVENT_CARD_CSS.colors.textWhite,
                }}
              >
                Book Now
              </span>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};