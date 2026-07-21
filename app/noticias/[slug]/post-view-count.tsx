"use client"

import { useEffect, useState } from "react"
import { Eye } from "lucide-react"
import type { Locale } from "@/lib/i18n/config"

export function PostViewCount({ postId, initialCount, locale }: { postId: string; initialCount: number; locale: Locale }) {
  const [count, setCount] = useState(initialCount)

  useEffect(() => {
    const storageKey = `cangue:viewed-post:${postId}`
    if (window.sessionStorage.getItem(storageKey)) return

    window.sessionStorage.setItem(storageKey, "1")
    void fetch(`/api/blog-posts/${postId}/views`, { method: "POST" })
      .then(async (response) => {
        if (!response.ok) throw new Error("View count failed")
        return (await response.json()) as { count?: number }
      })
      .then((result) => {
        if (typeof result.count === "number") setCount(result.count)
      })
      .catch(() => window.sessionStorage.removeItem(storageKey))
  }, [postId])

  return (
    <span className="flex items-center gap-1">
      <Eye className="size-4" />
      {count.toLocaleString(locale)} {count === 1
        ? { es: "vista", en: "view", fr: "vue", pt: "visualização" }[locale]
        : { es: "vistas", en: "views", fr: "vues", pt: "visualizações" }[locale]}
    </span>
  )
}
