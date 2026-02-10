import {
  WASP_API_BASE_URL,
  EVENTS_BY_SLUG_ENDPOINT,
} from "@/config/api";
import type { EventDetailItem } from "@/types/event";
import { NextRequest, NextResponse } from "next/server";

const BY_SLUG_URL = `${WASP_API_BASE_URL.replace(/\/$/, "")}${EVENTS_BY_SLUG_ENDPOINT}`;

export const revalidate = 60;

export const GET = async (
  request: NextRequest,
): Promise<NextResponse<EventDetailItem | { error: string }>> => {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city");
    const slug = searchParams.get("slug");

    if (!city || !slug) {
      return NextResponse.json(
        { error: "city i slug su obavezni" },
        { status: 400 },
      );
    }

    const url = `${BY_SLUG_URL}?city=${encodeURIComponent(city)}&slug=${encodeURIComponent(slug)}`;
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
    });

    if (res.status === 404) {
      return NextResponse.json(
        { error: "Događaj nije pronađen" },
        { status: 404 },
      );
    }

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return NextResponse.json(
        { error: (body as { error?: string })?.error ?? res.statusText },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json(data as EventDetailItem);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Backend unreachable";
    return NextResponse.json({ error: msg }, { status: 502 });
  }
};
