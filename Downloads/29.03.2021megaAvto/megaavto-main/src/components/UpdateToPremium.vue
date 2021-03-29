<template>
  <div class="premium-update">
    <v-img
      max-width="120"
      max-height="86"
      src="../assets/icons/premium-update.svg"
    ></v-img>
    <p>
      Give your money <br />
      awesome space in cloud
    </p>
    <v-btn depressed :ripple="false" class="premium-btn"
      >Upgrade to premium</v-btn
    >
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.premium-update {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: 215px;
  height: 202px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px !important;
  @media (max-width: 960px) {
    display: none;
  }
  p {
    font-family: Suprema;
    font-style: normal;
    font-weight: normal;
    font-size: 8.7511px;
    line-height: 11px;
    text-align: center;
    color: #2c5282;
    margin: 0;
    padding: 0;
  }
}
.premium-btn {
  width: 163.21px;
  height: 41.03px;
  background: linear-gradient(180deg, #f2994a 0%, #ff7a7a 100%);
  border-radius: 13.617px;

  font-family: Quicksand;
  text-transform: capitalize;
  font-style: normal;
  font-weight: bold;
  font-size: 11.1442px !important;
  color: #ffffff !important;
}
</style>
