import sanitizeHtml from "sanitize-html"

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

export function isHtmlContent(content: string) {
  return /<([a-z][a-z0-9]*)\b[^>]*>/i.test(content)
}

export function plainTextToHtml(content: string) {
  return content
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${escapeHtml(paragraph).replaceAll("\n", "<br>")}</p>`)
    .join("")
}

export function normalizeEditorContent(content: string) {
  return isHtmlContent(content) ? content : plainTextToHtml(content)
}

export function sanitizeBlogContent(content: string) {
  return sanitizeHtml(normalizeEditorContent(content), {
    allowedTags: [
      "p",
      "br",
      "h2",
      "h3",
      "h4",
      "strong",
      "em",
      "s",
      "blockquote",
      "ul",
      "ol",
      "li",
      "a",
      "img",
      "figure",
      "figcaption",
      "iframe",
      "span",
      "hr",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "title", "width", "height"],
      iframe: ["src", "width", "height", "allow", "allowfullscreen", "title"],
      span: ["style"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowedIframeHostnames: ["www.youtube.com", "youtube.com", "www.youtube-nocookie.com", "player.vimeo.com"],
    allowedStyles: {
      span: {
        "font-family": [/^[a-zA-Z0-9 ,.'"-]+$/],
        "font-size": [/^(12|14|16|18|20|24|28|32)px$/],
      },
    },
    transformTags: {
      a: (_tagName, attribs) => ({
        tagName: "a",
        attribs: {
          ...attribs,
          target: attribs.target === "_blank" ? "_blank" : "_self",
          rel: "noopener noreferrer",
        },
      }),
    },
  })
}
