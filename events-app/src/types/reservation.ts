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

export interface BulkReservationErrorResponse {
  error?: string;
  code?: string;
  eventId?: string;
  availableSeats?: number;
  requestedSeats?: number;
}
