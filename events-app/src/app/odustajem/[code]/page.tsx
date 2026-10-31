import type { Metadata } from "next";
import { ReservationDecision } from "@/components/ReservationDecision/ReservationDecision";

interface PageProps {
  params: Promise<{ code: string }>;
}

export const metadata: Metadata = {
  title: "Odustajanje od rezervacije",
  description: "Otkažite nepotvrđenu Paleto rezervaciju.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function OdustajemPage({ params }: PageProps) {
  const { code } = await params;
  return <ReservationDecision code={code} variant="cancel" />;
}
