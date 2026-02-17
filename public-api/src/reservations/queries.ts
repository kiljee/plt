import type { Prisma } from "@prisma/client";
import { type Reservation } from "wasp/entities";
import { HttpError } from "wasp/server";
import {
  type GetReservationsForEvent,
  type GetReservationsAdmin,
  type GetReservationById,
} from "wasp/server/operations";
import {
  StatusFilter,
  type StatusFilterType,
  ReservationStatus,
  ActiveReservationStatuses,
} from "./types";

const FILTER_TO_STATUS: Record<Exclude<StatusFilterType, "ACTIVE">, string> = {
  [StatusFilter.PENDING]: ReservationStatus.PENDING,
  [StatusFilter.CONFIRMED]: ReservationStatus.CONFIRMED,
  [StatusFilter.CANCELLED]: ReservationStatus.CANCELLED,
};

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;
const MAX_PAGE_SIZE = 50;

const RESERVATION_SELECT = {
  id: true,
  status: true,
  seats: true,
  createdAt: true,
  email: true,
  name: true,
  phone: true,
  event: { select: { id: true, title: true, date: true, price: true, currency: true } },
} as const;

const checkAdmin = async (
  context: { user?: { id: string }; entities: { User: { findUnique: (args: { where: { id: string }; select: { isAdmin: true } }) => Promise<{ isAdmin: boolean } | null> } } },
) => {
  if (!context.user) throw new HttpError(401);
  const user = await context.entities.User.findUnique({
    where: { id: context.user.id },
    select: { isAdmin: true },
  });
  if (!user?.isAdmin) throw new HttpError(403, "Samo admin može videti rezervacije.");
};

const buildStatusWhere = (filter: StatusFilterType): Prisma.ReservationWhereInput["status"] => {
  if (filter === StatusFilter.ACTIVE) return { in: [...ActiveReservationStatuses] };
  const status = FILTER_TO_STATUS[filter];
  return status ?? { in: [...ActiveReservationStatuses] };
};

const buildWhere = (args: GetReservationsAdminInput): Prisma.ReservationWhereInput => {
  const filter = (args?.statusFilter as StatusFilterType) ?? StatusFilter.ACTIVE;
  const search = (typeof args?.search === "string" ? args.search : "").trim();

  return {
    status: buildStatusWhere(filter),
    ...(args?.eventId ? { eventId: args.eventId } : {}),
    ...(search
      ? {
          OR: [
            { id: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
            { name: { contains: search, mode: "insensitive" } },
            { phone: { contains: search, mode: "insensitive" } },
          ],
        }
      : {}),
  };
};

export const getReservationsForEvent: GetReservationsForEvent<
  { eventId: string },
  Reservation[]
> = async ({ eventId }, context) => {
  await checkAdmin(context);
  return context.entities.Reservation.findMany({
    where: { eventId },
    orderBy: { createdAt: "desc" },
  });
};

export type GetReservationsAdminInput = {
  page?: number;
  pageSize?: number;
  search?: string;
  statusFilter?: StatusFilterType;
  eventId?: string;
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

export const getReservationsAdmin: GetReservationsAdmin<
  GetReservationsAdminInput,
  GetReservationsAdminResult
> = async (args, context) => {
  await checkAdmin(context);

  const page = Math.max(DEFAULT_PAGE, args?.page ?? DEFAULT_PAGE);
  const pageSize = Math.min(MAX_PAGE_SIZE, Math.max(1, args?.pageSize ?? DEFAULT_PAGE_SIZE));
  const skip = (page - 1) * pageSize;
  const where = buildWhere(args);

  const [reservations, totalCount] = await Promise.all([
    context.entities.Reservation.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
      select: RESERVATION_SELECT,
    }),
    context.entities.Reservation.count({ where }),
  ]);

  return { reservations, totalCount };
};


export const getReservationById: GetReservationById<
  { id: string },
  (Reservation & { event: { id: string; title: string; date: Date; price: number; currency: string } }) | null
> = async ({ id }, context) => {
  await checkAdmin(context);
  const reservation = await context.entities.Reservation.findUnique({
    where: { id },
    include: { event: { select: { id: true, title: true, date: true, price: true, currency: true } } },
  });
  return reservation;
};
