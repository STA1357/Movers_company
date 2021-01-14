<template
  ><div>
    <nav-cards
      :text="[
        { title: 'ADD LIQUIDITY', path: '/earn/trade/return' },
        { title: 'REMOVE LIQUIDITY', path: '/earn/trade/take' }
      ]"
    />
    <div class="card">
      <div class="block mb-2">
        <t-block text="You add:" :text2="white.balance" />
        <div class="d-flex justify-content-between mt-2">
          <span class="col-3 txt">
            <input
              v-model="whiteC"
              type="text"
              class="inputs"
              placeholder="0.0"
              @input="shotList"
            />
          </span>
          <span class="col-7 pr-0">
            <Mark
              :text="msg"
              @click.native="
                whiteC = white.balance;
                shotList();
              "
            />
            <span class="ml-2 txt">
              <img src="@/assets/images/white.svg" alt="" />
              <span class="count">{{ white.symbol }}</span>
            </span>
          </span>
        </div>
      </div>
      <div class="p-2 ml-3">
        <img src="@/assets/images/plus.svg" alt="" style="float: left" />
      </div>
      <div class="block mb-2">
        <t-block text="Add" :text2="black.balance" />
        <div class="d-flex justify-content-between mt-2">
          <span class="col-3 txt">
            <input
              v-model="blackC"
              type="text"
              class="inputs"
              placeholder="0.0"
              @input="shotList"
            />
          </span>
          <span class="col-7 pr-0">
            <Mark
              :text="msg"
              @click.native="
                blackC = black.balance;
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
      <div class="p-2 ml-3">
        <img src="@/assets/images/plus.svg" alt="" style="float: left" />
      </div>
      <div class="block mb-2">
        <t-block text="You give:" :text2="account.balance" />
        <div class="d-flex justify-content-between mt-2">
          <span class="col-3 txt">
            <input
              v-model="eth"
              type="text"
              class="inputs"
              placeholder="0.0"
              @input="shotList"
            />
          </span>
          <span class="col-6 pr-0">
            <Mark
              :text="msg"
              @click.native="
                eth = account.balance;
                shotList();
              "
            />
            <span class="ml-2 txt">
              <img src="@/assets/images/eth.svg" alt="" />
              <span class="count">ETH</span>
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

      <Button text="ADD LIQUIDITY" />
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
      :title-l="['456.166 LPBW', '0.34%']"
      :show="this.show"
    />
  </div>
</template>

<script>
import TBlock from "@/components/UIComponents/TitleBlock";
import Button from "@/components/UIComponents/Button";
import Mark from "@/components/UIComponents/Mark";
import List from "@/components/UIComponents/List";
import { mapGetters } from "vuex";
import NavCards from "@/components/UIComponents/NavCards";

export default {
  layout: "earn",
  name: "trade",
  components: {
    NavCards,
    Button,
    Mark,
    TBlock,
    List
  },
  data() {
    return {
      msg: "MAX",
      show: false,
      eth: "",
      blackC: "",
      whiteC: "",
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
      this.show = true;
      console.log(this.show);
    }
  }
};
</script>

<style scoped></style>
