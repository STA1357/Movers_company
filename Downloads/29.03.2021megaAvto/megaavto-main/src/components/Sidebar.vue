<!-- @format -->

<template>
  <div :class="!getSidebar ? 'sidebar mobile-sidebar' : 'sidebar'">
    <v-card class="sidebar_card d-flex flex-column" elevation="0">
      <div class="sidebar-user__mobile">
        <v-img
          class="navbar-user-img mt-4"
          lazy-src="https://picsum.photos/id/11/10/6"
          max-height="60"
          max-width="60"
          width="60"
          height="60"
          :src="getUser.image"
        ></v-img>
        <div class="user-name-navbar">
          {{ getUser.first_name + " " + getUser.last_name }}
        </div>
      </div>

      <v-btn
        depressed
        :ripple="false"
        @click="openSidebar"
        color="#EF9E30"
        class="white--text close-sidebar"
        ><v-icon>mdi-close</v-icon></v-btn
      >
      <v-list nav dense class="sidebar-list mt-4   ">
        <v-btn
          depressed
          :ripple="false"
          plain
          outlined
          color="#2C5282"
          class="  link-btn mt-3"
          active-class="active-link-btn"
          to="/admin/Cabinet"
        >
          <img src="../assets/icons/home.png" alt="" />
          Кабинет</v-btn
        >
        <v-btn
          depressed
          :ripple="false"
          plain
          outlined
          color="#2C5282"
          class="  link-btn mt-3"
          active-class="active-link-btn"
          to="/admin/exchange"
        >
          <img src="../assets/icons/file-plus.png" alt="" />
          Обмен</v-btn
        >

        <v-btn
          depressed
          :ripple="false"
          plain
          outlined
          color="#2C5282"
          class="  link-btn mt-3"
          active-class="active-link-btn"
          to="/admin/account"
        >
          <img src="../assets/icons/coffee.png" alt="" />
          Улучшить план</v-btn
        >

        <v-btn
          v-if="isAdmin"
          depressed
          :ripple="false"
          plain
          outlined
          color="#2C5282"
          class="  link-btn mt-3"
          active-class="active-link-btn"
          to="/admin/users"
        >
          <img src="../assets/icons/users.png" alt="" />
          Пользователи</v-btn
        >
<!--        <v-btn-->
<!--          v-if="isAdmin"-->
<!--          depressed-->
<!--          :ripple="false"-->
<!--          plain-->
<!--          outlined-->
<!--          color="#2C5282"-->
<!--          class=" link-btn mt-3"-->
<!--          active-class="active-link-btn"-->
<!--          to="/admin/add"-->
<!--        >-->
<!--          <img src="../assets/icons/users.png" alt="" />-->

<!--          Новый аккаунт</v-btn-->
<!--        >-->
        <v-btn
          depressed
          :ripple="false"
          plain
          color="#2C5282"
          class="link-btn mt-3 mobile-sidebar__btn"
          active-class="active-link-btn"
          to="/admin/profile"
          ><img src="../assets/icons/users.png" alt="" /> Профиль</v-btn
        >
        <v-btn
          depressed
          plain
          :ripple="false"
          class="  link-btn mt-3 mobile-sidebar__btn"
          active-class="active-link-btn"
          color="#2C5282"
          @click="logout"
          ><img src="../assets/icons/users.png" alt="" />Выход</v-btn
        >
      </v-list>
      <UpdateToPremium />
    </v-card>

  </div>
</template>

<script>
import UpdateToPremium from "./UpdateToPremium";
export default {
  components: {
    UpdateToPremium,
  },
  data: () => ({
    // items: [
    //   {
    //     text: "Обмен",
    //     icon: "../assets/icons/file-plus.png",
    //     link: "exchange",
    //   },
    //   { text: "Профиль", icon: "", link: "profile" },
    //   { text: "Мой счёт", icon: "../assets/icons/coffee.png", link: "account" },
    //   { text: "Мои авто", icon: "", link: "vehicle" },
    // ],
  }),
  computed: {
    getUser() {
      return this.$store.getters.getUser;
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
    getSidebar() {
      return this.$store.getters.getSidebar;
    },
  },
  methods: {
    openSidebar() {
      this.$store.dispatch("changeSidebar");
    },
    async logout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    },
  },
  // mounted() {
  //   console.log(this.items.icon);
  // },
};
</script>

<style lang="scss" scoped>
.sidebar-user__mobile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  @media (min-width: 960px) {
    display: none;
  }
}
.mobile-sidebar__btn {
  @media (min-width: 960px) {
    display: none !important;
  }
}
.user-name-navbar {
  display: flex;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  color: #2c5282;
  padding-right: 20px;
  padding-top: 15px;
}
.navbar-user-img {
  border: 5px solid #f2994a;
  border-radius: 50%;
}
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 250px;
  background: rgba(245, 245, 245, 0.9) !important;
  z-index: 300;
  transition: all 1s;
  @media screen and(max-width: 960px) {
    left: auto;
    right: 0;
    transform: translateX(270px);
    box-shadow: 0 0 10px 0 rgba(136, 152, 170, 0.25) !important;
    z-index: 300;
  }
  &.mobile-sidebar {
    transform: translateX(0);
  }
}
.sidebar {
  & a {
    display: block;
    width: 100%;
    color: #000;
    text-decoration: none;
    // &.router-link-exact-active {
    //   color: #f69e30;
    //   text-decoration: none;
    // }
  }
}
.sidebar_card {
  position: relative;
  padding-top: 20px;
  width: 100%;
  height: 100%;
  z-index: 99;
  padding-top: 50px;
  background: #f3f3f3 !important;
}
.sidebar-list {
  background: #f3f3f3 !important;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.link-btn {
  display: flex;
  justify-content: flex-start;
  font-weight: normal;
  text-transform: capitalize;
  font-size: 14px !important;
  border: 1px black;
  width: 160px !important;
  padding: 0 !important;
  margin-right: 0 !important;
  margin-left: 0 !important;
  &:not(:focus):not(:hover) {
    opacity: 1 !important;
  }
}
.active-link-btn {
  font-weight: 900;
}
img {
  margin-right: 9px;
}
.close-sidebar {
  position: absolute;
  top: 0;
  left: 0;
  @media (min-width: 960px) {
    display: none;
  }
}
</style>
