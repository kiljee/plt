import { STYLES, FONT_FAMILY } from "../styles"

interface OrderDetailsProps {
  orderId: string
  orderDate: string
}

export const renderOrderDetails = ({ orderId, orderDate }: OrderDetailsProps) => `
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
  <tr>
    <td style="padding: 24px 24px 16px 24px;">
      <h2 style="margin: 0 0 16px 0; font-family: ${FONT_FAMILY}; font-size: 16px; font-weight: bold; color: ${STYLES.text};">
        Podaci o porudžbini
      </h2>
      <p style="margin: 0 0 4px 0; font-family: ${FONT_FAMILY}; font-size: 13px; color: ${STYLES.text};">
        Broj porudžbine: <strong>${orderId}</strong>
      </p>
      <p style="margin: 0 0 4px 0; font-family: ${FONT_FAMILY}; font-size: 13px; color: ${STYLES.text};">
        ID rezervacije: <strong>${orderId}</strong>
      </p>
      <p style="margin: 0; font-family: ${FONT_FAMILY}; font-size: 13px; color: ${STYLES.text};">
        Datum i vreme poručivanja: ${orderDate}
      </p>
    </td>
  </tr>
</table>
`
