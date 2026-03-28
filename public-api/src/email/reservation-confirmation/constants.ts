export const COMPANY = {
  name: "Paleto.rs",
  phone: "065/201-2727",
  email: "rezervacije@paleto.rs",
  pib: "114779948",
  mb: "67849272",
} as const

const DEFAULT_LOGO_BASE = "https://www.paleto.rs"
export const LOGO_URL = process.env.LOGO_URL ?? `${DEFAULT_LOGO_BASE}/Paleto%20logo%202.png`

export type LocationKey = "BELGRADE" | "NOVI_SAD"

export const ADDRESSES: Record<LocationKey, { street: string; number: number; apartment: string; floor: string; city: string; postalCode: string }> = {
  NOVI_SAD: {
    street: "BRAĆE RIBNIKAR",
    number: 7,
    apartment: "24",
    floor: "5",
    city: "Novi Sad",
    postalCode: "21000",
  },
  BELGRADE: {
    street: "BRAĆE RIBNIKAR",
    number: 39,
    apartment: "10",
    floor: "3",
    city: "Beograd",
    postalCode: "11000",
  },
}

export const formatAddress = (location: LocationKey): string => {
  const a = ADDRESSES[location]
  const parts = [
    `${a.street} ${a.number}`,
    a.apartment !== "—" ? `broj stana: ${a.apartment}` : null,
    a.floor !== "—" ? `sprat: ${a.floor}` : null,
    `${a.postalCode}, ${a.city}`,
  ].filter(Boolean)
  return parts.join(", ")
}

export const getAddressByLocation = (location: string): string => {
  const key = location === "NOVI_SAD" || location === "BELGRADE" ? location : "NOVI_SAD"
  return formatAddress(key)
}

export const BANK_ACCOUNT = {
  recipient: COMPANY.name,
  accountNumber: "265-1100310091771-22",
  bank: "Raiffeisen banka A.D. Beograd",
  pib: COMPANY.pib,
  mb: COMPANY.mb,
} as const

export const PAYMENT_SLIP = {
  recipientLabel: "PR Paleto",
  addressShort: (location: LocationKey): string => {
    const a = ADDRESSES[location]
    const streetFormatted = a.street
      .split(" ")
      .map((w) => w.charAt(0) + w.slice(1).toLowerCase())
      .join(" ")
    return `Ul. ${streetFormatted} ${a.number}, ${a.city}`
  },
} as const
