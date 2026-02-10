export const formatPrice = (price: number, currency: string): string => {
  if (price <= 0) return "Besplatno"
  return `${price.toLocaleString("sr-RS")} ${currency}`
}

export const calculateTotalPrice = (price: number, quantity: number): number => {
  return price * quantity
}

export const formatTotalPrice = (price: number, currency: string, quantity: number): string => {
  const total = calculateTotalPrice(price, quantity)
  return formatPrice(total, currency)
}