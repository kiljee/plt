import type { EventItem } from "@/types/event";
import { EventCard } from "@/components/EventCard/EventCard";
import { RELATED_EVENTS_STYLES } from "./RelatedEvents.styles";

interface RelatedEventsProps {
  events: EventItem[];
  excludeId: string;
}

export const RelatedEvents = ({ events, excludeId }: RelatedEventsProps) => {
  const related = events.filter((e) => e.id !== excludeId).slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className={RELATED_EVENTS_STYLES.section}>
      <div className={RELATED_EVENTS_STYLES.container}>
        <h2
          className={RELATED_EVENTS_STYLES.title}
          style={{ fontFamily: "var(--font-comfortaa), 'Comfortaa', sans-serif" }}
        >
          Slični događaji
        </h2>
        <div className={RELATED_EVENTS_STYLES.grid}>
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
      </div>
    </section>
  );
};
