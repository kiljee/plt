export enum EventLocation {
  BELGRADE = "BELGRADE",
  NOVI_SAD = "NOVI_SAD",
}

export const LOCATION_LABELS: Record<EventLocation, string> = {
  [EventLocation.BELGRADE]: "Beograd",
  [EventLocation.NOVI_SAD]: "Novi Sad",
};

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
