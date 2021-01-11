<template>
  <div class="w3-top">
    <div class="d-flex menu justify-content-around">
      <span class="col-2 logo">
        <img src="@/assets/images/logo.svg" alt="" />
      </span>
      <span class="items col-5 d-flex sub">
        <span class="col">TRADE</span>
        <span class="col"><router-link to="/">EARN</router-link></span>
        <span class="col">EVENTS</span>
        <span class="col">LIVE</span>
        <span class="col">VOTE</span>
        <span class="col">CHARTS</span>
        <span class="col">NFT</span>
        <span class="col">&nbsp;</span>
      </span>
      <span class="items-btn col-5 d-flex ml-5 sub">
        <span class="col-2 link">BWGT</span>
        <span class="col-2 link">CREATE +</span>
        <span
          class="col-4 link "
          v-if="!account.address"
          @click="openWalletModal()"
          >CONNECT WALLET</span
        >
        <span class="col-5 info" v-else @click="isConnected = !isConnected">
          <span class="balance p-2"> {{ account.balance }} ETH </span>
          <span class="wallet pl-2 pr-2">
            {{ account.address.substr(-42, 6) }}...{{
              account.address.substr(-4, 4)
            }}
            <img src="@/assets/images/metamask_icon.svg" alt="" class="mb-1" />
          </span>
        </span>
        <span class="col-2 link">ABOUT</span>
      </span>
      <div v-if="isConnected">
        <menu-info v-if="account.address" />
      </div>
    </div>

    <div class="topnav">
      <div class="logo mt-2 mb-2">
        <img src="@/assets/images/logo.svg" alt="" />
      </div>
      <div id="myLinks">
        <span>TRADE</span>
        <span>EARN</span>
        <span>EVENTS</span>
        <span>LIVE</span>
        <span>VOTE</span>
        <span>CHARTS</span>
        <span>NFT</span>
        <span>BWGT</span>
        <span>CREATE +</span>
        <span>{{ account.address ? "CONNECTED" : "CONNECT WALLET" }}</span>
        <span>ABOUT</span>
      </div>
      <div class="icon" @click="myFunction()" id="burger">
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
      </div>
    </div>
  </div>
</template>

<script>
import MenuInfo from "./MenuInfo";
import WalletModal from "@/components/modal/templates/WalletModal";

export default {
  name: "Menu",
  data() {
    return {
      isConnected: false
    };
  },
  components: {
    MenuInfo
  },
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
    },
    myFunction() {
      var x = document.getElementById("myLinks");
      var icons = document.getElementById("burger");
      icons.classList.toggle("change");
      if (x.style.display === "block") {
        x.style.display = "none";
      } else {
        x.style.display = "block";
      }
    }
  },
  computed: {
    account() {
      return this.$store.getters["web3/account"];
    }
  }
};
</script>

<style scoped>
.bar1,
.bar2,
.bar3 {
  width: 18px;
  height: 1px;
  background-color: #eee;
  margin: 6px 0;
  transition: 0.4s;
}

.change .bar1 {
  -webkit-transform: rotate(-45deg) translate(-9px, 6px);
  transform: rotate(-45deg) translate(0px, 3px);
}

.change .bar2 {
  opacity: 0;
}

.change .bar3 {
  -webkit-transform: rotate(45deg) translate(-8px, -8px);
  transform: rotate(45deg) translate(-7px, -10px);
}
.menu {
  background: rgba(15, 47, 49, 0.95);
  height: 64px;
  padding: 16px 0;
}
.items span,
a {
  @font-family: Montserrat;
  font-style: normal;
  font-size: 14px;
  line-height: 12px;
  padding: 10px 12px;
  font-weight: normal;
  color: #ffffff;
  mix-blend-mode: normal;
  opacity: 0.8;
  text-decoration: none;
}
.router-link-active {
  font-weight: 900;
}
.items-btn span {
  @font-family: Montserrat;
  font-style: normal;
  font-size: 14px;
  line-height: 12px;
  font-weight: normal;
  color: #ffffff;
  mix-blend-mode: normal;
  opacity: 0.8;
  padding: 10px 2px;
}
.link:hover {
  background: #ffffff;
  border-radius: 6px;
  color: black;
  font-weight: 600;
  opacity: 1;
}

.topnav {
  overflow: hidden;
  background: rgba(15, 47, 49, 0.95);
  position: relative;
  display: none;
}

.topnav #myLinks {
  display: none;
  min-height: 100vh;
}

.link {
  color: white;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  display: block;
}

.link.icon {
  display: block;
  position: absolute;
  right: 0;
  top: 0;
  color: white;
  padding: 11.5px 16px;
  text-decoration: none;
  font-size: 17px;
  display: block;
}

.link:hover {
  background: #ffffff;
  border-radius: 6px;
  color: black;
  font-weight: 600;
  opacity: 1;
}

@media screen and (max-width: 925px) {
  .topnav {
    display: block !important;
  }
  .menu {
    display: none !important;
  }
}
.balance {
  background: rgba(255, 255, 255, 0.08);
  border: 0.5px solid #ffffff !important;
  box-sizing: border-box;
  border-radius: 6px 0px 0px 6px;
  @font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 13px;
  /* identical to box height, or 130% */
  opacity: 1 !important;

  text-align: right;
  margin-right: -2px;
  color: #ffffff;
}
.wallet {
  border: 2px solid #ffffff !important;
  box-sizing: border-box;
  border-radius: 6px;
  @font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 13px;
  /* identical to box height, or 108% */

  text-align: right;
  opacity: 1 !important;
  color: #ffffff !important;
}
</style>
