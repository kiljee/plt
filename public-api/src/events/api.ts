import dayjs from "dayjs";
import type { GetEventsPublic } from "wasp/server/api";
import { parsePaginationParams } from "../lib/pagination";
import { EventStatus, EVENT_PUBLIC_SELECT, type EventPublicRow } from "./constants";

const LOCATIONS = ["BELGRADE", "NOVI_SAD"] as const;

export const getEventsPublic: GetEventsPublic = async (req, res, context) => {
  const location = req.query.location as string | undefined;
  const locationFilter =
    location && LOCATIONS.includes(location as (typeof LOCATIONS)[number])
      ? { location }
      : {};
  const where = { status: EventStatus.ACTIVE, ...locationFilter };
  const { pageSize, skip } = parsePaginationParams(
    req.query as Record<string, string | string[] | undefined>,
  );

  const today = dayjs().startOf("day").toDate();

  const [past, upcoming] = await Promise.all([
    context.entities.Event.findMany({
      where: { ...where, date: { lt: today } },
      orderBy: { date: "desc" as const },
      select: EVENT_PUBLIC_SELECT,
    }),
    context.entities.Event.findMany({
      where: { ...where, date: { gte: today } },
      orderBy: { date: "asc" as const },
      select: EVENT_PUBLIC_SELECT,
    }),
  ]);

  const all = [...past, ...upcoming] as EventPublicRow[];
  const totalCount = all.length;
  const page = all.slice(skip, skip + pageSize);

  const eventIds = page.map((e) => e.id);
  const reservations = eventIds.length > 0
    ? await context.entities.Reservation.findMany({
        where: {
          eventId: { in: eventIds },
          status: { in: ["PENDING", "CONFIRMED"] },
        },
        select: { eventId: true, seats: true },
      })
    : [];

  const reservedByEvent: Record<string, number> = {};
  for (const r of reservations) {
    reservedByEvent[r.eventId] = (reservedByEvent[r.eventId] ?? 0) + (r.seats ?? 1);
  }

  const events = page.map((e) => ({
    ...e,
    placesLeft: Math.max(0, e.capacity - (reservedByEvent[e.id] ?? 0)),
  }));

  res.json({ events, totalCount });
};
