const remotePatterns = [
  {
    protocol: "https",
    hostname: "lh3.googleusercontent.com",
  },
  {
    protocol: "https",
    hostname: "images.unsplash.com",
  },
]

if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
  remotePatterns.push({
    protocol: "https",
    hostname: new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname,
  })
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
    remotePatterns,
  },
}

export default nextConfig
