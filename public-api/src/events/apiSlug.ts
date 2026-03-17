import dayjs from "dayjs";
import type { GetEventBySlugPublic } from "wasp/server/api";
import { EventStatus } from "./constants";
import { eventToSlug } from "../lib/slug";

type LocationSlug = "BELGRADE" | "NOVI_SAD";
const CITY_TO_LOCATION: Record<string, LocationSlug> = {
  beograd: "BELGRADE",
  "novi-sad": "NOVI_SAD",
};

export const getEventBySlugPublic: GetEventBySlugPublic = async (
  req,
  res,
  context,
) => {
  const city = (req.query.city as string)?.toLowerCase();
  const slug = (req.query.slug as string)?.trim();

  if (!city || !slug) {
    res.status(400).json({ error: "city i slug su obavezni" });
    return;
  }

  const location = CITY_TO_LOCATION[city];
  if (!location) {
    res.status(400).json({ error: "Neispravan grad" });
    return;
  }

  const today = dayjs().startOf("day").toDate();
  const events = await context.entities.Event.findMany({
    where: {
      location,
      status: EventStatus.ACTIVE,
      date: { gte: today },
    },
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
  } as Parameters<typeof context.entities.Event.findMany>[0]);

  const event = events.find(
    (e) => eventToSlug(e.title, e.date) === slug,
  );

  if (!event) {
    res.status(404).json({ error: "Događaj nije pronađen" });
    return;
  }

  const reservations = await context.entities.Reservation.findMany({
    where: { eventId: event.id, status: { in: ["PENDING", "CONFIRMED"] } },
    select: { seats: true },
  });
  const totalReserved = reservations.reduce((s, r) => s + (r.seats ?? 1), 0);
  const placesLeft = Math.max(0, event.capacity - totalReserved);

  res.json({
    ...event,
    placesLeft,
  });
};
