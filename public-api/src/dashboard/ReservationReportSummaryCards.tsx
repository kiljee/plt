import { formatMoney } from "../lib/reportFormat";
import type { ReservationReportSummary } from "../reservations/reportQueries";
import { RESERVATION_REPORT_STYLES } from "./ReservationReportPage.styles";

interface ReservationReportSummaryCardsProps {
  summary?: ReservationReportSummary;
}

const EMPTY_SUMMARY: ReservationReportSummary = {
  reservationCount: 0,
  seatsSum: 0,
  amountPaidSum: 0,
  expectedSum: 0,
  unpaidSum: 0,
  collectionRate: 0,
  workshopCount: 0,
  currency: "RSD",
};

export const ReservationReportSummaryCards = ({
  summary,
}: ReservationReportSummaryCardsProps) => {
  const data = summary ?? EMPTY_SUMMARY;
  const stats = [
    {
      label: "Rezervacije",
      value: data.reservationCount.toLocaleString("sr-RS"),
      hint: `${data.workshopCount} radionica`,
    },
    {
      label: "Karte",
      value: data.seatsSum.toLocaleString("sr-RS"),
      hint: "prodatih mesta",
    },
    {
      label: "Očekivano",
      value: formatMoney(data.expectedSum, data.currency),
      hint: "cena × karte",
    },
    {
      label: "Uplaćeno",
      value: formatMoney(data.amountPaidSum, data.currency),
      hint:
        data.unpaidSum > 0
          ? `naplata ${data.collectionRate.toLocaleString("sr-RS")}% · fali ${formatMoney(data.unpaidSum, data.currency)}`
          : `naplata ${data.collectionRate.toLocaleString("sr-RS")}%`,
    },
  ];

  return (
    <div className={RESERVATION_REPORT_STYLES.kpiStrip}>
      {stats.map((stat) => (
        <div key={stat.label} className={RESERVATION_REPORT_STYLES.kpiCell}>
          <p className={RESERVATION_REPORT_STYLES.kpiLabel}>{stat.label}</p>
          <p className={RESERVATION_REPORT_STYLES.kpiValue}>{stat.value}</p>
          <p className={RESERVATION_REPORT_STYLES.kpiHint}>{stat.hint}</p>
          {stat.label === "Uplaćeno" ? (
            <progress
              className={RESERVATION_REPORT_STYLES.progress}
              value={Math.min(100, Math.max(0, data.collectionRate))}
              max={100}
              aria-label={`Naplata ${data.collectionRate}%`}
            />
          ) : null}
        </div>
      ))}
    </div>
  );
};
