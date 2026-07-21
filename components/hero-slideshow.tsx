"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

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
  const [previous, setPrevious] = useState<number | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((currentIndex) => {
        setPrevious(currentIndex)
        return (currentIndex + 1) % IMAGES.length
      })
    }, INTERVAL_MS)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (previous === null) return
    const timer = window.setTimeout(() => setPrevious(null), FADE_MS)
    return () => window.clearTimeout(timer)
  }, [current, previous])

  return (
    <div className="absolute inset-0 z-0">
      {previous !== null && (
        <Image
          src={IMAGES[previous]}
          alt=""
          fill
          aria-hidden="true"
          className="object-cover object-[center_30%]"
          sizes="100vw"
          quality={76}
        />
      )}
      <Image
        key={IMAGES[current]}
        src={IMAGES[current]}
        alt=""
        fill
        aria-hidden="true"
        priority={current === 0}
        className="animate-in fade-in object-cover object-[center_30%]"
        style={{ animationDuration: `${FADE_MS}ms` }}
        sizes="100vw"
        quality={76}
      />
      <div className="absolute inset-0 hidden bg-gradient-to-b from-foreground/25 via-foreground/28 to-foreground/72 lg:block" />
      <div className="absolute inset-0 hidden bg-[radial-gradient(circle_at_center,rgba(46,42,36,0.02)_0%,rgba(46,42,36,0.34)_58%,rgba(46,42,36,0.68)_100%)] lg:block" />
    </div>
  )
}
