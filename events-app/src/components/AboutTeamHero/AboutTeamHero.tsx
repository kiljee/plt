import Image from "next/image"
import { ABOUT_TEAM_HERO } from "./AboutTeamHero.styles"

interface AboutTeamHeroProps {
  title: string
  body: string
  imageSrc: string
  imageAlt: string
  headingId?: string
}

export const AboutTeamHero = ({
  title,
  body,
  imageSrc,
  imageAlt,
  headingId = "team-hero-heading",
}: AboutTeamHeroProps) => (
  <article className={ABOUT_TEAM_HERO.root}>
    <div className={ABOUT_TEAM_HERO.content}>
      <h2 id={headingId} className={ABOUT_TEAM_HERO.title}>
        {title}
      </h2>
      <p className={ABOUT_TEAM_HERO.body}>{body}</p>
    </div>
    <figure className={ABOUT_TEAM_HERO.imageWrapper}>
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={600}
        height={400}
        className={ABOUT_TEAM_HERO.image}
        loading="lazy"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
    </figure>
  </article>
)
