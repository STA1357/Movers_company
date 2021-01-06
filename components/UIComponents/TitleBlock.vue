<template>
  <div class="d-flex mt-3 justify-content-between">
    <span class="col-5 pl-0">{{ text }}</span>
    <span class="col" />
    <span class="col-5 pr-0">Balance: {{ text2 }}</span>
  </div>
</template>

<script>
//  @params text(String), text2(String)
// TODO need refactoring NAMES

export default {
  name: 'TitleBlock',
  props: {
    text: String,
    text2: [Number, String]
  }
}
</script>

<style lang="scss" scoped>
div span {
  @font-family: Montserrat;
  font-style: normal;
  font-weight: 300;
  font-size: 10px;
  line-height: 12px;

  color: #0f2f31;
}
</style>
