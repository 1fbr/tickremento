import { getProducts, getSearchResults, getSupermarketProducts } from './components/getProducts.js'
import { limit, maxPages, gadisPages, mercadonaPages, familiaPages, froizPages } from './utils/pageNumber.js'

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

const removeChilds = (parent) => {
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  getProducts(actualPage, limit, order)
})

const debounce = (func, delay) => {
  let timeoutId
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      func(...args)
    }, delay)
  }
}

search.addEventListener('input', debounce((e) => {
  spinner.style.display = 'block'
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
  removeChilds(mainContainer)
  cleanSearch.disabled = true
  search.value = ''
  spinner.style.display = 'block'
  actualPage = 1
  getProducts(actualPage, limit, order)
})

const handleSupermarketChange = (e) => {
  e.preventDefault()
  if (document.querySelector('.modal-window')) {
    spinner.style.display = 'none'
    return
  } else {
    spinner.style.display = 'block'
  }
  search.value = ''
  actualPage = 1
  removeChilds(mainContainer)

  for (let i = 0; i < supermarkets.length; i++) {
    if (supermarkets[i].checked) {
      supermarketName = supermarkets[i].id
      break
    } else {
      supermarketName = ''
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

window.addEventListener('scroll', (scrollEvent) => {
  const { scrollHeight, scrollTop } = scrollEvent.target.documentElement
  if (search.value.length === 0) {
    if (scrollTop + window.innerHeight >= scrollHeight) {
      setTimeout(newPage, 150)
    }
  }
})

const newPage = () => {
  if (document.querySelector('.modal-window')) {
    spinner.style.display = 'none'
    return
  }

  actualPage++
  if (supermarketName !== '') {
    if (supermarketName === 'Gadis' && actualPage > gadisPages) {
      spinner.style.display = 'none'
      return
    } else if (supermarketName === 'Mercadona' && actualPage > mercadonaPages) {
      spinner.style.display = 'none'
      return
    } else if (supermarketName === 'Familia' && actualPage > familiaPages) {
      spinner.style.display = 'none'
      return
    } else if (supermarketName === 'Froiz' && actualPage > froizPages) {
      spinner.style.display = 'none'
      return
    }
    getSupermarketProducts(supermarketName, actualPage, limit, order)
  } else {
    if (actualPage > maxPages) {
      spinner.style.display = 'none'
      return
    }
    getProducts(actualPage, limit, order)
  }
}
