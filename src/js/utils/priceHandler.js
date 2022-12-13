export let bgColor = 'rgb(255, 99, 132)'
export let borderColor = 'rgb(255, 99, 132)'

const setColor = (elements, color) => {
  elements.forEach(element => {
    element.style.color = color
  })
}

export const getPrices = (prices, actualPrice, priceVariation) => {
  const priceIncrement = (prices[prices.length - 1] - prices[0]).toFixed(2)
  const porcentualIncrement = (((prices[prices.length - 1] - prices[0]) / prices[0]) * 100).toFixed(2)

  actualPrice.id = 'actual-price'
  actualPrice.textContent = `${prices[prices.length - 1].replace('.', ',')}€`

  priceVariation.id = 'increment'
  priceVariation.textContent = `+${priceIncrement.replace('.', ',')}€ (+${porcentualIncrement.replace('.', ',')}%)`

  if (priceIncrement < 0) {
    priceVariation.textContent = `${priceIncrement.replace('.', ',')}€ (${porcentualIncrement.replace('.', ',')}%)`
    setColor([actualPrice, priceVariation], 'green')
  } else if (priceIncrement == 0) { //eslint-disable-line
    setColor([actualPrice, priceVariation], 'gray')
  } else {
    setColor([actualPrice, priceVariation], 'red')
  }

  defineChartColor(priceIncrement)
}

const defineChartColor = (priceIncrement) => {
  bgColor = borderColor = priceIncrement < 0
    ? 'rgb(0, 128, 0)'
    : priceIncrement == 0 //eslint-disable-line
      ? 'rgb(192,192,192)'
      : 'rgb(255, 99, 132)'
}
