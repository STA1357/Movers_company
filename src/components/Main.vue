<template>
  <div class="hello">
      <div class="card">
        <div class="block mb-2">
          <t-block text="You give:" text2="Balance: 2.2"/>
            <div class="d-flex justify-content-around mt-2">
              <span class="col-3 txt">
                  <input type="text" class="inputs" placeholder="0.0">
              </span>
              <span class="col-6">
                  <Mark :text="msg"></Mark>
                <span class="ml-3 txt">
                    1
                </span>
              </span>
            </div>
        </div>
        <div class="block mb-2">
          <t-block text="You give:" text2="Balance: 2.2"/>
            <div class="d-flex justify-content-around mt-2">
              <span class="col-3 txt">
                  <input type="text" class="inputs" placeholder="0.0">
              </span>
              <span class="col-6">
                  <Mark :text="msg"></Mark>
                <span class="ml-3 txt">
                    1
                </span>
              </span>
            </div>
        </div>
        <Button text="RETURN BLACK & WHITE" @click.native="shotList"></Button>
      </div>
      <list
              :text-l="['WHITE Price','BLACK Price','ETH in Base Pool','WHITE in the market','BLACK in the market','WHITE in Base Pool','BLACK in Base Pool','Aggregate B&W price','Change B&W Price (1,7,30 days)']"
              :text-r="['0.00153454 ETH','0.00153454 ETH','1544 ETH','503082.355 WHITE','503082.355 BLACK','799496918 WHITE','799496918 BLACK','0,00306908 ETH','0.1/0.5/1.7 %']"
              :show = 'this.show'
      />
      <p>Metamask: {{ web3.isInjected }}</p>
      <p>Network: {{ web3.networkId }}</p>
      <p>Account: {{ web3.coinbase }}</p>
      <p>Balance: {{ web3.balance }}</p>


      <h1>ETH Balance Fetcher</h1>
      <p>Enter your Ethereum Address:</p>
      <input type="text" size="50" id="address" />
      <button type="button" @click="getBalance()">Get Balance</button>
      <br />
      <br />
      <div id="output"></div>
  </div>
</template>

<script>
import TBlock from './UIComponents/TitleBlock'
import Button from './UIComponents/Button'
import Mark from './UIComponents/Mark'
import List from './UIComponents/List'

export default {
  name: 'Main',
    components:{
        Button,
        Mark,
        TBlock,
        List
    },
  data () {
    return {
      msg:'MAX',
      show: false
    }
  },
    computed: {
        web3 () {
            return this.$store.state.web3
        }
    },
    beforeCreate () {
        window.addEventListener('load', () => {
            if (typeof web3 !== 'undefined') {
                web3 = new Web3(web3.currentProvider);
            } else {
                console.log('No web3? You should consider trying MetaMask!');
                web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
            }
        });
        console.log('registerWeb3 Action dispatched from casino-dapp.vue')
        this.$store.dispatch('registerWeb3')
    },
    methods:{
          shotList(){
              this.show = !this.show
              console.log(this.show)
          },
         getBalance() {
            var address, wei, balance
            address = '0xe9D3F501B082Ba426b4Fb1be6b00be64D486d4d9'
            try {

                web3.eth.getBalance(address, function (error, wei) {
                    if (!error) {
                        var balance = web3.fromWei(wei, 'ether');
                        document.getElementById("output").innerHTML = balance + " ETH";
                    }
                });
            } catch (err) {
                document.getElementById("output").innerHTML = err;
            }
          }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
