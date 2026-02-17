import { STYLES, FONT_FAMILY } from "../styles"
import { formatPrice } from "../utils"

export interface ReservationItem {
  title: string
  dateTime: string
  price: number
  currency: string
  quantity: number
  total: number
}

export const renderItemList = (items: ReservationItem[]) => `
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
  ${items
    .map(
      (item) => `
  <tr>
    <td style="padding: 16px 24px; border-top: 1px solid ${STYLES.border};">
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
        <tr>
          <td style="vertical-align: top;">
            <p style="margin: 0 0 8px 0; font-family: ${FONT_FAMILY}; font-size: 14px; font-weight: bold; color: ${STYLES.text};">
              ${item.title}
            </p>
            <p style="margin: 0 0 4px 0; font-family: ${FONT_FAMILY}; font-size: 12px; color: ${STYLES.textMuted};">
              Datum i vreme: ${item.dateTime}
            </p>
            <p style="margin: 0 0 4px 0; font-family: ${FONT_FAMILY}; font-size: 12px; color: ${STYLES.textMuted};">
              Cena: ${formatPrice(item.price, item.currency)}
            </p>
            <p style="margin: 0; font-family: ${FONT_FAMILY}; font-size: 12px; color: ${STYLES.textMuted};">
              Količina: ${item.quantity} Komad
            </p>
          </td>
          <td align="right" style="vertical-align: top;">
            <p style="margin: 0; font-family: ${FONT_FAMILY}; font-size: 14px; font-weight: bold; color: ${STYLES.text};">
              ${formatPrice(item.total, item.currency)}
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
`
    )
    .join("")}
</table>
`
