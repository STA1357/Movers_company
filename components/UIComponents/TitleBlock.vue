<template>
  <div class="d-flex mt-3 justify-content-between">
    <span class="col-4" style="text-align: left">{{ text }}</span>
    <span class="col" />
    <span class="col-6" style="text-align: right">Balance: {{ text2 }}</span>
  </div>
</template>

<script>
//  @params text(String), text2(String)
// TODO need refactoring NAMES

export default {
  name: "TitleBlock",
  props: {
    text: String,
    text2: [Number, String]
  }
};
</script>

<style lang="scss" scoped>
div span {
  @font-family: Montserrat;
  font-style: normal;
  font-weight: 300;
  font-size: 10px;
  line-height: 12px;

  color: $brand;
}
</style>
