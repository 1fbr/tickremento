import { getProducts, getSearchResults, getSupermarketProducts } from './components/getProducts.js'
import { limit, maxPages, supermarketPages } from './utils/pageNumber.js'
import { removeChilds, debounce, isModalDisplayed } from './utils/eventUtils.js'

const mainContainer = document.querySelector('.main-container')
const search = document.querySelector('.product-filter')
const cleanSearch = document.querySelector('.clean-search')
const checkboxesWrapper = document.querySelector('.checkboxes-wrapper')
const supermarkets = document.querySelectorAll("input[type='checkbox']")
const spinner = document.querySelector('.spinner')
const order = 1
let actualPage = 1
let searchTerm = ''
let supermarketName = ''

document.addEventListener('DOMContentLoaded', () => {
  getProducts(actualPage, limit, order)
})

search.addEventListener('input', debounce((e) => {
  isModalDisplayed()
  removeChilds(mainContainer)
  searchTerm = e.target.value.toLowerCase()

  if (e.target.value.length >= 2) {
    cleanSearch.disabled = false
    spinner.style.display = 'none'
    getSearchResults(searchTerm)
  }

  if (e.target.value.length === 0) {
    cleanSearch.disabled = true
    actualPage = 1
    getProducts(actualPage, limit, order)
  }
}, 250))

cleanSearch.addEventListener('click', () => {
  isModalDisplayed()
  removeChilds(mainContainer)
  cleanSearch.disabled = true
  search.value = ''
  actualPage = 1
  getProducts(actualPage, limit, order)
})

const handleSupermarketChange = (e) => {
  e.preventDefault()
  isModalDisplayed()
  removeChilds(mainContainer)
  search.value = ''
  actualPage = 1

  for (let i = 0; i < supermarkets.length; i++) {
    if (supermarkets[i].checked) {
      supermarketName = supermarkets[i].id
      break
    }
  }

  if (supermarketName) {
    getSupermarketProducts(supermarketName, actualPage, limit, order)
  } else {
    getProducts(actualPage, limit, order)
  }
}

checkboxesWrapper.addEventListener('change', function (e) {
  const checkbox = e.target
  if (checkbox.type === 'checkbox') {
    const checkboxesList = supermarkets
    for (let i = 0; i < checkboxesList.length; i++) {
      if (checkboxesList[i] !== checkbox) {
        checkboxesList[i].checked = false
      }
    }
    handleSupermarketChange(e)
  }
})

const debouncePagination = debounce((scrollEvent) => {
  const { scrollHeight, scrollTop } = scrollEvent.target.documentElement
  if (search.value.length === 0) {
    if (scrollTop + window.innerHeight >= scrollHeight) {
      setTimeout(newPage, 150)
    }
  }
}, 200)

window.addEventListener('scroll', debouncePagination)

const newPage = () => {
  isModalDisplayed()
  getProductsForSupermarket(supermarketName, actualPage, limit, order)
}

function getProductsForSupermarket (supermarketName, actualPage, limit, order) {
  actualPage++
  const targetPages = supermarketName !== '' ? supermarketPages[supermarketName] : maxPages

  if (actualPage > targetPages) {
    spinner.style.display = 'none'
    return
  }

  if (supermarketName !== '') {
    getSupermarketProducts(supermarketName, actualPage, limit, order)
  } else {
    getProducts(actualPage, limit, order)
  }
}
