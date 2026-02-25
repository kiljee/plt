import {
  type _Event,
  type _User,
  type AuthenticatedActionDefinition,
} from "wasp/server/_types";
import { type Event } from "wasp/entities";
import { HttpError } from "wasp/server";
import { type CreateEvent } from "wasp/server/operations";

const MAX_IMAGES = 6;

export type EventStatus = "ACTIVE" | "INACTIVE";

export type CreateEventArgs = {
  title: string;
  description: string;
  location: string;
  date: string;
  startTime: string;
  endTime: string;
  ageCategory: string;
  capacity: number;
  imageUrls: string[];
  price: number;
  currency: string;
};

export type UpdateEventArgs = CreateEventArgs & {
  id: string;
  status?: EventStatus;
};

type UpdateEventAction = AuthenticatedActionDefinition<
  [_Event, _User],
  UpdateEventArgs,
  Event
>;

type EventActionContext = Parameters<CreateEvent<CreateEventArgs, Event>>[1];

const getAdminUserId = async (context: EventActionContext) => {
  const userId = context.user?.id;
  if (!userId) {
    throw new HttpError(401);
  }

  const user = await context.entities.User.findUnique({
    where: { id: userId },
    select: { isAdmin: true },
  });

  if (!user?.isAdmin) {
    throw new HttpError(403, "Samo admin može dodavati događaje.");
  }

  return userId;
};

const getValidLocation = (location: string) =>
  location === "BELGRADE" || location === "NOVI_SAD" ? location : "BELGRADE";

const getImageUrlsJson = (imageUrls: string[]) =>
  JSON.stringify(Array.isArray(imageUrls) ? imageUrls.slice(0, MAX_IMAGES) : []);

const getEventDate = (dateValue: string) => {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    throw new HttpError(400, "Neispravan datum.");
  }
  return date;
};

export const createEvent: CreateEvent<CreateEventArgs, Event> = async (
  args,
  context,
) => {
  const userId = await getAdminUserId(context);

  const data = {
    title: args.title,
    description: args.description ?? "",
    location: getValidLocation(args.location),
    date: getEventDate(args.date),
    startTime: args.startTime ?? "",
    endTime: args.endTime ?? "",
    ageCategory: args.ageCategory ?? "",
    capacity: Math.max(0, Number(args.capacity) || 0),
    imageUrls: getImageUrlsJson(args.imageUrls),
    price: Math.max(0, Number(args.price) || 0),
    currency: args.currency || "RSD",
    user: { connect: { id: userId } },
  };
  return context.entities.Event.create({
    data,
  });
};

export const updateEvent: UpdateEventAction = async (
  args,
  context,
) => {
  await getAdminUserId(context);

  const existing = await context.entities.Event.findUnique({
    where: { id: args.id },
  });
  if (!existing) {
    throw new HttpError(404, "Radionica nije pronađena.");
  }

  const data = {
    title: args.title,
    description: args.description ?? "",
    location: getValidLocation(args.location),
    date: getEventDate(args.date),
    startTime: args.startTime ?? "",
    endTime: args.endTime ?? "",
    ageCategory: args.ageCategory ?? "",
    capacity: Math.max(0, Number(args.capacity) || 0),
    imageUrls: getImageUrlsJson(args.imageUrls),
    price: Math.max(0, Number(args.price) || 0),
    currency: args.currency || "RSD",
    ...(args.status === "ACTIVE" || args.status === "INACTIVE"
      ? { status: args.status }
      : {}),
  };

  return context.entities.Event.update({
    where: { id: args.id },
    data,
  });
};

export type UpdateEventStatusArgs = { id: string; status: EventStatus };

type UpdateEventStatusAction = AuthenticatedActionDefinition<
  [_Event, _User],
  UpdateEventStatusArgs,
  Event
>;

export const updateEventStatus: UpdateEventStatusAction = async (
  args,
  context,
) => {
  await getAdminUserId(context);
  const existing = await context.entities.Event.findUnique({
    where: { id: args.id },
  });
  if (!existing) {
    throw new HttpError(404, "Radionica nije pronađena.");
  }
  if (args.status !== "ACTIVE" && args.status !== "INACTIVE") {
    throw new HttpError(400, "Status mora biti ACTIVE ili INACTIVE.");
  }
  return context.entities.Event.update({
    where: { id: args.id },
    data: { status: args.status } as Parameters<
      typeof context.entities.Event.update
    >[0]["data"],
  });
};
