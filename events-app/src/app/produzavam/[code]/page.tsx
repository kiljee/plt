import type { Metadata } from "next";
import { ReservationDecision } from "@/components/ReservationDecision/ReservationDecision";

interface PageProps {
  params: Promise<{ code: string }>;
}

export const metadata: Metadata = {
  title: "Produži rezervaciju",
  description: "Produžite rok nepotvrđene Paleto rezervacije za još 24 sata.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ProduzavamPage({ params }: PageProps) {
  const { code } = await params;
  return <ReservationDecision code={code} variant="extend" />;
}
