"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { EventLocation, type EventItem } from "@/types/event"
import { buildCalendarHref, type LocationFilter } from "@/lib/calendarHref"
import { normalizeEventItem } from "@/lib/normalizeEvent"

dayjs.extend(utc)

export { buildCalendarHref } from "@/lib/calendarHref"

const parseLocation = (raw: string | null): LocationFilter => {
  if (raw === EventLocation.BELGRADE || raw === EventLocation.NOVI_SAD) return raw
  return undefined
}

const parseYm = (
  yearRaw: string | null,
  monthRaw: string | null,
): { year: number; month: number; isValid: boolean } => {
  const y = yearRaw ? Number(yearRaw) : NaN
  const m = monthRaw ? Number(monthRaw) : NaN
  if (Number.isInteger(y) && Number.isInteger(m) && m >= 1 && m <= 12 && y >= 1970 && y <= 2100) {
    return { year: y, month: m, isValid: true }
  }
  const now = dayjs.utc()
  return { year: now.year(), month: now.month() + 1, isValid: false }
}

export const useCalendarMonth = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const { year, month, isValid } = useMemo(
    () => parseYm(searchParams.get("year"), searchParams.get("month")),
    [searchParams],
  )

  const location = useMemo(
    () => parseLocation(searchParams.get("location")),
    [searchParams],
  )

  useEffect(() => {
    if (isValid) return
    router.replace(buildCalendarHref(year, month, location), { scroll: false })
  }, [isValid, year, month, location, router])

  const [events, setEvents] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const q = new URLSearchParams()
      q.set("year", String(year))
      q.set("month", String(month))
      if (location) q.set("location", location)
      const res = await fetch(`/api/events?${q.toString()}`)
      const data = (await res.json()) as { events?: unknown[]; error?: string }
      if (!res.ok) {
        setError(data.error ?? "Greška pri učitavanju.")
        setEvents([])
        return
      }
      if (!Array.isArray(data.events)) {
        setError("Neispravan odgovor servera.")
        setEvents([])
        return
      }
      setEvents(data.events.map((row) => normalizeEventItem(row as Record<string, unknown>)))
    } catch {
      setError("Nije moguće učitati kalendar.")
      setEvents([])
    } finally {
      setLoading(false)
    }
  }, [year, month, location])

  useEffect(() => {
    void load()
  }, [load])

  const eventsByDay = useMemo(() => {
    const map = new Map<string, EventItem[]>()
    for (const ev of events) {
      const k = dayjs.utc(ev.date).format("YYYY-MM-DD")
      const list = map.get(k) ?? []
      list.push(ev)
      map.set(k, list)
    }
    for (const [, list] of map) {
      list.sort((a, b) => a.startTime.localeCompare(b.startTime))
    }
    return map
  }, [events])

  return { year, month, location, events, eventsByDay, loading, error }
}
