import { bgColor, borderColor } from '../handlers/price-color-handler.js'
export const chartConfig = (monthsArray, pricesArray, priceChart) => {
  const dataChart = {
    labels: monthsArray,
    datasets: [{
      backgroundColor: bgColor,
      borderColor,
      data: pricesArray
    }]
  }

  const config = {
    type: 'line',
    data: dataChart,
    options: {
      plugins: {
        legend: {
          display: false
        },
        y: {
          suggestedMin: 0,
          suggestedMax: 7.5,
          ticks: {
            stepSize: 1.5
          }
        }
      }
    }
  }

  new Chart(priceChart, config) // eslint-disable-line
}
