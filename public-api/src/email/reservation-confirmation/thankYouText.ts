import type { ReservationThankYouData } from "./thankYouTemplate"

export const buildReservationThankYouText = (
  data: ReservationThankYouData
): string => {
  const name = data.customerName || "Poštovani"
  return `Paleto.rs
Za pitanja: info@paleto.rsleto.rs

================================================================================
REZERVACIJA PRIMLJENA
================================================================================

${name},

Uskoro će vam stići podaci za uplatu.

Hvala na poverenju!
`
}
