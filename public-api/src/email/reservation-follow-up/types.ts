export interface ReservationFollowUpData {
  orderId: string
  customerName: string
  eventTitle: string
  eventDateTime: string
  seats: number
  extendUrl: string
  cancelUrl: string
}

export interface ReservationCustomerCancelData {
  orderId: string
  customerName: string
  eventTitle: string
  eventDateTime: string
}
