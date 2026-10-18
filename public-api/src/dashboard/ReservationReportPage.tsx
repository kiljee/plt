import dayjs from "dayjs";
import { Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import { getReservationReport, useQuery } from "wasp/client/operations";
import { Button } from "../components/ui/button";
import { useRequireAdmin } from "../hooks/useRequireAdmin";
import { formatMonthLabel, getMonthOptions } from "../lib/reportFormat";
import {
  buildReportSummary,
  countReservationsByLocation,
} from "../lib/reportSummary";
import { EventLocation } from "../reservations/types";
import { AdminNavLinks } from "../shared/components/AdminNavLinks";
import { useAddEventModal } from "../shared/context/AddEventModalContext";
import { ReservationReportChart } from "./ReservationReportChart";
import {
  ReservationReportLocationFilter,
  type ReportLocationFilter,
} from "./ReservationReportLocationFilter";
import { ReservationReportMonthPicker } from "./ReservationReportMonthPicker";
import { RESERVATION_REPORT_STYLES } from "./ReservationReportPage.styles";
import { ReservationReportSummaryCards } from "./ReservationReportSummaryCards";
import { ReservationReportTable } from "./ReservationReportTable";

const HISTORY_MONTHS = 24;
const REPORT_STALE_TIME_CURRENT_MONTH_MS = 30_000;
const REPORT_STALE_TIME_PAST_MONTH_MS = 5 * 60_000;
const REPORT_CACHE_TIME_MS = 10 * 60_000;

const shiftMonth = (month: string, diff: number): string =>
  dayjs(`${month}-01`).add(diff, "month").format("YYYY-MM");

export const ReservationReportPage = () => {
  const { isLoading: isAuthLoading, isAdmin } = useRequireAdmin();
  const { open: openAddEventModal } = useAddEventModal();
  const currentMonth = dayjs().format("YYYY-MM");
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [locationFilter, setLocationFilter] =
    useState<ReportLocationFilter>("all");

  const isCurrentMonth = selectedMonth === currentMonth;

  const { data, isLoading, isFetching, error, refetch } = useQuery(
    getReservationReport,
    { month: selectedMonth },
    {
      keepPreviousData: true,
      staleTime: isCurrentMonth
        ? REPORT_STALE_TIME_CURRENT_MONTH_MS
        : REPORT_STALE_TIME_PAST_MONTH_MS,
      cacheTime: REPORT_CACHE_TIME_MS,
    },
  );

  const monthOptions = useMemo(() => getMonthOptions(HISTORY_MONTHS), []);
  const oldestMonth =
    monthOptions[monthOptions.length - 1]?.value ?? currentMonth;
  const canGoPrev = selectedMonth > oldestMonth;
  const canGoNext = selectedMonth < currentMonth;
  const selectedLabel = formatMonthLabel(selectedMonth);
  const isWaiting = isFetching;
  const isUpdating = isFetching && !!data;

  const allRows = useMemo(() => data?.workshopRows ?? [], [data?.workshopRows]);
  const locationCounts = useMemo(
    () => countReservationsByLocation(allRows),
    [allRows],
  );
  const filteredRows = useMemo(
    () =>
      locationFilter === "all"
        ? allRows
        : allRows.filter((row) => row.location === locationFilter),
    [allRows, locationFilter],
  );
  const filteredSummary = useMemo(
    () => buildReportSummary(filteredRows),
    [filteredRows],
  );

  const handlePrevMonth = () => {
    if (canGoPrev) setSelectedMonth((prev) => shiftMonth(prev, -1));
  };

  const handleNextMonth = () => {
    if (canGoNext) setSelectedMonth((prev) => shiftMonth(prev, 1));
  };

  if (isAuthLoading) {
    return (
      <div className={RESERVATION_REPORT_STYLES.loadingState}>Učitavanje…</div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className={RESERVATION_REPORT_STYLES.page}>
      <div className={RESERVATION_REPORT_STYLES.container}>
        <div className={RESERVATION_REPORT_STYLES.topBar}>
          <div className={RESERVATION_REPORT_STYLES.titleBlock}>
            <h1 className={RESERVATION_REPORT_STYLES.title}>Izveštaj</h1>
            <p className={RESERVATION_REPORT_STYLES.subtitle}>
              {selectedLabel}
              {locationFilter !== "all"
                ? ` · ${locationFilter === EventLocation.BELGRADE ? "Beograd" : "Novi Sad"}`
                : ""}
            </p>
          </div>
          <AdminNavLinks
            active="report"
            orientation="horizontal"
            onAddEvent={openAddEventModal}
          />
        </div>

        <div className={RESERVATION_REPORT_STYLES.controlsRow}>
          <ReservationReportMonthPicker
            selectedMonth={selectedMonth}
            options={monthOptions}
            canGoPrev={canGoPrev}
            canGoNext={canGoNext}
            isCurrentMonth={isCurrentMonth}
            isDisabled={isLoading}
            onPrev={handlePrevMonth}
            onNext={handleNextMonth}
            onSelect={setSelectedMonth}
            onCurrent={() => setSelectedMonth(currentMonth)}
          />
          <span
            className={RESERVATION_REPORT_STYLES.controlsDivider}
            aria-hidden
          />
          <ReservationReportLocationFilter
            value={locationFilter}
            counts={locationCounts}
            onChange={setLocationFilter}
          />
          <span
            className={RESERVATION_REPORT_STYLES.fetchingSlot}
            aria-live="polite"
          >
            <span
              className={
                isWaiting
                  ? RESERVATION_REPORT_STYLES.fetchingBadge
                  : RESERVATION_REPORT_STYLES.fetchingBadgeHidden
              }
            >
              <Loader2
                className={RESERVATION_REPORT_STYLES.fetchingSpinner}
                aria-hidden
              />
              Učitavanje…
            </span>
          </span>
        </div>

        <div className={RESERVATION_REPORT_STYLES.loadingBarTrack} aria-hidden>
          {isWaiting ? (
            <div className={RESERVATION_REPORT_STYLES.loadingBarFill} />
          ) : null}
        </div>

        {error && !data ? (
          <div className={RESERVATION_REPORT_STYLES.content}>
            <div className={RESERVATION_REPORT_STYLES.errorState}>
              <p>Izveštaj trenutno ne može da se učita.</p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => void refetch()}
              >
                Pokušaj ponovo
              </Button>
            </div>
          </div>
        ) : isLoading ? (
          <div className={RESERVATION_REPORT_STYLES.content}>
            <div className={RESERVATION_REPORT_STYLES.skeletonStrip} />
            <div className={RESERVATION_REPORT_STYLES.skeletonPanel} />
          </div>
        ) : (
          <div
            className={`${RESERVATION_REPORT_STYLES.content} ${
              isUpdating ? RESERVATION_REPORT_STYLES.contentFetching : ""
            }`}
            aria-busy={isUpdating}
          >
            <ReservationReportSummaryCards summary={filteredSummary} />

            <div className={RESERVATION_REPORT_STYLES.dataGrid}>
              <section className={RESERVATION_REPORT_STYLES.chartPanel}>
                <div className={RESERVATION_REPORT_STYLES.panelHeader}>
                  <h2 className={RESERVATION_REPORT_STYLES.panelTitle}>
                    Po radionicama
                  </h2>
                  <p className={RESERVATION_REPORT_STYLES.panelDescription}>
                    top 8
                  </p>
                </div>
                <div className={RESERVATION_REPORT_STYLES.panelBody}>
                  <div className={RESERVATION_REPORT_STYLES.chartWrap}>
                    <ReservationReportChart rows={filteredRows} />
                  </div>
                </div>
              </section>

              <section className={RESERVATION_REPORT_STYLES.panel}>
                <div className={RESERVATION_REPORT_STYLES.panelHeader}>
                  <h2 className={RESERVATION_REPORT_STYLES.panelTitle}>
                    Detalji
                  </h2>
                  <p className={RESERVATION_REPORT_STYLES.panelDescription}>
                    po datumu kreiranja rezervacije
                  </p>
                </div>
                <div className={RESERVATION_REPORT_STYLES.tableWrap}>
                  <ReservationReportTable rows={filteredRows} />
                </div>
              </section>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
