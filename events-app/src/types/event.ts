export type EventLocation = "BELGRADE" | "NOVI_SAD";

export interface EventItem {
  id: string;
  title: string;
  location: EventLocation;
  createdAt: string;
}
