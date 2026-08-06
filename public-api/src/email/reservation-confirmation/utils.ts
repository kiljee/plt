export { formatReservationCode as formatOrderId } from "../../lib/reservationCode"

export const formatPrice = (amount: number, currency: string): string =>
  amount === 0 ? "Besplatno" : `${amount.toLocaleString("sr-RS")} ${currency}`
