<template>
  <div class="chart-box">
        <div id="chart-candlestick">
        <apexchart type="candlestick" height="290" :options="chartOptions" :series="series"></apexchart>
      </div>
        <div id="chart-bar">
        <apexchart type="bar" height="160" :options="chartOptionsBar" :series="seriesBar"></apexchart>
      </div>
      </div>
</template>

<script>
import { defineComponent } from 'vue'
import { getCssVar } from 'quasar'

import { seriesData, seriesDataLinear} from "../assets/ohlc"

console.log(seriesData, seriesDataLinear);

export default defineComponent({
  name: 'ApexCandlestick',
  data () {
    return {
      series: [{
            data: seriesData
          }],
      chartOptions: {
            chart: {
              type: 'candlestick',
              height: 290,
              id: 'candles',
              toolbar: {
                autoSelected: 'pan',
                show: false
              },
              zoom: {
                enabled: false
              },
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: '#3C90EB',
                  downward: '#DF7D46'
                }
              }
            },
            xaxis: {
              type: 'datetime'
            }
          },

          seriesBar: [{
            name: 'volume',
            data: seriesDataLinear
          }],
          chartOptionsBar: {
            chart: {
              height: 160,
              type: 'bar',
              brush: {
                enabled: true,
                target: 'candles'
              },
              selection: {
                enabled: true,
                xaxis: {
                  min: new Date('20 Jan 2017').getTime(),
                  max: new Date('10 Dec 2017').getTime()
                },
                fill: {
                  color: '#ccc',
                  opacity: 0.4
                },
                stroke: {
                  color: '#0D47A1',
                }
              },
            },
            dataLabels: {
              enabled: false
            },
            plotOptions: {
              bar: {
                columnWidth: '80%',
                colors: {
                  ranges: [{
                    from: -1000,
                    to: 0,
                    color: '#F15B46'
                  }, {
                    from: 1,
                    to: 10000,
                    color: '#FEB019'
                  }],
            
                },
              }
            },
            stroke: {
              width: 0
            },
            xaxis: {
              type: 'datetime',
              axisBorder: {
                offsetX: 13
              }
            },
            yaxis: {
              labels: {
                show: false
              }
            }
          },
          
      
    }
  }
})
</script>
