<template>
  <div>
    <match-card />
    <nav-cards
      :text="[
        { title: 'LIQUID POOL', path: '/trade/take' },
        { title: 'TRADE POOL', path: '/trade/return' }
      ]"
    />
    <div class="card">
      <Token
        :options="{
          title: 'You give:',
          balance: account.balance,
          isDisabled: false,
          symbol: 'ETH',
          icon: require('@/assets/images/tokens/eth.svg')
        }"
        v-model="eth"
        @input="shotList"
      ></Token>
      <div class="p-2 ml-3" @click="$router.push('/trade/return')">
        <img src="@/assets/images/to.svg" alt="" style="float: left" />
      </div>
      <Token
        :options="{
          title: 'You give:',
          balance: black.balance,
          isDisabled: false,
          symbol: 'BLACK',
          icon: require('@/assets/images/tokens/black.svg')
        }"
        v-model="blackCoin"
        @input="shotList"
      ></Token>
      <div class="d-flex check-price justify-content-between">
        <span class="col-5">Aggregate price:</span>
        <span class="col-7"
          >{{ BWtokensPerOneETC | truncated }} B&W per 1 ETH</span
        >
      </div>

      <Button text="SWAP" type="big" />
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
      :title-r="['Min received', `from ${measurementValueDisplay} ETH`]"
      :title-l="[`${whiteBlack} BLACK`, `${whiteBlack} WHITE`]"
      :show="this.show"
    />
  </div>
</template>

<script>
import NavCards from "@/components/UIComponents/NavCards";
import Button from "@/components/UIComponents/Button";
import List from "@/components/UIComponents/List";
import MatchCard from "@/components/match/MatchCard";

import { mapGetters } from "vuex";

export default {
  layout: "default",
  name: "takeTrade",
  components: {
    Button,
    MatchCard,
    List,
    NavCards
  },
  data() {
    return {
      show: false,
      eth: "",
      whiteBlack: "",
    };
  },
  computed: {
    ...mapGetters({
      account: "web3/account",
      black: "contracts/black/contract",
      white: "contracts/white/contract",
      primary: "contracts/primary/contract",
      collateralization: "contracts/collateralization/contract"
    }),

    BWtokensPerOneETC() {
      return 1e18 / this.primary.BWprice / Math.pow(10, this.black.decimals);
    },
    measurementValueDisplay: {
      get() {
        // this.whiteBlack = parseInt(this.whiteCoin) + parseInt(this.blackCoin);
        this.eth = (this.whiteBlack / this.BWtokensPerOneETC).toFixed(2);
        return this.eth;
      },
      set(newValue) {
        return this.whiteBlack;
      }
    }
  },
  methods: {
    shotList() {
      if (this.whiteBlack.length !== 0) {
        this.show = true;
      } else {
        this.show = false;
      }
    },
    onKeydown(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;

      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46 &&
        charCode !== 9 &&
        charCode !== 190
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    }
  }
};
</script>

<style scoped></style>
