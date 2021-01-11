import ABI from '@/util/constants/contractsABI/white.json'
import { checkAndInstantiateWeb3 } from '@/util/web3'

class White {

  constructor() {
    this.address = process.env.contractAddresses.white

    this.web3Instance = checkAndInstantiateWeb3()
    this.contractInstance = new this.web3Instance.eth.Contract(ABI, this.address); 
  }

  async balanceOf(address) {
    return this.contractInstance.methods.balanceOf(address).call()
  }

  async decimals() {
    return this.contractInstance.methods.decimals().call()
  }

  async name() {
    return this.contractInstance.methods.name().call()
  }

  async symbol() {
    return this.contractInstance.methods.symbol().call()
  }

  async totalSupply() {
    return this.contractInstance.methods.totalSupply().call()
  }
}

export default new White()