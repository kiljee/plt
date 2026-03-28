"use client"

import Clarity from "@microsoft/clarity"
import { useEffect } from "react"
import { CLARITY_PROJECT_ID } from "@/config/clarity"

export const MicrosoftClarity = () => {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return
    if (!CLARITY_PROJECT_ID) return
    Clarity.init(CLARITY_PROJECT_ID)
  }, [])

  return null
}
