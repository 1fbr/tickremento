const spinner = document.querySelector('.spinner')

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

export const isModalDisplayed = () => {
  if (document.querySelector('.modal-window')) {
    spinner.style.display = 'none'
    return true
  }
  return false
}
