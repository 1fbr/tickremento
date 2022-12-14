import { createCard } from './createCard.js'

const renderCards = (data, className) => {
  const container = document.createElement('section')
  container.classList.add(className)
  data.forEach(product => { createCard(product, container) })
}

export const renderProducts = (data) => {
  renderCards(data, 'products-container')
}

export const filterProducts = (data) => {
  renderCards(data, 'products-container')
}

export const renderSupermarket = (data) => {
  renderCards(data, 'products-container')
}
