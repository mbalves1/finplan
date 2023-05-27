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
    <div class="d-flex justify-center mx-5 mt-5">
      <v-card flat style="background: #9E9E9E;" width="100%" height="200" class="rounded-xl"></v-card>
    </div>
  </v-container>
</template>

<script>
import { onMounted, ref } from 'vue';

export default {
  name: 'HelloWorld',
  setup() {
    const exemplos = ref([]);

    onMounted(() => {
      getExemplos();
    });
    
    const getExemplos = async () => {
      try {
        const response = await fetch('https://backend-finplan.vercel.app/api/services');
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
<style scoped lang="scss">

.main {
  display: flex;
  flex-direction: column;
  max-width: 678px;
  padding: 20px;
}

.menu {
  display: flex;
  justify-content: center;
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
</style>
