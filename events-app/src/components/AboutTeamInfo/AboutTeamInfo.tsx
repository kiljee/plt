import Image from "next/image"
import { ABOUT_TEAM_INFO } from "./AboutTeamInfo.styles"

interface AboutTeamInfoProps {
  title: string
  body: string
  imageSrc: string
  imageAlt: string

  headingId?: string
}

export const AboutTeamInfo = ({
  title,
  body,
  imageSrc,
  imageAlt,
  headingId = "team-info-heading",
}: AboutTeamInfoProps) => (
  <div className={ABOUT_TEAM_INFO.root}>
    <div className={ABOUT_TEAM_INFO.inner}>

      <div className={ABOUT_TEAM_INFO.content}>
        <h2 id={headingId} className={ABOUT_TEAM_INFO.title}>
          {title}
        </h2>
        <p className={ABOUT_TEAM_INFO.body}>{body}</p>
      </div>

      <figure className={ABOUT_TEAM_INFO.imageWrapper}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={600}
          height={435}
          className={ABOUT_TEAM_INFO.image}
          loading="lazy"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </figure>    </div>
  </div>
)
