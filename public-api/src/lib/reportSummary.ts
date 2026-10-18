import type {
  ReservationReportSummary,
  ReservationReportWorkshopRow,
} from "../reservations/reportQueries";
import { EventLocation } from "../reservations/types";

const DEFAULT_CURRENCY = "RSD";

export const countReservationsByLocation = (
  rows: ReservationReportWorkshopRow[],
) => ({
  all: rows.reduce((sum, row) => sum + row.reservationCount, 0),
  [EventLocation.BELGRADE]: rows
    .filter((row) => row.location === EventLocation.BELGRADE)
    .reduce((sum, row) => sum + row.reservationCount, 0),
  [EventLocation.NOVI_SAD]: rows
    .filter((row) => row.location === EventLocation.NOVI_SAD)
    .reduce((sum, row) => sum + row.reservationCount, 0),
});

export const buildReportSummary = (
  rows: ReservationReportWorkshopRow[],
): ReservationReportSummary => {
  const summary = rows.reduce(
    (acc, row) => ({
      reservationCount: acc.reservationCount + row.reservationCount,
      seatsSum: acc.seatsSum + row.seatsSum,
      amountPaidSum: acc.amountPaidSum + row.amountPaidSum,
      expectedSum: acc.expectedSum + row.expectedSum,
      currency: acc.currency || row.currency,
    }),
    {
      reservationCount: 0,
      seatsSum: 0,
      amountPaidSum: 0,
      expectedSum: 0,
      currency: "",
    },
  );
  const currency = summary.currency || DEFAULT_CURRENCY;

  return {
    ...summary,
    currency,
    unpaidSum: summary.expectedSum - summary.amountPaidSum,
    collectionRate:
      summary.expectedSum > 0
        ? Math.round((summary.amountPaidSum / summary.expectedSum) * 1000) / 10
        : 0,
    workshopCount: rows.length,
  };
};
