import { STYLES, FONT_FAMILY } from "./styles"
import { COMPANY } from "../reservation-rejection/constants"
import { renderEmailLogo } from "../shared/logo"
import { escapeHtml } from "./escapeHtml"
import type { ReservationFollowUpData } from "./types"

const renderHeader = () => `
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
  <tr>
    <td style="background-color: ${STYLES.primary}; height: 4px;"></td>
  </tr>
  <tr>
    <td style="padding: 20px 24px; background-color: ${STYLES.white};">
      ${renderEmailLogo()}
    </td>
  </tr>
</table>
`

const renderBanner = () => `
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
  <tr>
    <td style="padding: 24px 24px 20px 24px; background-color: ${STYLES.banner};">
      <p style="margin: 0; font-family: ${FONT_FAMILY}; font-size: 18px; font-weight: bold; color: ${STYLES.bannerText};">
        REZERVACIJA NIJE POTVRĐENA
      </p>
    </td>
  </tr>
</table>
`

const renderButton = (href: string, label: string, filled: boolean) => `
<table cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin: 0 12px 12px 0;">
  <tr>
    <td style="background-color: ${filled ? STYLES.primary : STYLES.white}; border: 1px solid ${filled ? STYLES.primary : STYLES.border}; border-radius: 4px;">
      <a href="${escapeHtml(href)}" style="display: inline-block; padding: 12px 18px; font-family: ${FONT_FAMILY}; font-size: 14px; font-weight: bold; color: ${filled ? STYLES.white : STYLES.text}; text-decoration: none;">
        ${escapeHtml(label)}
      </a>
    </td>
  </tr>
</table>
`

const renderBody = (data: ReservationFollowUpData) => `
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
  <tr>
    <td style="padding: 0 24px 24px 24px;">
      <p style="margin: 0 0 16px 0; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${STYLES.text}; line-height: 1.6;">
        Poštovani <strong>${escapeHtml(data.customerName || "Korisniče")}</strong>,
      </p>
      <p style="margin: 0 0 20px 0; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${STYLES.text}; line-height: 1.6;">
        Prošlo je 24 sata od vaše rezervacije, a ona još uvek nije potvrđena. Izaberite da li vam treba još 24 sata ili odustajete.
      </p>

      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-bottom: 20px; border: 1px solid ${STYLES.border};">
        <tr>
          <td style="padding: 12px 16px; background-color: ${STYLES.bgLight}; font-family: ${FONT_FAMILY}; font-size: 12px; font-weight: bold; color: ${STYLES.textMuted}; text-transform: uppercase;">
            Rezervacija
          </td>
        </tr>
        <tr>
          <td style="padding: 16px;">
            <p style="margin: 0 0 8px 0; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${STYLES.text};"><strong>Radionica:</strong> ${escapeHtml(data.eventTitle)}</p>
            <p style="margin: 0 0 8px 0; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${STYLES.text};"><strong>Termin:</strong> ${escapeHtml(data.eventDateTime)}</p>
            <p style="margin: 0 0 8px 0; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${STYLES.text};"><strong>Broj mesta:</strong> ${data.seats}</p>
            <p style="margin: 0; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${STYLES.text};"><strong>Broj rezervacije:</strong> ${escapeHtml(data.orderId)}</p>
          </td>
        </tr>
      </table>

      <p style="margin: 0 0 16px 0; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${STYLES.text}; line-height: 1.6;">
        Svaki link otvara stranicu. Ništa se ne menja dok na njoj ne potvrdite izbor.
      </p>
      ${renderButton(data.extendUrl, "Treba mi još 24h", true)}
      ${renderButton(data.cancelUrl, "Odustajem", false)}
      <p style="margin: 8px 0 0 0; font-family: ${FONT_FAMILY}; font-size: 13px; color: ${STYLES.textMuted}; line-height: 1.6;">
        Produženje: <a href="${escapeHtml(data.extendUrl)}" style="color: ${STYLES.primary}; word-break: break-all;">${escapeHtml(data.extendUrl)}</a>
      </p>
      <p style="margin: 8px 0 20px 0; font-family: ${FONT_FAMILY}; font-size: 13px; color: ${STYLES.textMuted}; line-height: 1.6;">
        Odustajanje: <a href="${escapeHtml(data.cancelUrl)}" style="color: ${STYLES.primary}; word-break: break-all;">${escapeHtml(data.cancelUrl)}</a>
      </p>
      <p style="margin: 0 0 16px 0; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${STYLES.text}; line-height: 1.6;">
        Ako ne izaberete ništa, rezervacija ostaje nepotvrđena. Ovo pitanje šaljemo samo jednom.
      </p>
      <p style="margin: 0; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${STYLES.textMuted}; line-height: 1.6;">
        Za sva pitanja nas možete kontaktirati na <strong>${COMPANY.phone}</strong> ili <strong>${COMPANY.email}</strong>.
      </p>
      <p style="margin: 16px 0 0 0; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${STYLES.text};">
        Srdačan pozdrav,<br/>
        <strong>Paleto.rs</strong>
      </p>
    </td>
  </tr>
</table>
`

const renderFooter = () => `
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
  <tr>
    <td style="padding: 24px; border-top: 1px solid ${STYLES.border};">
      <p style="margin: 0; font-family: ${FONT_FAMILY}; font-size: 12px; color: ${STYLES.textMuted}; line-height: 1.6;">
        Ukoliko imate pitanja, pozovite nas na ${COMPANY.phone}.
      </p>
    </td>
  </tr>
</table>
`

export const buildReservationFollowUpHtml = (data: ReservationFollowUpData): string => {
  const parts = [renderHeader(), renderBanner(), renderBody(data), renderFooter()]
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rezervacija nije potvrđena</title>
</head>
<body style="margin: 0; padding: 0; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${STYLES.text}; background-color: ${STYLES.bgLight};">
  <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; max-width: 600px; margin: 0 auto; background-color: ${STYLES.white};">
    ${parts.join("")}
  </table>
</body>
</html>
`
}
