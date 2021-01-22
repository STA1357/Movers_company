<template>
  <div>
    <nav-cards
      :text="[
        { title: 'TAKE B&W', path: '/earn/basic/take' },
        { title: 'RETURN B&W', path: '/earn/basic/return' }
      ]"
    />
    <div class="card">
      <Token
        :options="{
          title: 'You give:',
          balance: white.balance,
          isDisabled: false,
          symbol: white.symbol,
          icon: require('@/assets/images/tokens/white.svg')
        }"
        v-model="whiteBlack"
        @input="shotList"
      ></Token>
      <Token
        :options="{
          title: 'And',
          balance: black.balance,
          isDisabled: false,
          symbol: black.symbol,
          icon: require('@/assets/images/tokens/black.svg')
        }"
        v-model="whiteBlack"
        @input="shotList"
      ></Token>
      <div class="p-2 ml-3">
        <img
          src="@/assets/images/to.svg"
          alt=""
          style="float: left; cursor: pointer"
          @click="$router.push('/earn/basic/take')"
        />
      </div>
      <Token
        :options="{
          title: 'You give:',
          balance: account.balance,
          isDisabled: true,
          symbol: 'ETH',
          icon: require('@/assets/images/tokens/eth.svg')
        }"
        v-model="eth"
      ></Token>
      <div class="d-flex check-price justify-content-between">
        <span class="col-5">Aggregate price:</span>
        <span class="col-7">{{ BWtokensPerOneETH | truncated }} B&W per 1 ETH</span>
      </div>

      <Button
        v-if="!account.address"
        text="CONNECT WALLET"
        type="big"
        @click.native="openWalletModal"
      />

      <Button
        v-else
        :text="!isLoading ? 'RETURN BLACK & WHITE' : 'Processing...'"
        type="big"
        @click="!isLoading ? buyBackTokens() : ''"
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
      :title-r="['Min received', `from ${eth} ETH`]"
      :title-l="[`${whiteBlack} BLACK`, `${whiteBlack} WHITE`]"
      :show="this.show"
    />
  </div>
</template>

<script>
import NavCards from "@/components/UIComponents/NavCards";
import Button from "@/components/UIComponents/Button";
import List from "@/components/UIComponents/List";

import { mapGetters } from "vuex";

export default {
  layout: "earn",
  name: "returnBasic",
  components: {
    Button,
    List,
    NavCards
  },
  data() {
    return {
      show: false,
      whiteBlack: "",

      isLoading: false
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
    BWtokensPerOneETH() {
      return this.$store.getters["contracts/primary/BWtokensPerOneETH"];
    },
    eth() {
      return this.whiteBlack / this.BWtokensPerOneETH;
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
    async buyBackTokens() {
      try {
        this.isLoading = true;
        if (
          !this.whiteBlack ||
          this.whiteBlack < this.primary.minBuy ||
          this.whiteBlack > this.white.balance ||
          this.whiteBlack > this.black.balance
        ) {
          throw new Error("incorrect value");
        }

        let resp = await this.$store.dispatch(
          "contracts/primary/buyBackTokens",
          this.whiteBlack
        );

        await this.$store.dispatch("web3/getAccount");

        if (this.$store.getters["web3/account"].address) {
          await this.$store.dispatch("contracts/black/initContract");
          await this.$store.dispatch("contracts/white/initContract");
          await this.$store.dispatch("contracts/primary/initContract");
          await this.$store.dispatch(
            "contracts/collateralization/initContract"
          );
        }

        this.$notify.success({
          title: "Success",
          message: "Successfull transaction",
          maxWidth: 400
        });
      } catch (error) {
        this.$notify.error({
          title: "Error",
          message: error.message,
          maxWidth: 400
        });
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style scoped></style>
