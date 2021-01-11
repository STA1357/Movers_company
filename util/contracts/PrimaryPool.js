import ABI from '@/util/constants/contractsABI/primary.json'
import { checkAndInstantiateWeb3 } from '@/util/web3'

class PrimaryPool {

  constructor() {
    this.address = process.env.contractAddresses.primary

    this.web3Instance = checkAndInstantiateWeb3()
    this.contractInstance = new this.web3Instance.eth.Contract(ABI, this.address); 
  }

  async minBlackAndWhiteBuy() {
    return this.contractInstance.methods._minBlackAndWhiteBuy().call()
  }

  async BWPrice() {
    return this.contractInstance.methods.getBWprice().call()
  }
}

export default new PrimaryPool()