import Vue from 'vue'
import Vuex from 'vuex'
import getWeb3 from '../util/getWeb3'

Vue.use(Vuex)

export default {
  state () {
    return {
      web3: {
        isInjected: false,
        web3Instance: null,
        networkId: null,
        coinbase: null,
        balance: null,
        list: null,
        error: null
      },
      contractInstance: null
    }
  },
  getters: {},
  mutations: {
    set (state, { type, items }) {
      state[type] = items
    },

    registerWeb3Instance (state, payload) {
      console.log('registerWeb3instance Mutation being executed', payload)
      const result = payload
      const web3Copy = state.web3
      web3Copy.coinbase = result.coinbase
      web3Copy.networkId = result.networkId
      web3Copy.balance = parseInt(result.balance)
      web3Copy.isInjected = result.injectedWeb3
      web3Copy.web3Instance = result.web3
      state.web3 = web3Copy
    }
  },
  actions: {
    registerWeb3 ({ commit }) {
      getWeb3
        .then((result) => {
          console.log('committing result to registerWeb3Instance mutation')
          commit('registerWeb3Instance', result)
        })
        .catch((e) => {
          console.log('error in action registerWeb3', e)
        })
    }
  }
}
