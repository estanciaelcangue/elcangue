"use client"

import { useEffect, useState } from "react"

const IMAGES = [
  "/images/hero/cangue-01.webp",
  "/images/hero/cangue-02.webp",
  "/images/hero/cangue-03.webp",
  "/images/hero/cangue-04.webp",
  "/images/hero/cangue-05.webp",
  "/images/hero/cangue-06.webp",
]

const INTERVAL_MS = 5000
const FADE_MS = 1800

export function HeroSlideshow() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % IMAGES.length)
    }, INTERVAL_MS)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="absolute inset-0 z-0">
      {IMAGES.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url('${src}')`,
            backgroundPosition: "center 30%",
            opacity: i === current ? 1 : 0,
            transition: `opacity ${FADE_MS}ms ease-in-out`,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/25 via-foreground/28 to-foreground/72" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(46,42,36,0.02)_0%,rgba(46,42,36,0.34)_58%,rgba(46,42,36,0.68)_100%)]" />
    </div>
  )
}
