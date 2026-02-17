import { renderEmailHeader } from "./components/EmailHeader"
import { renderOrderBanner } from "./components/OrderBanner"
import { renderStatusTracker } from "./components/StatusTracker"
import { renderGreetingMessage } from "./components/GreetingMessage"
import { renderOrderDetails } from "./components/OrderDetails"
import { renderItemList, type ReservationItem } from "./components/ItemList"
import { renderOrderSummary } from "./components/OrderSummary"
import { renderPaymentSlip } from "./components/PaymentSlip"
import { renderEmailFooter } from "./components/EmailFooter"
import { STYLES, FONT_FAMILY } from "./styles"

export interface ReservationConfirmationData {
  orderId: string
  reservationId: string
  orderDate: string
  location: "BELGRADE" | "NOVI_SAD"
  customerName: string
  customerEmail: string
  customerPhone: string
  items: ReservationItem[]
  total: number
  currency: string
}

export const buildReservationConfirmationHtml = (data: ReservationConfirmationData): string => {
  const parts = [
    renderEmailHeader(),
    renderOrderBanner({ customerName: data.customerName }),
    renderStatusTracker(),
    renderGreetingMessage({ orderId: data.orderId }),
    renderOrderDetails({ orderId: data.orderId, reservationId: data.reservationId, orderDate: data.orderDate }),
    renderItemList(data.items),
    renderOrderSummary({ total: data.total, currency: data.currency }),
    renderPaymentSlip({
      amount: data.total,
      currency: data.currency,
      location: data.location,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
    }),
    renderEmailFooter(),
  ]

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Porudžbina primljena</title>
</head>
<body style="margin: 0; padding: 0; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${STYLES.text}; background-color: ${STYLES.bgLight};">
  <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; max-width: 600px; margin: 0 auto; background-color: ${STYLES.white};">
    ${parts.join("")}
  </table>
</body>
</html>
`
}
