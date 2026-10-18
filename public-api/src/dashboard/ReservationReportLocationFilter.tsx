import { EventLocation, type EventLocationType } from "../reservations/types";
import { RESERVATION_REPORT_STYLES } from "./ReservationReportPage.styles";

export type ReportLocationFilter = "all" | EventLocationType;

interface ReservationReportLocationFilterProps {
  value: ReportLocationFilter;
  counts: Record<ReportLocationFilter, number>;
  onChange: (value: ReportLocationFilter) => void;
}

const OPTIONS: { value: ReportLocationFilter; label: string }[] = [
  { value: "all", label: "Svi gradovi" },
  { value: EventLocation.BELGRADE, label: "Beograd" },
  { value: EventLocation.NOVI_SAD, label: "Novi Sad" },
];

export const ReservationReportLocationFilter = ({
  value,
  counts,
  onChange,
}: ReservationReportLocationFilterProps) => (
  <div
    className={RESERVATION_REPORT_STYLES.locationFilter}
    role="group"
    aria-label="Filter po gradu"
  >
    {OPTIONS.map((option) => {
      const isActive = value === option.value;
      return (
        <button
          key={option.value}
          type="button"
          aria-pressed={isActive}
          onClick={() => onChange(option.value)}
          className={
            isActive
              ? RESERVATION_REPORT_STYLES.locationButtonActive
              : RESERVATION_REPORT_STYLES.locationButton
          }
        >
          {option.label}
          <span className={RESERVATION_REPORT_STYLES.locationCount}>
            {counts[option.value]}
          </span>
        </button>
      );
    })}
  </div>
);
