import type { ReservationConfirmationData } from "./template"
import { formatPrice } from "./utils"
import { BANK_ACCOUNT, COMPANY, getAddressByLocation } from "./constants"

export const buildReservationConfirmationText = (data: ReservationConfirmationData): string => {
  const customerName = data.customerName || "Korisniče"
  const variant = data.variant ?? "order_received"
  const isConfirmed = variant === "confirmed"

  const itemsText = data.items
    .map(
      (item) =>
        `- ${item.title}\n  Datum i vreme: ${item.dateTime}\n  Cena: ${formatPrice(item.price, item.currency)}\n  Količina: ${item.quantity} Komad\n  Ukupno: ${formatPrice(item.total, item.currency)}`,
    )
    .join("\n\n")

  const headerTitle = isConfirmed ? "PORUDŽBINA JE POTVRĐENA I POSLATA" : "PORUDŽBINA PRIMLJENA"
  const statusLine = isConfirmed
    ? "Status: Porudžbina primljena → Porudžbina u obradi → Porudžbina je potvrđena i poslata ✓"
    : "Status: Porudžbina primljena → Porudžbina u obradi → Porudžbina je potvrđena i poslata"

  const greetingBlock = isConfirmed
    ? `Poštovani,

Hvala vam što ste uplatili i rezervisali. Vidimo se na radionici!

Ispod su podaci vaše rezervacije (broj porudžbine: ${data.orderId}).`
    : `Poštovani,

Sa zadovoljstvom Vas obaveštavamo da je vaša porudžbina ${data.orderId} primljena.

Ukoliko poručeni artikli nisu dostupni ili ih nema u potrebnoj količini, pozvaćemo Vas na broj telefona koji ste ostavili prilikom poručivanja.

Hvala na kupovini!`

  const cancellationBlock = isConfirmed
    ? `
--------------------------------------------------------------------------------
OTKAZIVANJE
--------------------------------------------------------------------------------

Za otkazivanje ili izmene javite nam se putem Instagrama ili na ${COMPANY.email}.
Otkazivanje je moguće do 48 sati pre početka radionice.

--------------------------------------------------------------------------------
`
    : ""

  const uplatnicaBlock = isConfirmed
    ? ""
    : `
--------------------------------------------------------------------------------
UPLATNICA – PODACI ZA UPLATU
--------------------------------------------------------------------------------

Banka: ${BANK_ACCOUNT.bank}
Primaoc: ${BANK_ACCOUNT.recipient}
PIB: ${BANK_ACCOUNT.pib}
MB: ${BANK_ACCOUNT.mb}
Adresa primaoca: ${getAddressByLocation(data.location)}
Broj računa: ${BANK_ACCOUNT.accountNumber}
Iznos: ${formatPrice(data.total, data.currency)}
Model: ${BANK_ACCOUNT.model}
Poziv na broj: ${data.orderId}
Svrha uplate: ${BANK_ACCOUNT.purpose}

Podaci o kupcu:
Ime i prezime: ${data.customerName || "—"}
E-mail: ${data.customerEmail}
Broj telefona: ${data.customerPhone || "—"}

--------------------------------------------------------------------------------
`

  return `Paleto.rs
Za pitanja: rezervacije@paleto.rs

================================================================================
${headerTitle}
================================================================================

${customerName}, ${isConfirmed ? "hvala vam što ste uplatili i rezervisali!" : "hvala vam na porudžbini! Ispod su detalji vaše porudžbine:"}

${statusLine}

--------------------------------------------------------------------------------
${greetingBlock}

--------------------------------------------------------------------------------
PODACI O PORUDŽBINI
--------------------------------------------------------------------------------

Broj porudžbine: ${data.orderId}
ID rezervacije: ${data.orderId}
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
${cancellationBlock}
${uplatnicaBlock}

Ukoliko ovi podaci nisu ispravni, molimo Vas da nas pozovete na broj telefona ${COMPANY.phone}.
`
}
