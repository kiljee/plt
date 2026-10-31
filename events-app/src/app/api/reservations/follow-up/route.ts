import { fetchWasp } from "@/lib/api/reservationProxy";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const code = request.nextUrl.searchParams.get("code") ?? "";
  try {
    const { status, data } = await fetchWasp(
      `/api/reservations/follow-up?code=${encodeURIComponent(code)}`,
    );
    return NextResponse.json(data, { status });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Backend unreachable";
    return NextResponse.json({ error: message }, { status: 502 });
  }
};
