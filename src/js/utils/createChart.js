import { bgColor, borderColor } from './priceHandler.js'
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
        title: {
          display: true,
          text: 'Análisis Precio(€)'
        },
        legend: {
          display: false
        },
        y: {
          suggestedMin: 0,
          suggestedMax: 5,
          ticks: {
            stepSize: 0.5
          }
        }
      }
    }
  }

  new Chart(priceChart, config) // eslint-disable-line
}
