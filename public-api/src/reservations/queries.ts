import type { Prisma } from "@prisma/client";
import { type Reservation } from "wasp/entities";
import { HttpError } from "wasp/server";
import {
  type GetReservationsForEvent,
  type GetReservationsAdmin,
  type GetReservationById,
} from "wasp/server/operations";

export const getReservationsForEvent: GetReservationsForEvent<
  { eventId: string },
  Reservation[]
> = async ({ eventId }, context) => {
  if (!context.user) throw new HttpError(401);
  const user = await context.entities.User.findUnique({
    where: { id: context.user.id },
    select: { isAdmin: true },
  });
  if (!user?.isAdmin) throw new HttpError(403, "Samo admin može videti rezervacije.");
  return context.entities.Reservation.findMany({
    where: { eventId },
    orderBy: { createdAt: "desc" },
  });
};

export type GetReservationsAdminInput = {
  page?: number;
  pageSize?: number;
  search?: string;
  statusFilter?: "active" | "pending" | "confirmed" | "cancelled";
};

export type ReservationWithEvent = {
  id: string;
  status: string;
  seats: number;
  createdAt: Date;
  email: string;
  name: string | null;
  phone: string | null;
  event: { id: string; title: string; date: Date; price: number; currency: string };
};

export type GetReservationsAdminResult = {
  reservations: ReservationWithEvent[];
  totalCount: number;
};

const STATUS_MAP = {
  pending: "PENDING",
  confirmed: "CONFIRMED",
  cancelled: "CANCELLED",
} as const;

type StatusFilter = keyof typeof STATUS_MAP | "active";

export const getReservationsAdmin: GetReservationsAdmin<
  GetReservationsAdminInput,
  GetReservationsAdminResult
> = async (args, context) => {
  if (!context.user) throw new HttpError(401);

  const user = await context.entities.User.findUnique({
    where: { id: context.user.id },
    select: { isAdmin: true },
  });
  if (!user?.isAdmin) throw new HttpError(403, "Samo admin može videti rezervacije.");

  const page = Math.max(1, args?.page ?? 1);
  const pageSize = Math.min(50, Math.max(1, args?.pageSize ?? 10));
  const skip = (page - 1) * pageSize;

  const search = (typeof args?.search === "string" ? args.search : "").trim();
  const statusFilter: StatusFilter = (args?.statusFilter as StatusFilter) ?? "active";

  const activeStatuses: string[] = ["PENDING", "CONFIRMED"]
  const statusWhere: Prisma.ReservationWhereInput["status"] =
    statusFilter === "active"
      ? { in: activeStatuses }
      : STATUS_MAP[statusFilter]
        ? STATUS_MAP[statusFilter]
        : { in: activeStatuses };

  const where: Prisma.ReservationWhereInput = {
    status: statusWhere,
    ...(search
      ? {
          OR: [
            { email: { contains: search, mode: "insensitive" } },
            { name: { contains: search, mode: "insensitive" } },
            { phone: { contains: search, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  const [reservations, totalCount] = await Promise.all([
    context.entities.Reservation.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
      select: {
        id: true,
        status: true,
        seats: true,
        createdAt: true,
        email: true,
        name: true,
        phone: true,
        event: { select: { id: true, title: true, date: true, price: true, currency: true } },
      },
    }),
    context.entities.Reservation.count({ where }),
  ]);

  return { reservations, totalCount };
};


export const getReservationById: GetReservationById<
  { id: string },
  (Reservation & { event: { id: string; title: string; date: Date; price: number; currency: string } }) | null
> = async ({ id }, context) => {
  if (!context.user) throw new HttpError(401);
  const adminUser = await context.entities.User.findUnique({
    where: { id: context.user.id },
    select: { isAdmin: true },
  });
  if (!adminUser?.isAdmin) throw new HttpError(403, "Samo admin može videti rezervacije.");
  const reservation = await context.entities.Reservation.findUnique({
    where: { id },
    include: { event: { select: { id: true, title: true, date: true, price: true, currency: true } } },
  });
  return reservation;
};
