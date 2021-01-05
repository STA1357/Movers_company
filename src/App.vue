<template>
  <div id="app">
    <Menu />
    <router-view />
  </div>
</template>

<script>
import Menu from "./components/Menu";
export default {
  name: "App",
  components: {
    Menu
  }
};
</script>

<style>
#app {
  text-align: center;
  background: #e5e5e5;
  min-height: 100vh;
  overflow: hidden;
  padding-top: 15vh;
}
.card {
  margin: 0 auto;
  background: #f9f9f9;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  box-shadow: 4px 8px 18px 2px rgba(0, 0, 0, 0.15);
  border-radius: 19px;
  width: 314px;
  height: auto;
  padding: 14px;
}
.block {
  width: 286px;
  height: 67px;

  background: #ffffff;
  border-radius: 11px;
}
.txt {
  @font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 22px;
  /* identical to box height */

  letter-spacing: 0.015em;

  color: #0f2f31;
}
.inputs {
  height: 20px;
  border: none;
  max-width: 115px;
  outline: none;
}
.inputs::placeholder {
  @font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 22px;
  /* identical to box height */

  letter-spacing: 0.015em;

  color: #bfbfbf;
}
.inputs::placeholder:focus,
.inputs::placeholder:disabled {
  @font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 22px;
  /* identical to box height */

  letter-spacing: 0.015em;

  color: #0f2f31;
}
</style>
