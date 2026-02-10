import type { GetEventsPublic } from "wasp/server/api";

const LOCATIONS = ["BELGRADE", "NOVI_SAD"] as const;

export const getEventsPublic: GetEventsPublic = async (req, res, context) => {
  const location = req.query.location as string | undefined;
  const where =
    location && LOCATIONS.includes(location as (typeof LOCATIONS)[number])
      ? { location }
      : {};

  const events = await context.entities.Event.findMany({
    where,
    orderBy: { date: "asc" as const },
    select: {
      id: true,
      title: true,
      description: true,
      location: true,
      date: true,
      startTime: true,
      endTime: true,
      ageCategory: true,
      capacity: true,
      imageUrls: true,
      price: true,
      currency: true,
      createdAt: true,
    },
  });

  const eventIds = events.map((e) => e.id);
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

  const eventsWithPlaces = events.map((e) => ({
    ...e,
    placesLeft: Math.max(0, e.capacity - (reservedByEvent[e.id] ?? 0)),
  }));

  res.json(eventsWithPlaces);
};
