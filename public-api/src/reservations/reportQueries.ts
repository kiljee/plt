import dayjs from "dayjs";
import { HttpError } from "wasp/server";
import type { GetReservationReport } from "wasp/server/operations";
import { formatMonthLabel } from "../lib/reportFormat";
import { ActiveReservationStatuses } from "./types";

const MONTH_PATTERN = /^\d{4}-\d{2}$/;
const DEFAULT_CURRENCY = "RSD";
const EXCLUDED_REPORT_EMAILS = ["vignjevic23@gmail.com"];

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

  const reservations = await context.entities.Reservation.findMany({
    where: {
      createdAt: { gte: monthStart.toDate(), lt: monthEnd.toDate() },
      status: { in: [...ActiveReservationStatuses] },
      email: { notIn: EXCLUDED_REPORT_EMAILS, mode: "insensitive" },
    },
    select: {
      eventId: true,
      seats: true,
      amountPaid: true,
      expectedAmount: true,
    },
  });

  const buckets = new Map<
    string,
    {
      reservationCount: number;
      seatsSum: number;
      amountPaidSum: number;
      expectedFromStored: number;
      seatsWithoutExpected: number;
    }
  >();
  for (const reservation of reservations) {
    const bucket = buckets.get(reservation.eventId) ?? {
      reservationCount: 0,
      seatsSum: 0,
      amountPaidSum: 0,
      expectedFromStored: 0,
      seatsWithoutExpected: 0,
    };
    const seats = reservation.seats ?? 1;
    bucket.reservationCount += 1;
    bucket.seatsSum += seats;
    bucket.amountPaidSum += reservation.amountPaid ?? 0;
    if (typeof reservation.expectedAmount === "number") {
      bucket.expectedFromStored += reservation.expectedAmount;
    } else {
      bucket.seatsWithoutExpected += seats;
    }
    buckets.set(reservation.eventId, bucket);
  }

  const eventIds = [...buckets.keys()];
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

  const workshopRows = [...buckets.entries()]
    .flatMap(([eventId, bucket]) => {
      const event = eventById.get(eventId);
      if (!event) return [];
      const expectedSum =
        bucket.expectedFromStored + event.price * bucket.seatsWithoutExpected;
      return [
        {
          eventId,
          title: event.title,
          date: event.date.toISOString(),
          location: event.location,
          reservationCount: bucket.reservationCount,
          seatsSum: bucket.seatsSum,
          amountPaidSum: bucket.amountPaidSum,
          expectedSum,
          collectionRate: toCollectionRate(bucket.amountPaidSum, expectedSum),
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
