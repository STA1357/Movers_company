import Contract from '@/util/contracts/White'

export default {
  state() {
    return {
      address: process.env.contractAddresses.white,

      balance: 0,
      decimals: 0,
      name: 'White',
      symbol: 'WHITE',

      totalSupply: 0
    }
  },
  actions: {
    async initContract({ dispatch }) {
      await dispatch('getBalance')
      await dispatch('getDecimals')
      await dispatch('getName')
      await dispatch('getSymbol')
      await dispatch('getTotalSupply')
    },

    async getBalance({ rootState, commit }) {
      let balance = await Contract.balanceOf(rootState.web3.account.address)
      commit('setBalance', balance)
    },
    async getDecimals({ commit }) {
      let decimals = await Contract.decimals()
      commit('setDecimals', decimals)
    },
    async getName({ commit }) {
      let name = await Contract.name()
      commit('setName', name)
    },
    async getSymbol({ commit }) {
      let symbol = await Contract.symbol()
      commit('setSymbol', symbol)
    },
    async getTotalSupply({ commit }) {
      let totalSupply = await Contract.totalSupply()
      commit('setTotalSupply', totalSupply)
    }
  },
  mutations: {
    setBalance(state, payload) {
      state.balance = payload
    },
    setDecimals(state, payload) {
      state.decimals = payload
    },
    setName(state, payload) {
      state.name = payload
    },
    setSymbol(state, payload) {
      state.symbol = payload
    },
    setTotalSupply(state, payload) {
      state.totalSupply = payload
    }
  },
  getters: {
    balance(state) {
      return state.balance
    },
    decimals(state) {
      return state.decimals
    },
    name(state) {
      return state.name
    },
    symbol(state) {
      return state.symbol
    },
    totalSupply(state) {
      return state.totalSupply
    },
    contract(state) {
      return state
    }
  }
}