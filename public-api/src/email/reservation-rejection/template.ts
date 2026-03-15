import { STYLES, FONT_FAMILY } from "./styles"
import { COMPANY, EVENTS_SITE_URL, cityToPath } from "./constants"
import { renderEmailLogo } from "../shared/logo"
import type { ReservationRejectionData } from "./types"

export type { ReservationRejectionData } from "./types"

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
    <td style="padding: 24px 24px 20px 24px; background-color: #FEF2F2;">
      <p style="margin: 0; font-family: ${FONT_FAMILY}; font-size: 18px; font-weight: bold; color: ${STYLES.error};">
        REZERVACIJA ODBIJENA
      </p>
    </td>
  </tr>
</table>
`

const renderBody = (data: ReservationRejectionData) => {
  const eventUrl = `${EVENTS_SITE_URL}/${cityToPath(data.location)}/${data.eventSlug}`
  return `
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
  <tr>
    <td style="padding: 0 24px 24px 24px;">
      <p style="margin: 0 0 16px 0; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${STYLES.text}; line-height: 1.6;">
        Poštovani <strong>${data.customerName || "Korisniče"}</strong>,
      </p>
      <p style="margin: 0 0 20px 0; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${STYLES.text}; line-height: 1.6;">
        Obaveštavamo Vas da je <strong>vaša rezervacija za radionicu odbijena</strong>.
      </p>

      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-bottom: 20px; border: 1px solid ${STYLES.border};">
        <tr>
          <td style="padding: 12px 16px; background-color: ${STYLES.bgLight}; font-family: ${FONT_FAMILY}; font-size: 12px; font-weight: bold; color: ${STYLES.textMuted}; text-transform: uppercase;">
            Odbijena rezervacija
          </td>
        </tr>
        <tr>
          <td style="padding: 16px;">
            <p style="margin: 0 0 8px 0; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${STYLES.text};"><strong>Radionica:</strong> ${data.eventTitle}</p>
            <p style="margin: 0; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${STYLES.text};"><strong>Broj porudžbine:</strong> ${data.orderId}</p>
          </td>
        </tr>
      </table>

      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-bottom: 20px; border: 1px solid ${STYLES.border};">
        <tr>
          <td style="padding: 12px 16px; background-color: #ECFDF5; font-family: ${FONT_FAMILY}; font-size: 12px; font-weight: bold; color: #047857;">
            Ponovna rezervacija
          </td>
        </tr>
        <tr>
          <td style="padding: 16px;">
            <p style="margin: 0 0 12px 0; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${STYLES.text}; line-height: 1.6;">
              Ako i dalje želite da učestvujete, <strong>možete ponovo rezervisati mesto</strong> na našem sajtu — ako ima slobodnih mesta za ovu radionicu.
            </p>
            <p style="margin: 0 0 12px 0; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${STYLES.text};">
              <strong>Link za pregled radionice i rezervaciju:</strong>
            </p>
            <p style="margin: 0;">
              <a href="${eventUrl}" style="font-family: ${FONT_FAMILY}; font-size: 14px; color: ${STYLES.primary}; word-break: break-all;">${eventUrl}</a>
            </p>
          </td>
        </tr>
      </table>

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
}

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

export const buildReservationRejectionHtml = (data: ReservationRejectionData): string => {
  const parts = [renderHeader(), renderBanner(), renderBody(data), renderFooter()]
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rezervacija odbijena</title>
</head>
<body style="margin: 0; padding: 0; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${STYLES.text}; background-color: ${STYLES.bgLight};">
  <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; max-width: 600px; margin: 0 auto; background-color: ${STYLES.white};">
    ${parts.join("")}
  </table>
</body>
</html>
`
}
