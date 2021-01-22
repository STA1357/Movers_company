<template>
  <div>
    <nav-cards
      :text="[
        { title: 'ADD LIQUIDITY', path: '/earn/liquid/take' },
        { title: 'REMOVE LIQUIDITY', path: '/earn/liquid/return' }
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
      <div class="p-2 ml-3">
        <img
          src="@/assets/images/to.svg"
          alt=""
          style="float: left; cursor: pointer"
          @click="$router.push('/earn/liquid/return')"
        />
      </div>

      <Token
        :options="{
          title: 'You add:',
          balance: white.balance,
          isDisabled: true,
          symbol: white.symbol,
          icon: require('@/assets/images/tokens/white.svg')
        }"
        v-model="whiteBlack"
      ></Token>
      <Token
        :options="{
          title: 'And',
          balance: black.balance,
          isDisabled: true,
          symbol: black.symbol,
          icon: require('@/assets/images/tokens/black.svg')
        }"
        v-model="whiteBlack"
      ></Token>
      <div class="d-flex check-price justify-content-between">
        <span class="col-5">Aggregate price:</span>
        <span class="col-7"
          >{{ BWtokensPerOneETC | truncated }} B&W per 1 LPBW</span
        >
      </div>
      <Button text="RETURN BLACK & WHITE" type="big" />
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
      :title-r="['Min received', 'Share of Pool']"
      :title-l="['456.166 B&W', '0.31%']"
      :show="this.show"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import TBlock from "@/components/UIComponents/TitleBlock";
import Button from "@/components/UIComponents/Button";
import Mark from "@/components/UIComponents/Mark";
import List from "@/components/UIComponents/List";
import NavCards from "@/components/UIComponents/NavCards";

export default {
  layout: "earn",
  name: "returnLiquid",
  components: {
    Button,
    Mark,
    TBlock,
    List,
    NavCards
  },
  data() {
    return {
      msg: "MAX",
      show: false,
      eth: "",
      whiteBlack: ""
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
        this.whiteBlack = (this.eth * this.BWtokensPerOneETC).toFixed(2);
        return this.whiteBlack;
      },
      set(newValue) {
        return this.eth;
      }
    }
  },
  mounted() {
    this.$store.dispatch("web3/getAccount");
  },
  methods: {
    shotList() {
      if (this.eth.length !== 0) {
        this.show = true;
      } else {
        this.show = false;
      }
    }
  }
};
</script>

<style scoped></style>
