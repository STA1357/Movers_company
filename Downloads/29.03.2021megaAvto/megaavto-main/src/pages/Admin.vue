<!-- @format -->

<template>
  <div class="bg-color">
    <Sidebar />
    <router-view />
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar";
export default {
  name: "Admin",
  components: {
    Sidebar,
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
  beforeMount() {
    if (!this.isLoggedIn) {
      this.$router.push("/");
    }
  },
};
</script>

<style lang="scss">
.bg-color {
  height: 100%;
  /* position: fixed; */
  width: 100%;
  // background: url("../assets/ford_mustang_gt_2016_rtr_108917_1280x720.jpg")
  //   no-repeat center;
  // background-size: cover;
  z-index: 1;
  position: relative;
  background: #fafafa;
  // background-color: rgba(255, 255, 255, 0.85);

  // &::after {
  //   content: "";
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   z-index: 2;
  //   width: 100%;
  //   height: 100%;
  // }
}
.car-bg {
  height: 100%;
  /* position: fixed; */
  width: 100%;
}
</style>
