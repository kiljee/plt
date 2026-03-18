import type { Metadata } from "next"
import { Geist, Geist_Mono, Comfortaa, Caveat } from "next/font/google"
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const SITE_NAME = "Paleto"
const DEFAULT_TITLE = `${SITE_NAME} | Događaji i radionice - Beograd i Novi Sad`
const DEFAULT_DESCRIPTION =
  "Pridružite se Paleto radionicama u Beogradu i Novom Sadu. Slikarske radionice, kreativni događaji i jedinstvena umetnička iskustva za sve uzraste."

export const metadata: Metadata = {
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: "https://paleto.rs",
    siteName: SITE_NAME,
    locale: "sr_RS",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${comfortaa.variable} ${caveat.variable} antialiased`}
        suppressHydrationWarning
      >
        <Header />
        <main className="min-h-screen flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
