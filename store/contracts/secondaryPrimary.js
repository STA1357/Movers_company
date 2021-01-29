import Contract from '@/util/contracts/PrimaryPool'

export default {
  state() {
    return {
      address: process.env.contractAddresses.secondaryPrimary,

    }
  },
  actions: {
    async initContract({ dispatch }) {

    },


  },
  mutations: {

  },
  getters: {
    contract(state) {
      return state
    }
  }
}