import type { MetadataRoute } from 'next'
import { getEvents } from '@/lib/api'
import { eventToSlug, locationToCitySlug } from '@/lib/slug'
import { EventLocation } from '@/types/event'

const SITE_URL = 'https://paleto.rs'
const MAX_EVENTS = 200

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  {
    url: SITE_URL,
    changeFrequency: 'daily',
    priority: 1,
  },
  {
    url: `${SITE_URL}/about`,
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    url: `${SITE_URL}/uslovi-koriscenja`,
    changeFrequency: 'yearly',
    priority: 0.3,
  },
  {
    url: `${SITE_URL}/politika-privatnosti`,
    changeFrequency: 'yearly',
    priority: 0.3,
  },
]

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  let eventEntries: MetadataRoute.Sitemap = []

  try {
    const [belgrade, noviSad] = await Promise.all([
      getEvents(EventLocation.BELGRADE, 1, MAX_EVENTS),
      getEvents(EventLocation.NOVI_SAD, 1, MAX_EVENTS),
    ])

    const allEvents = [...belgrade.events, ...noviSad.events]

    eventEntries = allEvents.map((event) => {
      const citySlug = locationToCitySlug(event.location)
      const eventSlug = eventToSlug(event.title, event.date)
      return {
        url: `${SITE_URL}/${citySlug}/${eventSlug}`,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }
    })
  } catch {
    console.warn('Sitemap: failed to fetch events, using static routes only.')
  }

  return [...STATIC_ROUTES, ...eventEntries]
}

export default sitemap
