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
        Po rezervaciji primićete potvrdu porudžbine i automatski ćete biti dodati na našu listu gostiju.
      </p>
      
      <p 
        className={`${POLICY_INFO_STYLES.text} ${POLICY_INFO_STYLES.textResponsive}`}
        style={{ fontFamily: "var(--font-comfortaa), 'Comfortaa', sans-serif" }}
      >
        <strong>Ne šalje se posebna ulaznica.</strong>
      </p>
      
      <div>
        <p 
          className={`${POLICY_INFO_STYLES.text} ${POLICY_INFO_STYLES.textResponsive} mb-2`}
          style={{ fontFamily: "var(--font-comfortaa), 'Comfortaa', sans-serif" }}
        >
          <strong>INFO:</strong>
        </p>
        <p 
          className={`${POLICY_INFO_STYLES.text} ${POLICY_INFO_STYLES.textResponsive}`}
          style={{ fontFamily: "var(--font-comfortaa), 'Comfortaa', sans-serif" }}
        >
          Rezervacija važi 48 sata za uplatu.
          Ako trebate produženi rok za uplatu, molimo kontaktirajte nas.
        </p>
      </div>
      
      <p 
        className={`${POLICY_INFO_STYLES.text} ${POLICY_INFO_STYLES.textResponsive}`}
        style={{ fontFamily: "var(--font-comfortaa), 'Comfortaa', sans-serif" }}
      >
        Pitanja o rezervacijama, otkazivanju ili drugim detaljima? 
        ,{" "}
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