<template>
  <div class="menu">
    <div class="menu__info d-flex">
      <div class="menu__logo-wrapper">
        <img class="menu__logo" src="@/assets/images/logo.svg" alt="" />
      </div>
      <div class="menu__navigation">
        <NuxtLink class="txt menu__navigation-item" to="/trade">TRADE</NuxtLink>
        <NuxtLink class="txt menu__navigation-item" to="/earn">EARN</NuxtLink>
        <NuxtLink class="txt menu__navigation-item menu__navigation-item--inactive" :event="''" to="#">EVENTS</NuxtLink>
        <NuxtLink class="txt menu__navigation-item menu__navigation-item--inactive" :event="''" to="#">LIVE</NuxtLink>
        <NuxtLink class="txt menu__navigation-item menu__navigation-item--inactive" :event="''" to="#">VOTE</NuxtLink>
        <NuxtLink class="txt menu__navigation-item menu__navigation-item--inactive" :event="''" to="#">CHARTS</NuxtLink>
        <NuxtLink class="txt menu__navigation-item menu__navigation-item--inactive" :event="''" to="#">NFT</NuxtLink>
      </div>
    </div>
    <div class="menu__actions d-flex">
      <div class="txt menu__navigation-item menu__bwgt-button">BWGT</div>
      <NuxtLink class="txt menu__navigation-item menu__navigation-item--inactive" :event="''" to="#">Create+</NuxtLink>

      <div v-if="!account.address" class="menu__button" @click="openWalletModal()">
        CONNECT WALLET
      </div>
      <div v-else class="menu__button menu__account" :data-balance="`${account.balance} ETH`">
        {{shortenedAddress}}
        <div class="menu__account-image-wrapper">
          <img class="menu__account-image" src="@/assets/images/metamask_icon.svg" alt="">
        </div>
      </div>
      <NuxtLink class="txt menu__navigation-item menu__navigation-item--inactive" :event="''" to="#">About</NuxtLink>
    </div>
  </div>
</template>

<script>
import WalletModal from "@/components/modal/templates/WalletModal";

export default {
  methods: {
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
  },
  computed: {
    account() {
      return this.$store.getters["web3/account"];
    },
    shortenedAddress() {
      console.log(this.account.address.substr(0, 6))
      return this.account.address.substr(0, 6) + '...' +  this.account.address.substr(-4, 4)
    }
  }
}
</script>

<style lang="scss" scoped>
  .menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 64px;
    background-color: $brand;
    padding: 0 28px;
  }
  .menu__logo {
    margin-right: 64px;
  }
  .menu__navigation {
    display: flex;
    align-items: center;
  }
  .menu__navigation-item {
    color: rgba($white, 0.8);
    font-size: 14px;
    line-height: 13px;

    &:not(:last-child) {
      margin-right: 24px;
    }

    &--inactive {
      cursor: default;
      text-decoration: none;
    }

    &.nuxt-link-active {
      font-weight: 900;
    }
  }
  .menu__actions {
    align-items: center;

    & > :not(:last-child) {
      margin-right: 24px;
    }
  }
  .menu__button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 30px;
    border-radius: 6px;
    border: 2px solid $white;
    color: $white;
    font-weight: 600;
    font-size: 14px;
    line-height: 13px;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-right: 18px;

    &:hover {
      background-color: $white;
      color: $brand;
    }
  }
  .menu__account {
    justify-content: flex-end;
    position: relative;
    font-size: 12px;
    margin-left: 74px;
    width: auto;
    padding: 0 10px;

    &::before {
      content: attr(data-balance);
      position: absolute;
      right: 100%;
      width: 100px;
      height: 24px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid $white;
      box-sizing: border-box;
      border-radius: 6px 0px 0px 6px;
      padding: 0 7px;
      color: $white !important;
    }
  }
  .menu__bwgt-button {
    display: flex;
    justify-content: center;
    align-items: center;
    color: $brand;
    border-radius: 6px;
    cursor: default;
    font-weight: 600;
    width: 80px;
    height: 30px;
    background-color: $white;
  }
  .menu__account-image-wrapper {
    margin-left: 6px;
  }
</style>