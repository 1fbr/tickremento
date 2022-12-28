const TOTAL_PRODUCTS = 474
const GADIS_PRODUCTS = 350
const MERCADONA_PRODUCTS = 124
export const limit = 60
export const maxPages = Math.ceil(TOTAL_PRODUCTS / limit)
export const gadisPages = Math.ceil(GADIS_PRODUCTS / limit)
export const mercadonaPages = Math.ceil(MERCADONA_PRODUCTS / limit)
