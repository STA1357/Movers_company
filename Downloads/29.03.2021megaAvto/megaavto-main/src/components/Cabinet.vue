<template>
  <div class="content-admin mobile-cabinet__wrapper">
    <v-row class="d-flex  justify-around justifu-lg-center">
      <v-col
        cols="12"
        lg="7"
        class="d-flex flex-column align-items-center mt-3"
      >
        <div class="active-requests__wrapper">
          <div class="active-requests">
            <div class="active-requests__count">10</div>
            <div class="active-requests__icon">
              <v-img
                max-width="25"
                max-height="30"
                src="../assets/icons/active-requests.png"
              ></v-img
              ><span>Активных обьявлений</span>
            </div>
          </div>
          <div class="active-requests">
            <div class="active-requests__count">29</div>
            <div class="active-requests__icon">
              <v-img
                max-width="22"
                max-height="30"
                src="../assets/icons/flash.png"
              ></v-img
              ><span>Обработано заявок</span>
            </div>
          </div>
        </div>
        <Balance />
        <div class="exchange-history">
          <div class="exchange-history__title">История ваших обменов</div>
          <div class="exchange-history__wrapper-card">
            <div class="exchange-history__card">
              <v-img
                class="exchange-user-img "
                lazy-src="https://picsum.photos/id/11/10/6"
                max-height="26"
                max-width="26"
                width="26"
                height="26"
                :src="getUser.image"
              ></v-img>
              <p>Обмен состоялся 3 дня назад</p>
              <v-img
                max-width="15"
                max-height="15"
                src="../assets/icons/more-horizontal.png"
              ></v-img>
            </div>
            <div class="exchange-history__card">
              <v-img
                class="exchange-user-img "
                lazy-src="https://picsum.photos/id/11/10/6"
                max-height="26"
                max-width="26"
                width="26"
                height="26"
                :src="getUser.image"
              ></v-img>
              <p>Обмен состоялся 3 дня назад</p>
              <v-img
                max-width="15"
                max-height="15"
                src="../assets/icons/more-horizontal.png"
              ></v-img>
            </div>
            <div class="exchange-history__card">
              <v-img
                class="exchange-user-img "
                lazy-src="https://picsum.photos/id/11/10/6"
                max-height="26"
                max-width="26"
                width="26"
                height="26"
                :src="getUser.image"
              ></v-img>
              <p>Обмен состоялся 3 дня назад</p>
              <v-img
                max-width="15"
                max-height="15"
                src="../assets/icons/more-horizontal.png"
              ></v-img>
            </div>
            <div class="exchange-history__card">
              <v-img
                class="exchange-user-img "
                lazy-src="https://picsum.photos/id/11/10/6"
                max-height="26"
                max-width="26"
                width="26"
                height="26"
                :src="getUser.image"
              ></v-img>
              <p>Обмен состоялся 3 дня назад</p>
              <v-img
                max-width="15"
                max-height="15"
                src="../assets/icons/more-horizontal.png"
              ></v-img>
            </div>
            <div class="exchange-history__card">
              <v-img
                class="exchange-user-img "
                lazy-src="https://picsum.photos/id/11/10/6"
                max-height="26"
                max-width="26"
                width="26"
                height="26"
                :src="getUser.image"
              ></v-img>
              <p>Обмен состоялся 3 дня назад</p>
              <v-img
                max-width="15"
                max-height="15"
                src="../assets/icons/more-horizontal.png"
              ></v-img>
            </div>
            <div class="exchange-history__card">
              <v-img
                class="exchange-user-img "
                lazy-src="https://picsum.photos/id/11/10/6"
                max-height="26"
                max-width="26"
                width="26"
                height="26"
                :src="getUser.image"
              ></v-img>
              <p>Обмен состоялся 3 дня назад</p>
              <v-img
                max-width="15"
                max-height="15"
                src="../assets/icons/more-horizontal.png"
              ></v-img>
            </div>
            <div class="exchange-history__card">
              <v-img
                class="exchange-user-img "
                lazy-src="https://picsum.photos/id/11/10/6"
                max-height="26"
                max-width="26"
                width="26"
                height="26"
                :src="getUser.image"
              ></v-img>
              <p>Обмен состоялся 3 дня назад</p>
              <v-img
                max-width="15"
                max-height="15"
                src="../assets/icons/more-horizontal.png"
              ></v-img>
            </div>
            <div class="exchange-history__card">
              <v-img
                class="exchange-user-img "
                lazy-src="https://picsum.photos/id/11/10/6"
                max-height="26"
                max-width="26"
                width="26"
                height="26"
                :src="getUser.image"
              ></v-img>
              <p>Обмен состоялся 3 дня назад</p>
              <v-img
                max-width="15"
                max-height="15"
                src="../assets/icons/more-horizontal.png"
              ></v-img>
            </div>
            <div class="exchange-history__card">
              <v-img
                class="exchange-user-img "
                lazy-src="https://picsum.photos/id/11/10/6"
                max-height="26"
                max-width="26"
                width="26"
                height="26"
                :src="getUser.image"
              ></v-img>
              <p>Обмен состоялся 3 дня назад</p>
              <v-img
                max-width="15"
                max-height="15"
                src="../assets/icons/more-horizontal.png"
              ></v-img>
            </div>
          </div>
        </div>
      </v-col>
      <v-col
        v-if="getAutoRiaId"
        cols="12"
        lg="5"
        class="d-flex flex-column align-items-center mt-3 "
      >
        <div class="cars-wrapper-exchange">
          <div
            v-for="(userCar, i) in userCars"
            :key="i"
            class="car-wrapper_cabinet"
          >
            <Car
              :userCar="userCar"
              :carSpecs="true"
              @selected="selectedCar"
              :big="true"
            />
          </div>
          <div
            v-for="(userCar, i) in userCars"
            :key="i"
            class="car-wrapper_cabinet"
          >
            <Car
              :userCar="userCar"
              :carSpecs="true"
              @selected="selectedCar"
              :big="true"
            />
          </div>
          <div
            v-for="(userCar, i) in userCars"
            :key="i"
            class="car-wrapper_cabinet"
          >
            <Car
              :userCar="userCar"
              :carSpecs="true"
              @selected="selectedCar"
              :big="true"
            />
          </div>
          <div
            v-for="(userCar, i) in userCars"
            :key="i"
            class="car-wrapper_cabinet"
          >
            <Car
              :userCar="userCar"
              :carSpecs="true"
              @selected="selectedCar"
              :big="true"
            />
          </div>
          <div
            v-for="(userCar, i) in userCars"
            :key="i"
            class="car-wrapper_cabinet"
          >
            <Car
              :userCar="userCar"
              :carSpecs="true"
              @selected="selectedCar"
              :big="true"
            />
          </div>
        </div>
      </v-col>
      <v-col
        v-if="!getAutoRiaId"
        cols="12"
        md="5"
        class="d-flex justify-content-center"
      >
        <form elevation="0" class="autoria-login-form mt-3 pb-3">
          <v-text-field
            solo
            v-model="autoRiaId"
            label="Auto Ria Id"
            required
            elevation="0"
            class="mt-3"
          ></v-text-field>
          <v-btn
            @click="setAutoRiaCredentials"
            depressed
            :ripple="false"
            color="#F69E30"
            class="white--text autoRiaButton mt-5"
            >Вход</v-btn
          >
        </form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Balance from "./Balance";
