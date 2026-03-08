import { renderEmailHeader } from "./components/EmailHeader"
import { renderOrderBanner } from "./components/OrderBanner"
import { renderStatusTracker, type ActiveStep } from "./components/StatusTracker"
import { renderGreetingMessage } from "./components/GreetingMessage"
import { renderOrderDetails } from "./components/OrderDetails"
import { renderItemList, type ReservationItem } from "./components/ItemList"
import { renderOrderSummary } from "./components/OrderSummary"
import { renderPaymentSlip } from "./components/PaymentSlip"
import { renderCancellationSection } from "./components/CancellationSection"
import { renderEmailFooter } from "./components/EmailFooter"
import { STYLES, FONT_FAMILY } from "./styles"

export type EmailVariant = "order_received" | "confirmed"

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
  variant?: EmailVariant
}

export const buildReservationConfirmationHtml = (data: ReservationConfirmationData): string => {
  const variant = data.variant ?? "order_received"
  const isConfirmed = variant === "confirmed"
  const activeStep: ActiveStep = isConfirmed ? 3 : 1

  const parts = [
    renderEmailHeader(),
    renderOrderBanner({ customerName: data.customerName, variant }),
    renderStatusTracker(activeStep),
    renderGreetingMessage({ orderId: data.orderId, variant }),
    renderOrderDetails({ orderId: data.orderId, orderDate: data.orderDate }),
    renderItemList(data.items),
    renderOrderSummary({ total: data.total, currency: data.currency }),
  ]

  if (!isConfirmed) {
    parts.push(
      renderPaymentSlip({
        amount: data.total,
        currency: data.currency,
        location: data.location,
        orderId: data.orderId,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        items: data.items,
      }),
    )
  } else {
    parts.push(renderCancellationSection())
  }

  parts.push(renderEmailFooter())

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
