<!-- @format -->

<template>
  <div class="content-admin mobile-exchange--wrapper">
    <v-row class="d-flex justify-content-center ">
      <v-col cols="12" lg="8" class="mt-1 d-flex justify-content-center">
        <v-card class="trans" elevation="0">
          <form class="profile-form pb-10 form-divider">
            <div class="exchange-title">Начать рассылку</div>

            <v-row>
              <v-col cols="12" md="6">
                <label for="typeOfCar" class="inputLabel">Тип транспорта</label>
                <v-select
                  id="typeOfCar"
                  solo
                  v-model="form.typeOfCarsSelect"
                  :items="typeOfCars"
                  item-text="name"
                  item-value="value"
                  @change="getMarksOfCars"
                  elevation="0"
                ></v-select>
              </v-col>
              <v-col cols="12" md="3">
                <label for="yearFrom" class="inputLabel">Год от</label>

                <v-select
                  id="yearFrom"
                  solo
                  v-model="form.yearSelectFrom"
                  :items="optionYears"
                  item-text="name"
                  item-value="value"
                  elevation="0"
                ></v-select>
              </v-col>
              <v-col cols="12" md="3">
                <label for="yearTo" class="inputLabel">Год до</label>
                <v-select
                  id="yearTo"
                  solo
                  v-model="form.yearSelectTo"
                  :items="optionYears"
                  @input="setYearto"
                  item-text="name"
                  item-value="value"
                  elevation="0"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <label for="marksOfCars" class="inputLabel">Марка</label>
                <v-select
                  id="marksOfCars"
                  solo
                  v-model="form.marksOfCarsSelect"
                  :items="marksOfCars"
                  item-text="name"
                  item-value="value"
                  @input="getModels"
                  @change="getMarksOfCars"
                  attach
                  :disabled="!this.form.typeOfCarsSelect"
                  chips
                  multiple
                  @changed="changed(marksOfCars)"
                  elevation="0"
                >
                  <template v-slot:selection="{ item, select, selected }">
                    <v-chip
                      :input-value="selected"
                      close
                      @click="select"
                      @click:close="remove(item, marksOfCars)"
                      :ripple="false"
                    >
                      {{ item.name }}
                    </v-chip>
                  </template></v-select
                >
              </v-col>
              <v-col cols="12">
                <label for="modelOfCars" class="inputLabel">Модель</label>
                <v-select
                  id="modelOfCars"
                  solo
                  :disabled="!this.form.marksOfCarsSelect"
                  v-model="form.modelsOfCarsSelect"
                  :items="modelsOfCars"
                  item-text="name"
                  item-value="value"
                  attach
                  chips
                  multiple
                  @changed="changed(modelsOfCars)"
                  elevation="0"
                >
                  <template v-slot:selection="{ item, select, selected }">
                    <v-chip
                      :input-value="selected"
                      close
                      @click="select"
                      @click:close="remove(item, modelsOfCars)"
                      :ripple="false"
                    >
                      {{ item.name }}
                    </v-chip>
                  </template></v-select
                >
              </v-col>

              <v-col cols="12">
                <label for="state" class="inputLabel">Область</label>

                <v-select
                  id="state"
                  solo
                  v-model="form.statesSelect"
                  :items="states"
                  item-text="name"
                  item-value="value"
                  attach
                  chips
                  multiple
                  @changed="changed(states)"
                  elevation="0"
                >
                  <template v-slot:selection="{ item, select, selected }">
                    <v-chip
                      :input-value="selected"
                      close
                      @click="select"
                      @click:close="remove(item, states)"
                      :ripple="false"
                    >
                      {{ item.name }}
                    </v-chip>
                  </template></v-select
                >
              </v-col>
              <v-col cols="12" md="6" class="cmt">
                <label for="priceFrom" class="inputLabel">Цена от</label>

                <v-text-field
                  id="priceFrom"
                  solo
                  v-model="form.priceFrom"
                  elevation="0"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="cmt">
                <label for="priceTo" class="inputLabel">Цена до</label>

                <v-text-field
                  id="priceTo"
                  solo
                  v-model="form.priceTo"
                  elevation="0"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <label for="typeOfExchange" class="inputLabel"
                  >Тип обмена</label
                >

                <v-select
                  id="typeOfExchange"
                  solo
                  v-model="form.exchangeTypeSelect"
                  :items="exchangeType"
                  item-text="name"
                  item-value="value"
                  elevation="0"
                ></v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-btn
                  :ripple="false"
                  depressed
                  class="white--text send-btn"
                  @click="sendExchangeRequest(setSearchParams)"
                  >Начать рассылку</v-btn
                >
              </v-col>
            </v-row>
          </form>
        </v-card>
      </v-col>
      <v-col
        v-if="!getAutoRiaId"
        cols="12"
        md="4"
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
      <v-col
        v-if="getAutoRiaId"
        cols="12"
        lg="4"
        class="mt-1 mobile-cars__wrapper d-flex flex-column align-items-center"
      >
        <Balance />
        <div class="cars-list">
          <div class="cars-wrapper">
            <div v-for="(userCar, i) in userCars" :key="i">
              <Car
                :userCar="userCar"
                @selected="selectedCar"
                :small="true"
                :index="i"
              />
            </div>
            <div v-for="(userCar, i) in userCars" :key="i">
              <Car
                :userCar="userCar"
                @selected="selectedCar"
                :small="true"
                :index="1"
              />
            </div>
            <div v-for="(userCar, i) in userCars" :key="i">
              <Car
                :userCar="userCar"
                @selected="selectedCar"
                :small="true"
                :index="2"
              />
            </div>
            <div v-for="(userCar, i) in userCars" :key="i">
              <Car
                :userCar="userCar"
                @selected="selectedCar"
                :small="true"
                :index="3"
              />
            </div>
            <div v-for="(userCar, i) in userCars" :key="i">
              <Car
                :userCar="userCar"
                @selected="selectedCar"
                :small="true"
                :index="4"
              />
            </div>
            <div v-for="(userCar, i) in userCars" :key="i">
              <Car
                :userCar="userCar"
                @selected="selectedCar"
                :small="true"
                :index="5"
              />
            </div>
            <div v-for="(userCar, i) in userCars" :key="i">
              <Car
                :userCar="userCar"
                @selected="selectedCar"
                :small="true"
                :index="6"
              />
            </div>
            <div v-for="(userCar, i) in userCars" :key="i">
              <Car
                :userCar="userCar"
                @selected="selectedCar"
                :small="true"
                :index="7"
              />
            </div>
            <div v-for="(userCar, i) in userCars" :key="i">
              <Car
                :userCar="userCar"
                @selected="selectedCar"
                :small="true"
                :index="8"
              />
            </div>
            <div v-for="(userCar, i) in userCars" :key="i">
              <Car
                :userCar="userCar"
                @selected="selectedCar"
                :small="true"
                :index="9"
              />
            </div>
          </div>
        </div>
        <Requests />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
