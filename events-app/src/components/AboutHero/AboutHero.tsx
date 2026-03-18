import { COLORS } from "@/lib/colors"
import { ABOUT_HERO } from "./AboutHero.styles"

interface AboutHeroProps {
  title: string
  accentWord?: string
  imageSrc?: string
  headingId?: string
}

const renderTitle = (title: string, accentWord?: string) => {
  if (!accentWord || !title.includes(accentWord)) {
    return title
  }
  const parts = title.split(accentWord)
  return (
    <>
      {parts[0]}
      <span className={ABOUT_HERO.accent}>{accentWord}</span>
      {parts[1]}
    </>
  )
}

export const AboutHero = ({
  title,
  accentWord,
  imageSrc,
  headingId = "hero-heading",
}: AboutHeroProps) => (
  <div
    className={ABOUT_HERO.root}
    style={{
      background: imageSrc
        ? `linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 50%, transparent 100%), url(${imageSrc}) center/cover no-repeat`
        : COLORS.background.heroGradient,
    }}
  >
    <div className={ABOUT_HERO.content}>
      <h1 id={headingId} className={ABOUT_HERO.title}>
        {renderTitle(title, accentWord)}
      </h1>
    </div>
  </div>
)
