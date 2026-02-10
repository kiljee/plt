import type { GetEventsPublic } from "wasp/server/api";

const LOCATIONS = ["BELGRADE", "NOVI_SAD"] as const;

export const getEventsPublic: GetEventsPublic = async (req, res, context) => {
  const location = req.query.location as string | undefined;
  const where =
    location && LOCATIONS.includes(location as (typeof LOCATIONS)[number])
      ? { location }
      : {};

  const findManyArg = {
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
  };
  const events = await context.entities.Event.findMany(
    findManyArg as Parameters<typeof context.entities.Event.findMany>[0],
  );
  res.json(events);
};
