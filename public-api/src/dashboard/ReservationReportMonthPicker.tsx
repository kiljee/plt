import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/button";
import type { MonthOption } from "../lib/reportFormat";
import { RESERVATION_REPORT_STYLES } from "./ReservationReportPage.styles";

interface ReservationReportMonthPickerProps {
  selectedMonth: string;
  options: MonthOption[];
  canGoPrev: boolean;
  canGoNext: boolean;
  isCurrentMonth: boolean;
  isDisabled: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (month: string) => void;
  onCurrent: () => void;
}

export const ReservationReportMonthPicker = ({
  selectedMonth,
  options,
  canGoPrev,
  canGoNext,
  isCurrentMonth,
  isDisabled,
  onPrev,
  onNext,
  onSelect,
  onCurrent,
}: ReservationReportMonthPickerProps) => (
  <div className={RESERVATION_REPORT_STYLES.toolbar}>
    <Button
      type="button"
      variant="outline"
      size="icon"
      className={RESERVATION_REPORT_STYLES.navButton}
      onClick={onPrev}
      disabled={!canGoPrev || isDisabled}
      aria-label="Prethodni mesec"
    >
      <ChevronLeft aria-hidden />
    </Button>
    <select
      className={RESERVATION_REPORT_STYLES.monthSelect}
      value={selectedMonth}
      onChange={(event) => onSelect(event.target.value)}
      aria-label="Izaberi mesec izveštaja"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <Button
      type="button"
      variant="outline"
      size="icon"
      className={RESERVATION_REPORT_STYLES.navButton}
      onClick={onNext}
      disabled={!canGoNext || isDisabled}
      aria-label="Sledeći mesec"
    >
      <ChevronRight aria-hidden />
    </Button>
    <Button
      type="button"
      variant={isCurrentMonth ? "secondary" : "default"}
      size="sm"
      className={RESERVATION_REPORT_STYLES.currentMonthButton}
      onClick={onCurrent}
      disabled={isCurrentMonth}
    >
      Ovaj mesec
    </Button>
  </div>
);
