import ABI from '@/util/constants/contractsABI/secondaryPrimary.json'
import { checkAndInstantiateWeb3 } from '@/util/web3'

class PrimaryPool {

  constructor() {
    this.address = process.env.contractAddresses.secondaryPrimary

    this.web3Instance = checkAndInstantiateWeb3()
    this.contractInstance = this.web3Instance ? new this.web3Instance.eth.Contract(ABI, this.address) : null; 
  }


}

export default new PrimaryPool()