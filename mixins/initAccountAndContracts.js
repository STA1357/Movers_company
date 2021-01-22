export default {
  methods: {
    initAccountAndContracts() {
      return Promise.all([
        this.$store.dispatch("web3/getAccount"),
        this.$store.dispatch("contracts/black/initContract"),
        this.$store.dispatch("contracts/white/initContract"),
        this.$store.dispatch("contracts/primary/initContract"),
        this.$store.dispatch("contracts/collateralization/initContract"),
      ])
    }
  }
}
