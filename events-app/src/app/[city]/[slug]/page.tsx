import { notFound } from "next/navigation";
import { getEventBySlug, loadEventPageData } from "@/lib/api";
import { EventDetailContent } from "@/components/EventDetailContent/EventDetailContent";
import { RelatedEvents } from "@/components/RelatedEvents/RelatedEvents";
import { citySlugToLocation } from "@/lib/slug";
import { LOCATION_LABELS } from "@/types/event";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ city: string; slug: string }>;
}

export const dynamic = "force-dynamic";

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { city, slug } = await params;

  const location = citySlugToLocation(city);
  if (!location) return { title: "Događaj nije pronađen" };

  const event = await getEventBySlug(city, slug);
  if (!event) return { title: "Događaj nije pronađen" };

  const cityName = LOCATION_LABELS[location];

  const title = `${event.title} | ${cityName}`
  const description =
    event.description?.slice(0, 160) || `${event.title} - radionica u ${cityName}. Rezervišite mesto na Paleto događajima.`

  return {
    title,
    description,
    alternates: {
      canonical: `/${city}/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
    },
  }
};

export default async function EventDetailPage({ params }: PageProps) {
  const { city, slug } = await params;

  const location = citySlugToLocation(city);
  if (!location) notFound();

  const { event, events } = await loadEventPageData(city, slug, location);

  if (!event) notFound();

  return (
    <>
      <EventDetailContent event={event} />
      <RelatedEvents events={events} excludeId={event.id} />
    </>
  );
}
