"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { EventDetailItem } from "@/types/event";
import { eventToSlug } from "@/lib/slug";
import { useCartStore } from "@/store/cart";
import {
  useWorkshopNavigationStore,
  workshopBackLabel,
} from "@/store/workshopNavigation";
import { EventDetailsBlock } from "@/components/EventDetailsBlock/EventDetailsBlock";
import { ImageGallery } from "@/components/ImageGallery/ImageGallery";
import { OrderButton } from "@/components/OrderButton/OrderButton";
import { PolicyInfoBlock } from "@/components/PolicyInfoBlock/PolicyInfoBlock";
import { QuantitySelector } from "@/components/QuantitySelector/QuantitySelector";
import { EVENT_DETAIL_STYLES } from "./EventDetailContent.styles";
import { formatPrice } from "@/lib/price";
import { alignOptionIds, selectedOptionsTotal } from "@/lib/workshopOptions";
import { SeatOptionCards } from "@/components/SeatOptionCards/SeatOptionCards";

interface EventDetailContentProps {
  event: EventDetailItem;
}

const parseImageUrls = (json: string): string[] => {
  try {
    const arr = typeof json === "string" ? JSON.parse(json) : json;
    return Array.isArray(arr) ? arr.filter((u): u is string => typeof u === "string") : [];
  } catch {
    return [];
  }
};


const ADDED_DURATION_MS = 1600;

