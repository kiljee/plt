export const formatPrice = (amount: number, currency: string): string =>
  amount === 0 ? "Besplatno" : `${amount.toLocaleString("sr-RS")} ${currency}`

export const formatOrderId = (reservationId: string): string =>
  reservationId.replace(/-/g, "").slice(0, 8).toUpperCase()
