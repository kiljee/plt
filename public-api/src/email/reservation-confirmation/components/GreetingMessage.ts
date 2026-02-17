import { STYLES, FONT_FAMILY } from "../styles"

interface GreetingMessageProps {
  orderId: string
}

export const renderGreetingMessage = ({ orderId }: GreetingMessageProps) => `
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
  <tr>
    <td style="padding: 0 24px 24px 24px;">
      <p style="margin: 0 0 12px 0; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${STYLES.text}; line-height: 1.6;">
        Poštovani,
      </p>
      <p style="margin: 0 0 12px 0; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${STYLES.text}; line-height: 1.6;">
        Sa zadovoljstvom Vas obaveštavamo da je vaša porudžbina <strong>${orderId}</strong> primljena.
      </p>
      <p style="margin: 0 0 12px 0; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${STYLES.text}; line-height: 1.6;">
        Ukoliko poručeni artikli nisu dostupni ili ih nema u potrebnoj količini, pozvaćemo Vas na broj telefona koji ste ostavili prilikom poručivanja.
      </p>
      <p style="margin: 0; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${STYLES.text}; line-height: 1.6;">
        Hvala na kupovini!
      </p>
    </td>
  </tr>
</table>
`
