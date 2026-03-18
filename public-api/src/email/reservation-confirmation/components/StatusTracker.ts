import { STYLES, FONT_FAMILY } from "../styles"

export type ActiveStep = 1 | 2

const stepStyle = (active: boolean) =>
  active
    ? `background-color: ${STYLES.primary}; color: ${STYLES.white};`
    : `background-color: ${STYLES.border}; color: ${STYLES.textMuted};`

const labelStyle = (active: boolean) =>
  active
    ? `color: ${STYLES.primary}; font-weight: bold;`
    : `color: ${STYLES.textMuted};`

export const renderStatusTracker = (activeStep: ActiveStep = 1) => {
  const s1 = activeStep === 1
  const s2 = activeStep === 2
  return `
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin: 24px 0;">
  <tr>
    <td align="center" style="padding: 16px 0;">
      <table align="center" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
        <tr>
          <td align="center" style="padding: 0 32px;">
            <div style="width: 36px; height: 36px; border-radius: 50%; ${stepStyle(s1)} line-height: 36px; text-align: center; font-family: ${FONT_FAMILY}; font-size: 16px; margin: 0 auto;">${s1 ? "✓" : "1"}</div>
            <p style="margin: 8px 0 0 0; font-family: ${FONT_FAMILY}; font-size: 12px; ${labelStyle(s1)}">Rezervacija primljena</p>
          </td>
          <td style="width: 60px; border-bottom: 2px solid ${STYLES.border};"></td>
          <td align="center" style="padding: 0 32px;">
            <div style="width: 36px; height: 36px; border-radius: 50%; ${stepStyle(s2)} line-height: 36px; text-align: center; font-family: ${FONT_FAMILY}; font-size: 14px; margin: 0 auto;">${s2 ? "✓" : "2"}</div>
            <p style="margin: 8px 0 0 0; font-family: ${FONT_FAMILY}; font-size: 12px; ${labelStyle(s2)}">Rezervacija potvrđena</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
`
}
