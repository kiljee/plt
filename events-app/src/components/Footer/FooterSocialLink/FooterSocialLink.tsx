import { FOOTER, FOOTER_COLORS } from "../Footer.styles";

interface FooterSocialLinkProps {
  href: string;
  label: string;
  children: React.ReactNode;
}

export const FooterSocialLink = ({
  href,
  label,
  children,
}: FooterSocialLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={FOOTER.socialIcon}
    aria-label={label}
    style={{ color: FOOTER_COLORS.link }}
  >
    {children}
  </a>
);
