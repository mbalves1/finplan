<template>
  <Pie :data="chartData" :options="chartOptions" />
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'
import { onMounted, ref, computed } from 'vue'
import { useStore } from 'vuex';

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'App',
  components: {
    Pie
  },
  setup() {
    const store = useStore();

    const releases = ref([]);

    const chartData = computed(() => {
      return {
        labels: releases.value.map(rel => rel.name),
        datasets: [
          {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
            data: releases.value.map(rel => rel.value)
          }
        ]
      };
    });

    const chartOptions = computed(() => {
      return {
        responsive: true,
        maintainAspectRatio: false
      };
    });

    onMounted(async () => {
      await store.dispatch('getReleases');
      releases.value = store.getters.getReleases.filter(rel => rel.type === 'Saída');
    });

    return { chartData, chartOptions };
  }
}
</script>