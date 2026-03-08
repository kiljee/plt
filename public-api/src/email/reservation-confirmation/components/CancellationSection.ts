import { STYLES, FONT_FAMILY } from "../styles"
import { COMPANY } from "../constants"

export const renderCancellationSection = () => `
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
  <tr>
    <td style="padding: 24px;">
      <div style="border: 1px solid ${STYLES.border}; border-radius: 4px; padding: 16px; background-color: ${STYLES.bgLight};">
        <p style="margin: 0 0 8px 0; font-family: ${FONT_FAMILY}; font-size: 14px; font-weight: bold; color: ${STYLES.text};">
          Otkazivanje
        </p>
        <p style="margin: 0; font-family: ${FONT_FAMILY}; font-size: 13px; color: ${STYLES.text}; line-height: 1.6;">
          Za otkazivanje ili izmene javite nam se putem Instagrama ili na <a href="mailto:${COMPANY.email}" style="color: ${STYLES.primary};">${COMPANY.email}</a>. Otkazivanje je moguće do 48 sati pre početka radionice.
        </p>
      </div>
    </td>
  </tr>
</table>
`
