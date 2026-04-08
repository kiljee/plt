import { Suspense } from "react";
import { WorkshopsMonthCalendar } from "@/components/WorkshopsMonthCalendar/WorkshopsMonthCalendar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalendar radionica",
  alternates: {
    canonical: "/kalendar",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function KalendarPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] bg-white px-4 py-12 text-center text-sm text-[#989B9C]">
          Učitavanje kalendara…
        </div>
      }
    >
      <WorkshopsMonthCalendar />
    </Suspense>
  );
}
