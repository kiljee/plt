"use client";

import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import type { CartItem as CartItemType } from "@/types/cart";
import { LOCATION_LABELS } from "@/types/event";
import { COLORS } from "@/lib/colors";
import { formatPrice } from "@/lib/price";
import { locationToCitySlug } from "@/lib/slug";
import { useCartStore } from "@/store/cart";
import { QuantitySelector } from "@/components/QuantitySelector/QuantitySelector";
import { CART_ITEM_STYLES } from "./CartItem.styles";

const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect fill='%23e4e4e7' width='100' height='100'/%3E%3Ctext fill='%2371717a' x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='10'%3ESlika%3C/text%3E%3C/svg%3E";

const parseImageUrls = (json: string): string[] => {
  try {
    const arr = typeof json === "string" ? JSON.parse(json) : json;
    return Array.isArray(arr)
      ? arr.filter((u): u is string => typeof u === "string")
      : [];
  } catch {
    return [];
  }
};

interface CartItemProps {
  item: CartItemType;
  maxSeats?: number;
  onRemove: () => void;
}

export const CartItem = ({
  item,
  maxSeats = 99,
  onRemove,
}: CartItemProps) => {
  const updateSeats = useCartStore((s) => s.updateSeats);
  const images = parseImageUrls(item.event.imageUrls);
  const mainImage = images.length > 0 ? images[0] : PLACEHOLDER;
  const citySlug = locationToCitySlug(item.event.location);
  const eventUrl = `/${citySlug}/${item.event.slug}`;
  const formattedDate = dayjs(item.event.date).isValid()
    ? dayjs(item.event.date).format("DD.MM.YYYY.")
    : "—";
  const timeStr = item.event.startTime ? `${item.event.startTime}` : "";

  return (
    <div className={CART_ITEM_STYLES.root}>
      <Link href={eventUrl} className={CART_ITEM_STYLES.imageWrapper}>
        <Image
          src={mainImage}
          alt={item.event.title}
          width={100}
          height={100}
          sizes="100px"
          className={CART_ITEM_STYLES.image}
          unoptimized={
            mainImage.startsWith("http") || mainImage.startsWith("data:")
          }
        />
      </Link>
      <div className={CART_ITEM_STYLES.content}>
        <div className={CART_ITEM_STYLES.titleRow}>
          <span className={CART_ITEM_STYLES.title}>{item.event.title}</span>
          <span className={CART_ITEM_STYLES.price}>
            {formatPrice(item.event.price * item.seats, item.event.currency)}
            {item.event.location in LOCATION_LABELS && (
              <>
                {" · "}
                <span
                  className={CART_ITEM_STYLES.cityLabel}
                  style={{ color: COLORS.text.label }}
                >
                  {LOCATION_LABELS[item.event.location as keyof typeof LOCATION_LABELS]}
                </span>
              </>
            )}
          </span>
        </div>
        <div className={CART_ITEM_STYLES.meta}>
          {formattedDate}
          {timeStr ? ` · ${timeStr}` : ""}
        </div>
        <div className="mt-2">
          <QuantitySelector
            value={item.seats}
            min={1}
            max={maxSeats}
            onChange={(v) => updateSeats(item.eventId, v)}
            showLabel={false}
          />
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onRemove();
          }}
          className={CART_ITEM_STYLES.removeButton}
        >
          Ukloni
        </button>
      </div>
    </div>
  );
};
