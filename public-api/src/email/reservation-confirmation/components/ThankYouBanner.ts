import { STYLES, FONT_FAMILY } from "../styles"

interface ThankYouBannerProps {
  customerName: string
}

export const renderThankYouBanner = ({ customerName }: ThankYouBannerProps) => {
  const displayName = customerName || "Korisniče"
  return `
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
  <tr>
    <td style="background-color: ${STYLES.primary}; padding: 24px 24px; text-align: center;">
      <h1 style="margin: 0 0 8px 0; font-family: ${FONT_FAMILY}; font-size: 28px; font-weight: bold; color: ${STYLES.white};">
        Rezervacija primljena
      </h1>
      <p style="margin: 0; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${STYLES.white}; opacity: 0.95;">
        ${displayName}, hvala što ste rezervisali.
      </p>
    </td>
  </tr>
</table>
`
}
