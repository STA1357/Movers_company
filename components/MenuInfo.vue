<template>
  <div class="main">
    <span class="title ml-3">Account</span>
    <div class="body">
      <span class="sub-title">Connected with Metamask</span>
      <div class="d-flex mt-3 justify-content-between">
        <div class="">
          <img src="@/assets/images/metamask_icon.svg" alt="" />
          <span class="account ml-1"
            >{{ account.address.substr(-42, 6) }}...{{
             account.address.substr(-4, 4)
            }}</span
          >
        </div>
        <div class="btn col-2 p-1 mt-1">Change</div>
      </div>
      <div class="btn-group d-flex mt-2 ml-4">
        <div class="">Copy address</div>
        <div class="">View on etherscan</div>
      </div>
    </div>
    <span class="footer mt-3 ml-3">Learn more about Metamask</span>
  </div>
</template>

<script>
export default {
  name: "MenuInfo",
  computed: {
      account() {
          return this.$store.getters['web3/account'];
      },
  }
};
</script>

<style scoped>
.main {
  width: 428px;
  height: 210px;
  position: absolute;
  top: 100px;
  left: 70%;
  background: #f9f9f9;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  box-shadow: 4px 8px 18px 2px rgba(0, 0, 0, 0.15);
  border-radius: 19px;
  padding: 12px 16px;
}
.body {
  width: 398px;
  height: 112px;
  background: #ffffff;
  border: 1px solid #eaeaea;
  box-sizing: border-box;
  border-radius: 11px;
  margin-top: 14px;
  padding: 14px 13px;
}
.title {
  @font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */
  letter-spacing: 0.015em;
  color: #0f2f31;
  display: flex;
}
.sub-title {
  @font-family: Montserrat;
  font-style: normal;
  font-weight: 300;
  font-size: 10px;
  line-height: 12px;
  display: flex;
  color: #0f2f31;
}
img {
  width: 32px;
  height: 32px;
}
.account {
  @font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: 0.015em;

  color: #0f2f31;
}
.btn {
  width: 64px;
  height: 18px;

  border: 0.5px solid #fc4040;
  box-sizing: border-box;
  border-radius: 12px;

  @font-family: Montserrat;
  font-style: normal;
  font-weight: 300;
  font-size: 10px;
  line-height: 10px;
  color: #f70404;
}
.btn-group div {
  margin-left: 15px;
  @font-family: Montserrat;
  width: auto;
  font-style: normal;
  font-weight: 300;
  font-size: 10px;
  line-height: 11px;
  height: 18px;
  padding: 3px 12px;
  background: rgba(176, 176, 176, 0.15);
  border: 0.5px solid rgba(61, 61, 61, 0.08);
  box-sizing: border-box;
  border-radius: 4px;
  color: #3d3d3d;
}
.footer {
  @font-family: Montserrat;
  font-style: normal;
  font-weight: 300;
  font-size: 10px;
  line-height: 12px;
  text-decoration-line: underline;
  display: flex;
  color: #0f2f31;
}
</style>
