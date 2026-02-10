import type { GetEventBySlugPublic } from "wasp/server/api";

const LOCATIONS = ["BELGRADE", "NOVI_SAD"] as const;
const CITY_TO_LOCATION: Record<string, (typeof LOCATIONS)[number]> = {
  beograd: "BELGRADE",
  "novi-sad": "NOVI_SAD",
};

const slugify = (s: string): string =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

const eventToSlug = (title: string, date: Date): string => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  const base = slugify(title);
  return `${base}-${day}-${month}-${year}`;
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

  const events = await context.entities.Event.findMany({
    where: { location },
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

  const count = await context.entities.Reservation.count({
    where: { eventId: event.id },
  });
  const placesLeft = Math.max(0, event.capacity - count);

  res.json({
    ...event,
    placesLeft,
  });
};
