import Link from "next/link";
import { POLICY_INFO_STYLES } from "./PolicyInfoBlock.styles";

interface PolicyInfoBlockProps {
  className?: string;
}

export const PolicyInfoBlock = ({ className = "" }: PolicyInfoBlockProps) => (
  <div className={`${POLICY_INFO_STYLES.container} ${POLICY_INFO_STYLES.responsive} ${POLICY_INFO_STYLES.height} ${className}`}>
    <div className={`${POLICY_INFO_STYLES.content.wrapper} ${POLICY_INFO_STYLES.content.responsive}`}>
      <p 
        className={`${POLICY_INFO_STYLES.text} ${POLICY_INFO_STYLES.textResponsive}`}
        style={{ fontFamily: "var(--font-comfortaa), 'Comfortaa', sans-serif" }}
      >
        Nakon rezervacije, dobićete potvrdu na email, a nakon uplate ćete biti dodati na listu gostiju.
      </p>
      <p 
        className={`${POLICY_INFO_STYLES.text} ${POLICY_INFO_STYLES.textResponsive}`}
        style={{ fontFamily: "var(--font-comfortaa), 'Comfortaa', sans-serif" }}
      >
        Ukoliko rezervišete za više osoba,{" "}
        <strong className={POLICY_INFO_STYLES.textEmphasis}>
          moguće je i da uplatite samo jedno mesto kako biste rezervisali termin
        </strong>
        , a ostatak iznosa možete platiti na radionici u gotovini.
      </p>
      <div>
        <p 
          className={`${POLICY_INFO_STYLES.text} ${POLICY_INFO_STYLES.textResponsive} mb-2`}
          style={{ fontFamily: "var(--font-comfortaa), 'Comfortaa', sans-serif" }}
        >
          <strong>INFORMACIJE:</strong>
        </p>
        <p 
          className={`${POLICY_INFO_STYLES.text} ${POLICY_INFO_STYLES.textResponsive}`}
          style={{ fontFamily: "var(--font-comfortaa), 'Comfortaa', sans-serif" }}
        >
          Rezervacija važi 48 sati. Ukoliko uplata ne bude izvršena u roku od 48 sati, Vaše mesto će biti oslobođeno za druge učesnike.Ukoliko vam je potreban produžen rok za plaćanje, slobodno nas kontaktirajte.


        </p>
      </div>
      
      <p 
        className={`${POLICY_INFO_STYLES.text} ${POLICY_INFO_STYLES.textResponsive}`}
        style={{ fontFamily: "var(--font-comfortaa), 'Comfortaa', sans-serif" }}
      >
        Imate pitanja u vezi sa rezervacijama, otkazivanjem ili drugim detaljima?
        Pogledajte našu{" "}
        <Link href="/politika-privatnosti" className={POLICY_INFO_STYLES.link}>
          Politiku privatnosti
        </Link>{" "}
        i{" "}
        <Link href="/uslovi-koriscenja" className={POLICY_INFO_STYLES.link}>
          Uslove korišćenja
        </Link>
        .
      </p>
    </div>
  </div>
);