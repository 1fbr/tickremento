import { getPriceColor } from '../handlers/price-color-handler.js'
import { chartConfig } from '../utils/chart.js'

const main = document.querySelector('.main-container')
const fragment = document.createDocumentFragment()
const range = document.createRange()

export const createCard = (product, productsContainer) => {
  const { supermarket, url, img, productId, name, details, prices, months } = product

  const supermarketVariable = `${supermarket.toLowerCase()}`
  const newCard = document.createElement('article')
  newCard.classList.add(`${supermarketVariable}-card`)
  const productInfo =
  `
    <div class='${supermarketVariable}-product-info'>
        <a href='${url}' target='_blank'>
          <img src="${img}" alt="Imagen del producto ${name}" loading="lazy" id="${productId}">
        </a>
        <div class='inner-info'>
          <span id='supermarket-name'>${supermarket}</span>
          <span id='product-name'>${name}</span>
          <small>${details}</small>
        </div>
    </div>
  `

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

  priceInfo.appendChild(currentPrice)
  priceInfo.appendChild(increase)
  newCard.appendChild(range.createContextualFragment(productInfo))
  newCard.appendChild(priceInfo)
  newCard.appendChild(priceChart)
  fragment.appendChild(newCard)
  productsContainer.appendChild(fragment)
  main.appendChild(productsContainer)
}

const convertToOutput = (variable, symbol) => {
  return `${variable.replace('.', ',')}${symbol}`
}
