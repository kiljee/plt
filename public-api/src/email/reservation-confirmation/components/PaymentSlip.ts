import { STYLES, FONT_FAMILY } from "../styles"
import { formatPrice } from "../utils"
import { BANK_ACCOUNT, getAddressByLocation } from "../constants"

interface PaymentSlipProps {
  amount: number
  currency: string
  location: string
  orderId: string
  customerName: string
  customerEmail: string
  customerPhone: string
}

export const renderPaymentSlip = ({
  amount,
  currency,
  location,
  orderId,
  customerName,
  customerEmail,
  customerPhone,
}: PaymentSlipProps) => {
  const address = getAddressByLocation(location)
  return `
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
  <tr>
    <td style="padding: 24px;">
      <h2 style="margin: 0 0 16px 0; font-family: ${FONT_FAMILY}; font-size: 16px; font-weight: bold; color: ${STYLES.text};">
        Dostava i plaćanje
      </h2>
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border: 1px solid ${STYLES.border};">
        <tr>
          <td colspan="2" style="padding: 16px; background-color: ${STYLES.bgLight}; font-family: ${FONT_FAMILY}; font-size: 14px; font-weight: bold; color: ${STYLES.text};">
            Uplatnica – podaci za uplatu
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; font-family: ${FONT_FAMILY}; font-size: 13px; color: ${STYLES.textMuted}; width: 180px;">
            Banka
          </td>
          <td style="padding: 12px 16px; font-family: ${FONT_FAMILY}; font-size: 13px; color: ${STYLES.text};">
            ${BANK_ACCOUNT.bank}
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; font-family: ${FONT_FAMILY}; font-size: 13px; color: ${STYLES.textMuted}; width: 180px;">
            Primaoc
          </td>
          <td style="padding: 12px 16px; font-family: ${FONT_FAMILY}; font-size: 13px; color: ${STYLES.text};">
            ${BANK_ACCOUNT.recipient}
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; font-family: ${FONT_FAMILY}; font-size: 13px; color: ${STYLES.textMuted};">
            PIB / MB
          </td>
          <td style="padding: 12px 16px; font-family: ${FONT_FAMILY}; font-size: 13px; color: ${STYLES.text};">
            ${BANK_ACCOUNT.pib} / ${BANK_ACCOUNT.mb}
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; font-family: ${FONT_FAMILY}; font-size: 13px; color: ${STYLES.textMuted};">
            Adresa primaoca
          </td>
          <td style="padding: 12px 16px; font-family: ${FONT_FAMILY}; font-size: 13px; color: ${STYLES.text};">
            ${address}
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; font-family: ${FONT_FAMILY}; font-size: 13px; color: ${STYLES.textMuted};">
            Broj računa
          </td>
          <td style="padding: 12px 16px; font-family: ${FONT_FAMILY}; font-size: 13px; color: ${STYLES.text}; font-weight: bold;">
            ${BANK_ACCOUNT.accountNumber}
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; font-family: ${FONT_FAMILY}; font-size: 13px; color: ${STYLES.textMuted};">
            Iznos
          </td>
          <td style="padding: 12px 16px; font-family: ${FONT_FAMILY}; font-size: 13px; color: ${STYLES.text}; font-weight: bold;">
            ${formatPrice(amount, currency)}
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; font-family: ${FONT_FAMILY}; font-size: 13px; color: ${STYLES.textMuted};">
            Model
          </td>
          <td style="padding: 12px 16px; font-family: ${FONT_FAMILY}; font-size: 13px; color: ${STYLES.text};">
            ${BANK_ACCOUNT.model}
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; font-family: ${FONT_FAMILY}; font-size: 13px; color: ${STYLES.textMuted};">
            Poziv na broj
          </td>
          <td style="padding: 12px 16px; font-family: ${FONT_FAMILY}; font-size: 13px; color: ${STYLES.text}; font-weight: bold;">
            ${orderId}
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; font-family: ${FONT_FAMILY}; font-size: 13px; color: ${STYLES.textMuted};">
            Svrha uplate
          </td>
          <td style="padding: 12px 16px; font-family: ${FONT_FAMILY}; font-size: 13px; color: ${STYLES.text};">
            ${BANK_ACCOUNT.purpose}
          </td>
        </tr>
        <tr>
          <td colspan="2" style="padding: 16px; border-top: 1px solid ${STYLES.border}; background-color: ${STYLES.bgLight};">
            <p style="margin: 0 0 8px 0; font-family: ${FONT_FAMILY}; font-size: 13px; font-weight: bold; color: ${STYLES.text};">
              Podaci o kupcu
            </p>
            <p style="margin: 0 0 4px 0; font-family: ${FONT_FAMILY}; font-size: 12px; color: ${STYLES.text};">
              Ime i prezime: ${customerName || "—"}
            </p>
            <p style="margin: 0 0 4px 0; font-family: ${FONT_FAMILY}; font-size: 12px; color: ${STYLES.text};">
              E-mail: ${customerEmail}
            </p>
            <p style="margin: 0; font-family: ${FONT_FAMILY}; font-size: 12px; color: ${STYLES.text};">
              Broj telefona: ${customerPhone || "—"}
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
`
}
