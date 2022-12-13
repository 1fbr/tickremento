import { renderProducts, filterProducts, renderSupermarket } from './createProducts.js'
import { renderErrors } from './errorHandler.js'

// const API_URL_DEV = 'http://localhost:3001/api'
const API_URL = 'https://tickremento-api.up.railway.app/api'

const handleResponse = (response) => {
  return (response.ok) ? response.json() : Promise.reject(response)
}

const getData = (endpoint, callback) => {
  fetch(endpoint)
    .then(handleResponse)
    .then(data => callback(data))
    .catch(err => renderErrors(err))
}

export const getAllProducts = (searchTerm) => {
  const endpoint = `${API_URL}/products/search/?input=${searchTerm}&sort=name&order=1`
  getData(endpoint, filterProducts)
}

export const getProducts = (currentPage, pageLimit, orderBy) => {
  const endpoint = `${API_URL}/products?page=${currentPage}&limit=${pageLimit}&sort=name&order=${orderBy}`
  getData(endpoint, renderProducts)
}

export const getSupermarket = (supermarket, currentPage, pageLimit, orderBy) => {
  const endpoint = `${API_URL}/supermarkets?supermarket=${supermarket}&page=${currentPage}&limit=${pageLimit}&sort=name&order=${orderBy}`
  getData(endpoint, renderSupermarket)
}
