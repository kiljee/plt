import { Banknote, ClipboardList, Ticket, Wallet } from "lucide-react";
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
  const cards = [
    {
      label: "Rezervacije",
      value: data.reservationCount.toLocaleString("sr-RS"),
      hint: `${data.workshopCount} radionica u mesecu`,
      Icon: ClipboardList,
    },
    {
      label: "Prodate karte",
      value: data.seatsSum.toLocaleString("sr-RS"),
      hint: "Ukupan broj mesta",
      Icon: Ticket,
    },
    {
      label: "Očekivano",
      value: formatMoney(data.expectedSum, data.currency),
      hint: "Cena × karte",
      Icon: Wallet,
    },
    {
      label: "Uplaćeno",
      value: formatMoney(data.amountPaidSum, data.currency),
      hint:
        data.unpaidSum > 0
          ? `Nenaplaćeno ${formatMoney(data.unpaidSum, data.currency)}`
          : "Sve je naplaćeno",
      Icon: Banknote,
    },
  ];

  return (
    <div className={RESERVATION_REPORT_STYLES.kpiGrid}>
      {cards.map(({ label, value, hint, Icon }) => (
        <div key={label} className={RESERVATION_REPORT_STYLES.kpiCard}>
          <div className={RESERVATION_REPORT_STYLES.kpiHeader}>
            <span className={RESERVATION_REPORT_STYLES.kpiLabel}>{label}</span>
            <Icon className={RESERVATION_REPORT_STYLES.kpiIcon} aria-hidden />
          </div>
          <p className={RESERVATION_REPORT_STYLES.kpiValue}>{value}</p>
          <p className={RESERVATION_REPORT_STYLES.kpiHint}>{hint}</p>
          {label === "Uplaćeno" ? (
            <progress
              className={RESERVATION_REPORT_STYLES.progress}
              value={Math.min(100, Math.max(0, data.collectionRate))}
              max={100}
              aria-label={`Naplata ${data.collectionRate}%`}
            />
          ) : null}
          {label === "Uplaćeno" ? (
            <p className={RESERVATION_REPORT_STYLES.kpiHint}>
              Naplata {data.collectionRate.toLocaleString("sr-RS")}%
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
};
