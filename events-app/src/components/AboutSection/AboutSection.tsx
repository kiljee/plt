import { ABOUT_SECTION } from "./AboutSection.styles"

interface AboutSectionProps {
  children: React.ReactNode
  backgroundColor?: string
  className?: string
  ariaLabelledBy?: string
}

export const AboutSection = ({
  children,
  backgroundColor,
  className,
  ariaLabelledBy,
}: AboutSectionProps) => (
  <section
    className={`${ABOUT_SECTION.root} ${className ?? ""}`}
    style={backgroundColor ? { backgroundColor } : undefined}
    {...(ariaLabelledBy && { "aria-labelledby": ariaLabelledBy })}
  >
    {children}
  </section>
)
