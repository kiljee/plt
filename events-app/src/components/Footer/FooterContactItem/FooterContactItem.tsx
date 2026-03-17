import { FOOTER, FOOTER_COLORS } from "../Footer.styles";

interface FooterContactItemProps {
  label: string;
  children: React.ReactNode;
  asAddress?: boolean;
}

export const FooterContactItem = ({
  label,
  children,
  asAddress = false,
}: FooterContactItemProps) => (
  <div className={FOOTER.contactItem}>
    <span
      className={FOOTER.contactLabel}
      style={{ color: FOOTER_COLORS.text }}
    >
      {label}
    </span>
    {asAddress ? (
      <address
        className={`${FOOTER.addressLines} not-italic`}
        style={{ color: FOOTER_COLORS.link }}
      >
        {children}
      </address>
    ) : (
      children
    )}
  </div>
);
