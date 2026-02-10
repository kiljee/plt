import { notFound } from "next/navigation";
import { getEventBySlug, getEvents } from "@/lib/api";
import { EventDetailContent } from "@/components/EventDetailContent/EventDetailContent";
import { RelatedEvents } from "@/components/RelatedEvents/RelatedEvents";
import { citySlugToLocation } from "@/lib/slug";
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

  const cityName = location === "NOVI_SAD" ? "Novi Sad" : "Beograd";

  return {
    title: `${event.title} | ${cityName}`,
    description: event.description || `${event.title} - ${cityName}`,
    openGraph: {
      title: `${event.title} | ${cityName}`,
      description: event.description || event.title,
    },
  };
};

export default async function EventDetailPage({ params }: PageProps) {
  const { city, slug } = await params;

  const location = citySlugToLocation(city);
  if (!location) notFound();

  const [event, events] = await Promise.all([
    getEventBySlug(city, slug),
    getEvents(location),
  ]);

  if (!event) notFound();

  return (
    <>
      <EventDetailContent event={event} />
      <RelatedEvents events={events} excludeId={event.id} />
    </>
  );
}
