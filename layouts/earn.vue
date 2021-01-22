<template>
  <div id="earn">
    <Menu />

    <div class="hello">
      <nav-cards
        :text="[
          { title: 'BASE POOL', path: '/earn/basic' },
          { title: 'LIQUID POOL', path: '/earn/liquid' },
          { title: 'TRADE POOL', path: '/earn/trade' }
        ]"
      />
    </div>

    <div class="main" v-if="loaded">
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
    };
  },
  mounted() {
    if (!this.$store.getters["web3/account"].address) {
      Promise.all([
              this.$store.dispatch("web3/getAccount"),
              this.$store.dispatch("contracts/black/initContract"),
              this.$store.dispatch("contracts/white/initContract"),
              this.$store.dispatch("contracts/primary/initContract"),
              this.$store.dispatch("contracts/collateralization/initContract"),
      ]).then(() => {
        this.loaded = true;
      })
    } else {
        this.loaded = true;
    }
  }
};
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
