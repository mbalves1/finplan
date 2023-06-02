<template>
  <div class="custom">
    <v-btn class="custom-btn" rounded @click="$router.push('/home')">Login
      <v-icon right class="ml-5">mdi-arrow-right</v-icon>
    </v-btn>
  </div>
</template>
<style lang="scss" scoped>
.custom {
  background-image: url("../assets/log.png");
  background-size: cover; /* ajusta o tamanho da imagem para cobrir todo o elemento */
  background-repeat: no-repeat; /* evita que a imagem seja repetida */
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: end;
  &-btn {
    background: #B9E9BF;
    margin: 20px;
    width: 200px;
    height: 60px;
  }
}
</style>