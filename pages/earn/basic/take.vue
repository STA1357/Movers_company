<template>
  <div>
    <nav-cards
      :text="[
        { title: 'TAKE LIQUIDITY', path: '/earn/basic/take' },
        { title: 'RETURN LIQUIDITY', path: '/earn/basic/return' }
      ]"
    />
    <div class="card">
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
              @keydown="onKeydown"

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
            <span class="ml-3 txt">
              <img src="@/assets/images/eth.svg" alt="" />
              <span class="count">ETH</span>
            </span>
          </span>
        </div>
      </div>
      <div class="p-2 ml-3" @click="$router.push('/earn/basic/return')">
        <img src="@/assets/images/to.svg" alt="" style="float: left" />
      </div>
      <div class="block mb-2">
        <t-block text="You give:" :text2="white.balance" />
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
            <span class="ml-3 txt">
              <img src="@/assets/images/white.svg" alt="" />
              <span class="count">{{ white.symbol }}</span>
            </span>
          </span>
        </div>
      </div>
      <div class="block mb-2">
        <t-block text="You give:" :text2="black.balance" />
        <div class="d-flex justify-content-between mt-2">
          <span class="col-3 txt">
            <input
              v-model="measurementValueDisplay"
              disabled
              type="text"
              class="inputs"
              placeholder="0.0"
            />
          </span>
          <span class="col-6 pr-0">
            <span class="ml-3 txt">
              <img src="@/assets/images/black.svg" alt="" />
              <span class="count">{{ black.symbol }}</span>
            </span>
          </span>
        </div>
      </div>
      <div class="d-flex check-price justify-content-between">
        <span class="col-5">Aggregate price:</span>
        <span class="col-7"
          >{{ BWtokensPerOneETC }} B&W per 1 ETH</span
        >
      </div>

      <Button
        v-if="!account.address"
        text="CONNECT WALLET"
        @click.native="openWalletModal"
      />

      <Button 
        v-else 
        text="TAKE BLACK & WHITE"
        type="big"
        @click="buyTokens()"
      />
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
      :title-r="['Min received', `from ${measurementValueDisplay} B&W`]"
      :title-l="[`${eth} ETH`]"
      :show="this.show"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import WalletModal from "@/components/modal/templates/WalletModal";

import TBlock from "@/components/UIComponents/TitleBlock";
import Button from "@/components/UIComponents/Button";
import Mark from "@/components/UIComponents/Mark";
import List from "@/components/UIComponents/List";
import NavCards from "@/components/UIComponents/NavCards";

export default {
  layout: "earn",
  name: "basic",
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
      eth: '',
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
      return this.$store.getters['contracts/primary/BWtokensPerOneETC'];
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
    },
    openWalletModal() {
      this.$modal.show(
        WalletModal,
        {
          details: {}
        },
        {
          width: 314
        }
      );
    },
    onKeydown(evt) {
        // evt = (evt) ? evt : window.event;
        // var charCode = (evt.which) ? evt.which : evt.keyCode;
        // if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        //     evt.preventDefault();;
        // } else {
        //     return true;
        // }
    },
    buyTokens() {
      if (this.eth && this.measurementValueDisplay >= this.primary.minBuy) {
        this.$store.dispatch('contracts/primary/buyTokens', this.eth)
      }
    }
  },


};
</script>

<style scoped></style>
