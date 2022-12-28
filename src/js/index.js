import { getProducts, getAllProducts, getSupermarket } from './components/getProducts.js'
import { limit, maxPages, gadisPages, mercadonaPages } from './utils/pageNumber.js'

const footer = document.querySelector('footer')
const search = document.querySelector('.product-filter')
const supermarkets = document.querySelectorAll("input[type='checkbox']")
const gadis = document.querySelector('#Gadis')
const mercadona = document.querySelector('#Mercadona')
const mainContainer = document.querySelector('.main-container')
const spinner = document.querySelector('.spinner')
const cleanSearch = document.querySelector('.clean-search')

let actualPage = 1
const order = 1
let searchTerm = ''

const removeChilds = (parent) => {
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  removeChilds(mainContainer)
  getProducts(actualPage, limit, order)
})

document.addEventListener('scroll', e => {
  footer.style.visibility = 'visible'
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
  gadis.checked = false
  mercadona.checked = false
  if (e.target.value.length >= 2) {
    cleanSearch.disabled = false
    getAllProducts(searchTerm)
    spinner.style.display = 'none'
    footer.style.visibility = 'visible'
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
  spinner.style.display = 'block'
  search.value = ''
  actualPage = 1
  removeChilds(mainContainer)

  let supermarketName = null
  if (gadis.checked && !mercadona.checked) {
    supermarketName = 'Gadis'
  } else if (!gadis.checked && mercadona.checked) {
    supermarketName = 'Mercadona'
  }

  if (supermarketName) {
    getSupermarket(supermarketName, actualPage, limit, order)
  } else {
    getProducts(actualPage, limit, order)
  }
}

supermarkets.forEach((element) => {
  element.addEventListener('change', handleSupermarketChange)
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
  actualPage++
  let supermarket = null
  if (gadis.checked) {
    supermarket = 'Gadis'
  } else if (mercadona.checked) {
    supermarket = 'Mercadona'
  }

  if (supermarket) {
    if (supermarket === 'Gadis' && actualPage > gadisPages) {
      spinner.style.display = 'none'
      return
    } else if (supermarket === 'Mercadona' && actualPage > mercadonaPages) {
      spinner.style.display = 'none'
      return
    }
    getSupermarket(supermarket, actualPage, limit, order)
  } else {
    if (actualPage > maxPages) {
      spinner.style.display = 'none'
      return
    }
    getProducts(actualPage, limit, order)
  }
}
