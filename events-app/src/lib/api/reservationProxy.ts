import { WASP_API_BASE_URL } from "@/config/api";

const waspUrl = (path: string): string =>
  `${WASP_API_BASE_URL.replace(/\/$/, "")}${path}`;

export const fetchWasp = async (
  path: string,
  init?: RequestInit,
): Promise<{ status: number; data: unknown }> => {
  const res = await fetch(waspUrl(path), init);
  const data = await res.json().catch(() => ({}));
  return { status: res.status, data };
};
