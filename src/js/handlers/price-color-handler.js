export let bgColor = ''
export let borderColor = ''

const setColor = (elements, color) => {
  elements.forEach(element => {
    element.style.color = color
  })
}

export const getPriceColor = (totalIncrease, currentPrice, increase) => {
  if (totalIncrease < 0) {
    setColor([currentPrice, increase], 'green')
    bgColor = borderColor = 'green'
  } else if (totalIncrease == 0) { //eslint-disable-line
    setColor([currentPrice, increase], 'gray')
    bgColor = borderColor = 'gray'
  } else {
    setColor([currentPrice, increase], 'red')
    bgColor = borderColor = 'red'
  }
}