import Car from "./Car";
export default {
  name: "Cabinet",
  components: {
    Balance,
    Car,
  },
  computed: {
    getUser() {
      return this.$store.getters.getUser;
    },
    userCars() {
      return this.$store.getters.getMyCars;
    },
    getAutoRiaId() {
      return this.$store.getters.getAutoRiaId;
    },
  },
  methods: {
    async setAutoRiaCredentials() {
      if (this.autoRiaId !== "") {
        await this.$store.dispatch("updateAutoRiaId", {
          autoRiaId: this.autoRiaId,
        });
        if (this.getAutoRiaId) {
          await this.$store.dispatch("fetchMyCars");
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.autoria-login-form {
  padding: 10px 20px;
  background-color: #fff !important;
  box-shadow: 0 0 2rem 0 rgba(136, 152, 170, 0.25) !important;
  width: 100%;
  height: 150px;
  border-radius: 28px;
  @media (min-width: 960px) {
    margin-bottom: 50px;
  }
}
.autoRiaButton {
  background: linear-gradient(180deg, #f2994a 0%, #ff7a7a 100%);
  text-decoration: none !important;
  text-transform: capitalize !important;
}
.active-requests__wrapper {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}
.active-requests {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 47%;
  height: 168px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 28px;
  &__count {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 72px;
    line-height: 84px;
    color: #2c5282;
  }
  &__icon {
    display: flex;
    align-items: center;
    span {
      width: 90px;
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 14px;

      color: #2c5282;
    }
  }
}
.cars-wrapper-exchange {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 755px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 28px;
  padding: 20px 22px 20px 22px;

  overflow-y: auto;
  max-height: 755px;
  &::-webkit-scrollbar {
    width: 0px;
  }
  &::-webkit-scrollbar-thumb {
    width: 0px;
    background-color: #f69e30;
    color: #f69e30;
  }
  &::-webkit-scrollbar-track {
    margin-top: 25px;
  }
}
.car-wrapper_cabinet {
  display: flex;
  justify-content: center;
  width: 100%;
}
.exchange-history {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 365px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 28px;
  margin-top: 10px;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    top: 70px;
    left: 0;
    width: 100%;
    height: 1px;
    background: #f2994a;
  }
  &__wrapper-card {
    width: 100%;
    overflow-y: auto;
    max-height: 250px;
    padding: 0 22px;
    &::-webkit-scrollbar {
      width: 0px;
    }
    &::-webkit-scrollbar-thumb {
      width: 0px;
      background-color: #f69e30;
      color: #f69e30;
    }
    &::-webkit-scrollbar-track {
      margin-top: 25px;
    }
  }
  &__title {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;
    margin-bottom: 40px;
    margin-top: 30px;
    color: #2c5282;
  }
  &__card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 46px;
    background: #f5f5f5;
    border-radius: 18px;
    padding: 5px 22px 5px 10px;
    margin-bottom: 10px;
    p {
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 16px;
      color: #0b4870;
      margin: 0;
      padding: 0;
    }
  }
}

.exchange-user-img {
  border-radius: 50%;
  border: 3px solid #f2994a;
}
.mobile-cabinet__wrapper {
  margin-top: 70px !important;
}
</style>
