import Image from "next/image"
import { ABOUT_TEAM_HERO } from "./AboutTeamHero.styles"

interface AboutTeamHeroProps {
  title: string
  body: string
  imageSrc: string
  imageAlt: string
  decorativeSvgSrc?: string
  headingId?: string
}

export const AboutTeamHero = ({
  title,
  body,
  imageSrc,
  imageAlt,
  decorativeSvgSrc,
  headingId = "team-hero-heading",
}: AboutTeamHeroProps) => (
  <article className={ABOUT_TEAM_HERO.root}>
    <figure className={ABOUT_TEAM_HERO.imageWrapper}>
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={467}
        height={480}
        className={ABOUT_TEAM_HERO.image}
        loading="lazy"
        sizes="(max-width: 1024px) 100vw, 467px"
      />
    </figure>

    <div className={ABOUT_TEAM_HERO.content}>
      {decorativeSvgSrc && (
        <Image
          src={decorativeSvgSrc}
          alt=""
          aria-hidden
          width={438}
          height={255}
          className={ABOUT_TEAM_HERO.decorativeSvg}
          unoptimized
        />
      )}
      <h2 id={headingId} className={ABOUT_TEAM_HERO.title}>
        {title}
      </h2>
      <p className={ABOUT_TEAM_HERO.body}>{body}</p>
    </div>
  </article>
)
