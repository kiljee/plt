import { TeamMemberCard } from "@/components/TeamMemberCard/TeamMemberCard"
import { TEAM_MEMBER_CAROUSEL } from "./TeamMemberCarousel.styles"

interface TeamMember {
  name: string
  role: string
  imageSrc: string
  imageAlt: string
}

interface TeamMemberCarouselProps {
  title: string
  accentWord: string
  subheading: string
  members: TeamMember[]
  headingId?: string
}

export const TeamMemberCarousel = ({
  title,
  accentWord,
  subheading,
  members,
  headingId = "team-members-heading",
}: TeamMemberCarouselProps) => {
  const renderTitle = () => {
    const parts = title.split(accentWord)
    return (
      <>
        {parts[0]}
        <span className={TEAM_MEMBER_CAROUSEL.accent}>{accentWord}</span>
        {parts[1]}
      </>
    )
  }

  return (
    <div id="team-members" className={TEAM_MEMBER_CAROUSEL.root}>
      <h2 id={headingId} className={TEAM_MEMBER_CAROUSEL.title}>
        {renderTitle()}
      </h2>
      <p className={TEAM_MEMBER_CAROUSEL.subheading}>{subheading}</p>
      <div className={TEAM_MEMBER_CAROUSEL.grid}>
        {members.map((member, i) => (
          <TeamMemberCard
            key={i}
            name={member.name}
            role={member.role}
            imageSrc={member.imageSrc}
            imageAlt={member.imageAlt}
          />
        ))}
      </div>
    </div>
  )
}
