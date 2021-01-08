<template>
  <div class="hello">
    <div class="card">
      <div class="block mb-2">
        <t-block text="You give:" :text2="account.balance" />
        <div class="d-flex justify-content-around mt-2">
          <span class="col-3 txt">
            <input v-model="eth" type="text" class="inputs" placeholder="0.0">
          </span>
          <span class="col-6 pr-0">
            <Mark :text="msg" />
            <span class="ml-3 txt">
              <img src="@/assets/images/eth.svg" alt="">
              <span class="count">ETH</span>
            </span>
          </span>
        </div>
      </div>
      <div class="p-2 ml-3">
        <img src="@/assets/images/to.svg" alt="" style="float: left">
      </div>
      <div class="block mb-2">
        <t-block text="You give:" text2="2.2" />
        <div class="d-flex justify-content-around mt-2">
          <span class="col-3 txt">
            <input
              v-model="measurementValueDisplay"
              type="text"
              class="inputs"
              placeholder="0.0"
              disabled
            >
          </span>
          <span class="col-6 pr-0">
            <Mark :text="msg" />
            <span class="ml-3 txt">
              <img src="@/assets/images/white.svg" alt="">
              <span class="count">WHITE</span>
            </span>
          </span>
        </div>
      </div>
      <div class="block mb-2">
        <t-block text="You give:" text2="0" />
        <div class="d-flex justify-content-around mt-2">
          <span class="col-3 txt">
            <input
              v-model="measurementValueDisplay"
              disabled
              type="text"
              class="inputs"
              placeholder="0.0"
            >
          </span>
          <span class="col-6 pr-0">
            <Mark :text="msg" />
            <span class="ml-3 txt">
              <img src="@/assets/images/black.svg" alt="">
              <span class="count">BLACK</span>
            </span>
          </span>
        </div>
      </div>
      <div class="d-flex check-price">
        <span class="">Aggregate price:</span>
        <span class="">651.66 B&W per 1 ETH</span>
      </div>

      <Button text="RETURN BLACK & WHITE" @click.native="shotList" />
    </div>
    <list
      :text-l="[
        'WHITE Price',
        'BLACK Price',
        'ETH in Base Pool',
        'WHITE in the market',
        'BLACK in the market',
        'WHITE in Base Pool',
        'BLACK in Base Pool',
        'Aggregate B&W price',
        'Change B&W Price (1,7,30 days)'
      ]"
      :text-r="[
        '0.00153454 ETH',
        '0.00153454 ETH',
        '1544 ETH',
        '503082.355 WHITE',
        '503082.355 BLACK',
        '799496918 WHITE',
        '799496918 BLACK',
        '0,00306908 ETH',
        '0.1/0.5/1.7 %'
      ]"
      :show="this.show"
    />
  </div>
</template>

<script>
import TBlock from '@/components/UIComponents/TitleBlock'
import Button from '@/components/UIComponents/Button'
import Mark from '@/components/UIComponents/Mark'
import List from '@/components/UIComponents/List'

export default {
  name: 'Main',
  components: {
    Button,
    Mark,
    TBlock,
    List
  },
  data () {
    return {
      msg: 'MAX',
      show: false,
      eth: '',
      whiteBlack: ''
    }
  },
  computed: {
    account() {
      return this.$store.getters['web3/account'];
    },
    measurementValueDisplay: {
      get () {
        this.whiteBlack = this.eth * 651.66
        return this.whiteBlack
      },
      set (newValue) {
        return this.eth
      }
    }
  },
  mounted () {
    this.$store.dispatch('web3/getAccount')
  },
  methods: {
    shotList () {
      this.show = !this.show
      console.log(this.show)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  margin-top: 64px;
}
.count {
  @font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */

  letter-spacing: 0.015em;

  color: #0f2f31;
}
.check-price {
  @font-family: Montserrat;
  font-style: normal;
  font-weight: 300;
  font-size: 10px;
  line-height: 12px;
  justify-content: space-around;
  color: #0f2f31;
  margin-bottom: 11px;
}
</style>
