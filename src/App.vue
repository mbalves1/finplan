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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.v-application {
  /* background: #666565 !important; */
}
</style>