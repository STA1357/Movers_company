<template>
  <div>
    <nav-cards
      :text="[
        { title: 'TAKE LIQUIDITY', path: '/earn/basic/take' },
        { title: 'RETURN LIQUIDITY', path: '/earn/basic/return' }
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
        v-model="measurementValueDisplay"
      ></Token>
      <Token 
        :options="{
          title: 'And',
          balance: black.balance,
          isDisabled: true,
          symbol: black.symbol,
          icon: require('@/assets/images/tokens/black.svg')
        }"
        v-model="measurementValueDisplay"
      ></Token>
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
        :text="!isLoading ? 'TAKE BLACK & WHITE' : 'Processing...'"
        type="big"
        @click="!isLoading ? buyTokens() : ''"
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

// import TBlock from "@/components/UIComponents/TitleBlock";
import Button from "@/components/UIComponents/Button";
import Mark from "@/components/UIComponents/Mark";
import List from "@/components/UIComponents/List";
import NavCards from "@/components/UIComponents/NavCards";

import Token from '@/components/tokens/template'

export default {
  layout: "earn",
  name: "basic",
  components: {
    Button,
    Mark,
    // TBlock,
    List,
    NavCards,
    Token
  },
  data() {
    return {
      msg: "MAX",
      show: false,
      eth: '',
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
        if (this.eth.length !== 0) {
            this.show = true;
        } else {
            this.show = false;
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
    onKeydown(evt) {
        // evt = (evt) ? evt : window.event;
        // var charCode = (evt.which) ? evt.which : evt.keyCode;
        // if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        //     evt.preventDefault();;
        // } else {
        //     return true;
        // }
    },
    async buyTokens() {
        try {
          this.isLoading = true

          if (!this.eth || this.measurementValueDisplay < this.primary.minBuy || this.eth > this.account.balance) {
            throw new Error('incorrect value')
          }
          console.log(this.measurementValueDisplay < this.primary.minBuy)

          let resp = await this.$store.dispatch('contracts/primary/buyTokens', this.eth);

          await this.$store.dispatch("web3/getAccount");

          if (this.$store.getters["web3/account"].address) {
            await this.$store.dispatch("contracts/black/initContract");
            await this.$store.dispatch("contracts/white/initContract");
            await this.$store.dispatch("contracts/primary/initContract");
            await this.$store.dispatch("contracts/collateralization/initContract");
          }

          this.$notify.success({
            title: 'Success',
            message: 'Successfull transaction',
            maxWidth: 400,
          })

        } catch (error) {
            this.$notify.error({
              title: 'Error',
              message: error.message,
              maxWidth: 400,
            })
        } finally {
          this.isLoading = false
        }
    },
          async buyBackTokens() {
        try {
          this.isLoading = true

          if (this.measurementValueDisplay ||
              this.measurementValueDisplay < this.primary.minBuy ||
              this.measurementValueDisplay > this.white.balance ||
              this.measurementValueDisplay > this.black.balance) {
            throw new Error('incorrect value')
          }

          let resp = await this.$store.dispatch('contracts/primary/buyBackTokens', this.measurementValueDisplay);

          await this.$store.dispatch("web3/getAccount");

          if (this.$store.getters["web3/account"].address) {
            await this.$store.dispatch("contracts/black/initContract");
            await this.$store.dispatch("contracts/white/initContract");
            await this.$store.dispatch("contracts/primary/initContract");
            await this.$store.dispatch("contracts/collateralization/initContract");
          }

          this.$notify.success({
            title: 'Success',
            message: 'Successfull transaction',
            maxWidth: 400,
          })

        } catch (error) {
            this.$notify.error({
              title: 'Error',
              message: error.message,
              maxWidth: 400,
            })
        } finally {
          this.isLoading = false
        }
    }
  },


};
</script>

<style scoped></style>
