export interface BulkReservationItem {
  eventId: string;
  seats: number;
}

export interface BulkReservationRequest {
  items: BulkReservationItem[];
  email: string;
  name?: string;
  phone?: string;
}
