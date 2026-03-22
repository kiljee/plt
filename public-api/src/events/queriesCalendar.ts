import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import { HttpError } from "wasp/server";
import type { GetAdminEventsForRange } from "wasp/server/operations";
import type { EventLocationType } from "../reservations/types";

dayjs.extend(utc);

const MAX_RANGE_DAYS = 120;

export type GetAdminEventsForRangeInput = {
  rangeStartIso: string;
  rangeEndIso: string;
  locationFilter?: EventLocationType;
};

export type AdminCalendarEventRow = {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  location: string;
  status: string;
};

export type GetAdminEventsForRangeResult = {
  events: AdminCalendarEventRow[];
};

export const getAdminEventsForRange: GetAdminEventsForRange<
  GetAdminEventsForRangeInput,
  GetAdminEventsForRangeResult
> = async (args, context) => {
  if (!context.user) throw new HttpError(401);
  const user = await context.entities.User.findUnique({
    where: { id: context.user.id },
    select: { isAdmin: true },
  });
  if (!user?.isAdmin) {
    throw new HttpError(403, "Samo admin može videti kalendar radionica.");
  }

  const startRaw = typeof args?.rangeStartIso === "string" ? args.rangeStartIso : "";
  const endRaw = typeof args?.rangeEndIso === "string" ? args.rangeEndIso : "";
  const start = new Date(startRaw);
  const end = new Date(endRaw);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    throw new HttpError(400, "Neispravan opseg datuma.");
  }
  if (end.getTime() <= start.getTime()) {
    throw new HttpError(400, "Neispravan opseg datuma.");
  }
  const rangeDays = (end.getTime() - start.getTime()) / 86400000;
  if (rangeDays > MAX_RANGE_DAYS) {
    throw new HttpError(400, "Opseg je predugačak.");
  }

  const where: {
    date: { gte: Date; lt: Date };
    location?: string;
  } = {
    date: {
      gte: start,
      lt: end,
    },
  };

  if (args?.locationFilter) {
    where.location = args.locationFilter;
  }

  const events = await context.entities.Event.findMany({
    where,
    orderBy: [{ date: "asc" }, { startTime: "asc" }],
    select: {
      id: true,
      title: true,
      date: true,
      startTime: true,
      endTime: true,
      location: true,
      status: true,
    },
  });

  return { events };
};
