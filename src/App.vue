<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router';

export default {
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
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Ubuntu', sans-serif;
}

.v-application {
  /* background: #666565 !important; */
}
</style>