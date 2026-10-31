import { STYLES, FONT_FAMILY } from "./styles"
import { COMPANY } from "../reservation-rejection/constants"
import { renderEmailLogo } from "../shared/logo"
import { escapeHtml } from "./escapeHtml"
import type { ReservationCustomerCancelData } from "./types"

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

const renderBody = (data: ReservationCustomerCancelData) => `
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
  <tr>
    <td style="padding: 24px;">
      <p style="margin: 0 0 16px 0; font-family: ${FONT_FAMILY}; font-size: 18px; font-weight: bold; color: ${STYLES.text};">
        REZERVACIJA OTKAZANA
      </p>
      <p style="margin: 0 0 16px 0; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${STYLES.text}; line-height: 1.6;">
        Poštovani <strong>${escapeHtml(data.customerName || "Korisniče")}</strong>,
      </p>
      <p style="margin: 0 0 20px 0; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${STYLES.text}; line-height: 1.6;">
        Otkazali ste rezervaciju. Mesto je oslobođeno.
      </p>
      <p style="margin: 0 0 8px 0; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${STYLES.text};"><strong>Radionica:</strong> ${escapeHtml(data.eventTitle)}</p>
      <p style="margin: 0 0 8px 0; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${STYLES.text};"><strong>Termin:</strong> ${escapeHtml(data.eventDateTime)}</p>
      <p style="margin: 0 0 20px 0; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${STYLES.text};"><strong>Broj rezervacije:</strong> ${escapeHtml(data.orderId)}</p>
      <p style="margin: 0 0 16px 0; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${STYLES.text}; line-height: 1.6;">
        Ako želite da učestvujete, možete ponovo rezervisati na sajtu.
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

export const buildReservationCustomerCancelHtml = (
  data: ReservationCustomerCancelData,
): string => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rezervacija otkazana</title>
</head>
<body style="margin: 0; padding: 0; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${STYLES.text}; background-color: ${STYLES.bgLight};">
  <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; max-width: 600px; margin: 0 auto; background-color: ${STYLES.white};">
    ${renderHeader()}
    ${renderBody(data)}
  </table>
</body>
</html>
`
