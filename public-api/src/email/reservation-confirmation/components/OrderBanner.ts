import { STYLES, FONT_FAMILY } from "../styles"

interface OrderBannerProps {
  customerName: string
  variant?: "order_received" | "confirmed"
}

export const renderOrderBanner = ({ customerName, variant = "order_received" }: OrderBannerProps) => {
  const displayName = customerName || "Korisniče"
  const isConfirmed = variant === "confirmed"
  const title = isConfirmed ? "Rezervacija potvrđena" : "Rezervacija primljena"
  const subtext = isConfirmed
    ? `${displayName}, Vaša rezervacija je potvrđena. Radujemo se Vašem dolasku!`
    : `${displayName}, hvala vam na prijavi! Ispod su detalji vaše rezervacije:`
  return `
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
  <tr>
    <td style="background-color: ${STYLES.primary}; padding: 24px 24px; text-align: center;">
      <h1 style="margin: 0 0 8px 0; font-family: ${FONT_FAMILY}; font-size: 28px; font-weight: bold; color: ${STYLES.white};">
        ${title}
      </h1>
      <p style="margin: 0; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${STYLES.white}; opacity: 0.95;">
        ${subtext}
      </p>
    </td>
  </tr>
</table>
`
}
