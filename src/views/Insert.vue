<template>
  <v-card class="pa-4 form-card ma-5 mt-6" flat>
    <form>
      <v-row class="justify-end">
        <v-icon>
          mdi-delete
        </v-icon>
      </v-row>
      <v-radio-group v-model="radio" class="d-flex" inline>
        <template v-slot:label >
          <div class="d-flex justify-space-between">
            <strong>Tipo de lançamento</strong>
          </div>
        </template>
        <v-radio label="Entrada" value="entrada"></v-radio>
        <v-radio label="Saída" value="saída"></v-radio>
      </v-radio-group>

      <v-text-field
        variant="outlined"
        v-model="state.name"
        :counter="10"
        label="Name"
        required
      ></v-text-field>

      <v-text-field
        variant="outlined"
        v-model="state.email"
        label="Descrição"
        required
      ></v-text-field>

      <v-select
        variant="outlined"
        v-model="state.select"
        :items="items"
        label="Mês"
        required
      ></v-select>

      <v-radio-group inline>
        <template v-slot:label>
          <div><strong>Metodo de pagamento</strong></div>
        </template>
        <v-radio label="Cartão" value="1"></v-radio>
        <v-radio label="Dinheiro" value="2"></v-radio>
        <v-radio label="Pix" value="2"></v-radio>
      </v-radio-group>

      <v-btn
        class="me-4"
      >
        submit
      </v-btn>
    </form>
  </v-card>
</template>
<script>
  import { onMounted, reactive, ref } from 'vue'
  import { useStore } from 'vuex';
  export default {
    name: 'Insert',
    setup () {
      const store = useStore();
      const initialState = {
        name: '',
        email: '',
        select: null,
        checkbox: null,
      }

      const radio = ref(null)

      const state = reactive({
        ...initialState,
      })

      onMounted(() => {
        radio.value = store.state.type
      })

      const items = ref([
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ])

      return { state, items, radio }
    },
  }
</script>
<style scoped lang="scss">
.form-card {
  max-width: 678px;
  margin: auto;
}

</style>