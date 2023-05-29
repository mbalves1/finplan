<template>
  <div class="wrap">
    <div class="footer">
      <div class="menu-container">
        <v-icon class="menu-icon left-icon">
          mdi-menu
        </v-icon>
        <v-icon class="menu-icon right-icon">
          mdi-bell
        </v-icon>
        <v-icon class="menu-icon right-icon">
          mdi-menu
        </v-icon>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.wrap {
  padding: 0;
  display: flex;
  flex-direction: column;
  // max-width: 678px;
  position: fixed;
  bottom: 0;
  // background: #FFFFFF;
  width: 100%;
}

.menu {
  display: flex;
  justify-content: center;
  &-container {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    // max-width: 678px;
    background: #FFFFFF;
    height: 70px;
    padding: 0;
    box-shadow: 0px -11px 15px -4px rgba(0,0,0,0.1);
  }  
}
</style>