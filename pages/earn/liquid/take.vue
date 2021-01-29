<template>
  <div>
    <nav-cards
      :text="[
        { title: 'TAKE B&W', path: '/earn/liquid/take' },
        { title: 'RETURN B&W', path: '/earn/liquid/return' }
      ]"
    />
    <div class="card">
      <Token
        :options="{
          title: 'You add:',
          balance: black.balance,
          isDisabled: false,
          symbol: black.symbol,
          icon: require('@/assets/images/tokens/black.svg')
        }"
        v-model="whiteBlack"
        @input="shotList"
      ></Token>
      <Token
        :options="{
          title: 'And',
          balance: white.balance,
          isDisabled: false,
          symbol: white.symbol,
          icon: require('@/assets/images/tokens/white.svg')
        }"
        v-model="whiteBlack"
      ></Token>
      <div class="p-2 ml-3" @click="$router.push('/earn/basic/return')">
        <img src="@/assets/images/to.svg" alt="" style="float: left" />
      </div>
      <Token
        :options="{
          title: 'You take',
          balance: '1.00',
          isDisabled: true,
          symbol: 'LPBW',
          icon: ''
        }"
        v-model="whiteBlack"
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
            style="margin-top: -3px"
          />
        </div>
      </div>

      <Button
        v-if="!account.address"
        text="CONNECT WALLET"
        @click.native="openWalletModal"
        type="big"

      />

      <Button
        v-else
        :text="!isLoading ? 'TAKE BLACK & WHITE' : 'Processing...'"
        type="big"
        @click="!isLoading ? buyTokens() : ''"
      />
    </div>
    <List
      :title="[
        {
          text: 'Min received',
          value: `${this.whiteBlack} BLACK`
        },
        {
          text: `from ${this.whiteBlack} ETH `,
          value: `${!this.whiteBlack ? 0 : this.whiteBlack} WHITE`
        }
      ]"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import WalletModal from "@/components/modal/templates/WalletModal";
import Button from "@/components/UIComponents/Button";
import List from "@/components/UIComponents/List";
import NavCards from "@/components/UIComponents/NavCards";

export default {
  layout: "earn",
  components: {
    Button,
    List,
    NavCards
  },
  data() {
    return {
      show: false,
      whiteBlack: "",
      isReverse: true,
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
    lpbw() {
      return this.whiteBlack / Math.trunc(this.BWtokensPerOneETH  * 10000) / 10000;
    }
  },
  methods: {
    shotList() {
      if (this.whiteBlack.length && this.account.address) {
        this.$emit("openList");
      } else {
        this.$emit("closeList");
      }
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
    }
  }
};
</script>

<style scoped></style>
