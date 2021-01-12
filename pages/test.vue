<template>
  <div>
    <!-- {{$store.getters['contracts/black/balance']}}
    {{$store.getters['contracts/black/decimals']}}
    {{$store.getters['contracts/black/name']}}
    {{$store.getters['contracts/black/symbol']}}
    {{$store.getters['contracts/black/totalSupply']}} -->
    <div v-if="loaded">
      {{ $store.getters["contracts/black/contract"] }}
    </div>
    <div v-if="loaded">
      {{ $store.getters["contracts/white/contract"] }}
    </div>
    <div v-if="loaded">
      {{ $store.getters["contracts/primary/contract"] }}
    </div>
    <div v-if="loaded">
      {{ $store.getters["contracts/collateralization/contract"] }}
    </div>
  </div>
</template>

<script>
// import {mapGetters} from 'vuex'

export default {
  data() {
    return {
      loaded: false
    };
  },
  async beforeCreate() {
    // this.$store.dispatch('web3/getAccount')
    await this.$store.dispatch("web3/getAccount");

    if (this.$store.getters["web3/account"].address) {
      await this.$store.dispatch("contracts/black/initContract");
      await this.$store.dispatch("contracts/white/initContract");
      await this.$store.dispatch("contracts/primary/initContract");
      await this.$store.dispatch("contracts/collateralization/initContract");
    }
    this.loaded = true;
  }
  // computed: {
  //   account() {
  //     return this.$store.getters['web3/account']
  //   }
  // }
};
</script>

<style lang="scss" scoped></style>
