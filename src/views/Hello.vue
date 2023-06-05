<template>
<div class="main">
  <div class="custom">
    <h1 class="custom--title">fin.<span class="custom--subtitle">plan</span></h1>
    <img src="../assets/Revenue-bro.svg" class="floating">
    <v-btn class="custom-btn" rounded @click="$router.push('/home')">Login
      <v-icon right class="ml-5">mdi-arrow-right</v-icon>
    </v-btn>
  </div>
</div>
</template>
<style lang="scss" scoped>
@media screen and (min-width:678px) {
  .custom {
    display: flex;
    align-items: center;

    & > img {
      width: 405px;
      margin-top: 30px;
    }
  }
}

.custom {
  // background-image: url("../assets/Revenue-bro.svg");
  // background-size: cover; /* ajusta o tamanho da imagem para cobrir todo o elemento */
  background-repeat: no-repeat; /* evita que a imagem seja repetida */
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // justify-content: flex-start;
  align-items: end;

  &--title {
    color: #B9E9BF;
  }

  &--subtitle {
    color: #f2f2f2;
  }

  & > img {
    margin-top: 30px;
  }

  &-btn {
    background: #B9E9BF;
    margin: 20px;
    width: 200px;
    height: 60px;
  }
}

.main {
  padding: 0 20px;
  background: #222;
}

.floating { 
  animation-name: floating;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  margin-left: 30px;
  margin-top: 5px;
}
 
@keyframes floating {
  0% { transform: translate(0,  0px); }
  50%  { transform: translate(0, 20px); }
  100%   { transform: translate(0, -0px); }   
}
</style>