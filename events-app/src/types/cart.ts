import type { EventLocation } from "./event";

export interface CartEvent {
  id: string;
  title: string;
  price: number;
  currency: string;
  imageUrls: string;
  date: string;
  startTime?: string;
  location: EventLocation;
  slug: string;
}

export interface CartItem {
  eventId: string;
  event: CartEvent;
  seats: number;
}
