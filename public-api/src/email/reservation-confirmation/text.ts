import type { ReservationConfirmationData } from "./template"
import { formatPrice } from "./utils"
import { BANK_ACCOUNT, COMPANY, getAddressByLocation } from "./constants"

export const buildReservationConfirmationText = (data: ReservationConfirmationData): string => {
  const customerName = data.customerName || "Korisniče"
  const itemsText = data.items
    .map(
      (item) =>
        `- ${item.title}\n  Datum i vreme: ${item.dateTime}\n  Cena: ${formatPrice(item.price, item.currency)}\n  Količina: ${item.quantity} Komad\n  Ukupno: ${formatPrice(item.total, item.currency)}`,
    )
    .join("\n\n")

  return `paleto
Ovo je generička poruka, molimo Vas da na nju ne odgovarate.

================================================================================
PORUDŽBINA PRIMLJENA
================================================================================

${customerName}, hvala vam na porudžbini! Ispod su detalji vaše porudžbine:

Status: Porudžbina primljena → Porudžbina u obradi → Porudžbina je potvrđena i poslata

--------------------------------------------------------------------------------
Poštovani,

Sa zadovoljstvom Vas obaveštavamo da je vaša porudžbina ${data.orderId} primljena.

Ukoliko poručeni artikli nisu dostupni ili ih nema u potrebnoj količini, pozvaćemo Vas na broj telefona koji ste ostavili prilikom poručivanja.

Hvala na kupovini!

--------------------------------------------------------------------------------
PODACI O PORUDŽBINI
--------------------------------------------------------------------------------

Broj porudžbine: ${data.orderId}
ID rezervacije: ${data.reservationId}
Datum i vreme poručivanja: ${data.orderDate}

--------------------------------------------------------------------------------
REZERVISANI ARTIKLI
--------------------------------------------------------------------------------

${itemsText}

--------------------------------------------------------------------------------
UKUPNA PORUDŽBINA
--------------------------------------------------------------------------------

Ukupno: ${formatPrice(data.total, data.currency)}
Dostava: Besplatna
Ukupno zaduženje: ${formatPrice(data.total, data.currency)}

--------------------------------------------------------------------------------
UPLATNICA – PODACI ZA UPLATU
--------------------------------------------------------------------------------

Primaoc: ${BANK_ACCOUNT.recipient}
Adresa primaoca: ${getAddressByLocation(data.location)}
Broj računa: ${BANK_ACCOUNT.accountNumber}
Iznos: ${formatPrice(data.total, data.currency)}
Poziv na broj (model): ${BANK_ACCOUNT.model}
Svrha uplate: ${BANK_ACCOUNT.purpose}

Podaci o kupcu:
Ime i prezime: ${data.customerName || "—"}
E-mail: ${data.customerEmail}
Broj telefona: ${data.customerPhone || "—"}

--------------------------------------------------------------------------------

Ukoliko ovi podaci nisu ispravni, molimo Vas da nas pozovete na broj telefona ${COMPANY.phone}.
`
}
