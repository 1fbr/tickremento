const TOTAL_PRODUCTS = 866
const GADIS_PRODUCTS = 352
const MERCADONA_PRODUCTS = 297
const FAMILIA_PRODUCTS = 96
const FROIZ_PRODUCTS = 121

export const limit = 60
export const maxPages = Math.ceil(TOTAL_PRODUCTS / limit)
export const gadisPages = Math.ceil(GADIS_PRODUCTS / limit)
export const mercadonaPages = Math.ceil(MERCADONA_PRODUCTS / limit)
export const familiaPages = Math.ceil(FAMILIA_PRODUCTS / limit)
export const froizPages = Math.ceil(FROIZ_PRODUCTS / limit)
