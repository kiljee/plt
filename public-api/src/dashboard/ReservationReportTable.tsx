import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import { formatMoney } from "../lib/reportFormat";
import type { ReservationReportWorkshopRow } from "../reservations/reportQueries";
import { EventLocation, type EventLocationType } from "../reservations/types";

dayjs.extend(utc);

const LOCATION_LABELS: Record<EventLocationType, string> = {
  [EventLocation.BELGRADE]: "Beograd",
  [EventLocation.NOVI_SAD]: "Novi Sad",
};

const LOCATION_ROW_CLASS: Record<EventLocationType, string> = {
  [EventLocation.BELGRADE]: "bg-[#3D6B7E]/[0.07] hover:bg-[#3D6B7E]/[0.14]",
  [EventLocation.NOVI_SAD]: "bg-[#3D6F62]/[0.07] hover:bg-[#3D6F62]/[0.14]",
};

const LOCATION_DOT_CLASS: Record<EventLocationType, string> = {
  [EventLocation.BELGRADE]: "bg-[#3D6B7E]",
  [EventLocation.NOVI_SAD]: "bg-[#3D6F62]",
};

const DEFAULT_ROW_CLASS = "hover:bg-muted/30";

interface ReservationReportTableProps {
  rows: ReservationReportWorkshopRow[];
}

const isEventLocation = (location: string): location is EventLocationType =>
  location === EventLocation.BELGRADE || location === EventLocation.NOVI_SAD;

const getLocationLabel = (location: string): string =>
  isEventLocation(location) ? LOCATION_LABELS[location] : location;

const getRowClass = (location: string): string =>
  isEventLocation(location) ? LOCATION_ROW_CLASS[location] : DEFAULT_ROW_CLASS;

const getDiffClass = (diff: number): string =>
  diff < 0 ? "text-amber-600" : diff > 0 ? "text-emerald-600" : "";

export const ReservationReportTable = ({
  rows,
}: ReservationReportTableProps) => {
  if (rows.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-muted-foreground">
        Nema rezervacija za izabrani mesec.
      </p>
    );
  }

  const totals = rows.reduce(
    (acc, row) => ({
      reservationCount: acc.reservationCount + row.reservationCount,
      seatsSum: acc.seatsSum + row.seatsSum,
      expectedSum: acc.expectedSum + row.expectedSum,
      amountPaidSum: acc.amountPaidSum + row.amountPaidSum,
      currency: acc.currency || row.currency,
    }),
    {
      reservationCount: 0,
      seatsSum: 0,
      expectedSum: 0,
      amountPaidSum: 0,
      currency: "",
    },
  );
  const totalDiff = totals.amountPaidSum - totals.expectedSum;
  const totalRate =
    totals.expectedSum > 0
      ? Math.round((totals.amountPaidSum / totals.expectedSum) * 1000) / 10
      : 0;

  return (
    <table className="w-full min-w-[620px] text-left text-[13px]">
      <thead className="sticky top-0 border-b bg-muted/60 text-xs uppercase tracking-wide text-muted-foreground">
        <tr>
          <th className="px-2.5 py-2 font-medium">Radionica</th>
          <th className="px-2.5 py-2 font-medium">Datum</th>
          <th className="px-2.5 py-2 font-medium">Lokacija</th>
          <th
            className="px-2.5 py-2 text-right font-medium"
            title="Broj rezervacija"
          >
            Rez.
          </th>
          <th
            className="px-2.5 py-2 text-right font-medium"
            title="Ukupan broj mesta iz tih rezervacija"
          >
            Mesta
          </th>
          <th className="px-2.5 py-2 text-right font-medium">Očekivano</th>
          <th className="px-2.5 py-2 text-right font-medium">Uplaćeno</th>
          <th className="px-2.5 py-2 text-right font-medium">Naplata</th>
          <th className="px-2.5 py-2 text-right font-medium">Razlika</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => {
          const diff = row.amountPaidSum - row.expectedSum;
          return (
            <tr
              key={row.eventId}
              className={`border-b transition-colors last:border-0 ${getRowClass(row.location)}`}
            >
              <td
                className="max-w-[170px] truncate px-2.5 py-2 font-medium"
                title={row.title}
              >
                {row.title}
              </td>
              <td className="whitespace-nowrap px-2.5 py-2">
                {dayjs.utc(row.date).format("DD.MM.YYYY")}
              </td>
              <td className="px-2.5 py-2">
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                  {isEventLocation(row.location) ? (
                    <span
                      className={`h-2 w-2 shrink-0 rounded-full ${LOCATION_DOT_CLASS[row.location]}`}
                      aria-hidden
                    />
                  ) : null}
                  {getLocationLabel(row.location)}
                </span>
              </td>
              <td className="px-2.5 py-2 text-right tabular-nums">
                {row.reservationCount}
              </td>
              <td className="px-2.5 py-2 text-right tabular-nums">
                {row.seatsSum}
              </td>
              <td className="px-2.5 py-2 text-right tabular-nums">
                {formatMoney(row.expectedSum, row.currency)}
              </td>
              <td className="px-2.5 py-2 text-right tabular-nums">
                {formatMoney(row.amountPaidSum, row.currency)}
              </td>
              <td className="px-2.5 py-2 text-right tabular-nums">
                {row.collectionRate.toLocaleString("sr-RS")}%
              </td>
              <td
                className={`px-2.5 py-2 text-right tabular-nums ${getDiffClass(diff)}`}
              >
                {formatMoney(diff, row.currency)}
              </td>
            </tr>
          );
        })}
      </tbody>
      <tfoot className="border-t bg-muted/40 font-medium">
        <tr>
          <td className="px-2.5 py-2" colSpan={3}>
            Ukupno ({rows.length} radionica)
          </td>
          <td className="px-2.5 py-2 text-right tabular-nums">
            {totals.reservationCount}
          </td>
          <td className="px-2.5 py-2 text-right tabular-nums">
            {totals.seatsSum}
          </td>
          <td className="px-2.5 py-2 text-right tabular-nums">
            {formatMoney(totals.expectedSum, totals.currency)}
          </td>
          <td className="px-2.5 py-2 text-right tabular-nums">
            {formatMoney(totals.amountPaidSum, totals.currency)}
          </td>
          <td className="px-2.5 py-2 text-right tabular-nums">
            {totalRate.toLocaleString("sr-RS")}%
          </td>
          <td
            className={`px-2.5 py-2 text-right tabular-nums ${getDiffClass(totalDiff)}`}
          >
            {formatMoney(totalDiff, totals.currency)}
          </td>
        </tr>
      </tfoot>
    </table>
  );
};
