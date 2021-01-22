<template>
  <div>
    trade
  </div>
</template>

<script>
export default {
  name: "index",
  beforeCreate() {
    this.$router.push("/trade/take");
  }
};
</script>

<style scoped></style>
