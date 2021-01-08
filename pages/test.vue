<template>
  <div>
    {{account}}
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  mounted() {
    this.$store.dispatch('web3/getAccount')
  },
  computed: {
    account() {
      return this.$store.getters['web3/account']
    }
  }
}
</script>

<style lang="scss" scoped>

</style>