import type { ReservationCustomerCancelData } from "./types"
import { COMPANY } from "../reservation-rejection/constants"

export const buildReservationCustomerCancelText = (
  data: ReservationCustomerCancelData,
): string => {
  const customerName = data.customerName || "Korisniče"

  return `Paleto.rs
Za pitanja: ${COMPANY.email}

================================================================================
REZERVACIJA OTKAZANA
================================================================================

Poštovani ${customerName},

Otkazali ste rezervaciju. Mesto je oslobođeno.

Radionica: ${data.eventTitle}
Termin: ${data.eventDateTime}
Broj rezervacije: ${data.orderId}

Ako želite da učestvujete, možete ponovo rezervisati na sajtu.

Za sva pitanja nas možete kontaktirati na ${COMPANY.phone} ili ${COMPANY.email}.

Srdačan pozdrav,
Paleto.rs
`
}
