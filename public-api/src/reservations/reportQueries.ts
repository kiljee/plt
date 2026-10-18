import dayjs from "dayjs";
import { HttpError } from "wasp/server";
import type { GetReservationReport } from "wasp/server/operations";
import { formatMonthLabel } from "../lib/reportFormat";
import { ActiveReservationStatuses } from "./types";

const MONTH_PATTERN = /^\d{4}-\d{2}$/;
const DEFAULT_CURRENCY = "RSD";

export type ReservationReportSummary = {
  reservationCount: number;
  seatsSum: number;
  amountPaidSum: number;
  expectedSum: number;
  unpaidSum: number;
  collectionRate: number;
  workshopCount: number;
  currency: string;
};

export type ReservationReportWorkshopRow = {
  eventId: string;
  title: string;
  date: string;
  location: string;
  reservationCount: number;
  seatsSum: number;
  amountPaidSum: number;
  expectedSum: number;
  collectionRate: number;
  currency: string;
};

export type ReservationReportResult = {
  selectedMonth: string;
  label: string;
  summary: ReservationReportSummary;
  workshopRows: ReservationReportWorkshopRow[];
};

type ReportArgs = {
  month?: string;
};

const checkAdmin = async (context: {
  user?: { id: string };
  entities: {
    User: {
      findUnique: (args: {
        where: { id: string };
        select: { isAdmin: true };
      }) => Promise<{ isAdmin: boolean } | null>;
    };
  };
}) => {
  if (!context.user) throw new HttpError(401);
  const user = await context.entities.User.findUnique({
    where: { id: context.user.id },
    select: { isAdmin: true },
  });
  if (!user?.isAdmin) {
    throw new HttpError(403, "Samo admin može videti izveštaj.");
  }
};

const resolveSelectedMonth = (input?: string): string => {
  const currentMonth = dayjs().startOf("month");
  if (!input || !MONTH_PATTERN.test(input)) {
    return currentMonth.format("YYYY-MM");
  }
  const parsed = dayjs(`${input}-01`).startOf("month");
  if (!parsed.isValid() || parsed.isAfter(currentMonth)) {
    return currentMonth.format("YYYY-MM");
  }
  return parsed.format("YYYY-MM");
};

const toCollectionRate = (paid: number, expected: number): number =>
  expected > 0 ? Math.round((paid / expected) * 1000) / 10 : 0;

export const getReservationReport: GetReservationReport<
  ReportArgs,
  ReservationReportResult
> = async (args, context) => {
  await checkAdmin(context);

  const selectedMonth = resolveSelectedMonth(args?.month);
  const monthStart = dayjs(`${selectedMonth}-01`).startOf("month");
  const monthEnd = monthStart.add(1, "month");

  const grouped = await context.entities.Reservation.groupBy({
    by: ["eventId"],
    where: {
      createdAt: { gte: monthStart.toDate(), lt: monthEnd.toDate() },
      status: { in: [...ActiveReservationStatuses] },
    },
    _count: { _all: true },
    _sum: { seats: true, amountPaid: true },
  });

  const eventIds = grouped.map((group) => group.eventId);
  const events =
    eventIds.length > 0
      ? await context.entities.Event.findMany({
          where: { id: { in: eventIds } },
          select: {
            id: true,
            title: true,
            date: true,
            location: true,
            price: true,
            currency: true,
          },
        })
      : [];

  const eventById = new Map(events.map((event) => [event.id, event]));

  const workshopRows = grouped
    .flatMap((group) => {
      const event = eventById.get(group.eventId);
      if (!event) return [];
      const seatsSum = group._sum.seats ?? 0;
      const amountPaidSum = group._sum.amountPaid ?? 0;
      const expectedSum = event.price * seatsSum;
      return [
        {
          eventId: group.eventId,
          title: event.title,
          date: event.date.toISOString(),
          location: event.location,
          reservationCount: group._count._all,
          seatsSum,
          amountPaidSum,
          expectedSum,
          collectionRate: toCollectionRate(amountPaidSum, expectedSum),
          currency: event.currency,
        },
      ];
    })
    .sort((a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf());

  const summary = workshopRows.reduce<ReservationReportSummary>(
    (acc, row) => ({
      reservationCount: acc.reservationCount + row.reservationCount,
      seatsSum: acc.seatsSum + row.seatsSum,
      amountPaidSum: acc.amountPaidSum + row.amountPaidSum,
      expectedSum: acc.expectedSum + row.expectedSum,
      unpaidSum: 0,
      collectionRate: 0,
      workshopCount: workshopRows.length,
      currency: acc.currency || row.currency,
    }),
    {
      reservationCount: 0,
      seatsSum: 0,
      amountPaidSum: 0,
      expectedSum: 0,
      unpaidSum: 0,
      collectionRate: 0,
      workshopCount: workshopRows.length,
      currency: "",
    },
  );
  summary.unpaidSum = summary.expectedSum - summary.amountPaidSum;
  summary.collectionRate = toCollectionRate(
    summary.amountPaidSum,
    summary.expectedSum,
  );
  summary.currency = summary.currency || DEFAULT_CURRENCY;

  return {
    selectedMonth,
    label: formatMonthLabel(selectedMonth),
    summary,
    workshopRows,
  };
};
