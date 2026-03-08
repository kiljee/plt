import { renderEmailHeader } from "./components/EmailHeader"
import { renderThankYouBanner } from "./components/ThankYouBanner"
import { renderThankYouReservationMessage } from "./components/ThankYouReservationMessage"
import { renderEmailFooter } from "./components/EmailFooter"
import { STYLES, FONT_FAMILY } from "./styles"

export interface ReservationThankYouData {
  customerName: string
}

export const buildReservationThankYouHtml = (
  data: ReservationThankYouData
): string => {
  const parts = [
    renderEmailHeader(),
    renderThankYouBanner({ customerName: data.customerName }),
    renderThankYouReservationMessage({ customerName: data.customerName }),
    renderEmailFooter(),
  ]

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hvala na rezervaciji</title>
</head>
<body style="margin: 0; padding: 0; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${STYLES.text}; background-color: ${STYLES.bgLight};">
  <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; max-width: 600px; margin: 0 auto; background-color: ${STYLES.white};">
    ${parts.join("")}
  </table>
</body>
</html>
`
}
