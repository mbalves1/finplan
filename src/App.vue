<template>
  <v-app>
    <v-main>
      <router-view/>
      <Menu v-if="isLogin"></Menu>
    </v-main>
  </v-app>
</template>

<script>
import { computed } from 'vue'
import Menu from './components/Menu.vue'
import { useRouter } from 'vue-router';

export default {
  components: { Menu },
  name: 'App',

  data: () => ({
    //
  }),
  setup(pros, { root }) {
    const router = useRouter();

    const isLogin = computed(() => {
      return router.currentRoute.value.path !== "/"
    })

    return {isLogin}
  }
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