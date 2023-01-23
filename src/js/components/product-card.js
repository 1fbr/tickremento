import { getPrices } from '../handlers/price-color-handler.js'
import { chartConfig } from '../utils/chart.js'

const main = document.querySelector('.main-container')
const fragment = document.createDocumentFragment()

export const createCard = (product, productsContainer) => {
  const supermarketName = `${product.supermarket.toLowerCase()}`
  const newCard = document.createElement('article')
  newCard.classList.add(`${supermarketName}-card`)

  const productInfo = document.createElement('div')
  productInfo.classList.add(`${supermarketName}-product-info`)

  const innerInfo = document.createElement('div')
  innerInfo.classList.add('inner-info')

  const linkToProduct = document.createElement('a')
  linkToProduct.href = product.url
  linkToProduct.target = '_blank'

  const productImage = document.createElement('img')
  productImage.src = product.img
  productImage.alt = `Imagen del producto ${product.name}`
  productImage.loading = 'lazy'
  productImage.id = product.productId

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
