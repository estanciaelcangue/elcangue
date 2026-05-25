export const ESTANCIA_ADDRESS = "Ruta 3 km 358,5, Paysandú, Uruguay"
export const ESTANCIA_MAP_QUERY = "Estancia El Cangüé, Ruta 3 km 358,5, Paysandú, Uruguay"

export const GOOGLE_MAPS_COORDS = "-32.4650125,-58.0467656"

const encodedMapQuery = encodeURIComponent(ESTANCIA_MAP_QUERY)
const encodedCoords = encodeURIComponent(GOOGLE_MAPS_COORDS)

export const googleMapsHref = `https://www.google.com/maps/search/?api=1&query=${encodedMapQuery}`
export const googleMapsEmbedSrc = `https://maps.google.com/maps?q=${encodedCoords}&ll=${encodedCoords}&t=k&z=16&output=embed`
