export const WASP_API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export const APP_BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const EVENTS_REVALIDATE_SECONDS = 120;

export const EVENTS_ENDPOINT = "/api/events";
export const EVENTS_NEXT_ROUTE = "/api/events";
export const EVENTS_BY_SLUG_ENDPOINT = "/api/events/by-slug";
