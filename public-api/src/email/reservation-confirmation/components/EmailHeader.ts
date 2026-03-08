import { STYLES, FONT_FAMILY } from "../styles"

export const renderEmailHeader = () => `
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
  <tr>
    <td style="background-color: ${STYLES.primary}; height: 4px;"></td>
  </tr>
  <tr>
    <td style="padding: 20px 24px; background-color: ${STYLES.white};">
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
        <tr>
          <td>
            <span style="font-family: ${FONT_FAMILY}; font-size: 24px; font-weight: bold; color: ${STYLES.primary};">Paleto.rs</span>
          </td>
          <td align="right" style="font-family: ${FONT_FAMILY}; font-size: 11px; color: ${STYLES.textMuted};">
            Za pitanja: rezervacije@paleto.rs
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
`
