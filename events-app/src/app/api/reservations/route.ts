import { revalidateTag } from "next/cache";
import { WASP_API_BASE_URL } from "@/config/api";
import { NextRequest, NextResponse } from "next/server";

const RESERVATIONS_URL = `${WASP_API_BASE_URL.replace(/\/$/, "")}/api/reservations`;

export const POST = async (
  request: NextRequest,
): Promise<NextResponse<unknown>> => {
  try {
    const body = await request.json();
    const res = await fetch(RESERVATIONS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const errorData = data as {
        error?: string;
        code?: string;
        eventId?: string;
        availableSeats?: number;
        requestedSeats?: number;
      };
      return NextResponse.json(
        { ...errorData, error: errorData?.error ?? res.statusText },
        { status: res.status },
      );
    }

    revalidateTag("events", { expire: 0 });

    return NextResponse.json(data);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Backend unreachable";
    return NextResponse.json({ error: msg }, { status: 502 });
  }
};
