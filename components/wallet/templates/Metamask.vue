<template>
  <wallet :options="options" @click="connectMetamask()">

  </wallet>
</template>

<script>
import walletTemplate from '@/components/wallet/wallet-template.vue'

export default {
  components: {
    'wallet': walletTemplate
  },
  data() {
    return {
      options: {
        title: "Metamask",
        image: require('@/assets/images/provider-logotypes/metamask-logo.png')
      }
    }
  },
  methods: {
    connectMetamask() {
      
    }
  }
}
</script>

<style lang="scss" scoped>

</style>