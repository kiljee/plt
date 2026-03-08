import { STYLES, FONT_FAMILY } from "../styles"
import { formatPrice } from "../utils"
import { BANK_ACCOUNT, PAYMENT_SLIP, getAddressByLocation } from "../constants"
import type { LocationKey } from "../constants"
import type { ReservationItem } from "./ItemList"

interface PaymentSlipProps {
  amount: number
  currency: string
  location: string
  orderId: string
  customerName: string
  customerEmail: string
  customerPhone: string
  items: ReservationItem[]
}

const buildPurposeFromItems = (items: ReservationItem[]): string =>
  items.length === 0
    ? "Uplata za rezervaciju"
    : items.map((i) => `${i.dateTime} – ${i.title}`).join("; ")

const row = (label: string, value: string, styles: typeof STYLES) => `
  <tr>
    <td style="padding: 10px 16px; font-family: ${FONT_FAMILY}; font-size: 12px; color: ${styles.textMuted}; width: 140px; vertical-align: top; border-bottom: 1px solid ${styles.border};">${label}</td>
    <td style="padding: 10px 16px; font-family: ${FONT_FAMILY}; font-size: 13px; color: ${STYLES.text}; vertical-align: top; border-bottom: 1px solid ${STYLES.border};">${value}</td>
  </tr>
`

export const renderPaymentSlip = ({
  amount,
  currency,
  location,
  orderId,
  customerName,
  customerEmail,
  customerPhone,
  items,
}: PaymentSlipProps) => {
  const locationKey: LocationKey =
    location === "BELGRADE" || location === "NOVI_SAD" ? location : "NOVI_SAD"
  const recipientAddress = getAddressByLocation(locationKey)
  const purpose = buildPurposeFromItems(items)

  return `
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
  <tr>
    <td style="padding: 24px;">
      <h2 style="margin: 0 0 16px 0; font-family: ${FONT_FAMILY}; font-size: 16px; font-weight: bold; color: ${STYLES.text};">
        Podaci za uplatu
      </h2>
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border: 1px solid ${STYLES.border};">
        <tr>
          <td colspan="2" style="padding: 12px 16px; background-color: ${STYLES.bgLight}; font-family: ${FONT_FAMILY}; font-size: 13px; font-weight: bold; color: ${STYLES.text};">
            Uplatnica – podaci za uplatu
          </td>
        </tr>
        ${row("Banka", BANK_ACCOUNT.bank, STYLES)}
        ${row("Primaoc", PAYMENT_SLIP.recipientLabel, STYLES)}
        ${row("Adresa primaoca", recipientAddress, STYLES)}
        ${row("Broj računa", BANK_ACCOUNT.accountNumber, STYLES)}
        ${row("Iznos", formatPrice(amount, currency), STYLES)}
        ${row("Model / Poziv na broj", `${BANK_ACCOUNT.model} / ${orderId || "—"}`, STYLES)}
        ${row("Svrha uplate", purpose, STYLES)}
        <tr>
          <td colspan="2" style="padding: 12px 16px; background-color: ${STYLES.bgLight}; font-family: ${FONT_FAMILY}; font-size: 12px; font-weight: bold; color: ${STYLES.text}; border-top: 1px solid ${STYLES.border};">
            Podaci o kupcu
          </td>
        </tr>
        ${row("Ime i prezime", customerName || "—", STYLES)}
        ${row("E-mail", customerEmail, STYLES)}
        ${row("Telefon", customerPhone || "—", STYLES)}
      </table>
    </td>
  </tr>
</table>
`
}
