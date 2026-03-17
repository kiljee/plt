import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uslovi korišćenja | Paleto",
  description: "Uslovi korišćenja i politika otkazivanja Paleto ateljea.",
};

const SECTION_GAP = "gap-6";
const HEADING =
  "font-[family-name:var(--font-comfortaa),'Comfortaa',sans-serif] font-normal text-[2.5rem] leading-[53px] text-[#000914]";
const BODY_MEDIUM =
  "font-[family-name:var(--font-geist-sans),'Neue Haas Unica',sans-serif] font-medium text-xl leading-[29px] text-[#000914]";

export default function UsloviKoriscenjaPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto flex max-w-[64rem] flex-col px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <section className={`flex flex-col ${SECTION_GAP}`}>
          <h1 className={HEADING}>Uslovi korišćenja</h1>
          <div className={`flex flex-col ${BODY_MEDIUM}`}>
            <h2 className="mb-2 mt-6 text-xl font-semibold text-[#000914]">
              Potvrda rezervacije
            </h2>
            <p className="mb-4">
              Nakon rezervacije dobićete potvrdu porudžbine i bićete
              automatski uključeni u našu listu gostiju. Posebna karta neće
              biti poslata.
            </p>

            <h2 className="mb-2 mt-6 text-xl font-semibold text-[#000914]">
              Politika otkazivanja
            </h2>
            <ul className="mb-4 list-none space-y-3">
              <li>
                <strong>Potpuni povrat novca:</strong> Ako otkažete
                rezervaciju najmanje 48 sati pre zakazanog termina radionice,
                imate pravo na potpuni povrat novca.
              </li>
              <li>
                <strong>Vaučer:</strong> Za otkazivanja između 48 i 24 sata
                pre radionice, možemo vam ponuditi vaučer u vrednosti
                plaćene uplate, važeći za bilo koju Paleto radionicu u roku
                od 30 dana.
              </li>
              <li>
                <strong>Bez povrata:</strong> Za otkazivanja manje od 24
                sata pre radionice, Paleto zadržava pravo da zadrži 100%
                plaćenog iznosa bez povrata novca ili izdavanja vaučera.
              </li>
            </ul>

            <h2 className="mb-2 mt-6 text-xl font-semibold text-[#000914]">
              Odgovornost
            </h2>
            <p className="mb-4">
              Paleto atelje ne snosi odgovornost za bilo kakvu štetu,
              povredu ili gubitak koji nastane tokom ili u vezi sa
              radionicama, osim u slučajevima kada je takva šteta izravno
              prouzrokovana namernim radnjama ili grubom nepažnjom
              organizatora. Učesnici su odgovorni za svoje lične stvari i
              opremu donetu na radionicu. Takođe, učesnici snose
              odgovornost za bilo kakvu štetu, gubitak ili krađu Paleto
              imovine ili prostora uzrokovanu njihovim radnjama.
            </p>

            <h2 className="mb-2 mt-6 text-xl font-semibold text-[#000914]">
              Marketing
            </h2>
            <p className="mb-4">
              Fotografije snimljene tokom radionice mogu se koristiti u
              marketinške svrhe. Ako ne želite da se fotografije na kojima
              se nalazite koriste u marketinške svrhe, kontaktirajte nas
              radi obaveštavanja.
            </p>

            <h2 className="mb-2 mt-6 text-xl font-semibold text-[#000914]">
              Zaštita podataka
            </h2>
            <p className="mb-4">
              Paleto atelje ozbiljno shvata vašu privatnost i osigurava
              zaštitu vaših ličnih podataka SSL šifrovanjem. SSL (Secure
              Sockets Layer) šifruje sve informacije razmenjene između vas
              i našeg sajta, štiteći osetljive podatke poput ličnih
              podataka, informacija o plaćanju i prijavnih podataka. Ovo
              šifrovanje pomaže u sprečavanju neovlašćenog pristupa i
              štiti vaše podatke od presretanja tokom prenosa.
            </p>

            <p className="mt-8 font-medium">
              Hvala što ste izabrali Paleto!
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
