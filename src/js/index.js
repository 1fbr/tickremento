import { getProducts, getSearchResults, getSearchResultsBySupermarket, getSupermarketProducts } from './services/products.js'
import { maxPages, supermarketPages } from './utils/supermarket-pages.js'
import { removeChilds, debounce, disableFilters } from './utils/event-utils.js'

const mainContainer = document.querySelector('.main-container')
const search = document.querySelector('.product-filter')
const cleanSearch = document.querySelector('.clean-search')
const checkboxesWrapper = document.querySelector('.checkboxes-wrapper')
const supermarkets = document.querySelectorAll("input[type='checkbox']")
const spinner = document.querySelector('.spinner')
let actualPage = 1
let searchTerm = ''
let supermarketName = ''

document.addEventListener('DOMContentLoaded', () => {
  getProducts(actualPage)
  setTimeout(() => {
    if (document.querySelector('.modal-window')) disableFilters()
  }, 2000)
})

search.addEventListener('input', debounce((e) => {
  spinner.style.display = 'block'
  removeChilds(mainContainer)
  searchTerm = e.target.value.toLowerCase()

  if (e.target.value.length >= 2) {
    cleanSearch.disabled = false
    spinner.style.display = 'none'
    if (supermarketName !== '') {
      getSearchResultsBySupermarket(supermarketName, searchTerm)
    } else {
      getSearchResults(searchTerm)
    }
  }

  if (e.target.value.length === 0) {
    cleanSearch.disabled = true
    actualPage = 1
    if (supermarketName) {
      getSupermarketProducts(supermarketName, actualPage)
    } else {
      getProducts(actualPage)
    }
  }
}, 250))

cleanSearch.addEventListener('click', (e) => {
  e.preventDefault()
  spinner.style.display = 'block'
  removeChilds(mainContainer)
  cleanSearch.disabled = true
  search.value = ''
  actualPage = 1
  if (supermarketName) {
    getSupermarketProducts(supermarketName, actualPage)
  } else {
    getProducts(actualPage)
  }
})

const handleSupermarketChange = (e) => {
  e.preventDefault()
  removeChilds(mainContainer)
  actualPage = 1

  for (let i = 0; i < supermarkets.length; i++) {
    if (supermarkets[i].checked) {
      supermarketName = supermarkets[i].id
      break
    } else {
      supermarketName = ''
    }
  }

  if (search.value != '') { //eslint-disable-line
    getSearchResultsBySupermarket(supermarketName, searchTerm)
  } else if (supermarketName == '' && search.value != '') { //eslint-disable-line
    getSearchResults(searchTerm)
  } else if (supermarketName && search.value == '') { //eslint-disable-line
    getSupermarketProducts(supermarketName, actualPage)
  } else {
    getProducts(actualPage)
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
  actualPage++
  const targetPages = supermarketName !== '' ? supermarketPages[supermarketName] : maxPages

  if (actualPage > targetPages) {
    spinner.style.display = 'none'
    return
  }

  if (supermarketName !== '') {
    getSupermarketProducts(supermarketName, actualPage)
  } else {
    getProducts(actualPage)
  }
}
