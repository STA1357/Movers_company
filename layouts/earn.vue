<template>
  <div id="default">
    <Menu />

    <div class="hello">
      <nav-cards :text="[{ title: 'BASE POOL', path: '/earn/basic' },{ title: 'LIQUID POOL', path: 'Veridian Dynamics' },{ title: 'TRADE POOL', path: 'Veridian Dynamics' }]"/>
      <nav-cards :text="[{ title: 'TAKE LIQUIDITY', path: 'Veridian Dynamics' },{ title: 'RETURN LIQUIDITY', path: 'Veridian Dynamics' }]"/>
    </div>

    <Nuxt />
  </div>
</template>

<script>
import NavCards from "@/components/UIComponents/NavCards";

export default {
  components: {
    NavCards
  },
}
</script>

<style lang="scss">
  #default {
    background: $surface5;
    min-height: 100vh;
    overflow: hidden;
    text-align: center;
  }
  .hello {
    margin-top: 64px;
  }

</style>
