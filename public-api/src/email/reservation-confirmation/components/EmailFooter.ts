import { STYLES, FONT_FAMILY } from "../styles"

const SITE_URL = "https://paleto.rs"

export type FooterVariant = "order_received" | "confirmed"

export const renderEmailFooter = (variant: FooterVariant = "order_received") => {
  const isConfirmed = variant === "confirmed"
  const content = isConfirmed
    ? `Ovim putem potvrđujemo da je Vaša rezervacija uspešno realizovana.<br><br>Na sve rezervacije primenjuju se naši <a href="${SITE_URL}/uslovi-koriscenja" style="color: ${STYLES.primary};">Uslovi korišćenja</a> i <a href="${SITE_URL}/politika-privatnosti" style="color: ${STYLES.primary};">Politika privatnosti</a>.`
    : `Ovaj e-mail predstavlja potvrdu prijema Vaše rezervacije, ali ne i njeno konačno prihvatanje. Rezervacija postaje obavezujuća nakon evidentirane uplate.<br><br>Ugovorni odnos između Vas i „Paleto PR“ smatra se zaključenim u trenutku potvrde rezervacije od strane Palete.<br><br>Vaša rezervacija podleže našim <a href="${SITE_URL}/uslovi-koriscenja" style="color: ${STYLES.primary};">Uslovima korišćenja</a> i <a href="${SITE_URL}/politika-privatnosti" style="color: ${STYLES.primary};">Politici privatnosti</a>.`

  return `
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
  <tr>
    <td style="padding: 24px; border-top: 1px solid ${STYLES.border};">
      <p style="margin: 0; font-family: ${FONT_FAMILY}; font-size: 12px; color: ${STYLES.textMuted}; line-height: 1.6;">
        ${content}
      </p>
    </td>
  </tr>
</table>
`
}
