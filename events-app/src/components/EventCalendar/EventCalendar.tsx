import type { EventItem, EventLocation } from "@/types/event";
import { LocationSwitch } from "@/components/LocationSwitch/LocationSwitch";
import { EventCard } from "@/components/EventCard/EventCard";
import { EVENT_CALENDAR } from "./EventCalendar.styles";

export type LocationFilter = EventLocation | undefined;

const INTRO_TEXT =
  "Sve radionice uključuju stručno vođstvo, neophodan materijal i neograničena pića. Grupe su male, kako bismo svakom učesniku posvetili individualnu pažnju. Na slikarskim radionicama, učesnici biraju sopstvenu temu, uz podršku tokom celog procesa stvaranja.";


interface EventCalendarProps {
  events: EventItem[];
  location: LocationFilter;
  error: string | null;
}

export const EventCalendar = ({
  events,
  location,
  error,
}: EventCalendarProps) => {
  return (
    <div className={EVENT_CALENDAR.root}>
      <main className={EVENT_CALENDAR.main}>
        <header className={EVENT_CALENDAR.header}>
          <h1 className={EVENT_CALENDAR.title}>Kalendar događaja</h1>
          <p className={EVENT_CALENDAR.intro}>{INTRO_TEXT}</p>
        </header>

        <div className={EVENT_CALENDAR.locationBar}>
          <LocationSwitch current={location} />
        </div>

        <div className={EVENT_CALENDAR.filterBar}>
          <span className={EVENT_CALENDAR.filterLabel}>
            <svg
              className={EVENT_CALENDAR.filterIcon}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
              <circle cx="6" cy="6" r="1.5" fill="currentColor" />
              <circle cx="6" cy="14" r="1.5" fill="currentColor" />
            </svg>
            Filteri
          </span>
          <span className={EVENT_CALENDAR.calendarToggle}>Kalendar</span>
          <div className={EVENT_CALENDAR.sortWrap}>
            <span>Sortiranje po:</span>
            <select className={EVENT_CALENDAR.sortSelect} defaultValue="title">
              <option value="title">Abecedi</option>
              <option value="date">Datumu</option>
            </select>
          </div>
          <span className={EVENT_CALENDAR.count}>
            {events.length} događaja
          </span>
        </div>

        {error && <p className={EVENT_CALENDAR.error}>{error}</p>}

        {!error && events.length === 0 && (
          <p className={EVENT_CALENDAR.empty}>Nema događaja za ovu lokaciju.</p>
        )}

        {!error && events.length > 0 && (
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
        )}
      </main>
    </div>
  );
};
