<template>
  <div>
    trade
  </div>
</template>

<script>
export default {
  name: "index",
  beforeCreate() {
    this.$router.replace("/trade/take");
  }
};
</script>

<style scoped></style>
