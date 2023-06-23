<template>
  <div class="wrapper">
    <v-col class="dashboard">
        <v-card-title style="color: white" class="mt-5">Gráfico de Receitas</v-card-title>
        <v-card flat class="dashboard--sheet">
          <doughnut-chart :chartData="chartDataIn" :chartOptions="chartOptions"></doughnut-chart>
        </v-card>

        <v-card-title style="color: white">Gráfico de despesas</v-card-title>
        <v-card flat class="dashboard--sheet">
          <doughnut-chart :chartData="chartData" :chartOptions="chartOptions"></doughnut-chart>

        </v-card>
      </v-col>
  </div>
  <Menu></Menu>

</template>
<script>
import Menu from "@/components/Menu.vue"
import DoughnutChart from "@/components/shared/DoughnutChart.vue"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, PointElement } from 'chart.js'
import { Line } from 'vue-chartjs'
import { useStore } from 'vuex';
import { onMounted, ref, computed } from 'vue'

ChartJS.register(ArcElement, Tooltip, Legend, PointElement)

 export default {
    name: 'Insert',
    components: {
      Menu,
      DoughnutChart,
      Line
    },
     setup() {
    const store = useStore();

    const releasesOut = ref([]);
    const releasesIn = ref([]);

    const chartData = computed(() => {
      return {
        labels: releasesOut.value.map(rel => rel.name),
        datasets: [
          {
            backgroundColor: ['#943021', '#C7402C', '#943021', '#D07A6C', '#471710', '#943021'],
            data: releasesOut.value.map(rel => rel.value)
          }
        ]
      };
    });

    const chartDataIn = computed(() => {
      return {
        labels: releasesIn.value.map(rel => rel.name),
        datasets: [
          {
            backgroundColor: ['#D8F5B5', '#536955', '#336939', '#8FB593', '#B9E9BF', '#74EC82'],
            data: releasesIn.value.map(rel => rel.value)
          }
        ]
      };
    });
    

    const chartOptions = computed(() => {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              usePointStyle: true
            }
          }
        }
      };
    });

    onMounted(async () => {
      await store.dispatch('getReleases');
      releasesOut.value = store.getters.getReleases.filter(rel => rel.type === 'Saída');
      releasesIn.value = store.getters.getReleases.filter(rel => rel.type === 'Entrada');
    });

    return { chartData, chartOptions, chartDataIn };
  }
 }
</script>
<style lang="scss" scoped>
.wrapper {
  height: 100vh;
  display: flex;
  align-items: flex-start;
  background: #222;
}
.dashboard {
  &--sheet {
    background: #1f1f1f;
    padding: 20px 40px 20px 0;
  }
}
</style>
