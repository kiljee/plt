import { STYLES, FONT_FAMILY } from "../styles"
import { formatPrice } from "../utils"

interface OrderSummaryProps {
  total: number
  currency: string
}

export const renderOrderSummary = ({ total, currency }: OrderSummaryProps) => `
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
  <tr>
    <td style="padding: 24px; background-color: ${STYLES.bgLight};">
      <h2 style="margin: 0 0 16px 0; font-family: ${FONT_FAMILY}; font-size: 16px; font-weight: bold; color: ${STYLES.text};">
        Ukupna porudžbina
      </h2>
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
        <tr>
          <td style="padding: 4px 0; font-family: ${FONT_FAMILY}; font-size: 13px; color: ${STYLES.text};">
            Ukupno
          </td>
          <td align="right" style="padding: 4px 0; font-family: ${FONT_FAMILY}; font-size: 13px; color: ${STYLES.text};">
            ${formatPrice(total, currency)}
          </td>
        </tr>
        <tr>
          <td style="padding: 4px 0; font-family: ${FONT_FAMILY}; font-size: 13px; color: ${STYLES.text};">
            Dostava
          </td>
          <td align="right" style="padding: 4px 0; font-family: ${FONT_FAMILY}; font-size: 13px; color: ${STYLES.text};">
            Besplatna
          </td>
        </tr>
        <tr>
          <td colspan="2" style="padding-top: 12px; border-top: 1px solid ${STYLES.border};"></td>
        </tr>
        <tr>
          <td style="padding: 8px 0 0 0; font-family: ${FONT_FAMILY}; font-size: 15px; font-weight: bold; color: ${STYLES.primary};">
            Ukupno zaduženje
          </td>
          <td align="right" style="padding: 8px 0 0 0; font-family: ${FONT_FAMILY}; font-size: 15px; font-weight: bold; color: ${STYLES.primary};">
            ${formatPrice(total, currency)}
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
`
