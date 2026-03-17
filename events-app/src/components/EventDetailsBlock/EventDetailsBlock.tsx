import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/sr";
import {
  EventLocation,
  LOCATION_LABELS,
  getAgeCategoryLabel,
} from "@/types/event";
import { EVENT_DETAILS_STYLES } from "./EventDetailsBlock.styles";

dayjs.extend(utc);
dayjs.locale("sr");

interface EventDetailsBlockProps {
  date: string;
  startTime: string;
  endTime: string;
  ageCategory: string;
  location: EventLocation | string;
}

const DETAIL_ITEMS = [
  { label: "Dan", key: "day" as const },
  { label: "Vreme", key: "time" as const },
  { label: "Starosna grupa", key: "age" as const },
  { label: "Lokacija", key: "location" as const },
];

export const EventDetailsBlock = ({
  date,
  startTime,
  endTime,
  ageCategory,
  location,
}: EventDetailsBlockProps) => {
  const locationLabel =
    location in LOCATION_LABELS
      ? LOCATION_LABELS[location as EventLocation]
      : location;
  const d = dayjs.utc(date);
  const dayName = d.locale("sr").format("dddd");
  const dateFormatted = d.format("DD.MM.YYYY");

  const timeDisplay =
    startTime || endTime
      ? `${startTime || "—"} - ${endTime || "—"}`
      : "Nije navedeno";

  const values = {
    day: d.isValid() ? `${dayName} ${dateFormatted}` : "—",
    time: timeDisplay,
    age: ageCategory ? getAgeCategoryLabel(ageCategory) : "—",
    location: locationLabel,
  };

  return (
    <div className={`${EVENT_DETAILS_STYLES.container} ${EVENT_DETAILS_STYLES.responsive}`}>
      {DETAIL_ITEMS.map(({ label, key }) => {
        const isLocation = key === "location";
        return (
          <div
            key={key}
            className={`
              ${EVENT_DETAILS_STYLES.item.wrapper}
              ${EVENT_DETAILS_STYLES.item.responsive}
              ${isLocation ? EVENT_DETAILS_STYLES.item.widthLocation : EVENT_DETAILS_STYLES.item.width}
              ${EVENT_DETAILS_STYLES.item.height}
            `}
          >
            <span
              className={`
                ${EVENT_DETAILS_STYLES.label}
                ${EVENT_DETAILS_STYLES.labelResponsive}
                ${isLocation ? EVENT_DETAILS_STYLES.labelWidthLocation : EVENT_DETAILS_STYLES.labelWidth}
              `}
              style={{ fontFamily: "var(--font-comfortaa), 'Comfortaa', sans-serif" }}
            >
              {label}: {values[key]}
            </span>
          </div>
        );
      })}
    </div>
  );
};