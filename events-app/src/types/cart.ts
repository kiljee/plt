import type { EventLocation, WorkshopOption } from "./event";

export interface CartEvent {
  id: string;
  title: string;
  price: number;
  currency: string;
  options?: WorkshopOption[];
  imageUrls: string;
  date: string;
  startTime?: string;
  location: EventLocation;
  slug: string;
  placesLeft?: number;
}

export interface CartItem {
  eventId: string;
  event: CartEvent;
  seats: number;
  optionIds?: string[];
}
