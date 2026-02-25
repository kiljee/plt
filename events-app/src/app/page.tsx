import { EventCalendar } from "@/components/EventCalendar/EventCalendar";
import { getEvents } from "@/lib/api";
import { EventLocation } from "@/types/event";

const getErrorMessage = (e: unknown): string => {
  const msg = e instanceof Error ? e.message : "Greška pri učitavanju.";
  if (msg.includes("API") || msg.includes("fetch")) {
    return `${msg} Proveri da li Wasp radi (wasp start) i NEXT_PUBLIC_API_URL.`;
  }
  return msg;
};


const parseLocation = (city: string | undefined): EventLocation | undefined => {
  if (city === EventLocation.BELGRADE) return EventLocation.BELGRADE;
  if (city === EventLocation.NOVI_SAD) return EventLocation.NOVI_SAD;
  return undefined;
};

export const dynamic = "force-dynamic";

interface HomeProps {
  searchParams: Promise<{ location?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const location = parseLocation(params.location);

  let events: Awaited<ReturnType<typeof getEvents>> = [];
  let error: string | null = null;

  try {
    events = await getEvents(location);
  } catch (e) {
    error = getErrorMessage(e);
  }

  return (
    <EventCalendar events={events} location={location} error={error} />
  );
}
