import {
  findAuthIdentity,
  getProviderDataWithPassword,
  updateAuthIdentityProviderData,
} from "wasp/server/auth";
import type { OnAfterSignupHook } from "wasp/server/auth";

export const onAfterSignup: OnAfterSignupHook = async ({
  user,
  prisma,
  providerId,
}) => {
  const count = await prisma.user.count();
  if (count !== 1) return;

  await prisma.user.update({
    where: { id: user.id },
    data: { isAdmin: true },
  });

  if (providerId.providerName === "email") {
    const authIdentity = await findAuthIdentity(providerId);
    if (authIdentity) {
      const providerData =
        getProviderDataWithPassword<"email">(authIdentity.providerData);
      await updateAuthIdentityProviderData(providerId, providerData, {
        isEmailVerified: true,
      });
    }
  }
};
