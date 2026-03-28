import type { ReservationConfirmationData } from "./template"
import { buildPurposeFromItems } from "./buildPurposeFromItems"
import { formatPrice } from "./utils"
import { BANK_ACCOUNT, COMPANY, getAddressByLocation } from "./constants"

export const buildReservationConfirmationText = (data: ReservationConfirmationData): string => {
  const customerName = data.customerName || "Korisniče"
  const variant = data.variant ?? "order_received"
  const isConfirmed = variant === "confirmed"

  const itemsText = data.items
    .map(
      (item) =>
        `- ${item.title}\n  Datum i vreme: ${item.dateTime}\n  Cena: ${formatPrice(item.price, item.currency)}\n  Količina: ${item.quantity} mesto\n  Ukupno: ${formatPrice(item.total, item.currency)}`,
    )
    .join("\n\n")

  const headerTitle = isConfirmed ? "REZERVACIJA POTVRĐENA" : "REZERVACIJA PRIMLJENA"
  const statusLine = isConfirmed
    ? "Status: Rezervacija primljena → Rezervacija potvrđena ✓"
    : "Status: Rezervacija primljena → Rezervacija potvrđena"

  const greetingBlock = isConfirmed
    ? `Poštovani,

Obaveštavamo Vas da je uplata uspešno evidentirana i da je Vaša rezervacija zvanično potvrđena. 🎨✨

Sve što je potrebno jeste da dođete 5 minuta ranije i prepustite se procesu. Sav materijal Vas čeka kod nas, neograničena pića, kao i opuštena i kreativna atmosfera. 💛

Ukoliko imate bilo kakva pitanja u međuvremenu, slobodno nam pišite.

Radujemo se Vašem dolasku!

Srdačno,
Paleto tim 🎨`
    : `Zdravo!

Sa zadovoljstvom Vas obaveštavamo da je Vaša rezervacija uspešno primljena.
Broj rezervacije: ${data.orderId}

Kako bi Vaše mesto bilo potvrđeno, potrebno je da uplatu izvršite u roku od 48h.

Ukoliko dođe do bilo kakvih izmena ili nedostupnosti, kontaktiraćemo Vas na broj telefona koji ste ostavili prilikom prijave.

U narednom mejlu dobićete sve detalje vezane za potvrdu i dolazak.

Nakon evidentirane uplate, Vaša rezervacija postaje važeća. Ukoliko imate bilo kakva pitanja ili Vam je potreban duži rok za uplatu, slobodno nam se obratite na broj ${COMPANY.phone}.

Hvala Vam na poverenju i radujemo se zajedničkom stvaranju! 💛

Paleto tim 🎨`

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
Svrha uplate: ${buildPurposeFromItems(data.items)}

Podaci o rezervaciji:
Ime i prezime: ${data.customerName || "—"}
E-mail: ${data.customerEmail}
Broj telefona: ${data.customerPhone || "—"}

--------------------------------------------------------------------------------
`

  return `Paleto.rs
Za pitanja: ${COMPANY.email}

================================================================================
${headerTitle}
================================================================================

${customerName}, ${isConfirmed ? "Vaša rezervacija je potvrđena. Radujemo se Vašem dolasku!" : "hvala vam na prijavi! Ispod su detalji vaše rezervacije:"}

${statusLine}

--------------------------------------------------------------------------------
${greetingBlock}

--------------------------------------------------------------------------------
PODACI O REZERVACIJI
--------------------------------------------------------------------------------

Broj rezervacije: ${data.orderId}
Datum prijave: ${data.orderDate}
Adresa: ${getAddressByLocation(data.location)}

--------------------------------------------------------------------------------
REZERVISANE RADIONICE
--------------------------------------------------------------------------------

${itemsText}

--------------------------------------------------------------------------------
UKUPNO ZA UPLATU
--------------------------------------------------------------------------------

Iznos: ${formatPrice(data.total, data.currency)}
${cancellationBlock}
${uplatnicaBlock}

${isConfirmed
  ? `Ovim putem potvrđujemo da je Vaša rezervacija uspešno realizovana.

Na sve rezervacije primenjuju se naši Uslovi korišćenja i Politika privatnosti.`
  : `Ovaj e-mail predstavlja potvrdu prijema Vaše rezervacije, ali ne i njeno konačno prihvatanje. Rezervacija postaje obavezujuća nakon evidentirane uplate.

Ugovorni odnos između Vas i „Paleto PR“ smatra se zaključenim u trenutku potvrde rezervacije od strane Palete.

Vaša rezervacija podleže našim Uslovima korišćenja i Politici privatnosti.`}
`
}
