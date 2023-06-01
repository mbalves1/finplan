<template>
  <v-app>
    <v-main>
      <router-view/>
      <Menu></Menu>
    </v-main>
  </v-app>
</template>

<script>
import Menu from './components/Menu.vue'

export default {
  components: { Menu },
  name: 'App',

  data: () => ({
    //
  }),
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* background: #222; */
}
</style>