import { getPrices } from '../utils/priceHandler.js'
import { chartConfig } from '../utils/createChart.js'

const main = document.querySelector('.main-container')
const fragment = document.createDocumentFragment()

export const createCard = (product, productsContainer) => {
  const newCard = document.createElement('article')
  newCard.classList.add(`new-${product.supermarket.toLowerCase()}-card`)

  const productInfo = document.createElement('div')
  productInfo.classList.add('product-info')

  const innerInfo = document.createElement('div')
  innerInfo.classList.add('inner-info')

  const linkToProduct = document.createElement('a')
  linkToProduct.href = product.url
  linkToProduct.target = '_blank'

  const productImage = document.createElement('img')
  productImage.src = product.img
  productImage.alt = product.name
  productImage.loading = 'lazy'

  const supermarket = document.createElement('span')
  supermarket.textContent = product.supermarket
  supermarket.id = 'supermarket-name'

  const productName = document.createElement('span')
  productName.textContent = product.name
  productName.id = 'product-name'

  const productDetails = document.createElement('small')
  productDetails.textContent = product.details

  const priceInfo = document.createElement('div')
  priceInfo.classList.add('price-info')

  const prices = product.prices
  const actualPrice = document.createElement('span')
  const priceVariation = document.createElement('span')
  getPrices(prices, actualPrice, priceVariation)

  const priceChart = document.createElement('canvas')
  priceChart.id = 'product-chart'
  const monthsArray = product.months
  const pricesArray = product.prices
  chartConfig(monthsArray, pricesArray, priceChart)

  linkToProduct.appendChild(productImage)
  productInfo.appendChild(linkToProduct)
  innerInfo.appendChild(supermarket)
  innerInfo.appendChild(productName)
  innerInfo.appendChild(productDetails)
  productInfo.appendChild(innerInfo)
  priceInfo.appendChild(actualPrice)
  priceInfo.appendChild(priceVariation)
  newCard.appendChild(productInfo)
  newCard.appendChild(priceInfo)
  newCard.appendChild(priceChart)
  fragment.appendChild(newCard)
  productsContainer.appendChild(fragment)
  main.appendChild(productsContainer)
}
