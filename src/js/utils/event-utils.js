const spinner = document.querySelector('.spinner')
const filters = document.querySelector('.filters')

export const removeChilds = (parent) => {
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild)
  }
}

export const debounce = (func, delay) => {
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

export const disableFilters = () => {
  if (document?.querySelector('.modal-window').firstChild.outerText === 'Ocurrió un error') {
    spinner.style.display = 'none'
    for (let i = 0; i <= 5; i++) {
      filters[i].disabled = true
    }
  }
}
