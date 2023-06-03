<template>
  <div class="form">
    <v-snackbar
      v-model="showSnackbar"
      color="green"
      :timeout="3000"
      location="right top"
      class="mt-9"
    >
      Registrado com sucesso!
    </v-snackbar>
    <v-dialog v-model="open">
      <v-card class="pa-5 pt-0">
        <v-card-title class="pa-2">Deseja registrar:</v-card-title>
        <v-divider class="pb-3"></v-divider>
        <span class="d-flex justify-center" style="margin: auto">
          <v-card-text class="pa-0 text-capitalize">
            <v-icon size="15" :color="radio === 'saída' ? 'red' : 'green'">{{radio === "saída" ? 'mdi-arrow-bottom-right' : 'mdi-arrow-top-right'}}</v-icon>
            {{radio}}
          </v-card-text>
        </span>
        <v-card-text class="pa-0">Name: {{state.name}}</v-card-text>
        <v-card-text class="pa-0" v-if="state.description">Descrição: {{state.description}}</v-card-text>
        <v-card-text class="pa-0">Valor: {{state.value}}</v-card-text>
        <v-card-text class="pa-0" v-if="state.mounth">Mês: {{state.mounth}}</v-card-text>
        <v-card-text class="pa-0" v-if="state.method_payment">Metodo: {{state.method_payment}}</v-card-text>
        <v-card-actions class="">
          <v-col>
            <v-btn
              class="mt-4 button"
              theme
              @click="postReleases"
              flat
              :ripple="true"
              variant="outlined"
              size="x-large"
              color="grey"
            >Salvar</v-btn>
            <v-btn
              class="mt-4 button-cancel mr-0"
              theme
              @click="open = false"
              :ripple="true"
              size="x-large"
              color="grey"
            >Cancelar</v-btn>
          </v-col>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card class="pa-4 form-card ma-5 mt-6" flat>
      <form>
        <v-row class="justify-space-between mb-5">
          <v-icon @click="$router.push('/home')">
            mdi-arrow-left
          </v-icon>
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
          class="my-3"
          :counter="10"
          label="Name"
          required
          :rules="[v => !!v || 'O nome é obrigatório']"
        ></v-text-field>

        <v-text-field
          variant="outlined"
          v-model="state.description"
          label="Descrição"
          required
          class="my-3"
        ></v-text-field>

        <v-text-field
          variant="outlined"
          v-model="state.value"
          label="Valor"
          required
          class="my-3"
          :rules="[v => !!v || 'O valor é obrigatório']"
        ></v-text-field>

        <v-select
          variant="outlined"
          v-model="state.select"
          :items="items"
          label="Mês"
          required
          class="my-3"
        ></v-select>

        <v-radio-group inline>
          <template v-slot:label>
            <div><strong>Metodo de pagamento</strong></div>
          </template>
          <v-radio label="Cartão" value="1"></v-radio>
          <v-radio label="Dinheiro" value="2"></v-radio>
          <v-radio label="Pix" value="3"></v-radio>
        </v-radio-group>

        <v-btn
          class="mt-4 button"
          theme
          @click="openModal"
          flat
          :ripple="true"
          variant="outlined"
          size="x-large"
          color="grey"
        >
          submit
          <!-- <v-icon class="menu-icon right-icon" color="#919191">
            mdi-send
          </v-icon> -->
        </v-btn>
      </form>
    </v-card>
    <Menu></Menu>
  </div>
</template>
<script>
import Menu from '@/components/Menu.vue'
  import { computed, onMounted, reactive, ref } from 'vue'
  import { useStore } from 'vuex';
import { postReleases } from '@/service/api';
  export default {
    name: 'Insert',
    components: {
      Menu
    },
    setup () {
      const store = useStore();
      const initialState = {
        name: '',
        description: '',
        select: null,
        value: null,
        checkbox: null,
      }

      const radio = ref(null)
      const showSnackbar = ref(false)

      const open = ref(false)

      const state = reactive({
        ...initialState,
        type: radio
      })

      onMounted(() => {
        console.log("store.state", store.state);
        radio.value = store.state.release.type
      })

      const openModal = () => {
        open.value = !open.value
      }

      const postReleases = async () => {
        console.log("aQUI", state);
        open.value = !open.value
        showSnackbar.value = true
        try {
          const response = await store.dispatch('postReleases', state);
          console.log(">", response);
        } catch (error) {
          console.error(error);
        }
      }

      const items = ref([
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ])

      return { state, items, radio, openModal, open, postReleases, showSnackbar }
    },
  }
</script>
<style scoped lang="scss">

.form {
  &-card {
    // background: #ebebeb;
    max-width: 678px;
    margin: auto;
  }
}

.button {
  background: #B9E9BF;
  border: red;
  width: 100%;
  &-cancel {
    width: 100%;
    background: rgb(212, 211, 211);
    color: #B9E9BF;
  }
}

.v-card-actions .v-btn ~ .v-btn {
  margin-inline-start: 0;
}

</style>