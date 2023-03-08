import { createCard } from './product-card.js'

const mainContainer = document.querySelector('.main-container')

const renderCards = (data, className) => {
  const container = document.createElement('section')
  container.classList.add(className)
  data.forEach(product => { createCard(product, container) })
}

const renderSearchCards = (data, className) => {
  const searchWindow = document.createElement('div')
  searchWindow.classList.add('search-window')

  const output = document.createElement('p')
  output.textContent = `↓ ${data.output} ↓`
  output.id = 'search-output'

  searchWindow.appendChild(output)
  mainContainer.appendChild(searchWindow)

  const container = document.createElement('section')
  container.classList.add(className)
  data.products.forEach(product => { createCard(product, container) })
}

export const renderProducts = (data) => {
  renderCards(data, 'products-container')
}

export const renderSearchResults = (data) => {
  renderSearchCards(data, 'products-container')
}

export const renderSupermarketProducts = (data) => {
  renderCards(data, 'products-container')
}
