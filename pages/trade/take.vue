<template>
  <div>
    <match-card/>
    <nav-cards
      :text="[
        { title: 'LIQUID POOL', path: '/trade/take' },
        { title: 'TRADE POOL', path: '/trade/return' }
      ]"
    />
    <div class="card">
      <div class="block mb-2">
        <t-block text="From:" :text2="account.balance" />
        <div class="d-flex justify-content-between mt-2">
          <span class="col-3 txt">
            <input
              v-model="measurementValueDisplay"
              type="text"
              class="inputs"
              placeholder="0.0"
              disabled
            />
          </span>
          <span class="col-6 pr-0">
            <span class="ml-2 txt">
              <img src="@/assets/images/eth.svg" alt="" />
              <span class="count">ETH</span>
            </span>
          </span>
        </div>
      </div>

      <div class="p-2 ml-3" @click="$router.push('/trade/return')">
        <img src="@/assets/images/to.svg" alt="" style="float: left" />
      </div>
      <div class="block mb-2">
        <t-block text="To:" :text2="black.balance" />
        <div class="d-flex justify-content-between mt-2">
          <span class="col-3 txt">
            <input
              v-model="whiteBlack"
              type="text"
              class="inputs"
              placeholder="0.0"
              @input="shotList"
              @keydown="onKeydown"
            />
          </span>
          <span class="col-7 pr-0">
            <Mark
              :text="msg"
              @click.native="
                blackCoin = black.balance;
                shotList();
              "
            />
            <span class="ml-2 txt">
              <img src="@/assets/images/black.svg" alt="" />
              <span class="count">{{ black.symbol }}</span>
            </span>
          </span>
        </div>
      </div>

      <div class="d-flex check-price justify-content-between">
        <span class="col-5">Aggregate price:</span>
        <span class="col-7"
          >{{ BWtokensPerOneETC.toFixed(2) }} B&W per 1 ETH</span
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
import { mapGetters } from "vuex";
import NavCards from "@/components/UIComponents/NavCards";
import TBlock from "@/components/UIComponents/TitleBlock";
import Button from "@/components/UIComponents/Button";
import Mark from "@/components/UIComponents/Mark";
import List from "@/components/UIComponents/List";
import MatchCard from "@/components/match/MatchCard";
export default {
  layout: "default",
  name: "takeTrade",
  components: {
    Button,
    MatchCard,
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
      whiteBlack: "",
      whiteCoin: "",
      blackCoin: ""
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
  mounted() {
    this.$store.dispatch("web3/getAccount");
  },
  methods: {
    shotList() {
      this.show = true;
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
