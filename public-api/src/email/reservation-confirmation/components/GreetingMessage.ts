import { STYLES, FONT_FAMILY } from "../styles"
import { COMPANY } from "../constants"

interface GreetingMessageProps {
  orderId: string
  variant?: "order_received" | "confirmed"
}

export const renderGreetingMessage = ({ orderId, variant = "order_received" }: GreetingMessageProps) => {
  const isConfirmed = variant === "confirmed"
  if (isConfirmed) {
    return `
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
  <tr>
    <td style="padding: 0 24px 24px 24px;">
      <p style="margin: 0 0 12px 0; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${STYLES.text}; line-height: 1.6;">
        Poštovani,
      </p>
      <p style="margin: 0 0 12px 0; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${STYLES.text}; line-height: 1.6;">
        Obaveštavamo Vas da je uplata uspešno evidentirana i da je Vaša rezervacija zvanično potvrđena. 🎨✨
      </p>
      <p style="margin: 0 0 12px 0; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${STYLES.text}; line-height: 1.6;">
        Sve što je potrebno jeste da dođete 5 minuta ranije i prepustite se procesu. Sav materijal Vas čeka kod nas, neograničena pića, kao i opuštena i kreativna atmosfera. 💛
      </p>
      <p style="margin: 0 0 12px 0; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${STYLES.text}; line-height: 1.6;">
        Ukoliko imate bilo kakva pitanja u međuvremenu, slobodno nam pišite.
      </p>
      <p style="margin: 0 0 12px 0; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${STYLES.text}; line-height: 1.6;">
        Radujemo se Vašem dolasku!
      </p>
      <p style="margin: 0; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${STYLES.text}; line-height: 1.6;">
        Srdačno,<br>Paleto tim 🎨
      </p>
    </td>
  </tr>
</table>
`
  }
  return `
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
  <tr>
    <td style="padding: 0 24px 24px 24px;">
      <p style="margin: 0 0 12px 0; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${STYLES.text}; line-height: 1.6;">
        Zdravo!
      </p>
      <p style="margin: 0 0 12px 0; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${STYLES.text}; line-height: 1.6;">
        Sa zadovoljstvom Vas obaveštavamo da je Vaša rezervacija uspešno primljena.
      </p>
      <p style="margin: 0 0 12px 0; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${STYLES.text}; line-height: 1.6;">
        Broj rezervacije: <strong>${orderId}</strong>
      </p>
      <p style="margin: 0 0 12px 0; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${STYLES.text}; line-height: 1.6;">
        Kako bi Vaše mesto bilo potvrđeno, potrebno je da uplatu izvršite u roku od 48h.
      </p>
      <p style="margin: 0 0 12px 0; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${STYLES.text}; line-height: 1.6;">
        Ukoliko dođe do bilo kakvih izmena ili nedostupnosti, kontaktiraćemo Vas na broj telefona koji ste ostavili prilikom prijave.
      </p>
      <p style="margin: 0 0 12px 0; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${STYLES.text}; line-height: 1.6;">
        U narednom mejlu dobićete sve detalje vezane za potvrdu i dolazak.
      </p>
      <p style="margin: 0 0 12px 0; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${STYLES.text}; line-height: 1.6;">
        Nakon evidentirane uplate, Vaša rezervacija postaje važeća. Ukoliko imate bilo kakva pitanja ili Vam je potreban duži rok za uplatu, slobodno nam se obratite na broj ${COMPANY.phone}.
      </p>
      <p style="margin: 0 0 12px 0; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${STYLES.text}; line-height: 1.6;">
        Hvala Vam na poverenju i radujemo se zajedničkom stvaranju! 💛
      </p>
      <p style="margin: 0; font-family: ${FONT_FAMILY}; font-size: 14px; color: ${STYLES.text}; line-height: 1.6;">
        Paleto tim 🎨
      </p>
    </td>
  </tr>
</table>
`
}
