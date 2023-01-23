const TOTAL_PRODUCTS = 866
const GADIS_PRODUCTS = 352
const MERCADONA_PRODUCTS = 297
const FAMILIA_PRODUCTS = 96
const FROIZ_PRODUCTS = 121

export const limit = 60
export const maxPages = Math.ceil(TOTAL_PRODUCTS / limit)
const gadisPages = Math.ceil(GADIS_PRODUCTS / limit)
const mercadonaPages = Math.ceil(MERCADONA_PRODUCTS / limit)
const familiaPages = Math.ceil(FAMILIA_PRODUCTS / limit)
const froizPages = Math.ceil(FROIZ_PRODUCTS / limit)

export const supermarketPages = {
  Gadis: gadisPages,
  Mercadona: mercadonaPages,
  Familia: familiaPages,
  Froiz: froizPages
}
