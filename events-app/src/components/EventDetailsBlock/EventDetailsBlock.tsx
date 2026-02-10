import dayjs from "dayjs";
import "dayjs/locale/sr";
import { EVENT_DETAILS_STYLES } from "./EventDetailsBlock.styles";

dayjs.locale("sr");

interface EventDetailsBlockProps {
  date: string;
  startTime: string;
  endTime: string;
  ageCategory: string;
  location: string;
}

const LOCATION_DISPLAY: Record<string, string> = {
  BELGRADE: "Beograd",
  NOVI_SAD: "Novi Sad",
};

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
  const d = dayjs(date);
  const dayName = d.format("dddd");
  const dateFormatted = d.format("DD.MM.YYYY");

  const timeDisplay =
    startTime || endTime
      ? `${startTime || "—"} - ${endTime || "—"}`
      : "Nije navedeno";

  const values = {
    day: d.isValid() ? `${dayName} ${dateFormatted}` : "—",
    time: timeDisplay,
    age: ageCategory || "—",
    location: LOCATION_DISPLAY[location] ?? location,
  };

  return (
    <div className={`${EVENT_DETAILS_STYLES.container} ${EVENT_DETAILS_STYLES.responsive}`}>
      {DETAIL_ITEMS.map(({ label, key }, index) => {
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
            <h3 
              className={`
                ${EVENT_DETAILS_STYLES.label} 
                ${EVENT_DETAILS_STYLES.labelResponsive}
                ${isLocation ? EVENT_DETAILS_STYLES.labelWidthLocation : EVENT_DETAILS_STYLES.labelWidth}
              `}
              style={{ fontFamily: "var(--font-comfortaa), 'Comfortaa', sans-serif" }}
            >
              {label}: {values[key]}
            </h3>
          </div>
        );
      })}
    </div>
  );
};