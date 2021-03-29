<!-- @format -->

<template>
  <div id="app">
    <v-app>
      <Navbar />
      <router-view />
    </v-app>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
export default {
  components: { Navbar },
};
</script>

<style lang="scss">
// .theme--light.v-btn-toggle:not(.v-btn-toggle--group) .v-btn.v-btn {
//   border: 1px solid #2c5282 !important;
//   border-color: #2a4365 !important;
// }
.theme--light.v-btn-toggle:not(.v-btn-toggle--group) .v-btn.v-btn {
  border: 1px solid #2c5282 !important;
}
.v-btn-toggle:not(.v-btn-toggle--dense) .v-btn.v-btn.v-size--default {
  border: 1px solid #2c5282 !important;
}
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&family=Roboto:wght@400;500;700;900&display=swap");
@font-face {
  font-family: Suprema;
  src: url("./assets/fonts/suprema/SupremaRegular.ttf");
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
  margin-bottom: -25px;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.content-admin {
  display: flex;
  justify-content: center;
  margin-left: 270px;
  position: relative;
  z-index: 20;
  margin-right: 20px;
  margin-top: 70px;
  padding-bottom: 10px;

  @media screen and(max-width: 960px) {
    margin: 50px 20px 10px 20px;
  }
}
.v-btn--plain:not(.v-btn--active):not(.v-btn--loading):not(:focus):not(:hover).v-btn--plain:not(.v-btn--active):not(.v-btn--loading):not(:focus):not(:hover)
  .v-btn__content {
  opacity: 1 !important;
}

.v-btn--plain:not(.v-btn--active):not(.v-btn--loading):not(:focus):not(:hover)
  .v-btn__content {
  opacity: 1 !important;
  text-transform: capitalize;
  font-size: 14px !important;
  border: none;
}
.v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
  > .v-input__control
  > .v-input__slot {
  background-color: #edf2f7;
  box-shadow: 0px 4px 4px rgb(0 0 0 / 25%) !important;
  border: none !important;
}
.theme--light.v-select .v-select__selection--comma {
  color: #2a4365 !important;
}
.v-text-field.v-text-field--solo .v-input__control {
  height: 48px !important;
}
.profile-form {
  padding: 20px 20px 10px 20px;
  box-shadow: 0px 4px 4px rgb(0 0 0 / 25%) !important;
}
.vm--modal{
  height: auto !important;
  top: 20% !important;
}
</style>
