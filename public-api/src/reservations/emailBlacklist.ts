import { HttpError } from "wasp/server";
import type {
  GetEmailBlacklist,
  AddEmailToBlacklist,
  RemoveEmailFromBlacklist,
} from "wasp/server/operations";

export type EmailBlacklistEntry = {
  id: string;
  email: string;
  createdAt: Date;
};

type ContextWithUser = {
  user?: { id: string };
  entities: {
    User: {
      findUnique: (args: { where: { id: string }; select: { isAdmin: boolean } }) => Promise<{ isAdmin: boolean } | null>;
    };
  };
};

const checkAdmin = async (context: ContextWithUser): Promise<void> => {
  if (!context.user) throw new HttpError(401);
  const user = await context.entities.User.findUnique({
    where: { id: context.user.id },
    select: { isAdmin: true },
  });
  if (!user?.isAdmin) throw new HttpError(403, "Samo admin može upravljati blacklist-om.");
};

export const getEmailBlacklist: GetEmailBlacklist<
  Record<string, never>,
  EmailBlacklistEntry[]
> = async (_args, context) => {
  await checkAdmin(context);
  return context.entities.EmailBlacklist.findMany({
    orderBy: { email: "asc" },
  });
};

export const addEmailToBlacklist: AddEmailToBlacklist<
  { email: string },
  EmailBlacklistEntry
> = async ({ email }, context) => {
  await checkAdmin(context);
  const normalized = (email ?? "").trim().toLowerCase();
  if (!normalized) throw new HttpError(400, "Email je obavezan.");
  const existing = await context.entities.EmailBlacklist.findUnique({
    where: { email: normalized },
  });
  if (existing) return existing;
  return context.entities.EmailBlacklist.create({
    data: { email: normalized },
  });
};

export const removeEmailFromBlacklist: RemoveEmailFromBlacklist<
  { id: string },
  EmailBlacklistEntry
> = async ({ id }, context) => {
  await checkAdmin(context);
  return context.entities.EmailBlacklist.delete({
    where: { id },
  });
};
