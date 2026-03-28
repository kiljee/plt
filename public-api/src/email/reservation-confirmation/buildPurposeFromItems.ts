import type { ReservationItem } from "./components/ItemList"

export const buildPurposeFromItems = (items: ReservationItem[]): string => {
  if (items.length === 0) {
    return "Uplata za rezervaciju"
  }

  return items
    .map((item) => `${item.dateTime} – ${item.title}`)
    .join("; ")
}
