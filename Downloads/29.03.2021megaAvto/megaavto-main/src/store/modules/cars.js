/** @format */

import axios from "axios";

export default {
  state: {
    loading: false,
    products: JSON.parse(localStorage.getItem("products")) || [],
    myCars: JSON.parse(localStorage.getItem("myCars")) || [],
    _API_KEY: "7SOvB6WswjByVG5cZQ05yhHJYOnp3jcZR2NeRlw0",
    userCars: JSON.parse(localStorage.getItem("userCars")) || [],
  },
  mutations: {
    cars_request(state) {
      state.loading = true;
    },
    async cars_request_success(state, allCars) {
      state.loading = false;
      state.myCars = allCars;
    },
    async user_cars_request_success(state, userCars) {
      state.loading = false;
      state.userCars = await userCars;
    },
    set_autoria_credentials(state, credentials) {
      state.loading = false;
      state.autoRiaCredentials = credentials;
    },
    cars_request_error(state) {
      state.loading = false;
    },
  },
  actions: {
    async fetchMyCars({ commit, state, rootState }) {
      try {
        if (state.myCars.length !== 0) return;

        console.log("fetch cars");
        commit("cars_request");
        const { data } = await axios(
          `https://developers.ria.com/auto/used/autos/ids?user_id=${rootState.users.user.autoRiaId}&api_key=${state._API_KEY}`
        );
        const allCars = [];

        for (let i of data.active.moderated) {
          const { data: myCar } = await axios(
            `https://developers.ria.com/auto/info?api_key=${state._API_KEY}&auto_id=${i}`
          );
          allCars.push(myCar);
        }
        commit("cars_request_success", allCars);

        localStorage.setItem("myCars", JSON.stringify(state.myCars));
      } catch (e) {
        console.log(e);
        localStorage.removeItem("credentials");
        commit("cars_request_error");
      }
    },
    async fetchAdminUserCars({ commit, state }, body) {
      commit("cars_request");
      const { data } = await axios(
        `https://developers.ria.com/auto/used/autos/ids?user_id=${body.id}&api_key=${state._API_KEY}`
      );
      const userCars = [];

      for (let car of data.active.moderated) {
        const { data: myCar } = await axios(
          `https://developers.ria.com/auto/info?api_key=${state._API_KEY}&auto_id=${car}`
        );
        userCars.push(myCar);
      }
      commit("user_cars_request_success", userCars);

      localStorage.setItem("userCars", JSON.stringify(state.userCars));
    },
  },
  getters: {
    getProducts: (state) => state.products,
    getMyCars: (state) => state.myCars,
    getAdminUserCars: (state) => state.userCars,
    getApiKey: (state) => state._API_KEY,
  },
};
