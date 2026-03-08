import { STYLES, FONT_FAMILY } from "../styles"

interface ThankYouReservationMessageProps {
  customerName: string
}

export const renderThankYouReservationMessage = ({
  customerName,
}: ThankYouReservationMessageProps) => {
  const displayName = customerName || "Poštovani"
  return `
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
  <tr>
    <td style="padding: 24px;">
      <p style="margin: 0 0 12px 0; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${STYLES.text}; line-height: 1.6;">
        ${displayName},
      </p>
      <p style="margin: 0 0 12px 0; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${STYLES.text}; line-height: 1.6;">
        Uskoro će vam stići podaci za uplatu.
      </p>
      <p style="margin: 0; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${STYLES.text}; line-height: 1.6;">
        Hvala na poverenju!
      </p>
    </td>
  </tr>
</table>
`
}
