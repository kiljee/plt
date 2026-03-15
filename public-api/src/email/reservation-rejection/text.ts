import type { ReservationRejectionData } from "./types"
import { COMPANY, EVENTS_SITE_URL, cityToPath } from "./constants"

export const buildReservationRejectionText = (data: ReservationRejectionData): string => {
  const customerName = data.customerName || "Korisniče"
  const eventUrl = `${EVENTS_SITE_URL}/${cityToPath(data.location)}/${data.eventSlug}`

  return `Paleto.rs
Za pitanja: ${COMPANY.email}

================================================================================
REZERVACIJA ODBIJENA
================================================================================

Poštovani ${customerName},

Obaveštavamo Vas da je vaša rezervacija za radionicu odbijena.

--------------------------------------------------------------------------------
ODBIJENA REZERVACIJA
--------------------------------------------------------------------------------

Radionica: ${data.eventTitle}
Broj porudžbine: ${data.orderId}

--------------------------------------------------------------------------------
PONOVNA REZERVACIJA
--------------------------------------------------------------------------------

Ako i dalje želite da učestvujete, možete ponovo rezervisati mesto na našem sajtu — ako ima slobodnih mesta za ovu radionicu.

Link za pregled radionice i rezervaciju:
${eventUrl}

Za sva pitanja nas možete kontaktirati na ${COMPANY.phone} ili ${COMPANY.email}.

Srdačan pozdrav,
Paleto.rs
`
}
