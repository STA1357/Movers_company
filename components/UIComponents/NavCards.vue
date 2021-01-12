<template>
  <div class="nav mb-3">
    <nuxt-link
      :to="info.path"
      class="col links"
      v-for="(info, idx) in text"
      :key="idx"
      >{{ info.title }}</nuxt-link
    >
  </div>
</template>

<script>
export default {
  name: "NavCards",
  props: {
    text: {
      title: String,
      path: String
    }
  }
};
</script>

<style scoped lang="scss">
.nav {
  display: flex;
  justify-content: space-around;
  width: 314px;
  height: 29px;
  margin: 0 auto;
  a.nuxt-link-active {
    background: $brand !important;
    font-style: normal;
    font-weight: bold !important;
    font-size: 12px;
    line-height: 15px;
    /* identical to box height */

    text-align: center;

    color: $white !important;
  }
  .links {
    background: $surface3;
    text-transform: uppercase;
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 15px;
    /* identical to box height */

    text-align: center;
    border: 0.5px solid $brand;

    color: $brand;
    padding: 7px 12px;
    &:last-child {
      border-radius: 0px 20px 20px 0px;
    }
    &:first-child {
      border-radius: 20px 0px 0px 20px;
    }
  }
}
</style>
