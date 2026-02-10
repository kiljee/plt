"use client";

import Link from "next/link";
import { useState } from "react";
import { HEADER } from "./Header.styles";

const NAV_LEFT = [{ href: "/", label: "Calendar" }] as const;
const NAV_RIGHT = [{ href: "/about", label: "O nama" }] as const;
const NAV_MOBILE = [...NAV_LEFT, ...NAV_RIGHT];

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className={HEADER.root}>
      <nav className={HEADER.navLeft} aria-label="Glavna navigacija">
        {NAV_LEFT.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={HEADER.navLink}
            onClick={() => setMobileOpen(false)}
          >
            {label}
          </Link>
        ))}
      </nav>

      <Link
        href="/"
        className={HEADER.logoLink}
        aria-label="Paleto – početna"
        onClick={() => setMobileOpen(false)}
      >
        <span className={`${HEADER.logoText} ${HEADER.logoPale}`}>pale</span>
        <span className={`${HEADER.logoText} ${HEADER.logoTo}`}>to</span>
      </Link>

      <div className={HEADER.right}>
        <nav className={HEADER.navRight} aria-label="Desna navigacija">
          {NAV_RIGHT.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={HEADER.navLink}
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className={HEADER.mobileMenuButton}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Zatvori meni" : "Otvori meni"}
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          <svg
            className={HEADER.mobileMenuIcon}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-nav"
          className={HEADER.mobileNav}
          aria-label="Mobilni meni"
        >
          {NAV_MOBILE.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={HEADER.mobileNavLink}
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};
