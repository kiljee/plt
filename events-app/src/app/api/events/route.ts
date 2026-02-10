import { WASP_API_BASE_URL, EVENTS_ENDPOINT } from "@/config/api";
import type { EventItem } from "@/types/event";
import { NextRequest, NextResponse } from "next/server";

const EVENTS_URL = `${WASP_API_BASE_URL.replace(/\/$/, "")}${EVENTS_ENDPOINT}`;

export const revalidate = 60;

export const GET = async (
  request: NextRequest,
): Promise<NextResponse<EventItem[] | { error: string }>> => {
  try {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get("location");
    const url = location
      ? `${EVENTS_URL}?location=${encodeURIComponent(location)}`
      : EVENTS_URL;
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Backend: ${res.status} ${res.statusText}` },
        { status: 502 },
      );
    }

    const data = await res.json();
    if (!Array.isArray(data)) {
      return NextResponse.json(
        { error: "Backend: invalid response" },
        { status: 502 },
      );
    }

    return NextResponse.json(data as EventItem[]);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Backend unreachable";
    return NextResponse.json({ error: msg }, { status: 502 });
  }
};
