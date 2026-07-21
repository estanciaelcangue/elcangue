"use client"

import { useEffect, useState } from "react"
import { Eye } from "lucide-react"

export function PostViewCount({ postId, initialCount }: { postId: string; initialCount: number }) {
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
      {count.toLocaleString("es-UY")} {count === 1 ? "vista" : "vistas"}
    </span>
  )
}
