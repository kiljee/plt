export interface BulkReservationItem {
  eventId: string;
  seats: number;
  optionIds?: string[];
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

export interface ReservationFollowUp {
  code: string;
  status: string;
  eventTitle: string;
  eventDateTime: string;
  seats: number;
  locationLabel: string;
  followUpSent: boolean;
  extended: boolean;
  eventPassed: boolean;
  canExtend: boolean;
  canCancel: boolean;
}

export interface ReservationFollowUpError {
  error?: string;
  reason?: string;
}
