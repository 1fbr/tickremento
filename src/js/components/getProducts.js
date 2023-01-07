import { renderProducts, renderSearchResults, renderSupermarketProducts } from './createProducts.js'
import { renderErrors } from './errorHandler.js'

const API_URL_DEV = 'http://localhost:3001/api'

const handleResponse = (response) => {
  return (response.ok) ? response.json() : Promise.reject(response)
}

const getData = (endpoint, callback) => {
  fetch(endpoint)
    .then(handleResponse)
    .then(data => callback(data))
    .catch(err => renderErrors(err))
}

export const getProducts = (currentPage) => {
  const endpoint = `${API_URL_DEV}/products?page=${currentPage}&limit=60&sort=name&order=1`
  getData(endpoint, renderProducts)
}

export const getSearchResults = (searchTerm) => {
  const endpoint = `${API_URL_DEV}/products/search/?input=${searchTerm}&sort=name&order=1`
  getData(endpoint, renderSearchResults)
}

export const getSupermarketProducts = (company, currentPage) => {
  const endpoint = `${API_URL_DEV}/supermarkets?supermarket=${company}&page=${currentPage}&limit=60&sort=name&order=1`
  getData(endpoint, renderSupermarketProducts)
}
