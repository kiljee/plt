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

const parsePage = (p: string | undefined): number => {
  const n = parseInt(p ?? "1", 10);
  return Number.isFinite(n) && n >= 1 ? n : 1;
};

const PAGE_SIZE = 12;

export const revalidate = 120;

interface HomeProps {
  searchParams: Promise<{ location?: string; page?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const location = parseLocation(params.location);
  const page = parsePage(params.page);

  let events: Awaited<ReturnType<typeof getEvents>>["events"] = [];
  let totalCount = 0;
  let error: string | null = null;

  try {
    const result = await getEvents(location, page, PAGE_SIZE);
    events = result.events;
    totalCount = result.totalCount;
  } catch (e) {
    error = getErrorMessage(e);
  }

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  return (
    <EventCalendar
      events={events}
      totalCount={totalCount}
      currentPage={page}
      totalPages={totalPages}
      location={location}
      error={error}
    />
  );
}
