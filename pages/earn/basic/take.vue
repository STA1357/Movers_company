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
          balance: account.balance,
          isDisabled: false,
          symbol: 'ETH',
          icon: require('@/assets/images/tokens/eth.svg')
        }"
        v-model="eth"
        @input="shotList"
      ></Token>
      <div class="p-2 ml-3" @click="$router.push('/earn/basic/return')">
        <img src="@/assets/images/to.svg" alt="" style="float: left" />
      </div>
      <Token
        :options="{
          title: 'You take:',
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
          >{{ BWtokensPerOneETH | truncated }} B&W per 1 ETH</span
        >
      </div>

      <Button
        v-if="!account.address"
        text="CONNECT WALLET"
        @click.native="openWalletModal"
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
          value: `${this.whiteBlack} BLACK`,
        },
        {
          text: `from ${this.eth} ETH `,
          value: `${!this.whiteBlack ? 0 : this.whiteBlack} WHITE`,
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
  name: "basic",
  components: {
    Button,
    List,
    NavCards
  },
  data() {
    return {
      show: false,
      eth: "",

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
    whiteBlack() {
      return this.eth * this.BWtokensPerOneETH;
    }
  },
  methods: {
    shotList() {
      if (this.eth.length !== 0) {
        this.$emit('openList')
      } else {
        this.$emit('closeList')
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
    },
    async buyTokens() {
      try {
        this.isLoading = true;

        if (
          !this.eth ||
          this.whiteBlack < this.primary.minBuy ||
          this.eth > this.account.balance
        ) {
          throw new Error("incorrect value");
        }

        let resp = await this.$store.dispatch(
          "contracts/primary/buyTokens",
          this.eth
        );

        await this.initAccountAndContracts()

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
