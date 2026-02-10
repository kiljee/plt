import type { CreateReservationPublic } from "wasp/server/api";

export const createReservationPublic: CreateReservationPublic = async (
  req,
  res,
  context,
) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const body =
    typeof req.body === "object" && req.body !== null
      ? (req.body as { eventId?: string; email?: string; name?: string })
      : {};
  const eventId = body.eventId;
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const name =
    typeof body?.name === "string" ? body.name.trim() || undefined : undefined;

  if (!eventId || !email) {
    res.status(400).json({ error: "eventId i email su obavezni" });
    return;
  }

  const event = await context.entities.Event.findUnique({
    where: { id: eventId },
  });

  if (!event) {
    res.status(404).json({ error: "Događaj nije pronađen" });
    return;
  }

  const count = await context.entities.Reservation.count({
    where: { eventId },
  });
  if (count >= event.capacity) {
    res.status(400).json({ error: "Nema slobodnih mesta" });
    return;
  }

  const reservation = await context.entities.Reservation.create({
    data: {
      eventId,
      email,
      name,
    },
  });

  res.status(201).json({
    id: reservation.id,
    eventId: reservation.eventId,
    email: reservation.email,
    name: reservation.name,
    createdAt: reservation.createdAt,
  });
};
