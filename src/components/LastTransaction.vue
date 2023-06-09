<template>
<div class="container-release">
  <v-snackbar
    v-model="showSnackbar"
    color="green"
    :timeout="3000"
    location="right top"
    class="mt-9"
  >
    Deletado com sucesso!
  </v-snackbar>
  <Modal :data="itemToDelete" :openModal="open" @deleteById="deleted" @cancelDeleteById="close"></Modal>
  <v-list class="list">
    <v-col class="d-flex justify-space-between align-center" style="max-height: 40px;">
      <v-subtitle class="mt-5"><strong>Últimos lançamentos</strong></v-subtitle>
      <v-select
        class="custom-select mt-9"
        density="compact"
        variant="solo"
        flat
        :items="items"
        clear-icon
        prepend-icon="undefined"
        v-model="select"
      >
      </v-select>
    </v-col>
    <div class="scrollable">
      <v-list-item-group
        v-model="selectedItem"
        color="#B9E9BF"
      > 
        <v-col class="d-flex justify-center" v-if="loading">
          <v-progress-circular
            indeterminate
            color="#B9E9BF"
          ></v-progress-circular>
        </v-col>
        <v-list-item
          v-else
          v-for="(item, i) in filterDataByMonth(select)"
          :key="i"
          
          @click="toggleItem(i)"
        >
          <v-list-item-content class="d-flex flex-row justify-space-between align-center" :class="{ 'shifted': selectedItemId === i }">
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
            <div v-show="selectedItemId === i" style="background: red; padding: 15px; margin-right: -50px; border-radius: 17px;">
              <v-icon class="shift-button" @click="deleteRel(item)">mdi-delete</v-icon>
            </div>

          </v-list-item-content>
          <v-divider class="mt-2 no-shifted"></v-divider>
        </v-list-item>
      </v-list-item-group>
    </div>
  </v-list>
</div>
</template>
<script>
import { ref, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import { formatCurrency } from '../composable/format';

import Modal from '@/components/shared/Modal.vue'

export default {
  data: () => ({
    select: 'Todos',
    items: ['Todos', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  }),
  components: {
    Modal
  },
  setup() {
    const store = useStore();
    const releases = ref([]);
    const loading = ref(false);
    const selectedItemId = ref(null);
    const showSnackbar = ref(false)
    const open = ref(false)
    const itemToDelete = ref([])

    const toggleItem = (index) => {
      if (selectedItemId.value === index) {
        selectedItemId.value = null;
      } else {
        selectedItemId.value = index;
      }
    };

    onMounted(async () => {
      getData()
    });

    const getData = async () => {
      try {
        loading.value = true
        await store.dispatch('getReleases');
        releases.value = store.getters.getReleases;
        loading.value = false
      } catch (erro) {
        loading.value = false
        console.error(erro)
      }
    }

    const filterDataByMonth = (month) => {
      if (month === 'Todos') {
        return releases.value
      }
      let mes = releases.value.filter(item => item.mounth === month)
      return releases.value.filter(item => item.mounth === month)
    }

    const processPayment = (item) => {
      if (item.method_payment === 'cartao') {
        if (item.type === 'Entrada') {
          return 'mdi-cash-plus';
        } else if (item.type === 'Saída') {
          return'mdi-finance';
        }
      } else if (item.method_payment === 'dinheiro') {
        if (item.type === 'Entrada') {
          'mdi-finance'
        } else if (item.type === 'Saída') {
          'mdi-finance'
        }
      }
    }

    const deleted = async (event) => {
      console.log("true", event);
      console.log("trwwwue", !event);
      open.value = !event
      const { _id } = itemToDelete.value
      try {
        await store.dispatch('deleteRelease', _id);
        await getData()
        showSnackbar.value = true
      } catch (err) {
        throw new Error
      } 
    }

    const deleteRel = async (item) => {
      itemToDelete.value = item
      open.value = true
    }

    const close = () => {
      open.value = false
    }

    return {
      formatCurrency,
      releases,
      processPayment,
      filterDataByMonth,
      loading,
      selectedItemId,
      toggleItem,
      deleteRel,
      showSnackbar,
      open,
      itemToDelete,
      deleted,
      close
    };
  }
}
</script>
<style scoped lang="scss">
.shifted {
  transform: translateX(-50px);
  transition: transform 0.3s ease-out;
}

.shift-button {
  margin-left: auto;
}

.list {
  background: #F7F7F7;
  max-width: 678px;
  display: flex;
  margin: auto;
  justify-content: flex-start;
  flex-direction: column;
  padding: 5px 5px;
  overflow: hidden;
  height: 52vh;
}

.scrollable {
  overflow-y: auto;
  max-height: 300px;
  height: 100%;
  margin-top: 10px;
  // padding-bottom: 50px;
}

.hide-scrollbar::-webkit-scrollbar {
  width: 0;
  background: transparent;
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