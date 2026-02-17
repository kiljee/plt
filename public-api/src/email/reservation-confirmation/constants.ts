export const COMPANY = {
  name: "DANIJELA VIGNJEVIĆ PR PALETO",
  phone: "065/201-2727",
  email: "vignjevic23@gmail.com",
  pib: "114779948",
  mb: "67849272",
} as const

export type LocationKey = "BELGRADE" | "NOVI_SAD"

export const ADDRESSES: Record<LocationKey, { street: string; number: number; apartment: string; floor: string; city: string; postalCode: string }> = {
  NOVI_SAD: {
    street: "BRAĆE RIBNIKAR",
    number: 7,
    apartment: "24",
    floor: "—",
    city: "Novi Sad",
    postalCode: "21000",
  },
  BELGRADE: {
    street: "BRAĆE RIBNIKAR",
    number: 39,
    apartment: "—",
    floor: "—",
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
  model: "97",
  purpose: "Uplata za rezervaciju",
  pib: COMPANY.pib,
  mb: COMPANY.mb,
} as const
