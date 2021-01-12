<template>
  <div id="earn">
    <Menu />

    <div class="hello">
      <nav-cards :text="[{ title: 'BASE POOL', path: '/earn/basic' },{ title: 'LIQUID POOL', path: 'Veridian Dynamics' },{ title: 'TRADE POOL', path: 'Veridian Dynamics' }]"/>
      <nav-cards :text="[{ title: 'TAKE LIQUIDITY', path: 'Veridian Dynamics' },{ title: 'RETURN LIQUIDITY', path: 'Veridian Dynamics' }]"/>
    </div>

    <div v-if="loaded">
      <Nuxt />
    </div>
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<script>
import NavCards from "@/components/UIComponents/NavCards";

export default {
  components: {
    NavCards
  },
  data() {
    return {
      loaded: false
    }
  },
  async beforeCreate() {
    // this.$store.dispatch('web3/getAccount')
    await this.$store.dispatch("web3/getAccount");

    if (this.$store.getters['web3/account'].address) {
      await this.$store.dispatch('contracts/black/initContract');
      await this.$store.dispatch('contracts/white/initContract');
      await this.$store.dispatch('contracts/primary/initContract');
      await this.$store.dispatch('contracts/collateralization/initContract');
    }
    this.loaded = true
    
  },
}
</script>

<style lang="scss">
  #earn {
    background: $surface5;
    min-height: 100vh;
    overflow: hidden;
    text-align: center;
  }
  .hello {
    margin-top: 64px;
  }

</style>
