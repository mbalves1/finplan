<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
    <Menu></Menu>
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
}
</style>