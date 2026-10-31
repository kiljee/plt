import type { ReservationFollowUpData } from "./types"
import { COMPANY } from "../reservation-rejection/constants"

export const buildReservationFollowUpText = (data: ReservationFollowUpData): string => {
  const customerName = data.customerName || "Korisniče"

  return `Paleto.rs
Za pitanja: ${COMPANY.email}

================================================================================
REZERVACIJA NIJE POTVRĐENA
================================================================================

Poštovani ${customerName},

Prošlo je 24 sata od vaše rezervacije, a ona još uvek nije potvrđena. Izaberite da li vam treba još 24 sata ili odustajete.

Radionica: ${data.eventTitle}
Termin: ${data.eventDateTime}
Broj mesta: ${data.seats}
Broj rezervacije: ${data.orderId}

Treba mi još 24h:
${data.extendUrl}

Odustajem:
${data.cancelUrl}

Svaki link otvara stranicu. Ništa se ne menja dok na njoj ne potvrdite izbor.
Ako ne izaberete ništa, rezervacija ostaje nepotvrđena. Ovo pitanje šaljemo samo jednom.

Za sva pitanja nas možete kontaktirati na ${COMPANY.phone} ili ${COMPANY.email}.

Srdačan pozdrav,
Paleto.rs
`
}
