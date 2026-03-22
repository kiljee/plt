import { type Event } from "wasp/entities"
import { type _Event, type _User, type AuthenticatedQueryDefinition } from "wasp/server/_types"
import { type GetMe, type GetAdminEvents } from "wasp/server/operations"
import { HttpError } from "wasp/server"
import { EventStatus } from "./constants";
import type { EventLocationType } from "../reservations/types";

const DEFAULT_PAGE_SIZE = 10;
const MAX_PAGE_SIZE = 50;

export type GetAdminEventsInput = {
  page?: number;
  pageSize?: number;
  statusFilter?: EventStatus;
  locationFilter?: EventLocationType;
};

export type GetAdminEventsResult = {
  events: Event[];
  totalCount: number;
};

type AdminEventById = AuthenticatedQueryDefinition<
  [_Event, _User],
  { id: string },
  Event
>;

export type MeResult = { isAdmin: boolean; isSuperAdmin: boolean } | null;

export const getMe: GetMe<void, MeResult> = async (_args, context) => {
  if (!context.user) return null;
  const user = await context.entities.User.findUnique({
    where: { id: context.user.id },
    select: { isAdmin: true, isSuperAdmin: true },
  });
  return user;
};

export const getAdminEvents: GetAdminEvents<
  GetAdminEventsInput,
  GetAdminEventsResult
> = async (args, context) => {
  const page = Math.max(1, args?.page ?? 1);
  const pageSize = Math.min(
    MAX_PAGE_SIZE,
    Math.max(1, args?.pageSize ?? DEFAULT_PAGE_SIZE),
  );
  const skip = (page - 1) * pageSize;
  const where: { status?: string; location?: string } = {};
  if (args?.statusFilter) where.status = args.statusFilter;
  if (args?.locationFilter) where.location = args.locationFilter;
  const hasFilters = Object.keys(where).length > 0;
  const finalWhere = hasFilters ? where : undefined;

  const [events, totalCount] = await Promise.all([
    context.entities.Event.findMany({
      where: finalWhere,
      orderBy: { date: "desc" },
      skip,
      take: pageSize,
    }),
    context.entities.Event.count({ where: finalWhere }),
  ]);

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

  const eventsWithReserved = events.map((e) => ({
    ...e,
    reservedCount: reservedByEvent[e.id] ?? 0,
  }));

  return { events: eventsWithReserved, totalCount };
};

const parseImageUrlsFromEvent = (raw: Event["imageUrls"]): string[] => {
  if (!raw) return []
  if (Array.isArray(raw)) return raw.filter((u): u is string => typeof u === "string")
  if (typeof raw !== "string") return []
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter((u): u is string => typeof u === "string") : []
  } catch {
    return []
  }
}

const IMAGES_PAGE_SIZE = 20

export type GetUploadedImagesInput = {
  page?: number
  pageSize?: number
}

export type GetUploadedImagesResult = {
  images: { url: string }[]
  totalCount: number
}

type GetUploadedImagesFn = AuthenticatedQueryDefinition<
  [_Event, _User],
  GetUploadedImagesInput,
  GetUploadedImagesResult
>

export const getUploadedImages: GetUploadedImagesFn = async (args, context) => {
  if (!context.user) throw new HttpError(401)
  const user = await context.entities.User.findUnique({
    where: { id: context.user.id },
    select: { isAdmin: true },
  })
  if (!user?.isAdmin) throw new HttpError(403, "Samo admin može videti galeriju.")
  const page = Math.max(1, args?.page ?? 1)
  const pageSize = Math.min(50, Math.max(1, args?.pageSize ?? IMAGES_PAGE_SIZE))
  const events = await context.entities.Event.findMany({
    select: { imageUrls: true },
  })
  const urlSet = new Set<string>()
  for (const e of events) {
    for (const url of parseImageUrlsFromEvent(e.imageUrls)) {
      if (url?.trim()) urlSet.add(url.trim())
    }
  }
  const allUrls = Array.from(urlSet)
  const totalCount = allUrls.length
  const skip = (page - 1) * pageSize
  const images = allUrls.slice(skip, skip + pageSize).map((url) => ({ url }))
  return { images, totalCount }
}

export const getAdminEventById: AdminEventById = async ({ id }, context) => {
  if (!context.user) throw new HttpError(401);
  const user = await context.entities.User.findUnique({
    where: { id: context.user.id },
    select: { isAdmin: true },
  });
  if (!user?.isAdmin) throw new HttpError(403, "Samo admin može videti događaj.");
  const event = await context.entities.Event.findUnique({ where: { id } });
  if (!event) throw new HttpError(404, "Radionica nije pronađena.");
  return event;
};
