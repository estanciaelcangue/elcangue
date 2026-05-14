"use client"

import { useRef, type ReactNode } from "react"
import { usePathname } from "next/navigation"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!ref.current) return
      gsap.fromTo(
        ref.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.inOut" },
      )
    },
    { dependencies: [pathname], scope: ref },
  )

  return (
    <div ref={ref} style={{ opacity: 0 }}>
      {children}
    </div>
  )
}
