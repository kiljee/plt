"use client"

import Image from "next/image"
import { motion } from "motion/react"
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
  <motion.div
    className={ABOUT_TEAM_INFO.root}
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5 }}
  >
    <div className={ABOUT_TEAM_INFO.inner}>
      <motion.div
        className={ABOUT_TEAM_INFO.content}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.45, delay: 0.1 }}
      >
        <h2 id={headingId} className={ABOUT_TEAM_INFO.title}>
          {title}
        </h2>
        <p className={ABOUT_TEAM_INFO.body}>{body}</p>
      </motion.div>

      <motion.figure
        className={ABOUT_TEAM_INFO.imageWrapper}
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.45, delay: 0.15 }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={600}
          height={435}
          className={ABOUT_TEAM_INFO.image}
          loading="lazy"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </motion.figure>
    </div>
  </motion.div>
)
