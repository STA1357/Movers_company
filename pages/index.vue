<template>
  <div class="hello">
    index
  </div>
</template>

<script>
export default {
  layout: "earn",
  name: "Main",
  beforeCreate() {
    this.$router.push('/earn/basic')
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
