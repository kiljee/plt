import type { EventItem } from "@/types/event";
import { EVENT_LIST } from "./EventList.styles";

interface EventListProps {
  events: EventItem[];
  error: string | null;
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("sr-RS");

export const EventList = ({ events, error }: EventListProps) => {
  return (
    <div className={EVENT_LIST.root}>
      <main className={EVENT_LIST.main}>
        <h1 className={EVENT_LIST.title}>Događaji</h1>
        {error && <p className={EVENT_LIST.error}>{error}</p>}
        {!error && events.length === 0 && (
          <p className={EVENT_LIST.empty}>Nema događaja.</p>
        )}
        {!error && events.length > 0 && (
          <ul className={EVENT_LIST.list}>
            {events.map((event) => (
              <li key={event.id} className={EVENT_LIST.item}>
                <span className={EVENT_LIST.itemTitle}>{event.title}</span>
                <span className={EVENT_LIST.itemDate}>
                  {formatDate(event.createdAt)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};
