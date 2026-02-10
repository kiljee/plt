export type EventLocation = "BELGRADE" | "NOVI_SAD";

export interface EventItem {
  id: string;
  title: string;
  description: string;
  location: EventLocation;
  date: string;
  startTime: string;
  endTime: string;
  ageCategory: string;
  capacity: number;
  imageUrls: string;
  price: number;
  currency: string;
  createdAt: string;
  placesLeft?: number;
}

export interface EventDetailItem extends EventItem {
  placesLeft: number;
}
