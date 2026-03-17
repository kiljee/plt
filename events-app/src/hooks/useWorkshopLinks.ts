"use client"

import { useState, useEffect } from "react"
import dayjs from "dayjs"
import { eventToSlug, locationToCitySlug } from "@/lib/slug"
import { EventLocation } from "@/types/event"

const API_BASE =
  typeof process !== "undefined"
    ? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001"
    : ""
const MAX_LINKS = 4

interface WorkshopLink {
  href: string
  label: string
}

interface RawEvent {
  title?: string
  date?: string
  location?: string
}

interface ValidEvent {
  title: string
  date: string
  location: string
}

const isValidEvent = (e: RawEvent): e is ValidEvent =>
  typeof e.title === "string" &&
  typeof e.date === "string" &&
  typeof e.location === "string"

const resolveLocation = (location: string): EventLocation =>
  location === EventLocation.NOVI_SAD
    ? EventLocation.NOVI_SAD
    : EventLocation.BELGRADE

const toWorkshopLink = (event: ValidEvent): WorkshopLink => ({
  href: `/${locationToCitySlug(resolveLocation(event.location))}/${eventToSlug(event.title, event.date)}`,
  label: event.title,
})

const fetchEvents = async (location: string): Promise<ValidEvent[]> => {
  const url = `${API_BASE}/api/events?location=${location}&page=1&pageSize=${MAX_LINKS}`
  const res = await fetch(url, { headers: { Accept: "application/json" } })
  if (!res.ok) return []

  const data = (await res.json()) as { events?: RawEvent[] }
  return Array.isArray(data.events) ? data.events.filter(isValidEvent) : []
}

export const useWorkshopLinks = (): WorkshopLink[] => {
  const [links, setLinks] = useState<WorkshopLink[]>([])

  useEffect(() => {
    if (!API_BASE) return

    let cancelled = false

    const run = async () => {
      try {
        const [bg, ns] = await Promise.all([
          fetchEvents(EventLocation.BELGRADE),
          fetchEvents(EventLocation.NOVI_SAD),
        ])
        if (cancelled) return

        const sorted = [...bg, ...ns].sort(
          (a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf(),
        )

        setLinks(sorted.slice(0, MAX_LINKS).map(toWorkshopLink))
      } catch {
        if (!cancelled) setLinks([])
      }
    }

    run()
    return () => { cancelled = true }
  }, [])

  return links
}
