<!-- @format -->

<template>
  <div class="content-admin">
    <v-col
      v-if="!getAutoRiaId"
      cols="12"
      md="8"
      class="d-flex justify-content-center"
    >
      <form elevation="0" class="autoria-login-form">
        <v-text-field
          solo
          v-model="autoRiaId"
          label="Auto Ria Id"
          required
          elevation="0"
        ></v-text-field>
        <v-btn
          @click="setAutoRiaCredentials"
          depressed
          :ripple="false"
          color="#F69E30"
          class="white--text"
          >Вход</v-btn
        >
      </form>
    </v-col>
    <v-col v-if="getAutoRiaId" cols="12">
      <h1>Мои автомобили</h1>
      <v-row v-if="getAutoRiaId">
        <v-col cols="12" md="6" v-for="(userCar, i) in userCars" :key="i">
          <Car
            :userCar="userCar"
            :carSpecs="true"
            @selected="selectedCar"
            :index="i"
          />
        </v-col>
      </v-row>
    </v-col>
  </div>
</template>

<script>
import Car from "./Car";

export default {
  name: "Vehicle",
  components: {
    Car,
  },
  data() {
    return {
      autoRiaId: "",
    };
  },
  computed: {
    userCars() {
      return this.$store.getters.getMyCars;
    },
    getAutoRiaId() {
      return this.$store.getters.getAutoRiaId;
    },
  },
  methods: {
    selectedCar(data) {
      console.log(data);
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
  },
};
</script>

<style lang="scss" scoped>
.autoria-login-form {
  padding: 10px 20px;
  background-color: #fff !important;
  box-shadow: 0 0 2rem 0 rgba(136, 152, 170, 0.25) !important;
  width: 100%;
}
// .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
//   > .v-input__control
//   > .v-input__slot {
//   box-shadow: none !important;
// }
// .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
//   > .v-input__control
//   > .v-input__slot {
//   // box-shadow: 0 0 2rem 0 rgba(136, 152, 170, 0.25) !important;
//   box-shadow: none !important;
// }
</style>