export const EventDetailContent = ({ event }: EventDetailContentProps) => {
  const addToCart = useCartStore((s) => s.addItem);
  const origin = useWorkshopNavigationStore((s) => s.origin);
  const returnHref = useWorkshopNavigationStore((s) => s.returnHref);
  const clearWorkshopEntry = useWorkshopNavigationStore((s) => s.clearWorkshopEntry);
  const hasOptions = event.options.length > 0;
  const [quantity, setQuantity] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>(() =>
    event.options[0]?.id ? [event.options[0].id] : [],
  );
  const [showAddedSuccess, setShowAddedSuccess] = useState(false);
  const [showCappedEffect, setShowCappedEffect] = useState(false);

  const images = parseImageUrls(event.imageUrls);
  const placesLeft = event.placesLeft ?? 0;
  const canOrder = placesLeft > 0 && quantity > 0 && quantity <= placesLeft;
  const totalPrice = selectedOptionsTotal(
    event.price,
    quantity,
    event.options,
    selectedIds,
  );

  const handleQuantityChange = (next: number) => {
    setQuantity(next);
    if (event.options.length === 0) return;
    const defaultOptionId = event.options[0]?.id ?? "";
    setSelectedIds((current) => alignOptionIds(current, next, defaultOptionId));
  };

  const handleSelectOption = (index: number, optionId: string) => {
    setSelectedIds((current) =>
      current.map((id, currentIndex) => (currentIndex === index ? optionId : id)),
    );
  };

  const handleAddToCart = useCallback(() => {
    const slug = eventToSlug(event.title, event.date);
    const result = addToCart(
      {
        ...event,
        slug,
      },
      quantity,
      event.options.length > 0 ? selectedIds : undefined,
    );
    if (result.capped) {
      setShowCappedEffect(true);
      setTimeout(() => setShowCappedEffect(false), 600);
      return;
    }
    setShowAddedSuccess(true);
    setTimeout(() => setShowAddedSuccess(false), ADDED_DURATION_MS);
  }, [event, quantity, addToCart, selectedIds]);

  return (
    <section className={EVENT_DETAIL_STYLES.section}>
      <div className={EVENT_DETAIL_STYLES.decorativeElement} />

      <div className={EVENT_DETAIL_STYLES.pageWrap}>
        <div className={EVENT_DETAIL_STYLES.pageWrapInner}>
          {origin !== null && returnHref !== null ? (
            <div className={EVENT_DETAIL_STYLES.backRow}>
              <Link
                href={returnHref}
                className={EVENT_DETAIL_STYLES.backLink}
                scroll={false}
                onClick={() => clearWorkshopEntry()}
              >
                <ArrowLeft
                  className={EVENT_DETAIL_STYLES.backLinkIcon}
                  strokeWidth={2}
                  aria-hidden
                />
                {workshopBackLabel(origin)}
              </Link>
            </div>
          ) : null}

          <div className={EVENT_DETAIL_STYLES.columns}>
          <div className={EVENT_DETAIL_STYLES.imageSection}>
            <ImageGallery images={images} alt={event.title} />
          </div>

          <div className={EVENT_DETAIL_STYLES.contentSection}>
          {/* Title */}
          <div className={EVENT_DETAIL_STYLES.title.wrapper}>
            <h1 
              className={`${EVENT_DETAIL_STYLES.title.text} ${EVENT_DETAIL_STYLES.title.font}`}
              style={{ fontFamily: "var(--font-geist-sans), 'Inter', sans-serif" }}
            >
              {event.title}
            </h1>
          </div>

          {/* Price */}
          <div className={EVENT_DETAIL_STYLES.price.wrapper}>
            <p
              className={`${EVENT_DETAIL_STYLES.price.text} ${EVENT_DETAIL_STYLES.price.font}`}
              style={{ fontFamily: "var(--font-comfortaa), 'Comfortaa', sans-serif" }}
            >
              {formatPrice(totalPrice, event.currency)}
            </p>
          </div>

          {/* Description */}
          {event.description && (
            <div className={EVENT_DETAIL_STYLES.description.wrapper}>
              <p className={EVENT_DETAIL_STYLES.description.text}>
                {event.description}
              </p>
            </div>
          )}

          {/* Quantity - hide when sold out */}
          {placesLeft > 0 && (
            <div className={EVENT_DETAIL_STYLES.quantitySection}>
              <QuantitySelector
                value={quantity}
                min={1}
                max={placesLeft}
                onChange={handleQuantityChange}
                label="Količina"
              />
            </div>
          )}

          {hasOptions && placesLeft > 0 && (
            <div className={EVENT_DETAIL_STYLES.quantitySection}>
              <SeatOptionCards
                groupKey={event.id}
                options={event.options}
                selectedIds={selectedIds}
                currency={event.currency}
                onSelect={handleSelectOption}
              />
            </div>
          )}

          {/* Places left */}
          {placesLeft > 0 ? (
            <div className={EVENT_DETAIL_STYLES.placesLeft.wrapper}>
              <p
                className={EVENT_DETAIL_STYLES.placesLeft.text}
                style={{ fontFamily: "var(--font-comfortaa), 'Comfortaa', sans-serif" }}
              >
                Ostalo još {placesLeft} karata
              </p>
            </div>
          ) : (
            <div className={EVENT_DETAIL_STYLES.placesLeft.wrapper}>
              <p
                className={EVENT_DETAIL_STYLES.placesLeft.text}
                style={{ fontFamily: "var(--font-comfortaa), 'Comfortaa', sans-serif" }}
              >
                Rasprodato
              </p>
            </div>
          )}


          {/* Order Buttons */}
          <div className={`${EVENT_DETAIL_STYLES.orderSection} flex flex-col sm:flex-row gap-3`}>
            <OrderButton
              onClick={handleAddToCart}
              disabled={!canOrder}
              loading={false}
              soldOut={placesLeft <= 0}
              label="Dodaj u korpu"
              success={showAddedSuccess}
              capped={showCappedEffect}
            />
          </div>

          {/* Event Details */}
          <div className={EVENT_DETAIL_STYLES.detailsSection}>
            <EventDetailsBlock
              date={event.date}
              startTime={event.startTime}
              endTime={event.endTime}
              ageCategory={event.ageCategory}
              location={event.location}
            />
          </div>

          {/* Policy Info */}
          <div className={EVENT_DETAIL_STYLES.policySection}>
            <PolicyInfoBlock />
          </div>
        </div>
          </div>
        </div>
      </div>
    </section>
  );
};