import Car from "./Car";
import Balance from "./Balance";
import Requests from "./Requests";
export default {
  name: "Exchange",
  components: {
    Car,
    Balance,
    Requests,
  },
  computed: {
    getUser() {
      return this.$store.getters.getUser;
    },
    getEdit() {
      return this.$store.getters.getEdit;
    },
    userCars() {
      return this.$store.getters.getMyCars;
    },
    // userCredentials() {
    //   return this.$store.getters.getCredentials;
    // },
    apiKey() {
      return this.$store.getters.getApiKey;
    },
    getAutoRiaId() {
      return this.$store.getters.getAutoRiaId;
    },
  },
  data() {
    return {
      form: {
        typeOfCarsSelect: "",
        yearSelectFrom: "",
        yearSelectTo: "",
        marksOfCarsSelect: "",
        modelsOfCarsSelect: "",
        priceFrom: "",
        priceTo: "",
        statesSelect: "",
        exchangeTypeSelect: "",
      },
      typeOfCars: [],
      used: [],
      checkbox: "",
      checkboxErrors: "",
      optionYears: [],
      marksOfCars: [],
      modelsOfCars: [],
      states: [],
      exchangeType: [
        { name: "Без доплаты", value: "1" },
        { name: "С вашей доплатой", value: "2" },
        { name: "С моей доплатой", value: "3" },
      ],
      autoRiaId: "",
      models: [],
    };
  },

  methods: {
    selectedCar(data) {
      console.log(data);
    },
    setYearto() {
      if (this.form.yearSelectFrom > this.form.yearSelectTo) {
        this.form.yearSelectTo = this.form.yearSelectFrom;
      }
    },
    async sendExchangeRequest(setSearchParams) {
      if (!this.form.typeOfCarsSelect) return;

      const marks = setSearchParams(this.form.marksOfCarsSelect, "&marka_id");
      const models = setSearchParams(this.form.modelsOfCarsSelect, "&model_id");
      const states = setSearchParams(this.form.statesSelect, "&state_id");

      const {
        typeOfCarsSelect,
        yearSelectFrom,
        yearSelectTo,
        priceFrom,
        priceTo,
        exchangeTypeSelect,
      } = this.form;

      const { data } = await axios(
        `https://developers.ria.com/auto/search?api_key=${
          this.apiKey
        }&category_id=${typeOfCarsSelect}&s_yers=${
          yearSelectFrom ? yearSelectFrom : ""
        }&po_yers=${
          yearSelectTo ? yearSelectTo : ""
        }${marks}${models}${states}&price_ot=${
          priceFrom ? priceFrom : ""
        }&price_do=${priceTo ? priceTo : ""}&exchangeTypeId=${
          exchangeTypeSelect ? exchangeTypeSelect : 1
        }$with_exchange=1&countpage=50&with_photo=1`
      );
      console.log(data);
    },
    setSearchParams(select, string) {
      let arr = [];
      if (select) {
        select.forEach((item) => {
          item = `${string}=${item}`;
          arr.push(item);
        });
        return (arr = arr.join().replace(/[\s.,%]/g, ""));
      } else {
        return (arr = "");
      }
    },
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
    remove(item, arr) {
      arr.splice(arr.indexOf(item), 1);
      arr = [...arr];
    },
    changed(arr) {
      this.$emit("changed", arr);
    },
    yearsList() {
      let currentYear = new Date().getFullYear();
      for (let year = currentYear - 100; year <= currentYear; year++) {
        this.optionYears.unshift({ name: year, value: year });
      }
    },
    setEdit() {
      this.$store.dispatch("changeEdit");
    },
    async getTypesOfCars() {
      const { data } = await axios(
        `https://developers.ria.com/auto/categories/?api_key=${this.apiKey}`
      );
      this.typeOfCars = data;
      // console.log(this.select);
    },
    async getMarksOfCars() {
      const { data } = await axios(
        `https://developers.ria.com/auto/categories/${this.form.typeOfCarsSelect}/marks?api_key=${this.apiKey}`
      );
      this.marksOfCars = data;
      // console.log("marksOfCarsSelect: ", this.marksOfCarsSelect);
    },
    async getModels() {
      for (let i of this.form.marksOfCarsSelect) {
        const { data } = await axios(
          `http://api.auto.ria.com/categories/${this.form.typeOfCarsSelect}/marks/${i}/models?api_key=${this.apiKey}`
        );
        this.models = data;
      }
      for (let j of this.models) {
        this.modelsOfCars.push(j);
      }
      // console.log('modelsOfCars: ', this.modelsOfCars);
    },
    async getStates() {
      const { data } = await axios(
        `https://developers.ria.com/auto/states?api_key=${this.apiKey}`
      );
      // console.log(data);
      this.states = data;
    },
  },
  beforeMount() {
    console.log(this.getAutoRiaId);
    this.getTypesOfCars();
    this.yearsList();
    this.getStates();
    if (this.getAutoRiaId) {
      this.$store.dispatch("fetchMyCars");
    }
  },
};
</script>

