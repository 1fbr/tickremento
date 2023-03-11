import { getPriceColor } from '../handlers/price-color-handler.js'
import { chartConfig } from '../utils/chart.js'

const main = document.querySelector('.main-container')
const fragment = document.createDocumentFragment()

export const createCard = (product, productsContainer) => {
  const { supermarket, url, img, productId, name, details, prices, months } = product

  const supermarketVariable = `${supermarket.toLowerCase()}`
  const newCard = document.createElement('article')
  newCard.classList.add(`${supermarketVariable}-card`)
  const productInfo = document.createElement('div')
  productInfo.classList.add(`${supermarketVariable}-product-info`)
  const innerInfo = document.createElement('div')
  innerInfo.classList.add('inner-info')

  const linkToProduct = document.createElement('a')
  linkToProduct.href = url
  linkToProduct.target = '_blank'
  const productImage = document.createElement('img')
  productImage.src = img
  productImage.alt = `Imagen del producto ${name}`
  productImage.loading = 'lazy'
  productImage.id = productId

  const supermarketName = document.createElement('span')
  supermarketName.textContent = supermarket
  supermarketName.id = 'supermarket-name'
  const productName = document.createElement('span')
  productName.textContent = name
  productName.id = 'product-name'
  const productDetails = document.createElement('small')
  productDetails.textContent = details

  const priceInfo = document.createElement('div')
  priceInfo.classList.add('price-info')
  const currentPrice = document.createElement('span')
  currentPrice.id = 'current-price'
  const increase = document.createElement('span')
  increase.id = 'increase'
  const firstPrice = prices[0]
  const lastPrice = prices[prices.length - 1]
  const totalIncrease = (lastPrice - firstPrice).toFixed(2)
  const percentageIncrease = (((lastPrice - firstPrice) / firstPrice) * 100).toFixed(2)
  const totalIncreaseWithSign = (totalIncrease > 0 ? '+' : '') + totalIncrease
  const percentageIncreaseWithSign = (percentageIncrease > 0 ? '+' : '') + percentageIncrease
  currentPrice.textContent = convertToOutput(lastPrice, '€')
  increase.textContent = `${convertToOutput(totalIncreaseWithSign, '€')} (${convertToOutput(percentageIncreaseWithSign, '%')})`
  getPriceColor(totalIncrease, currentPrice, increase)

  const priceChart = document.createElement('canvas')
  priceChart.id = 'product-chart'
  const monthsArray = months
  const pricesArray = prices
  chartConfig(monthsArray, pricesArray, priceChart)

  linkToProduct.appendChild(productImage)
  productInfo.appendChild(linkToProduct)
  innerInfo.appendChild(supermarketName)
  innerInfo.appendChild(productName)
  innerInfo.appendChild(productDetails)
  productInfo.appendChild(innerInfo)
  priceInfo.appendChild(currentPrice)
  priceInfo.appendChild(increase)
  newCard.appendChild(productInfo)
  newCard.appendChild(priceInfo)
  newCard.appendChild(priceChart)
  fragment.appendChild(newCard)
  productsContainer.appendChild(fragment)
  main.appendChild(productsContainer)
}

const convertToOutput = (variable, symbol) => {
  return `${variable.replace('.', ',')}${symbol}`
}
