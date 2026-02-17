import { STYLES, FONT_FAMILY } from "../styles"
import { COMPANY } from "../constants"

export const renderEmailFooter = () => `
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
  <tr>
    <td style="padding: 24px; border-top: 1px solid ${STYLES.border};">
      <p style="margin: 0; font-family: ${FONT_FAMILY}; font-size: 12px; color: ${STYLES.textMuted}; line-height: 1.6;">
        Ukoliko ovi podaci nisu ispravni, molimo Vas da nas pozovete na broj telefona ${COMPANY.phone}.
      </p>
    </td>
  </tr>
</table>
`
