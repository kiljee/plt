import { revalidateTag } from "next/cache";
import { fetchWasp } from "@/lib/api/reservationProxy";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { status, data } = await fetchWasp("/api/reservations/cancel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (status === 200) {
      revalidateTag("events", { expire: 0 });
    }
    return NextResponse.json(data, { status });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Backend unreachable";
    return NextResponse.json({ error: message }, { status: 502 });
  }
};
