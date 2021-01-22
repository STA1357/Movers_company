<template>
  <transition name="list">
    <div v-if="show" class="d-flex list-block row">
      <div class="col-7">
        <div v-for="(text, idx) in titleR" :key="idx" class="title mb-2">
          {{ text }}
        </div>
      </div>
      <div class="col-5">
        <div v-for="(text, idx) in titleL" :key="idx" class="title-cost mb-2">
          {{ text }}
        </div>
      </div>

      <div class="col-12 hr mb-3" />
      <div class="col-7">
        <div v-for="(text, idx) in textL" :key="idx" class="text mb-2">
          {{ text }} <img src="@/assets/images/info.svg" alt="" />
        </div>
      </div>
      <div class="col-5">
        <div v-for="(text, idx) in textR" :key="idx" class="cost mb-2">
          {{ text }}
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
//  @params textR(Array), textL(Array), show(Boolean)
// TODO need refactoring NAMES

export default {
  name: "List",
  props: {
    textR: Array,
    textL: Array,
    show: false,
    titleR: Array,
    titleL: Array
  }
};
</script>

<style scoped lang="scss">
.text {
  @font-family: Montserrat;
  font-style: normal;
  font-weight: 300;
  font-size: 9px;
  line-height: 11px;
  /* identical to box height */

  text-align: left;
  color: $text1;
}
.cost {
  @font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 9px;
  line-height: 11px;
  /* identical to box height */

  text-align: right;

  color: $text1;
}
.list-block {
  z-index: -111;
  width: 296px;
  height: auto;
  padding: 26px 0;
  background: rgba(255, 255, 255, 0.68);
  border-radius: 15px;
  margin: -15px auto 0;
  transition: opacity 0.5s;
}
.hr {
  width: 296.5px;
  height: 0px;
  margin-top: 9px;
  border: 1px solid #e6e6e6;
}
.title-block {
  padding: 10px 0;
}
.title {
  @font-family: Montserrat;
  font-style: normal;
  font-weight: 300;
  font-size: 10px;
  line-height: 12px;
  text-align: left;
  margin-top: 9px;
  color: $black;
}
.title-cost {
  @font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  text-align: right;
  margin-top: 9px;
  color: $black;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateY(-100px);
}
</style>
