<template>
  <div
    class="user-list-wrapper"
    :class="isOpen ? 'activeList' : 'unActiveList'"
  >
    <div class="user-list">
      <v-row>
        <v-col
          v-if="!error"
          cols="4"
          class="d-flex flex-column align-items-center cars-wrapper-exchange "
        >
          <div
            v-for="(userCar, i) in userCars"
            :key="i"
            class="car-wrapper_cabinet"
          >
            <Car :userCar="userCar" :carSpecs="true" :big="true" />
          </div>
        </v-col>
        <v-col v-if="error" cols="4" class="cars-wrapper-exchange">{{
          error
        }}</v-col>
        <v-col cols="4" class="exchange-history__wrapper-card">
          <div class="exchange-history__card">
            <v-img
              class="exchange-user-img "
              lazy-src="https://picsum.photos/id/11/10/6"
              max-height="26"
              max-width="26"
              width="26"
              height="26"
              :src="user.image"
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
              :src="user.image"
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
              :src="user.image"
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
              :src="user.image"
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
              :src="user.image"
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
              :src="user.image"
            ></v-img>
            <p>Обмен состоялся 3 дня назад</p>
            <v-img
              max-width="15"
              max-height="15"
              src="../assets/icons/more-horizontal.png"
            ></v-img>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Car from "./Car";
export default {
  data() {
    return {
      userCars: [],
      error: "",
    };
  },
  components: {
    Car,
  },
  computed: {
    getApiKey() {
      return this.$store.getters.getApiKey;
    },
  },
  props: {
    isOpen: {
      type: Boolean,
      default() {
        return false;
      },
    },
    user: Object,
  },
  methods: {
    async fetchUser() {
      try {
        console.log(this.user._id);
        const { data } = await axios(
          `https://developers.ria.com/auto/used/autos/ids?user_id=${this.user.autoRiaId}&api_key=${this.getApiKey}`
        );
        const userCars = [];

        for (let car of data.active.moderated) {
          const { data: myCar } = await axios(
            `https://developers.ria.com/auto/info?api_key=${this.getApiKey}&auto_id=${car}`
          );
          userCars.push(myCar);
        }

        // console.log(data);
        this.userCars = userCars;
        // console.log(this.userCars);
      } catch (error) {
        // console.log(error.response);
        if (error.response.status === 403) {
          this.error = "У пользователя нет авто";
        }
      }
    },
  },
  mounted() {
    this.fetchUser();
  },
};
</script>

<style lang="scss" scoped>
.user-list-wrapper {
  width: 100%;
  padding: 0 25px !important;
  margin-top: 16px;
  transition: all 1s;

  &.activeList {
    min-height: 340px;
  }
  &.unActiveList {
    min-height: 0;
  }
}
.user-list {
  width: 100%;
  height: 340px;
  background: #f5f5f5;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  position: relative;
  top: -20px;
  z-index: 1;
  transition: all 1s;
  padding: 50px 14px 0 14px;
}
.activeList {
  max-height: 340px;
  opacity: 1;
  transform: translateY(0);
  .cars-wrapper-exchange,
  .exchange-history__wrapper-card {
    opacity: 1;
    max-height: 259px;
  }
}
.unActiveList {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
  .cars-wrapper-exchange,
  .exchange-history__wrapper-card {
    opacity: 0;
    max-height: 0;
  }
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
    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 12px;
    width: 100%;
    overflow-y: auto;
    height: 259px;
    max-height: 259px;
    padding: 10 22px 0 22px;
    transition: all 1s;

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
.cars-wrapper-exchange {
  width: 100%;
  height: 259px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  overflow-y: auto;
  max-height: 259px;
  margin: 0 14px;
  transition: all 1s;

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
</style>
