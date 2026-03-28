import { WASP_API_BASE_URL, EVENTS_ENDPOINT } from "@/config/api";
import type { EventItem } from "@/types/event";
import { NextRequest, NextResponse } from "next/server";

const EVENTS_URL = `${WASP_API_BASE_URL.replace(/\/$/, "")}${EVENTS_ENDPOINT}`;

export const revalidate = 120;

export const GET = async (
  request: NextRequest,
): Promise<
  NextResponse<
    | { events: EventItem[]; totalCount: number }
    | { error: string }
  >
> => {
  try {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get("location");
    const year = searchParams.get("year");
    const month = searchParams.get("month");
    const page = searchParams.get("page") ?? "1";
    const pageSize = searchParams.get("pageSize") ?? "12";
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (year && month) {
      params.set("year", year);
      params.set("month", month);
    } else {
      params.set("page", page);
      params.set("pageSize", pageSize);
    }
    const url = `${EVENTS_URL}?${params.toString()}`;
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Backend: ${res.status} ${res.statusText}` },
        { status: 502 },
      );
    }

    const data = (await res.json()) as {
      events?: unknown[];
      totalCount?: number;
    };
    if (!Array.isArray(data?.events) || typeof data?.totalCount !== "number") {
      return NextResponse.json(
        { error: "Backend: invalid response" },
        { status: 502 },
      );
    }

    return NextResponse.json({
      events: data.events as EventItem[],
      totalCount: data.totalCount,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Backend unreachable";
    return NextResponse.json({ error: msg }, { status: 502 });
  }
};
