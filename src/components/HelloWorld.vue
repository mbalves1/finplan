<template>
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
      <v-card flat style="background: #B9E9BF;" width="100%" height="130" class="rounded-xl"></v-card>
    </div>

    <v-col>
      <v-row class="text-center mx-auto main--options">
        <div v-for="(card, idx) in options" :key="idx" class="d-flex flex-column">
          <v-card class="rounded-circle mr-4 d-flex justify-center align-center" color="#313131" width="60" height="60">
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
  <Menu></Menu>
  
</template>

<script>
import Menu from "@/components/Menu.vue"
import LastTransaction from "@/components/LastTransaction.vue"
import { ref } from 'vue';

export default {
  name: 'HelloWorld',
  components: {
    Menu,
    LastTransaction
  },
  setup() {
    const exemplos = ref([]);

    const options = ref([
      {icon: "mdi-credit-card-plus", title: "entrada"},
      {icon: "mdi-credit-card-remove", title: "saída"},
      {icon: "mdi-finance", title: "dashboard"},
    ])

    return {
      exemplos,
      options
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
</style>