<style lang="scss">
.exchange-title {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 36px;
  line-height: 42px;
  color: #2c5282;
  padding-bottom: 50px;
  position: relative;
}
.inputLabel {
  display: flex;
  justify-content: flex-start;
  color: #2a4365;
}
.cars-list {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 404px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 28px;
  padding: 0 20px;
  &__car {
    margin-bottom: 16px;
  }
}
.cars-wrapper {
  width: 100%;
  overflow-y: auto;
  max-height: 340px;
  margin-bottom: 0 !important;
  margin-top: 14px;
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

.mobile-cars__wrapper {
  @media (max-width: 1260px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
// .theme--light.v-text-field > .v-input__control > .v-input__slot:before {
//   border-image: repeating-linear-gradient(
//       90deg,
//       rgba(0, 0, 0, 0.38) 0,
//       rgba(0, 0, 0, 0.38) 2px,
//       transparent 0,
//       transparent 4px
//     )
//     1 repeat;
// }
.cmt {
  margin-top: 10px;
}
.send-btn {
  margin-top: 34px;
  width: 100%;
  text-decoration: none !important;
  text-transform: capitalize !important;
  font-size: 14px !important;
  height: 48px !important;
  background: linear-gradient(180deg, #f2994a 0%, #ff7a7a 100%);
  border-radius: 13.617px !important;
}
.theme--light.v-input--is-disabled,
.theme--light.v-input--is-disabled input,
.theme--light.v-input--is-disabled textarea {
  color: #000 !important;
}

.trans {
  // transform: scale(1) perspective(1040px) rotateY(-11deg) rotateX(2deg)
  //   rotate(2deg);
  border-radius: 28px !important;
}
// .profile-form {
//   padding: 50px 20px 10px 20px;
//   box-shadow: 0 0 2rem 0 rgba(136, 152, 170, 0.25) !important;
// }
.autoRiaButton {
  background: linear-gradient(180deg, #f2994a 0%, #ff7a7a 100%);
  text-decoration: none !important;
  text-transform: capitalize !important;
}
.form-divider {
  &::after {
    content: "";
    position: absolute;
    top: 90px;
    left: 0;
    width: 100%;
    background: linear-gradient(180deg, #f2994a 0%, #ff7a7a 100%);
    width: 100%;
    height: 1px;
    opacity: 0.3;
    @media (max-width: 390px) {
      top: 140px;
    }
  }
}
.mobile-exchange--wrapper {
  margin-top: 80px;
}
</style>
