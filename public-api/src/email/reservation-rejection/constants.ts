export const COMPANY = {
  name: "Paleto.rs",
  phone: "065/201-2727",
  email: "rezervacije@paleto.rs",
} as const

const DEFAULT_EVENTS_SITE = "https://www.paleto.rs"
export const EVENTS_SITE_URL = process.env.EVENTS_SITE_URL ?? DEFAULT_EVENTS_SITE
export const LOGO_URL = process.env.LOGO_URL ?? `${DEFAULT_EVENTS_SITE}/Paleto%20logo%202.png`

export const cityToPath = (location: string): string => {
  if (location === "BELGRADE") return "beograd"
  if (location === "NOVI_SAD") return "novi-sad"
  return "novi-sad"
}
