"use client"

import { motion } from "motion/react"
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
    <motion.div
      id="team-members"
      className={TEAM_MEMBER_CAROUSEL.root}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        id={headingId}
        className={TEAM_MEMBER_CAROUSEL.title}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        {renderTitle()}
      </motion.h2>
      <motion.p
        className={TEAM_MEMBER_CAROUSEL.subheading}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.08 }}
      >
        {subheading}
      </motion.p>
      <div className={TEAM_MEMBER_CAROUSEL.grid}>
        {members.map((member, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
            whileHover={{ y: -4 }}
          >
            <TeamMemberCard
              name={member.name}
              role={member.role}
              imageSrc={member.imageSrc}
              imageAlt={member.imageAlt}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
