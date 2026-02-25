"use client";

import { useState } from "react";
import type { EventDetailItem } from "@/types/event";
import { eventToSlug } from "@/lib/slug";
import { useCartStore } from "@/store/cart";
import { EventDetailsBlock } from "@/components/EventDetailsBlock/EventDetailsBlock";
import { ImageGallery } from "@/components/ImageGallery/ImageGallery";
import { OrderButton } from "@/components/OrderButton/OrderButton";
import { PolicyInfoBlock } from "@/components/PolicyInfoBlock/PolicyInfoBlock";
import { QuantitySelector } from "@/components/QuantitySelector/QuantitySelector";
import { EVENT_DETAIL_STYLES } from "./EventDetailContent.styles";
import { formatTotalPrice } from "@/lib/price";

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


export const EventDetailContent = ({ event }: EventDetailContentProps) => {
  const addToCart = useCartStore((s) => s.addItem);
  const [quantity, setQuantity] = useState(1);


  const images = parseImageUrls(event.imageUrls);
  const placesLeft = event.placesLeft ?? 0;
  const canOrder = placesLeft > 0 && quantity > 0 && quantity <= placesLeft;

  const handleAddToCart = () => {
    const slug = eventToSlug(event.title, event.date);
    addToCart(
      {
       ...event,
        slug,
      },
      quantity,
    );
  };

 
  return (
    <section className={EVENT_DETAIL_STYLES.section}>
      {/* Decorative element */}
      <div className={EVENT_DETAIL_STYLES.decorativeElement} />

      <div className={`${EVENT_DETAIL_STYLES.container} ${EVENT_DETAIL_STYLES.containerInner}`}>
        {/* Left side - Images */}
        <div className={EVENT_DETAIL_STYLES.imageSection}>
          <ImageGallery images={images} alt={event.title} />
        </div>

        {/* Right side - Details */}
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
            <h2 
              className={`${EVENT_DETAIL_STYLES.price.text} ${EVENT_DETAIL_STYLES.price.font}`}
              style={{ fontFamily: "var(--font-comfortaa), 'Comfortaa', sans-serif" }}
            >
              {formatTotalPrice(event.price, event.currency, quantity)}
            </h2>
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
                onChange={setQuantity}
                label="Količina"
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

      
    </section>
  );
};