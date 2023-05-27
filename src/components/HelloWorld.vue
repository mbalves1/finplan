<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="logo"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to the Vuetify 3 Beta
        </h1>

          <h4>Vite Preview</h4>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-5">
          Ecosystem
        </h2>

        <v-row justify="center">

          <v-card v-for="(fin, id) in exemplos" :key="id">
            {{ fin }}
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import logo from '../assets/logo.svg'
import { onMounted, ref } from 'vue';

export default {
  name: 'HelloWorld',

  data: () => ({
    logo
  }),
  setup() {
    const exemplos = ref([]);

    onMounted(() => {
      getExemplos();
    });
    
    const getExemplos = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/services');
        const data = await response.json();
        exemplos.value = data;
        console.log("exemplos", exemplos.value);
      } catch (error) {
        console.error(error);
      }
    };

    return {
      exemplos,
      getExemplos
    };
  }
}
</script>
