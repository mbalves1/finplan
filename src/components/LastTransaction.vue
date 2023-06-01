<template>
  <v-list class="releases">
    <v-col class="d-flex justify-space-between" style="height: 40px">
      <v-subtitle class="px-4"><strong>Últimos lançamentos</strong></v-subtitle>
      <span>
        <v-select
          class="custom-select"
          density="compact"
          variant="solo"
          flat
          :items="items"
          clear-icon
          prepend-icon="undefined"
          v-model="select"
        >
          <template #prepend></template>
        </v-select>
      </span>
    </v-col>
    <div class="scrollable">
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in filterDataByMonth(select)"
          :key="i"
          class=""
        >
          <v-list-item-content class="d-flex flex-row justify-space-between align-center">
            <div class="d-flex align-center">
              <v-icon color="#FFF" style="background: #313131; border-radius: 50%; padding: 20px" class="">
                {{item.type === 'Saída' ? 'mdi-cash-minus' : 'mdi-cash-plus' }}
              </v-icon>
              <div class="ml-4">
                <v-list-item-title>{{item.name}}</v-list-item-title>
                <v-list-item-subtitle class="pb-2">{{item.description}}</v-list-item-subtitle>    
              </div>
            </div>
            <span :style="`color:${item.type === 'Saída' ? 'red' : 'green' }`">
              <v-icon size="12">{{item.type === 'Saída' ? 'mdi-minus' : 'mdi-plus'}}</v-icon>
              {{ formatCurrency(item.value) }}</span>

          </v-list-item-content>
          <v-divider class="mt-2"></v-divider>
        </v-list-item>
      </v-list-item-group>
    </div>
  </v-list>
</template>
<script>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { formatCurrency } from '../composable/format';

export default {
  data: () => ({
    select: 'Março',
    items: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  }),
  setup() {
    const store = useStore();
    const releases = ref([]);

    onMounted(async () => {
      await store.dispatch('getReleases');
      releases.value = store.getters.getReleases;
    });

    const filterDataByMonth = (month) => {
      let mes = releases.value.filter(item => item.mounth === month)
      console.log(mes);
      return releases.value.filter(item => item.mounth === month)
    }

    const processPayment = (item) => {
      if (item.method_payment === 'cartao') {
        if (item.type === 'entrada') {
          return 'mdi-cash-plus';
        } else if (item.type === 'saida') {
          return'mdi-finance';
        }
      } else if (item.method_payment === 'dinheiro') {
        if (item.type === 'entrada') {
          'mdi-finance'
        } else if (item.type === 'saida') {
          'mdi-finance'
        }
      }
    }

    return {
      formatCurrency,
      releases,
      processPayment,
      filterDataByMonth
    };
  }
}
</script>
<style scoped lang="scss">
.list {
  background: #F7F7F7;
  max-width: 678px;
  display: flex;
  margin: auto;
  justify-content: flex-start;
  flex-direction: column;
  padding: 5px 16px;
  overflow: hidden;
}

.scrollable {
  overflow-y: auto;
  max-height: 400px;
  margin-top: 10px;
  margin-bottom: 100px;
}

.releases {
  max-width: 678px;
  margin: auto;
}

::v-deep .custom-select .v-select__selections {
  font-size: 10px;
}

::v-deep .v-input__control {
  // width: 30px;
  padding: 0;
}
</style>