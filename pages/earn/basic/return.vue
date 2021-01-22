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
      <div class="d-flex check-price justify-content-between ">
        <span class="col-5 p-0" style="text-align: left; margin-top: 3px"
          >Aggregate price:</span
        >
        <div class="col p-0" style="text-align: left">
          {{
            isReverse
              ? Math.trunc(BWtokensPerOneETH * 10000) / 10000 +
                " " +
                "B&W per 1 ETH"
              : 1 / BWtokensPerOneETH + "ETH per 1 B&W"
          }}
          <img
            src="@/assets/images/update.svg"
            alt=""
            @click="isReverse = !isReverse"
          />
        </div>
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
    <List
      :title="[
        {
          text: 'Min received',
          value: `${this.eth} ETH`
        },
        {
          text: `from ${!this.whiteBlack ? 0 : this.whiteBlack} B&W `,
          value: ''
        }
      ]"
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
      isLoading: false,
      isReverse: true
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
      if (this.eth.length !== 0) {
        this.$emit("openList");
      } else {
        this.$emit("closeList");
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

        await this.initAccountAndContracts();

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
