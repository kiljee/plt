const LOGO_PRIMARY = "#5B9BD5"
const LOGO_SECONDARY = "#4A8BC2"
const FONT_FAMILY = "Arial, Helvetica, sans-serif"

export const renderEmailLogo = (): string => `
<table cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
  <tr>
    <td style="font-family: ${FONT_FAMILY}; font-size: 24px; font-weight: bold; color: ${LOGO_PRIMARY}; letter-spacing: 0.02em; line-height: 1.2;">
      Paleto<span style="color: ${LOGO_SECONDARY}; font-weight: bold;">.rs</span>
    </td>
  </tr>
</table>
`
