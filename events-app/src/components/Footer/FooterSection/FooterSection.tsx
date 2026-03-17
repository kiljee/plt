import { FOOTER, FOOTER_COLORS } from "../Footer.styles";

interface FooterSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const FooterSection = ({
  title,
  children,
  className,
}: FooterSectionProps) => (
  <div className={`${FOOTER.block}${className ? ` ${className}` : ""}`}>
    <h3
      className={FOOTER.heading}
      style={{ color: FOOTER_COLORS.text }}
    >
      {title}
    </h3>
    {children}
  </div>
);
