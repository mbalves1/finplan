<template>
    <div style="background: #222">
  <v-container class="main">
      <v-row class="text-center menu">
        <v-col cols="12" class="menu-container">
          <v-icon class="menu-icon left-icon" color="#919191">
            mdi-menu
          </v-icon>
          <v-icon class="menu-icon right-icon" color="#919191">
            mdi-bell
          </v-icon>
        </v-col>
      </v-row>
      <div class="d-flex justify-center mt-5">
        <v-card flat style="background: #B9E9BF;" width="100%" height="130" class="rounded-xl d-flex flex-column justify-center pl-5 backgrondCustom">
          <span class="d-flex justify-space-between">
            <v-title>Total Balance</v-title><v-icon class="mr-5" @click="$router.push('/home')">mdi-refresh</v-icon>
          </span>
          <v-subtitle class="pb-5"><strong>{{formatCurrency(totalBalance(true) - totalBalance(false))}}</strong></v-subtitle>
          <sub>
            <v-subtitle class="pr-5">Entrada: {{formatCurrency(totalBalance(true))}}</v-subtitle>
            <v-subtitle>Saída: {{formatCurrency(totalBalance(false))}}</v-subtitle>
            <v-icon class="pb-1 pl-2">{{totalBalance(true) - totalBalance(false) < 0 ? 'mdi-arrow-bottom-right' : 'mdi-arrow-top-right'}}</v-icon>
          </sub>
        </v-card>
      </div>

      <v-col>
        <v-row class="text-center mx-auto main--options">
          <div v-for="(card, idx) in options" :key="idx" class="d-flex flex-column">
            <v-card
              @click="goTo(card)"
              class="rounded-circle mr-4 d-flex justify-center align-center" color="#313131"
              width="60"
              height="60">
              <v-icon style="background: #313131" color="white">{{card.icon}}</v-icon>
            </v-card>
            <span style="color: #9E9E9E" class="mr-4 mt-1">
              {{card.title}}
            </span>
          </div>
        </v-row>
      </v-col>
    </v-container>

  <LastTransaction></LastTransaction>
    </div>
  
</template>

<script>
import LastTransaction from "@/components/LastTransaction.vue"
import { formatCurrency } from '../composable/format';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';

export default {
  name: 'HelloWorld',
  components: {
    LastTransaction
  },
  setup(props, { root }) {
    const store = useStore();
    const router = useRouter();
    const releases = ref([]);

    onMounted(async() => {
      await store.dispatch('getReleases');
      releases.value = store.getters.getReleases;
    })

    const goTo = (card) => {
      store.commit("SET_TYPE", card.title)
      router.push(`/${card.redirect}`)
    }

    const totalBalance = (isEntrance) => {
      let isType =  isEntrance ? 'Entrada' : 'Saída' 
      const totalEntradas = releases.value.reduce((sum, item) => {
        if (item.type === isType) {
          return sum + item.value;
        }
        return sum;
      }, 0);
      return totalEntradas;
    }

    const options = ref([
      {icon: "mdi-credit-card-plus", title: "entrada", redirect: "fin"},
      {icon: "mdi-credit-card-remove", title: "saída", redirect: "fin"},
      {icon: "mdi-finance", title: "dashboard"},
    ])

    return {
      formatCurrency,
      releases,
      options,
      totalBalance,goTo
    };
  }
}
</script>
<style scoped lang="scss">
.main {
  display: flex;
  justify-content: space-between;
  max-width: 678px;
  flex-direction: column;
  background: #222222;

  &--options {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    overflow: scroll;
    margin-top: 10px;
  }
  &--options::-webkit-scrollbar {
    display: none;
  }
}

.menu {
  display: flex;
  justify-content: center;
  max-height: 60px;
}

.menu-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 678px;
}

.menu-icon {
  font-size: 24px;
}

.left-icon {
  margin-right: 10px;
}

.right-icon {
  margin-left: 10px;
}

.section {
  background: #FFFFFF;
}

// .backgrondCustom {
//   background-image: url("../assets/trianglify-lowres1.png");
//   background-size: cover; /* ajusta o tamanho da imagem para cobrir todo o elemento */
//   background-repeat: no-repeat; /* evita que a imagem seja repetida */
// }

</style>
