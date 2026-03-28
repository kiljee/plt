import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import type { GetEventsPublic } from "wasp/server/api";
import { parsePaginationParams } from "../lib/pagination";
import { EventStatus, EVENT_PUBLIC_SELECT, type EventPublicRow } from "./constants";

dayjs.extend(utc);

const LOCATIONS = ["BELGRADE", "NOVI_SAD"] as const;

type GetEventsPublicContext = Parameters<GetEventsPublic>[2];

const getReservedSeatsByEventId = async (
  context: GetEventsPublicContext,
  eventIds: string[],
): Promise<Record<string, number>> => {
  if (eventIds.length === 0) return {};

  const reservations = await context.entities.Reservation.findMany({
    where: {
      eventId: { in: eventIds },
      status: { in: ["PENDING", "CONFIRMED"] },
    },
    select: { eventId: true, seats: true },
  });

  const reservedByEvent: Record<string, number> = {};
  for (const r of reservations) {
    reservedByEvent[r.eventId] = (reservedByEvent[r.eventId] ?? 0) + (r.seats ?? 1);
  }
  return reservedByEvent;
};

const parseYearMonth = (
  yearRaw: string | string[] | undefined,
  monthRaw: string | string[] | undefined,
): { year: number; month: number } | null => {
  const y = typeof yearRaw === "string" ? Number(yearRaw) : NaN;
  const m = typeof monthRaw === "string" ? Number(monthRaw) : NaN;
  if (!Number.isInteger(y) || !Number.isInteger(m) || m < 1 || m > 12) return null;
  if (y < 1970 || y > 2100) return null;
  return { year: y, month: m };
};

const upcomingOrderBy = [{ date: "asc" as const }, { startTime: "asc" as const }] as const;

export const getEventsPublic: GetEventsPublic = async (req, res, context) => {
  const location = req.query.location as string | undefined;
  const locationFilter =
    location && LOCATIONS.includes(location as (typeof LOCATIONS)[number])
      ? { location }
      : {};

  const q = req.query as Record<string, string | string[] | undefined>;
  const ym = parseYearMonth(q.year, q.month);
  if (ym) {
    const monthStart = dayjs
      .utc()
      .year(ym.year)
      .month(ym.month - 1)
      .date(1)
      .startOf("day")
      .toDate();
    const monthEndExclusive = dayjs
      .utc()
      .year(ym.year)
      .month(ym.month - 1)
      .date(1)
      .add(1, "month")
      .startOf("day")
      .toDate();

    const whereMonth = {
      status: EventStatus.ACTIVE,
      ...locationFilter,
      date: { gte: monthStart, lt: monthEndExclusive },
    };

    const inMonth = (await context.entities.Event.findMany({
      where: whereMonth,
      orderBy: [...upcomingOrderBy],
      select: EVENT_PUBLIC_SELECT,
    })) as EventPublicRow[];

    const reservedByEvent = await getReservedSeatsByEventId(
      context,
      inMonth.map((e) => e.id),
    );

    const events = inMonth.map((e) => ({
      ...e,
      placesLeft: Math.max(0, e.capacity - (reservedByEvent[e.id] ?? 0)),
    }));

    res.json({ events, totalCount: events.length });
    return;
  }

  const today = dayjs.utc().startOf("day").toDate();
  const where = {
    status: EventStatus.ACTIVE,
    ...locationFilter,
    date: { gte: today },
  };
  const { pageSize, skip } = parsePaginationParams(
    req.query as Record<string, string | string[] | undefined>,
  );

  const [totalCount, page] = await Promise.all([
    context.entities.Event.count({ where }),
    context.entities.Event.findMany({
      where,
      orderBy: [...upcomingOrderBy],
      skip,
      take: pageSize,
      select: EVENT_PUBLIC_SELECT,
    }) as Promise<EventPublicRow[]>,
  ]);

  const reservedByEvent = await getReservedSeatsByEventId(
    context,
    page.map((e) => e.id),
  );

  const events = page.map((e) => ({
    ...e,
    placesLeft: Math.max(0, e.capacity - (reservedByEvent[e.id] ?? 0)),
  }));

  res.json({ events, totalCount });
};
