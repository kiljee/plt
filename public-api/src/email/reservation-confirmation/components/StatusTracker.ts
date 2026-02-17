import { STYLES, FONT_FAMILY } from "../styles"

export const renderStatusTracker = () => `
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin: 24px 0;">
  <tr>
    <td align="center" style="padding: 16px 0;">
      <table align="center" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
        <tr>
          <td align="center" style="padding: 0 32px;">
            <div style="width: 36px; height: 36px; border-radius: 50%; background-color: ${STYLES.primary}; color: ${STYLES.white}; line-height: 36px; text-align: center; font-family: ${FONT_FAMILY}; font-size: 16px; margin: 0 auto;">✓</div>
            <p style="margin: 8px 0 0 0; font-family: ${FONT_FAMILY}; font-size: 12px; color: ${STYLES.primary}; font-weight: bold;">Porudžbina primljena</p>
          </td>
          <td style="width: 60px; border-bottom: 2px solid ${STYLES.border};"></td>
          <td align="center" style="padding: 0 32px;">
            <div style="width: 36px; height: 36px; border-radius: 50%; background-color: ${STYLES.border}; color: ${STYLES.textMuted}; line-height: 36px; text-align: center; font-family: ${FONT_FAMILY}; font-size: 14px; margin: 0 auto;">2</div>
            <p style="margin: 8px 0 0 0; font-family: ${FONT_FAMILY}; font-size: 12px; color: ${STYLES.textMuted};">Porudžbina u obradi</p>
          </td>
          <td style="width: 60px; border-bottom: 2px solid ${STYLES.border};"></td>
          <td align="center" style="padding: 0 32px;">
            <div style="width: 36px; height: 36px; border-radius: 50%; background-color: ${STYLES.border}; color: ${STYLES.textMuted}; line-height: 36px; text-align: center; font-family: ${FONT_FAMILY}; font-size: 14px; margin: 0 auto;">3</div>
            <p style="margin: 8px 0 0 0; font-family: ${FONT_FAMILY}; font-size: 12px; color: ${STYLES.textMuted};">Porudžbina je potvrđena i poslata</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
`
