import { renderProducts, renderSearchResults, renderSupermarketProducts } from '../components/render-products.js'
import { renderErrors } from '../handlers/error-handler.js'

const API_URL = 'http://localhost:3001/products'

const handleResponse = (response) => {
  return (response.ok) ? response.json() : Promise.reject(response)
}

const getData = async (endpoint, callback) => {
  try {
    const response = await fetch(endpoint)
    const data = await handleResponse(response)
    callback(data)
  } catch (err) {
    renderErrors(err)
  }
}

export const getProducts = (currentPage) => {
  const endpoint = `${API_URL}/?page=${currentPage}&limit=60&sort=name&order=1`
  getData(endpoint, renderProducts)
}

export const getSearchResults = (searchTerm) => {
  const endpoint = `${API_URL}/search/?input=${searchTerm}&sort=name&order=1`
  getData(endpoint, renderSearchResults)
}

export const getSearchResultsBySupermarket = (supermarket, searchTerm) => {
  const endpoint = `${API_URL}/search/${supermarket}?input=${searchTerm}&sort=name&order=1`
  getData(endpoint, renderSearchResults)
}

export const getSupermarketProducts = (company, currentPage) => {
  const endpoint = `${API_URL}/supermarkets/?supermarket=${company}&page=${currentPage}&limit=60&sort=name&order=1`
  getData(endpoint, renderSupermarketProducts)
}
