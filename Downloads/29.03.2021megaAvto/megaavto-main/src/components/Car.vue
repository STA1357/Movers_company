<template>
  <div class="w-100 d-flex justify-center">
    <div v-if="big" class="car-card">
      <!-- <img :src="userCar.photoData.seoLinkB" class="car-image" /> -->
      <v-img
        :src="userCar.photoData.seoLinkB"
        max-height="228"
        max-width="202"
        class="car-image"
        aspect-ratio="1.4"
      ></v-img>
      <div class="car-info-wrapper">
        <div class="publication-status-wrapper">
          <img src="../assets/icons/info.png" alt="" />
          <div class="publication-status">Опубликованно</div>
        </div>
        <div class="car-info">
          <p>Год - {{ userCar.autoData.year }}</p>
          <p>Модель - {{ userCar.modelName }}</p>
          <p>Марка - {{ userCar.markName }}</p>
          <p>Пробег - {{ userCar.autoData.race }}</p>
          <p>Цена - {{ userCar.USD }} $</p>
        </div>
      </div>
    </div>
    <div v-if="small" class="car-card-small">
      <v-img
        :src="userCar.photoData.seoLinkB"
        max-height="50"
        max-width="90"
        width="90"
        height="50"
        class="car-image"
      ></v-img>
      <p>
        {{
          userCar.modelName +
            " " +
            userCar.markName +
            " " +
            userCar.autoData.year
        }}
      </p>
      <div class="checkbox-wrapper">
        <input
          @change="checkbox"
          :true-value="userCar"
          :false-value="''"
          type="checkbox"
          :id="index"
          class="check"
          v-model="checkData"
        />
        <label :for="index" class="checkmark mr-2"></label>
        <!-- <label :for="index">Добавьте авто на обмен</label> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Car",
  data() {
    return {
      checkData: "",
      isSelected: false,
    };
  },
  props: {
    userCar: Object,
    carSpecs: Boolean,
    index: Number,
    big: Boolean,
    small: Boolean,
  },
  methods: {
    checkbox() {
      console.log("car data: ", this.checkData);
      this.isSelected = !this.isSelected;
      this.$emit("selected", this.isSelected);
    },
  },
  mounted() {
    console.log(this.userCar);
  },
};
</script>

<style lang="scss" scoped>
.car-card {
  display: flex !important;
  justify-content: space-between;
  box-shadow: 0px 4px 4px rgb(0 0 0 / 25%) !important;
  height: 228px;
  max-width: 500px;
  width: 100%;
  background: #f5f5f5;
  border-radius: 20px;
  margin-bottom: 17px;
  padding-right: 25px;
}
.car-card-small {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  background: #f5f5f5;
  border-radius: 16px;
  margin-bottom: 16px;
  padding-right: 10px;
  p {
    padding: 0;
    margin: 0;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    text-decoration-line: underline;
    color: #2c5282;
  }
}
.car-info-wrapper {
  margin-left: 16px;
  margin-top: 19px;
}
.car-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 167px;
  height: 155px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  color: #2c5282;
  padding-left: 30px;
  padding-top: 10px;
  p {
    padding: 0;
    margin: 0;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      top: 5px;
      left: -15px;
      width: 6px;
      height: 6px;
      background: linear-gradient(180deg, #f2994a 0%, #ff7a7a 100%);
      border-radius: 50%;
    }
  }
}
.publication-status-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.publication-status {
  background: #9ae6b4;
  border: 2px solid #9ae6b4;
  box-sizing: border-box;
  border-radius: 50px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: #ffffff;
  padding: 5px 9px;
}
.car-image {
  width: auto;
  height: auto;
  border-radius: 20px 0px 0px 20px;
}
.car-specs {
  display: flex;
  justify-content: flex-start;
  font-size: 10px;
  p {
    text-align: left;
    padding-left: 18px;
    padding-right: 18px;
    margin: 0 0 5px 0;
  }
  .v-application p {
    padding: 0;
    margin: 0;
  }
}
.checkbox-wrapper {
  display: flex;
  justify-content: center;
}
.checkmark {
  display: block;
  width: 20px;
  height: 20px;
  background-color: #fff;
  border-radius: 3px;
  position: relative;
  border: 2px solid #f69e30;
  border-radius: 4px;
  transition: background-color 0.5s;
  cursor: pointer;
  margin: 0 10px 0 0;
}
.checkmark:hover {
  border: 2px solid #f69e30;
}
.check:checked + .checkmark {
  background-color: #fff;
}
.checkmark::after {
  content: "";
  position: absolute;
  width: 7px;
  height: 10px;
  border-right: 2px solid #f69e30;
  border-bottom: 2px solid #f69e30;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%) rotateZ(40deg);
  opacity: 0;
  transition: opacity 0.5s;
}
.check:checked + .checkmark::after {
  opacity: 1;
}
.check {
  opacity: 0;
}
</style>
