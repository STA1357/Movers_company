import Contract from '@/util/contracts/PrimaryPool'

export default {
  state() {
    return {
      address: process.env.contractAddresses.primary,

      minBuy: 0,
      BWprice: 0
    }
  },
  actions: {
    async initContract({ dispatch }) {
      await dispatch('getMinBlackAndWhiteBuy')
      await dispatch('getBWprice')
    },

    async getMinBlackAndWhiteBuy({ commit }) {
      let minBuy = await Contract.minBlackAndWhiteBuy()
      commit('setMinBuy', minBuy)
    },
    async getBWprice({ commit }) {
      let BWprice = await Contract.BWPrice()
      commit('setBWprice', BWprice)
    },

    async buyTokens(ctx, ethAmount) {
      await Contract.buyTokens(ethAmount)
    }
  },
  mutations: {
    setMinBuy(state, payload) {
      state.minBuy = payload
    },
    setBWprice(state, payload) {
      state.BWprice = payload
    }
  },
  getters: {
    contract(state) {
      return state
    },
    minBuy(state) {
      return state.balance
    },
    BWprice(state) {
      return state.decimals
    },
    BWtokensPerOneETC(state, getters, rootState) {
      return (1e18 / state.BWprice / Math.pow(10, rootState.contracts.black.decimals)).toFixed(0);
    }
  }
}