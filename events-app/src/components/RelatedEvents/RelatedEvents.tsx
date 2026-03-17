import type { EventItem } from "@/types/event";
import { EventCard } from "@/components/EventCard/EventCard";
import { EVENT_CALENDAR } from "@/components/EventCalendar/EventCalendar.styles";

interface RelatedEventsProps {
  events: EventItem[];
  excludeId: string;
}

export const RelatedEvents = ({ events, excludeId }: RelatedEventsProps) => {
  const related = events.filter((e) => e.id !== excludeId).slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="bg-white mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <h2 className="mb-6 text-2xl font-bold text-zinc-900">
        Slični događaji
      </h2>
      <div className={EVENT_CALENDAR.grid}>
        {related.map((event) => {
          const soldOut = (event.placesLeft ?? event.capacity) <= 0;
          return (
            <EventCard
              key={event.id}
              event={event}
              soldOut={soldOut}
              headingLevel={3}
            />
          );
        })}
      </div>
    </section>
  );
};
