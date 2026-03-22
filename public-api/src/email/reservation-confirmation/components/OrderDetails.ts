import { STYLES, FONT_FAMILY } from "../styles"
import { formatAddress } from "../constants"
import type { LocationKey } from "../constants"

interface OrderDetailsProps {
  orderId: string
  orderDate: string
  location: LocationKey
}

export const renderOrderDetails = ({ orderId, orderDate, location }: OrderDetailsProps) => `
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
  <tr>
    <td style="padding: 24px 24px 16px 24px;">
      <h2 style="margin: 0 0 16px 0; font-family: ${FONT_FAMILY}; font-size: 16px; font-weight: bold; color: ${STYLES.text};">
        Podaci o rezervaciji
      </h2>
      <p style="margin: 0 0 4px 0; font-family: ${FONT_FAMILY}; font-size: 13px; color: ${STYLES.text};">
        Broj rezervacije: <strong>${orderId}</strong>
      </p>
      <p style="margin: 0 0 4px 0; font-family: ${FONT_FAMILY}; font-size: 13px; color: ${STYLES.text};">
        Datum prijave: ${orderDate}
      </p>
      <p style="margin: 0; font-family: ${FONT_FAMILY}; font-size: 13px; color: ${STYLES.text};">
        Adresa: <strong>${formatAddress(location)}</strong>
      </p>
    </td>
  </tr>
</table>
`
