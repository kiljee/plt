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
  await prisma.$transaction(async (tx) => {
    const count = await tx.user.count();
    if (count !== 1) return;

    await tx.user.update({
      where: { id: user.id },
      data: { isAdmin: true, isSuperAdmin: true },
    });
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
