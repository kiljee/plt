import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { getReservationReport, useQuery } from "wasp/client/operations";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useRequireAdmin } from "../hooks/useRequireAdmin";
import { formatMonthLabel, getMonthOptions } from "../lib/reportFormat";
import { AdminNavLinks } from "../shared/components/AdminNavLinks";
import { useAddEventModal } from "../shared/context/AddEventModalContext";
import { ReservationReportChart } from "./ReservationReportChart";
import { ReservationReportMonthPicker } from "./ReservationReportMonthPicker";
import { RESERVATION_REPORT_STYLES } from "./ReservationReportPage.styles";
import { ReservationReportSummaryCards } from "./ReservationReportSummaryCards";
import { ReservationReportTable } from "./ReservationReportTable";

const HISTORY_MONTHS = 24;
const SKELETON_CARDS = [1, 2, 3, 4];

const shiftMonth = (month: string, diff: number): string =>
  dayjs(`${month}-01`).add(diff, "month").format("YYYY-MM");

export const ReservationReportPage = () => {
  const { isLoading: isAuthLoading, isAdmin } = useRequireAdmin();
  const { open: openAddEventModal } = useAddEventModal();
  const currentMonth = dayjs().format("YYYY-MM");
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const { data, isLoading, isFetching, error, refetch } = useQuery(
    getReservationReport,
    { month: selectedMonth },
  );

  const monthOptions = useMemo(() => getMonthOptions(HISTORY_MONTHS), []);
  const oldestMonth =
    monthOptions[monthOptions.length - 1]?.value ?? currentMonth;
  const canGoPrev = selectedMonth > oldestMonth;
  const canGoNext = selectedMonth < currentMonth;
  const isCurrentMonth = selectedMonth === currentMonth;
  const selectedLabel = data?.label ?? formatMonthLabel(selectedMonth);
  const isUpdating = isFetching && !isLoading;

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
        <div className={RESERVATION_REPORT_STYLES.layout}>
          <div className={RESERVATION_REPORT_STYLES.main}>
            <div className={RESERVATION_REPORT_STYLES.headerRow}>
              <div>
                <h1 className={RESERVATION_REPORT_STYLES.title}>Izveštaj</h1>
                <p className={RESERVATION_REPORT_STYLES.subtitle}>
                  Rezervacije kreirane u izabranom mesecu, grupisane po
                  radionicama.
                </p>
              </div>
              {isUpdating ? (
                <span className={RESERVATION_REPORT_STYLES.fetchingBadge}>
                  <span className={RESERVATION_REPORT_STYLES.fetchingDot} />
                  Ažuriranje…
                </span>
              ) : null}
            </div>

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

            {error ? (
              <Card>
                <CardContent className={RESERVATION_REPORT_STYLES.errorState}>
                  <p>Izveštaj trenutno ne može da se učita.</p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => void refetch()}
                  >
                    Pokušaj ponovo
                  </Button>
                </CardContent>
              </Card>
            ) : isLoading ? (
              <>
                <div className={RESERVATION_REPORT_STYLES.skeletonGrid}>
                  {SKELETON_CARDS.map((item) => (
                    <div
                      key={item}
                      className={RESERVATION_REPORT_STYLES.skeletonCard}
                    />
                  ))}
                </div>
                <div className={RESERVATION_REPORT_STYLES.skeletonBlock} />
              </>
            ) : (
              <div
                className={`${RESERVATION_REPORT_STYLES.content} ${
                  isUpdating ? RESERVATION_REPORT_STYLES.contentFetching : ""
                }`}
                aria-busy={isUpdating}
              >
                <ReservationReportSummaryCards summary={data?.summary} />

                <Card>
                  <CardHeader>
                    <CardTitle>Radionice — {selectedLabel}</CardTitle>
                    <CardDescription>
                      Najviše rezervacija u izabranom mesecu (do 8 radionica)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className={RESERVATION_REPORT_STYLES.chartWrap}>
                      <ReservationReportChart rows={data?.workshopRows ?? []} />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>
                      Detalji po radionicama — {selectedLabel}
                    </CardTitle>
                    <CardDescription>
                      Datum rezervacije (kreiranja), ne datum održavanja
                      radionice
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className={RESERVATION_REPORT_STYLES.tableWrap}>
                      <ReservationReportTable rows={data?.workshopRows ?? []} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          <aside className="order-first lg:order-last">
            <Card className={RESERVATION_REPORT_STYLES.asideCard}>
              <CardHeader>
                <CardTitle className={RESERVATION_REPORT_STYLES.asideTitle}>
                  Meni
                </CardTitle>
                <CardDescription>Brza navigacija</CardDescription>
              </CardHeader>
              <CardContent>
                <AdminNavLinks active="report" onAddEvent={openAddEventModal} />
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
};
