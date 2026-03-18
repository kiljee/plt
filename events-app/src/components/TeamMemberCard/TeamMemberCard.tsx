import Image from "next/image"
import { TEAM_MEMBER_CARD } from "./TeamMemberCard.styles"

interface TeamMemberCardProps {
  name: string
  role: string
  imageSrc: string
  imageAlt: string
}

export const TeamMemberCard = ({
  name,
  role,
  imageSrc,
  imageAlt,
}: TeamMemberCardProps) => (
  <article className={TEAM_MEMBER_CARD.root}>
    <figure className={TEAM_MEMBER_CARD.imageWrapper}>
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={200}
        height={200}
        className={TEAM_MEMBER_CARD.image}
        loading="lazy"
        sizes="(max-width: 640px) 140px, 160px"
      />
    </figure>
    <p className={TEAM_MEMBER_CARD.name}>{name}</p>
    <p className={TEAM_MEMBER_CARD.role}>{role}</p>
  </article>
)
