<template>
  <v-list>
    <v-subtitle class="px-4"><strong>Últimos lançamentos</strong></v-subtitle>
    <div class="scrollable">
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in releases"
          :key="i"
          class=""
        >
          <v-list-item-content class="d-flex flex-row justify-space-between align-center">
            <div class="d-flex align-center">
              <v-icon class="">
                {{item.type === 'Saída' ? 'mdi-cash-minus' : 'mdi-cash-plus' }}
              </v-icon>
              <div class="ml-4">
                <v-list-item-title v-text="item.name"></v-list-item-title>
                <v-list-item-subtitle class="pb-2">{{item.description}}</v-list-item-subtitle>    
              </div>
            </div>
            <span :style="`color:${item.type === 'Saída' ? 'red' : 'green' }`">{{ formatCurrency(item.value) }}</span>

          </v-list-item-content>
          <v-divider class=""></v-divider>
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
    items: [],
  }),
  setup() {
    const store = useStore();
    const releases = ref([]);

    onMounted(async () => {
      await store.dispatch('getReleases');
      releases.value = store.getters.getReleases;
    });

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
      processPayment
    };
  }
}
</script>
<style scoped>
.list {
  background: #FFF;
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
</style>