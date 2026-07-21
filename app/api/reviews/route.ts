import { NextResponse } from "next/server"

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY
const GOOGLE_PLACE_ID = process.env.GOOGLE_PLACE_ID

export type PlaceReview = {
  author_name: string
  rating: number
  text: string
  relative_time_description: string
  profile_photo_url: string
  time: number
}

type PlacesApiResponse = {
  result: {
    name: string
    rating: number
    user_ratings_total: number
    reviews: PlaceReview[]
  }
  status: string
}

export async function GET() {
  if (!GOOGLE_PLACES_API_KEY || !GOOGLE_PLACE_ID) {
    return NextResponse.json({
      reviews: [],
      rating: null,
      total: 0,
    })
  }

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${GOOGLE_PLACE_ID}&fields=name,rating,user_ratings_total,reviews&reviews_sort=newest&language=es&key=${GOOGLE_PLACES_API_KEY}`

  const res = await fetch(url, {
    next: { revalidate: 86400 }, // cache 24hs
  })

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 502 })
  }

  const data: PlacesApiResponse = await res.json()

  if (data.status !== "OK") {
    return NextResponse.json(
      { error: `Google Places API error: ${data.status}` },
      { status: 502 }
    )
  }

  return NextResponse.json({
    reviews: data.result.reviews ?? [],
    rating: data.result.rating,
    total: data.result.user_ratings_total,
  })
}
