import { getProducts, getAllProducts, getSupermarket } from './components/getProducts.js'

const footer = document.querySelector('footer')
const search = document.querySelector('.product-filter')
const selectOrder = document.querySelector('#order-by')
const supermarkets = document.querySelectorAll("input[type='checkbox']")
const gadis = document.querySelector('#Gadis')
const mercadona = document.querySelector('#Mercadona')
const mainContainer = document.querySelector('.main-container')
const spinner = document.querySelector('.spinner')

let actualPage = 1
let order = 1
let supermarket = ''
let searchTerm = ''
const limit = 60
const TOTAL_PRODUCTS = 474
const GADIS_PRODUCTS = 350
const MERCADONA_PRODUCTS = 124
const defaultPages = Math.ceil(TOTAL_PRODUCTS / limit)
const gadisPages = Math.ceil(GADIS_PRODUCTS / limit)
const mercadonaPages = Math.ceil(MERCADONA_PRODUCTS / limit)

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
    getAllProducts(searchTerm)
  }
  if (e.target.value.length === 0) {
    actualPage = 1
    getProducts(actualPage, limit, order)
  }
}, 250))

const handleOrderChange = (e) => {
  order = selectOrder.value
  search.value = ''
  spinner.style.display = 'block'
  removeChilds(mainContainer)
  actualPage = 1

  if (gadis.checked === true || mercadona.checked === true) {
    getSupermarket(supermarket, actualPage, limit, order)
  } else {
    getProducts(actualPage, limit, order)
  }
}

selectOrder.addEventListener('change', handleOrderChange)

const handleSupermarketChange = (e) => {
  e.preventDefault()
  supermarket = e.target.id
  spinner.style.display = 'block'
  search.value = ''
  actualPage = 1
  removeChilds(mainContainer)

  if (gadis.checked === true && mercadona.checked === false) {
    getSupermarket('Gadis', actualPage, limit, order)
  } else if (mercadona.checked === true && gadis.checked === false) {
    getSupermarket('Mercadona', actualPage, limit, order)
  } else if (gadis.checked === true && mercadona.checked === true) {
    getProducts(actualPage, limit, order)
  } else if (gadis.checked === false && mercadona.checked === false) {
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
  } else {
    spinner.style.display = 'none'
  }
})

const newPage = () => {
  actualPage++
  if (gadis.checked && mercadona.checked) {
    if (actualPage <= defaultPages) {
      getProducts(actualPage, limit, order)
    } else {
      spinner.style.display = 'none'
    }
  } else if (gadis.checked) {
    if (actualPage <= gadisPages) {
      getSupermarket('Gadis', actualPage, limit, order)
    } else {
      spinner.style.display = 'none'
    }
  } else if (mercadona.checked) {
    if (actualPage <= mercadonaPages) {
      getSupermarket('Mercadona', actualPage, limit, order)
    } else {
      spinner.style.display = 'none'
    }
  } else {
    if (actualPage <= defaultPages) {
      getProducts(actualPage, limit, order)
    } else {
      spinner.style.display = 'none'
    }
  }
}
