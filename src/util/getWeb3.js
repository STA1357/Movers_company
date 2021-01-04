import Web3 from 'web3'

/*
* 1. Check for injected web3 (mist/metamask)
* 2. If metamask/mist create a new web3 instance and pass on result
* 3. Get networkId - Now we can check the user is connected to the right network to use our dApp
* 4. Get user account from metamask
* 5. Get user balance
*/

let getWeb3 = new Promise(function (resolve, reject) {
    // Check for injected web3 (mist/metamask)
    var web3js = window.web3
    if (typeof web3js !== 'undefined') {
        var web3 = new Web3(web3js.currentProvider);
        resolve({
            injectedWeb3: web3.isConnected(),
            web3 () {
                return web3
            }
        })
    } else {
        web3 = new Web3(new Web3.providers.HttpProvider('0xe9D3F501B082Ba426b4Fb1be6b00be64D486d4d9'))
        reject(new Error('Unable to connect to Metamask'))
    }
})
    .then(result => {
        return new Promise(function (resolve, reject) {
            // Retrieve network ID
            result.web3().version.getNetwork((err, networkId) => {
                if (err) {
                    // If we can't find a networkId keep result the same and reject the promise
                    reject(new Error('Unable to retrieve network ID'))
                } else {
                    // Assign the networkId property to our result and resolve promise
                    result = Object.assign({}, result, {networkId})
                    resolve(result)
                }
            })
        })
    })
    .then(result => {
        return new Promise(function (resolve, reject) {
            // Retrieve coinbase
            result.web3().eth.getCoinbase((err, coinbase) => {
                if (err) {
                    reject(new Error('Unable to retrieve coinbase'))
                } else {
                    result = Object.assign({}, result, { coinbase })
                    resolve(result)
                }
            })
        })

    })
    .then(result => {

        return new Promise(function (resolve, reject) {
            // Retrieve balance for coinbase
            console.log(result.web3().eth,1)
            console.log(result,2)

            result.web3().eth.getBalance('0x5e1B7f60DFBDF0c3F95c38a22A347b50f379BeAA', (err, balance) => {

                if (err) {

                    reject(new Error('Unable to retrieve balance for address: ' + result))
                } else {

                    result = Object.assign({}, result, { balance })
                    resolve(result)
                    console.log(balance)

                }
            })
        })
    })
function sendTokens(targetAddress, amount) {
    try {
        const value = amount*1e18;
        const transaction = myContract.methods.transfer(targetAddress.checkAddress(), value);
        return transaction.send({from: myAddress});
    } catch (err) { alert(err.message) }
}


export default getWeb3
