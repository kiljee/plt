import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politika privatnosti | Paleto",
  description: "Politika privatnosti Paleto ateljea.",
  alternates: {
    canonical: "/politika-privatnosti",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const SECTION_GAP = "gap-6";
const HEADING =
  "font-[family-name:var(--font-comfortaa),'Comfortaa',sans-serif] font-normal text-[2.5rem] leading-[53px] text-[#000914]";
const BODY =
  "font-[family-name:var(--font-geist-sans),'Neue Haas Unica',sans-serif] font-normal text-base leading-[29px] text-[#000914]";

export default function PolitikaPrivatnostiPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto flex max-w-[64rem] flex-col px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <section className={`flex flex-col ${SECTION_GAP}`}>
          <h1 className={HEADING}>Politika privatnosti</h1>
          <div className={`flex flex-col ${BODY}`}>
            <p className="mb-4">
              Paleto atelje je posvećen zaštiti vaših ličnih podataka. Ova
              politika privatnosti opisuje kako prikupljamo, koristimo i
              štitimo vaše podatke u skladu sa zakonima Republike Srbije,
              posebno Zakonom o zaštiti podataka o ličnosti.
            </p>

            <h2 className="mb-2 mt-6 text-xl font-semibold text-[#000914]">
              Podaci koje prikupljamo
            </h2>
            <ul className="mb-4 list-inside list-disc space-y-1">
              <li>Ime i prezime</li>
              <li>Adresa (opciono)</li>
              <li>Broj telefona</li>
              <li>Email adresa</li>
            </ul>

            <h2 className="mb-2 mt-6 text-xl font-semibold text-[#000914]">
              Kako koristimo vaše podatke
            </h2>
            <p className="mb-4">
              Prikupljene podatke koristimo isključivo za: obradu vaših
              rezervacija i potvrdu učešća na radionicama; komunikaciju u
              vezi sa rezervacijama i eventualnim promenama termina.
            </p>

            <h2 className="mb-2 mt-6 text-xl font-semibold text-[#000914]">
              Deljenje podataka
            </h2>
            <p className="mb-4">
              Vaši podaci se ne dele sa trećim licima. Pristup podacima ima
              samo vlasnik brenda Paleto.
            </p>

            <h2 className="mb-2 mt-6 text-xl font-semibold text-[#000914]">
              Zaštita podataka
            </h2>
            <p className="mb-4">
              Preduzimamo sve neophodne mere kako bismo osigurali bezbednost
              vaših ličnih podataka i sprečili neovlašćen pristup.
            </p>

            <h2 className="mb-2 mt-6 text-xl font-semibold text-[#000914]">
              Prava intelektualne svojine
            </h2>
            <p className="mb-4">
              Sav sadržaj objavljen na našem sajtu, uključujući tekstove,
              fotografije, grafička rešenja, logotipe i drugi materijali,
              predstavlja intelektualnu svojinu Paleto ateljea. Bilo kakvo
              kopiranje, distribucija, izmena ili druga upotreba ovog
              sadržaja bez prethodne pisane saglasnosti vlasnika je
              strogo zabranjeno.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
