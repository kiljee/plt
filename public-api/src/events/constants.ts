export enum EventStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export const EVENT_PUBLIC_SELECT = {
  id: true,
  title: true,
  description: true,
  location: true,
  date: true,
  startTime: true,
  endTime: true,
  ageCategory: true,
  capacity: true,
  imageUrls: true,
  price: true,
  currency: true,
  createdAt: true,
} as const;

export type EventPublicRow = {
  id: string;
  title: string;
  description: string;
  location: string;
  date: Date;
  startTime: string;
  endTime: string;
  ageCategory: string;
  capacity: number;
  imageUrls: string;
  price: number;
  currency: string;
  createdAt: Date;
};
