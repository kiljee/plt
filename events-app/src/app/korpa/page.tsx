import { CartPageContent } from "@/components/CartPageContent/CartPageContent";

export const metadata = {
  title: "Korpa | Paleto Events",
  description: "Pregled i potvrda porudžbine",
  alternates: {
    canonical: "/korpa",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function CartPage() {
  return <CartPageContent />;
}
