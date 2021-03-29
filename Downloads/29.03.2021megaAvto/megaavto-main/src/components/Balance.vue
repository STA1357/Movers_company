<template>
  <div class="balance-card">
    <div class="balance">
      <img src="../assets/icons/dollar.png" alt="" /> 0.00
    </div>
    <div class="recharge">
      <img src="../assets/icons/plus-circle.png" alt="" />
      <p>Пополнить баланс</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.balance-card {
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 28px;
  width: 100%;
  height: 169px;
  border-radius: 28px;
  margin-bottom: 10px;
}
.balance {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 72px;
  line-height: 84px;
  color: #2c5282;
  padding-top: 20px;
}
.recharge {
  display: flex;
  align-items: center;
  padding-top: 20px;
  padding-left: 20px;
  cursor: pointer;

  p {
    padding-left: 10px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    text-decoration-line: underline;
    color: #2c5282;
    margin: 0;
  }
}
</style>
