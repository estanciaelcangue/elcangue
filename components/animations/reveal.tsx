"use client"

import { useRef, type ElementType, type ReactNode } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

type RevealProps = {
  children: ReactNode
  as?: ElementType
  className?: string
  id?: string
  /** CSS selector (relative to this container) of children to stagger. If omitted, the container itself animates. */
  stagger?: string
  delay?: number
  y?: number
  duration?: number
}

export function Reveal({
  children,
  as: Tag = "div",
  className,
  id,
  stagger,
  delay = 0,
  y = 40,
  duration = 0.8,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const root = ref.current
      if (!root) return

      const targets = stagger
        ? Array.from(root.querySelectorAll<HTMLElement>(stagger))
        : [root]
      if (!targets.length) return

      gsap.set(targets, { opacity: 0, y })

      ScrollTrigger.create({
        trigger: root,
        start: "top 80%",
        end: "top 20%",
        once: true,
        onEnter: () => {
          gsap.to(targets, {
            opacity: 1,
            y: 0,
            duration,
            delay,
            ease: "power2.out",
            stagger: stagger ? 0.1 : 0,
          })
        },
      })
    },
    { scope: ref },
  )

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  )
}
