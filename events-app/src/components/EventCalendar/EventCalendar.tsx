import type { EventItem, EventLocation } from "@/types/event";
import { LocationSwitch } from "@/components/LocationSwitch/LocationSwitch";
import { EventCard } from "@/components/EventCard/EventCard";
import { Pagination } from "@/components/Pagination/Pagination";
import { EVENT_CALENDAR } from "./EventCalendar.styles";

export type LocationFilter = EventLocation | undefined;

const INTRO_TEXT =
  "Sve radionice uključuju stručno vođstvo, neophodan materijal i neograničena pića. Grupe su male, kako bismo svakom učesniku posvetili individualnu pažnju. Na slikarskim radionicama učesnici biraju sopstvenu temu, uz podršku tokom celog procesa stvaranja.";

const buildPageHref = (location: LocationFilter, page: number): string => {
  const params = new URLSearchParams();
  if (location) params.set("location", location);
  if (page > 1) params.set("page", String(page));
  const q = params.toString();
  return q ? `/?${q}` : "/";
};

interface EventCalendarProps {
  events: EventItem[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  location: LocationFilter;
  error: string | null;
}

export const EventCalendar = ({
  events,
  totalCount,
  currentPage,
  totalPages,
  location,
  error,
}: EventCalendarProps) => {
  const getPageHref = (page: number) => buildPageHref(location, page);

  return (
    <div className={EVENT_CALENDAR.root}>
      <main className={EVENT_CALENDAR.main}>
        <header className={EVENT_CALENDAR.header}>
          <h1 className={EVENT_CALENDAR.title}>Događaji</h1>
          <p className={EVENT_CALENDAR.intro}>{INTRO_TEXT}</p>
        </header>

        <div className={EVENT_CALENDAR.locationBar}>
          <LocationSwitch current={location} />
        </div>

        <div className={EVENT_CALENDAR.countBar}>
          <span className={EVENT_CALENDAR.count}>
            {totalCount} događaja
          </span>
        </div>

        {error && <p className={EVENT_CALENDAR.error}>{error}</p>}

        {!error && events.length === 0 && (
          <p className={EVENT_CALENDAR.empty}>Nema događaja za ovu lokaciju.</p>
        )}

        {!error && events.length > 0 && (
          <>
            <div className={EVENT_CALENDAR.grid}>
              {events.map((event) => {
                const soldOut = (event.placesLeft ?? event.capacity) <= 0;

                return (
                  <EventCard
                    key={event.id}
                    event={event}
                    soldOut={soldOut}
                  />
                );
              })}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              getPageHref={getPageHref}
            />
          </>
        )}
      </main>
    </div>
  );
};
