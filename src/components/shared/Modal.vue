<template>
  <v-dialog v-model="openModalDelete">
    <v-card class="pa-5 pt-0">
      <v-card-title class="pa-2">Deseja cancelar esse registro ?</v-card-title>
      <v-divider class="pb-3"></v-divider>
      <span class="d-flex justify-center" style="margin: auto">
        <v-card-text class="pa-0 text-capitalize">
          <v-icon size="15" :color="data === 'Saída' ? 'red' : 'green'">{{radio === "Saída" ? 'mdi-arrow-bottom-right' : 'mdi-arrow-top-right'}}</v-icon>
          {{radio}}
        </v-card-text>
      </span>
      <v-card-text class="pa-0">Name: {{data.name}}</v-card-text>
      <v-card-text class="pa-0">Valor: {{data.value}}</v-card-text>

      <v-card-actions class="">
        <v-col>
          <v-btn
            class="mt-4 button"
            theme
            @click="deleteById"
            flat
            :ripple="true"
            variant="outlined"
            size="x-large"
            color="error"
          >Cancelar</v-btn>
          <v-btn
            class="mt-4 button-cancel mr-0"
            theme
            flat
            @click="cancelDeleteById"
            :ripple="true"
            size="x-large"
            variant="outlined"
            color="grey"
          >Não, voltar</v-btn>
        </v-col>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { computed, ref } from 'vue'
export default {
  name: 'Modal',
  props: {
    data: {
      type: Object
    },
    openModal: {
      type: Boolean
    }
  },
  setup(props, { emit }) {
    const open = ref(false)

    const openModalDelete = computed(() => {
      return open.value = props.openModal
    })

    const deleteById = () => {
      emit("deleteById", true)
    }
    
    const cancelDeleteById = () => {
      emit("cancelDeleteById", false)
    }

    return {
      openModalDelete,
      cancelDeleteById,
      deleteById
    }
  }
}
</script>