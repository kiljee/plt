"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cart";
import { HEADER } from "./Header.styles";

const NAV_LEFT = [{ href: "/", label: "Calendar" }] as const;
const NAV_RIGHT = [
  { href: "/korpa", label: "Korpa" },
  { href: "/about", label: "O nama" },
] as const;
const NAV_MOBILE = [...NAV_LEFT, ...NAV_RIGHT];

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems());

  useEffect(() => {
    setMounted(true);
  }, []);

  const showCartBadge = mounted && totalItems > 0;

  return (
    <header className={HEADER.root}>
      <div className={HEADER.inner}>
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
              className={`${HEADER.navLink} relative`}
              onClick={() => setMobileOpen(false)}
            >
              {label}
              {href === "/korpa" && showCartBadge && (
                <span className={HEADER.cartBadge}>
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>
          ))}
        </nav>
        <Link
          href="/korpa"
          className={HEADER.mobileCartLink}
          aria-label={`Korpa${showCartBadge ? `, ${totalItems} stavki` : ""}`}
          onClick={() => setMobileOpen(false)}
        >
          <svg
            className={HEADER.mobileCartIcon}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          {showCartBadge && (
            <span className={HEADER.mobileCartBadge}>
              {totalItems > 99 ? "99+" : totalItems}
            </span>
          )}
        </Link>
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
              className={`${HEADER.mobileNavLink} relative`}
              onClick={() => setMobileOpen(false)}
            >
              {label}
              {href === "/korpa" && showCartBadge && (
                <span className={HEADER.cartBadgeMobile}>
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};
