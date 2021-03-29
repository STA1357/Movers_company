<template>
  <div class="reqests-card">
    <div class="requests-bg">
      <p>Осталось заявок :</p>
      <div class="requests-counter">
        20 <img src="../assets/icons/Union.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.reqests-card {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 28px;
  width: 100%;
  height: 169px;
  border-radius: 28px;
  margin-top: 10px;
}
.requests-bg {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: linear-gradient(180deg, #f2994a 0%, #ff7a7a 100%);
  position: relative;
  width: 100%;
  height: 128px;
  border-radius: 20px;
  padding-left: 33px;
  padding-top: 30px;
  margin: 0 22px;
  &::after {
    content: "";
    position: absolute;
    width: 232px;
    height: 144px;
    top: 0;
    right: -30px;
    background: url("../assets/icons/requsts-shape.png") no-repeat;
  }
  p {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;

    color: #ffffff;
  }
}
.requests-counter {
  display: flex;
  align-items: center;
  font-family: SF Pro Display;
  font-style: normal;
  font-weight: 500;
  font-size: 25px;
  line-height: 30px;
  letter-spacing: 0.5px;
  color: #ffffff;
  img {
    margin-left: 20px;
  }
}
</style>
