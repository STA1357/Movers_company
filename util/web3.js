import Web3 from 'web3'

// import networks from "./constants/networks.json"

// export function getWeb3() {
//   let web3 = checkAndInstantiateWeb3()
//   connect()


// }

export async function connect() {
  try {
    return await window.ethereum.enable()
  } catch (error) {
    console.log(error)
  }
}

export async function getAccount() {
  let address = getAddress()

  if (address) {
    try {
      let web3Instance = checkAndInstantiateWeb3()
      let balance = await getBalance(web3Instance, address)
      
      return {address, balance}
    } catch (error) {
      console.log(error)
    }
  } else {
    console.log("Metamask is not connected")
    return null
  }
}

export function getAddress() {
  return window.ethereum.selectedAddress ? window.ethereum.selectedAddress : null
}

// Web3 - класс, который мы импортировали с библиотекой web3
// window.web3 - прокси, созданный Метамаском. Из него мы сможем достать так нужного нам провайдера.
export function checkAndInstantiateWeb3() {
  try {
    if (window.web3 !== 'undefined') {
      console.log("Using Metamask's web3 provider");
      return new Web3(window.web3.currentProvider);
    } else {
      console.warn('No web3 detected. Falling back to http://localhost:3000.');
      return new Web3(new this.Web3.providers.HttpProvider('http://localhost:3000'));
    }
  } catch(e) {
    console.error("Sorry, can't find any web3 provider:", e.message)
  }
}

export function getBalance(web3Instance, address) {
  return new Promise((resolve, reject) => {
    web3Instance.eth.getBalance(address, (err, balance) => {
      if (err) {
        reject(new Error('Unable to retrieve balance for address: ' + address))
      } else {
        resolve(balance)
      }
    })
  })
}

// export function getUserBalance() {
//   isUserConnected()
// }

