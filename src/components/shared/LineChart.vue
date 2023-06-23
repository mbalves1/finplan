<template>
  <Line :data="chartData" :options="chartOptions" class="doughnut" />
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend, PointElement } from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend, PointElement)

export default {
  name: 'App',
  components: {
    Line
  },
  props: {
    chartData: {
      type: Object
    },
    chartOptions: {
      type: Object
    },
  },
}
</script>
<style>
.doughnut {
  height: 140px;
}
</style>