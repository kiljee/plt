"use client";

import Link from "next/link";
import { useWorkshopLinks } from "@/hooks/useWorkshopLinks";
import PaletoLogo from "@/assets/paleto-logo.svg";
import { FOOTER, FOOTER_COLORS } from "./Footer.styles";
import { FooterSection } from "./FooterSection/FooterSection";
import { FooterContactItem } from "./FooterContactItem/FooterContactItem";
import { FooterSocialLink } from "./FooterSocialLink/FooterSocialLink";

const COMPANY_EMAIL = "rezervacije@paleto.rs";
const COMPANY_PHONE = "065/201-2727";
const POSITIVE_TECH_URL = "https://positivetechit.com";

const ADDRESSES = [
  {
    city: "Novi Sad",
    lines: ["Braće Ribnikar 7", "21 000 Novi Sad", "Srbija"],
  },
  {
    city: "Beograd",
    lines: ["Braće Ribnikar 39", "11 000 Beograd", "Srbija"],
  },
] as const;

const INSTAGRAM_ICON = (
  <svg viewBox="0 0 30 30" fill="currentColor" className="size-full">
    <path d="M15 2.016c4.031 0 4.49.016 6.07.094 1.484.074 2.496.332 3.075.547.727.27 1.246.625 1.793 1.172.547.547.902 1.066 1.172 1.793.215.579.473 1.591.547 3.075.078 1.58.094 2.039.094 6.07s-.016 4.49-.094 6.07c-.074 1.484-.332 2.496-.547 3.075-.27.727-.625 1.246-1.172 1.793-.547.547-1.066.902-1.793 1.172-.579.215-1.591.473-3.075.547-1.58.078-2.039.094-6.07.094s-4.49-.016-6.07-.094c-1.484-.074-2.496-.332-3.075-.547-.727-.27-1.246-.625-1.793-1.172-.547-.547-.902-1.066-1.172-1.793-.215-.579-.473-1.591-.547-3.075-.078-1.58-.094-2.039-.094-6.07s.016-4.49.094-6.07c.074-1.484.332-2.496.547-3.075.27-.727.625-1.246 1.172-1.793.547-.547 1.066-.902 1.793-1.172.579-.215 1.591-.473 3.075-.547 1.58-.078 2.039-.094 6.07-.094zM15 0c-4.063 0-4.547.02-6.133.094C7.31.17 6.075.43 5.26.702c-.875.324-1.617.765-2.293 1.441S1.026 3.085.702 3.96C.43 4.775.17 6.01.094 7.867.02 9.453 0 9.937 0 15s.02 5.547.094 7.133c.076 1.857.336 3.092.608 3.907.324.875.765 1.617 1.441 2.293s1.566 1.117 2.293 1.441c.815.27 2.05.532 3.907.608C10.453 29.98 10.937 30 15 30s5.547-.02 7.133-.094c1.857-.076 3.092-.336 3.907-.608.875-.324 1.617-.765 2.293-1.441s1.117-1.566 1.441-2.293c.27-.815.532-2.05.608-3.907C29.98 20.547 30 20.063 30 15s-.02-5.547-.094-7.133c-.076-1.857-.336-3.092-.608-3.907-.324-.875-.765-1.617-1.441-2.293S26.915 1.026 26.04.702C25.225.43 23.99.17 22.133.094 19.547.02 19.063 0 15 0zm0 7.285a7.715 7.715 0 100 15.43 7.715 7.715 0 000-15.43zm0 12.715a5 5 0 110-10 5 5 0 010 10zm6.437-13.887a1.803 1.803 0 100 3.606 1.803 1.803 0 000-3.606z" />
  </svg>
);

export const Footer = () => {
  const workshopLinks = useWorkshopLinks();

  return (
    <footer
      className={FOOTER.root}
      style={{ backgroundColor: FOOTER_COLORS.background }}
    >
      <div className={FOOTER.inner}>
        <div className={FOOTER.top}>
          <div className={FOOTER.brand}>
            <PaletoLogo className={FOOTER.logo} aria-label="Paleto" />
            <p
              className={FOOTER.tagline}
              style={{ color: FOOTER_COLORS.text }}
            >
              Unique art experiences, based in Novi Sad and Belgrade.
            </p>
            <nav className={FOOTER.social} aria-label="Instagram">
              <FooterSocialLink
                href="https://www.instagram.com/paletoo__/"
                label="Instagram"
              >
                {INSTAGRAM_ICON}
              </FooterSocialLink>
            </nav>
          </div>

          <div className={FOOTER.centerCol}>
            <FooterSection title="Radionice">
              <nav className={FOOTER.workshopLinks} aria-label="Radionice">
                {workshopLinks.length > 0 ? (
                  workshopLinks.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className={FOOTER.workshopLink}
                      style={{ color: FOOTER_COLORS.link }}
                    >
                      {label}
                    </Link>
                  ))
                ) : (
                  <span className={FOOTER.workshopLink} style={{ color: FOOTER_COLORS.text }}>
                    Nema predstojećih radionica
                  </span>
                )}
              </nav>
            </FooterSection>
          </div>

          <FooterSection title="Kontakt" className="sm:justify-self-end">
            <div className={FOOTER.contactList}>
              <FooterContactItem label="Email">
                <a
                  href={`mailto:${COMPANY_EMAIL}`}
                  className={FOOTER.contactValue}
                  style={{ color: FOOTER_COLORS.link }}
                >
                  {COMPANY_EMAIL}
                </a>
              </FooterContactItem>
              <FooterContactItem label="Phone">
                <a
                  href={`tel:${COMPANY_PHONE.replace(/\//g, "")}`}
                  className={FOOTER.contactValue}
                  style={{ color: FOOTER_COLORS.link }}
                >
                  {COMPANY_PHONE}
                </a>
              </FooterContactItem>
              {ADDRESSES.map(({ city, lines }) => (
                <FooterContactItem key={city} label={city} asAddress>
                  {lines.join(" ")}
                </FooterContactItem>
              ))}
            </div>
          </FooterSection>
        </div>

        <div
          className={FOOTER.bottom}
          style={{ borderColor: FOOTER_COLORS.border }}
        >
          <div
            className="flex flex-wrap items-center justify-center gap-x-1 gap-y-0.5 text-[0.65rem] leading-tight sm:text-xs"
            style={{ color: FOOTER_COLORS.text }}
          >
            <span>
              © Copyright Paleto {new Date().getFullYear()}. Website development by{" "}
              <a
                href={POSITIVE_TECH_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={FOOTER.devLink}
                style={{ color: FOOTER_COLORS.link }}
              >
                Positive Tech
              </a>
              . All Rights Reserved.
            </span>
            <span
              className="shrink-0"
              style={{ color: FOOTER_COLORS.legalSeparator }}
              aria-hidden
            >
              |
            </span>
            <nav className="inline-flex items-center gap-x-1.5" aria-label="Pravne informacije">
              <Link
                href="/uslovi-koriscenja"
                className="hover:underline"
                style={{ color: FOOTER_COLORS.link }}
              >
                Terms &amp; Conditions
              </Link>
              <span
                className="shrink-0"
                style={{ color: FOOTER_COLORS.legalSeparator }}
                aria-hidden
              >
                |
              </span>
              <Link
                href="/politika-privatnosti"
                className="hover:underline"
                style={{ color: FOOTER_COLORS.link }}
              >
                Politika Privatnosti
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};
