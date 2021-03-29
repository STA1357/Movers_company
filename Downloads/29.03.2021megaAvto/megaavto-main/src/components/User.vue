<!-- @format -->

<template>
  <div class="user-wrapper">
    <v-col
      cols="12"
      class="user_card  d-flex justify-content-between align-items-center "
      v-if="!user.isAdmin"
    >
      <div class="user-name d-flex w-100  align-center pl-3">
        <v-img
          class="exchange-user-img mr-2"
          lazy-src="https://picsum.photos/id/11/10/6"
          max-height="38"
          max-width="38"
          width="38"
          height="38"
          :src="user.image"
        ></v-img>
        <p>{{ user.first_name }} <br/>{{ user.last_name }}</p>
      </div>
      <p class="user-email">{{ user.email }}</p>
      <p class="user-plan">PRO PLAN</p>
      <p class="usersRegDate">
        {{ this.$moment(user.createdAt).format("DD/MM/YYYY") }}
      </p>
      <p class="usersBalance">{{ user.balance }}</p>
      <div class="edit-user w-100 justify-center">
        <v-btn
          depressed
          color="#0B4870"
          :ripple="false"
          class="user-edit-btn"
          @click="openList"
          ><img src="../assets/icons/pen-tool.svg" class="mr-1" />
          Редактировать</v-btn
        >
        <v-btn
          depressed
          :ripple="false"
          color="#EA5455"
          class="user-delete-btn white--text ml-1"
          @click="deleteUser(user._id)"
          ><v-icon>mdi-delete</v-icon></v-btn
        >
      </div>
    </v-col>
    <UserList v-if="!user.isAdmin" :isOpen="isOpen" :user="user" />
  </div>
</template>

<script>
// import Car from "./Car";
import UserList from "./UserList";
export default {
  name: "User",
  data() {
    return {
      isOpen: false,
    };
  },
  components: {
    // Car,
    UserList,
  },
  computed: {
    adminUser() {
      return this.$store.getters.getAdminPageUser;
    },
    getAdminUserCars() {
      return this.$store.getters.getAdminUserCars;
    },
    getUser() {
      return this.$store.getters.getUser;
    },
  },
  methods: {
    async deleteUser(id) {
      await this.$store.dispatch("deleteUser", { _id: id });
      // this.$router.push("/admin/users");
    },
    // async fetchAdminUser() {
    //   await this.$store.dispatch("findUser", { id: this.$route.params.id });
    // },
    // async fetchAdminUserCars() {
    //   await this.$store.dispatch("fetchAdminUserCars", {
    //     id: this.adminUser.autoRiaId,
    //   });
    // },
    openList() {
      this.isOpen = !this.isOpen;
    },
  },
  beforeMount() {
    // this.fetchAdminUser();
    // console.log(this.adminUser.autoRiaId);
    // if (this.adminUser.autoRiaId) {
    //   this.fetchAdminUserCars();
    // }
  },
  props: {
    user: Object,
  },
};
</script>

<style lang="scss" scoped>
.user-email{
  display: flex;
  width: 100%;
  justify-content: center;
}
.usersRegDate{
  display: flex;
  width: 100%;
  justify-content: center;
}
.user-plan{
  width: 100%;
  justify-content: center;
}
.user_card {
  background: #f5f5f5 !important;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25) !important;
  border-radius: 42px !important;
  height: 69px;
  max-height: 100px !important;
  cursor: pointer;
  padding: 10px;
  list-style-type: none;
  // margin-bottom: 16px;
  position: relative;
  z-index: 10;
  p {
    margin: 0 !important;
  }
}
.usersBalance{
  justify-content: center;
  width: 100%;
}
.exchange-user-img {
  border-radius: 50%;
  border: 3px solid #f2994a;
}
.user-edit-btn {
  padding: 10px 0 !important;
  width: 129px !important;
  background: #0b4870 !important;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25) !important;
  border-radius: 12px !important;
  font-family: Roboto !important;
  font-style: normal !important;
  font-weight: bold !important;
  font-size: 11px !important;
  color: #ffffff !important;
  text-transform: capitalize;
}
.user-delete-btn {
  width: 32px !important;
  height: 32px !important;
  border-radius: 50% !important;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 0 !important;
  min-width: 0px !important;
}
@media screen and (max-width: 960px){
  .user_card{
    height: 100px;
  }
  .user-email{
    display: none !important;
  }
  .usersRegDate{
    display: none;
  }
  .usersBalance{
    display: none;
  }
  .user-plan{
    padding-left: 25px;
  }
  .user-edit-btn{
    display: none;
  }
}
</style>
