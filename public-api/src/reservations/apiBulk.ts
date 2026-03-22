import type { CreateReservationsBulkPublic } from "wasp/server/api";
import {
  ReservationStatus,
  ActiveReservationStatuses,
  parseBulkRequestBody,
} from "./types";
import {
  sendReservationConfirmation,
  sendReservationShortEmail,
  sendAdminReservationNotification,
} from "./sendReservationConfirmation";

const sendConfirmationWithRetry = async (
  params: Parameters<typeof sendReservationConfirmation>[0],
  retries = 2,
): Promise<void> => {
  let lastError: unknown;
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      await sendReservationConfirmation(params);
      return;
    } catch (err) {
      lastError = err;
      if (process.env.NODE_ENV === "development") {
        console.warn(`[apiBulk] email attempt ${attempt + 1}/${retries} failed`, err);
      }
    }
  }
  console.error("[createReservationsBulkPublic] email failed after retries", lastError);
};

const sendShortEmailWithRetry = async (
  params: Parameters<typeof sendReservationShortEmail>[0],
  retries = 2,
): Promise<void> => {
  let lastError: unknown;
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      await sendReservationShortEmail(params);
      return;
    } catch (err) {
      lastError = err;
      if (process.env.NODE_ENV === "development") {
        console.warn(`[apiBulk] short email attempt ${attempt + 1}/${retries} failed`, err);
      }
    }
  }
  console.error("[createReservationsBulkPublic] short email failed after retries", lastError);
};

export const createReservationsBulkPublic: CreateReservationsBulkPublic =
  async (req, res, context) => {
    try {
      if (req.method !== "POST") {
        res.status(405).json({ error: "Method not allowed" });
        return;
      }

      const body: Record<string, unknown> =
        typeof req.body === "object" && req.body !== null
          ? (req.body as Record<string, unknown>)
          : {};

      const { items, email, name, phone } = parseBulkRequestBody(body);

      if (!Array.isArray(items) || items.length === 0) {
        res.status(400).json({ error: "items su obavezni" });
        return;
      }

      if (!email || typeof email !== "string") {
        res.status(400).json({ error: "email je obavezan" });
        return;
      }

      for (const item of items) {
        if (!item?.eventId || typeof item.eventId !== "string") {
          res.status(400).json({
            error: "Svaki item mora imati validan eventId",
          });
          return;
        }
        if (!Number.isInteger(item.seats) || item.seats <= 0) {
          res.status(400).json({
            error: "Broj mesta mora biti pozitivan ceo broj",
          });
          return;
        }
      }

      const normalizedEmail = email.trim().toLowerCase();
      const normalizedName = typeof name === "string" ? name.trim() || null : null;
      const normalizedPhone = typeof phone === "string" ? phone.trim() || null : null;

      const eventIds = [...new Set(items.map((i) => i.eventId))];

      const requestedByEvent = new Map<string, number>();
      for (const item of items) {
        requestedByEvent.set(
          item.eventId,
          (requestedByEvent.get(item.eventId) ?? 0) + item.seats,
        );
      }

      const events = await context.entities.Event.findMany({
        where: { id: { in: eventIds } },
      });

      const eventMap = new Map(events.map((e) => [e.id, e]));
      const missingEventIds = eventIds.filter((id) => !eventMap.has(id));

      if (missingEventIds.length > 0) {
        res.status(404).json({
          error: `Nisu pronađeni događaji: ${missingEventIds.join(", ")}`,
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
        reservedByEvent.set(
          r.eventId,
          (reservedByEvent.get(r.eventId) ?? 0) + (r.seats ?? 1),
        );
      }

      for (const [eventId, requestedSeats] of requestedByEvent.entries()) {
        const event = eventMap.get(eventId)!;
        const capacity = event.capacity;
        const alreadyReserved = reservedByEvent.get(eventId) ?? 0;

        if (!Number.isInteger(capacity) || capacity < 1) {
          res.status(400).json({
            error: `Događaj "${event.title}" nema validan kapacitet`,
          });
          return;
        }

        if (alreadyReserved + requestedSeats > capacity) {
          res.status(400).json({
            error: `Nema dovoljno mesta za "${event.title}"`,
            eventId,
            availableSeats: Math.max(0, capacity - alreadyReserved),
            requestedSeats,
          });
          return;
        }
      }

      const createdReservations =
        await context.entities.Reservation.createManyAndReturn({
          data: items.map((item) => ({
            eventId: item.eventId,
            email: normalizedEmail,
            name: normalizedName,
            phone: normalizedPhone,
            seats: item.seats,
            status: ReservationStatus.PENDING,
          })),
        });

      const reservationsWithEvent = createdReservations.map((r) => {
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

      const isBlacklisted = await context.entities.EmailBlacklist
        .findFirst({ where: { email: normalizedEmail } })
        .then((row) => !!row);

      if (isBlacklisted) {
        await sendShortEmailWithRetry({
          customerEmail: normalizedEmail,
          customerName: normalizedName ?? undefined,
        });
      } else {
        await sendConfirmationWithRetry({
          reservations: reservationsWithEvent,
          customerEmail: normalizedEmail,
          customerName: normalizedName ?? "",
          customerPhone: normalizedPhone ?? "",
        });
      }

      sendAdminReservationNotification({
        customerName: normalizedName ?? "",
        customerEmail: normalizedEmail,
        reservations: reservationsWithEvent,
      }).catch((err) =>
        console.error("[apiBulk] admin notification failed", err)
      );

      res.status(201).json({
        reservations: reservationsWithEvent.map((r) => ({
          id: r.id,
          eventId: r.eventId,
          seats: r.seats,
        })),
      });
    } catch (error) {
      console.error("[createReservationsBulkPublic] unexpected error", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
