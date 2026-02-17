import type { CreateReservationsBulkPublic } from "wasp/server/api";
import {
  ReservationStatus,
  ActiveReservationStatuses,
  parseBulkRequestBody,
} from "./types";
import { sendReservationConfirmation } from "./sendReservationConfirmation";

export const createReservationsBulkPublic: CreateReservationsBulkPublic =
  async (req, res, context) => {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    const body: object =
      typeof req.body === "object" && req.body !== null ? req.body : {};
    const { items, email, name, phone } = parseBulkRequestBody(body);

    console.log("[apiBulk] parsed:", { items, email, name, phone });

    if (!items?.length || !email) {
      console.log("[apiBulk] 400: items ili email nedostaju");
      res.status(400).json({ error: "items i email su obavezni" });
      return;
    }

    const eventIds = [...new Set(items.map((i) => i.eventId))];

    const events = await context.entities.Event.findMany({
      where: { id: { in: eventIds } },
    });

    const eventMap = new Map(events.map((e) => [e.id, e]));
    const missingEventId = eventIds.find((id) => !eventMap.has(id));
    if (missingEventId) {
      console.log("[apiBulk] 404: događaj nije pronađen:", missingEventId);
      res.status(404).json({
        error: `Događaj ${missingEventId} nije pronađen`,
      });
      return;
    }

    const existingReservations = await context.entities.Reservation.findMany({
      where: {
        eventId: { in: eventIds },
        status: { in: [...ActiveReservationStatuses] },
      },
    });

    const reservedByEvent = new Map<string, number>();
    for (const r of existingReservations) {
      const current = reservedByEvent.get(r.eventId) ?? 0;
      reservedByEvent.set(r.eventId, current + (r.seats ?? 1));
    }

    for (const item of items) {
      const event = eventMap.get(item.eventId)!;
      const totalReserved = reservedByEvent.get(item.eventId) ?? 0;

      if (totalReserved + item.seats > event.capacity) {
        console.log("[apiBulk] 400: nema mesta", {
          eventId: item.eventId,
          eventTitle: event.title,
          totalReserved,
          requested: item.seats,
          capacity: event.capacity,
        });
        res.status(400).json({
          error: `Nema dovoljno mesta za "${event.title}"`,
        });
        return;
      }

      reservedByEvent.set(
        item.eventId,
        (reservedByEvent.get(item.eventId) ?? 0) + item.seats
      );
    }

    const created = await context.entities.Reservation.createManyAndReturn({
      data: items.map((item) => ({
        eventId: item.eventId,
        email,
        name,
        phone,
        seats: item.seats,
        status: ReservationStatus.PENDING,
      })),
    });

    const reservationsWithEvent = created.map((r) => {
      const event = eventMap.get(r.eventId)!;
      return {
        id: r.id,
        eventId: r.eventId,
        seats: r.seats ?? 1,
        createdAt: r.createdAt,
        event: {
          title: event.title,
          date: event.date,
          startTime: event.startTime,
          price: event.price,
          currency: event.currency,
          location: event.location,
        },
      };
    });

    await sendReservationConfirmation({
      reservations: reservationsWithEvent,
      customerEmail: email,
      customerName: name,
      customerPhone: phone,
    });

    res.status(201).json({
      reservations: reservationsWithEvent.map((r) => ({
        id: r.id,
        eventId: r.eventId,
        seats: r.seats,
      })),
    });
  };
