export type WorkshopOption = {
  id: string
  label: string
  price: number
  [key: string]: string | number
}

export interface OptionSelection {
  optionId: string
  label: string
  price: number
}

const MAX_OPTIONS = 20
const MAX_LABEL_LENGTH = 80

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value)

const readJson = (raw: unknown): unknown => {
  if (typeof raw !== "string") return raw
  if (!raw.trim()) return []
  try {
    return JSON.parse(raw) as unknown
  } catch {
    return []
  }
}

const toOptionSelection = (value: unknown): OptionSelection | null => {
  if (!isRecord(value)) return null
  const optionId = typeof value.optionId === "string" ? value.optionId : ""
  const label = typeof value.label === "string" ? value.label.trim() : ""
  const price = typeof value.price === "number" ? value.price : Number(value.price)
  if (!label || !Number.isInteger(price) || price < 0) return null
  return { optionId, label, price }
}

export const parseWorkshopOptions = (raw: unknown): WorkshopOption[] => {
  const value = readJson(raw)
  if (!Array.isArray(value)) return []
  const options: WorkshopOption[] = []
  for (const item of value) {
    if (!isRecord(item)) continue
    const id = typeof item.id === "string" ? item.id.trim() : ""
    const label = typeof item.label === "string" ? item.label.trim() : ""
    const price = typeof item.price === "number" ? item.price : Number(item.price)
    if (!id || !label || !Number.isInteger(price) || price < 0) continue
    options.push({ id, label, price })
  }
  return options
}

export const parseOptionSelections = (raw: unknown): OptionSelection[] => {
  const value = readJson(raw)
  if (!Array.isArray(value)) return []
  return value.flatMap((item) => {
    const selection = toOptionSelection(item)
    return selection ? [selection] : []
  })
}

export const normalizeWorkshopOptions = (
  raw: unknown,
): { options: WorkshopOption[] } | { error: string } => {
  if (!Array.isArray(raw)) return { error: "Opcije nisu ispravne." }
  if (raw.length > MAX_OPTIONS) {
    return { error: `Najviše ${MAX_OPTIONS} opcija.` }
  }

  const options: WorkshopOption[] = []
  const seen = new Set<string>()

  for (const item of raw) {
    if (!isRecord(item)) {
      return { error: "Svaka opcija mora imati naziv i cenu." }
    }
    const label = typeof item.label === "string" ? item.label.trim() : ""
    const price = typeof item.price === "number" ? item.price : Number(item.price)
    if (
      !label ||
      label.length > MAX_LABEL_LENGTH ||
      !Number.isInteger(price) ||
      price < 0
    ) {
      return { error: "Svaka opcija mora imati naziv i cenu koja nije negativna." }
    }
    const id =
      typeof item.id === "string" && item.id.trim()
        ? item.id.trim()
        : crypto.randomUUID()
    if (seen.has(id)) {
      return { error: "Opcije moraju imati jedinstvene identifikatore." }
    }
    seen.add(id)
    options.push({ id, label, price })
  }

  return { options }
}

export const summarizeOptionSelections = (raw: unknown): string => {
  const selections = parseOptionSelections(raw)
  if (selections.length === 0) return ""
  const counts = new Map<string, { label: string; count: number }>()
  for (const selection of selections) {
    const key = `${selection.optionId}:${selection.label}`
    const current = counts.get(key)
    if (current) current.count += 1
    else counts.set(key, { label: selection.label, count: 1 })
  }
  return [...counts.values()]
    .map((group) => `${group.count}× ${group.label}`)
    .join(", ")
}

export const formatSelectionSummary = (raw: unknown, currency: string): string => {
  const selections = parseOptionSelections(raw)
  if (selections.length === 0) return ""
  const counts = new Map<string, { label: string; price: number; count: number }>()
  for (const selection of selections) {
    const key = `${selection.optionId}:${selection.price}`
    const current = counts.get(key)
    if (current) current.count += 1
    else {
      counts.set(key, {
        label: selection.label,
        price: selection.price,
        count: 1,
      })
    }
  }
  return [...counts.values()]
    .map(
      (group) =>
        `${group.count}× ${group.label} (${group.price.toLocaleString("sr-RS")} ${currency})`,
    )
    .join(", ")
}

export const reservationExpectedAmount = (
  expectedAmount: number | null | undefined,
  price: number,
  seats: number,
): number =>
  typeof expectedAmount === "number" ? expectedAmount : price * seats

export const buildReservationPricing = (
  event: { price: number; options?: string | null; currency?: string },
  seats: number,
  optionIds?: string[],
):
  | {
      optionSelections: string
      expectedAmount: number
      selectionSummary: string
    }
  | { error: string } => {
  const options = parseWorkshopOptions(event.options)
  const currency = event.currency ?? "RSD"

  if (options.length === 0) {
    return {
      optionSelections: "[]",
      expectedAmount: event.price * seats,
      selectionSummary: "",
    }
  }

  const ids =
    !optionIds || optionIds.length === 0
      ? Array.from({ length: seats }, () => options[0].id)
      : optionIds

  if (ids.length !== seats) {
    return { error: "Broj izabranih opcija mora odgovarati broju mesta." }
  }

  const byId = new Map(options.map((option) => [option.id, option]))
  const selections: OptionSelection[] = []
  for (const id of ids) {
    const option = byId.get(id)
    if (!option) {
      return { error: "Izabrana opcija nije dostupna za ovu radionicu." }
    }
    selections.push({
      optionId: option.id,
      label: option.label,
      price: option.price,
    })
  }

  const optionSelections = JSON.stringify(selections)
  return {
    optionSelections,
    expectedAmount: selections.reduce((sum, selection) => sum + selection.price, 0),
    selectionSummary: formatSelectionSummary(optionSelections, currency),
  }
}
