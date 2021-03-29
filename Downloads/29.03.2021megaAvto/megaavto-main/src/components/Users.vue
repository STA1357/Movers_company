<!-- @format -->

<template>
  <div class="content-admin">
    <v-col cols="12">
      <div class="users-bg">
        <v-row
          class="users-search d-flex justify-content-between align-items-center mt-1"
          ><v-col cols="12" md="6">
            <v-text-field solo label="Поиск" v-model="search"></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="6"
            class="users-filter d-flex justify-content-between align-items-center"
          >
            <p class="filter-p">Фильтр</p>

            <v-btn
              v-for="[label, className, func, i] in buttons"
              :key="i"
              depressed
              plain
              :ripple="false"
              color="#2C5282"
              class="filter-btn"
              :class="activeClass === className ? `${className}` : ''"
              @click="setActiveClass(className, func)"
              @
            >
              {{ label }}
            </v-btn>
          </v-col></v-row
        >
        <v-col
          cols="12"
          class="users-parameters"
        >
          <p class="users-parameters-p">Пользователь</p>
          <p class="users-parameters-p">Email</p>
          <p class="users-parameters-p">Статус</p>
          <p class="users-parameters-p">Дата</p>
          <p class="users-parameters-p">Баланс</p>
          <span class="myComponentOne">
            <MyComponent />
          </span>
        </v-col>
        <div class="users-cards__wrapper">
          <User v-for="(user, i) in SearchInUsers" :key="i" :user="user" />
        </div>
      </div>
    </v-col>
    <span class="myComponentTwo">
            <MyComponent />
          </span>
  </div>
</template>

<script>
import User from "./User";
import MyComponent from "./MyComponent";

export default {
  name: "Users",
  components: {
    User,
    MyComponent,
  },
  data() {
    return {
      activeClass: "",
      buttons: [
        ["Статус", "filter-btn-active-1", this.sortByAlphabet],
        ["Баланс", "filter-btn-active-2", this.sortByBalance],
        ["A-Z", "filter-btn-active-3", this.sortByAlphabet],
        ["Дата", "filter-btn-active-4", this.sortByDate],
      ],
      search: "",
    };
  },
  computed: {
    SearchInUsers() {
      let obj = this.$store.getters.getAllUsers;
      let newArray = [];
      const search = this.search.toLowerCase();

      for (let key in obj) {
        let el = obj[key];
        if (
          (el.first_name.toLowerCase().indexOf(search) != -1 &&
            el.first_name !== "") ||
          (el.email.toLowerCase().indexOf(search) != -1 && el.email !== "")
        )
          newArray.push(el);
      }
      return newArray;
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
  },
  methods: {
    sortByDate() {
      console.log(1);
      this.SearchInUsers.sort((a, b) => {
        if (a.createdAt > b.createdAt) {
          return -1;
        }
        if (a.createdAt < b.createdAt) {
          return 1;
        }
        return 0;
      });
    },
    sortByAlphabet() {
      console.log(2);
      this.SearchInUsers.sort((a, b) => {
        if (a.first_name < b.first_name) {
          return -1;
        }
        if (a.first_name > b.first_name) {
          return 1;
        }
        return 0;
      });
    },
    sortByBalance() {
      console.log(3);
      this.SearchInUsers.sort((a, b) => {
        if (a.balance < b.balance) {
          return -1;
        }
        if (a.balance > b.balance) {
          return 1;
        }
        return 0;
      });
    },
    // sortByStatus() {
    //   console.log(4);
    //   this.SearchInUsers.sort((a, b) => {
    //     if (a.status < b.status) {
    //       return -1;
    //     }
    //     if (a.status > b.status) {
    //       return 1;
    //     }
    //     return 0;
    //   });
    // },
    async fetchUsers() {
      await this.$store.dispatch("allUsers");
    },
    userHandler(id) {
      this.$router.push(`/admin/${id}`);
    },
    setActiveClass(className, callback) {
      this.activeClass = className;
      callback();
    },
  },
  beforeMount() {
    this.fetchUsers();
    if (!this.isAdmin) {
      this.$router.push("/admin");
    }
  },
};
</script>

<style lang="scss">
//d-flex justify-content-between align-items-center w-100
.users-parameters{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.users-search {
  padding: 0 20px;
}
.myComponentTwo{
  display: none;
}
.users-filter {
  p {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    color: #2d9cdb;
    margin: 0 !important;
    padding: 0;
  }
}
.filter-btn {
  // box-sizing: border-box !important;
  border-radius: 50px !important;
  height: 24px !important;
  text-transform: capitalize !important;
  opacity: 1 !important;
  border: 1px solid #2c5282 !important;
  &:hover {
    text-transform: capitalize !important;
  }
  &-active-1,
  &-active-2,
  &-active-3,
  &-active-4 {
    color: #fff !important;
    text-transform: capitalize !important;
    background-color: #2c5282 !important;
  }
}
.add-btn {
  width: 142px !important;
  height: 42px !important;
  border-radius: 5px !important;
  font-family: Roboto !important;
  font-style: normal !important;
  font-weight: bold !important;
  font-size: 16px !important;
  text-transform: capitalize !important;
}
.users-parameters {
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 20px 40px 50px 40px !important;
  p {
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
    color: #2c5282;
    margin: 0 !important;
  }
}
.delete_user {
  cursor: pointer;
  position: relative;
  z-index: 100;
}

.users-bg {
  width: 100%;
  height: 792px;
  padding: 20px 0px 10px 0px;
  background: #fff;
  box-shadow: 0px 4px 4px rgb(0 0 0 / 25%) !important;
  border-radius: 18px;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    top: 185px;
    left: 0;
    width: 100%;
    height: 1px;
    background: #ea5455;
  }
}
.users-cards__wrapper {
  overflow-y: auto;
  max-height: 550px;
  width: 100%;
  padding: 0 20px;
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
@media screen and (max-width: 960px){
.content-admin{
  margin: 50px 0;
}
.users-filter{
  display: flex !important;
  flex-direction: row;
}
.filter-btn{
  display: none !important;
}
.filter-p{
  display: none;
}
.users-parameters{
  display: none ;
}
.users-parameters-p{
  display: none !important;
  margin: 0;
}
.myComponentOne{
  display: none;
}
.myComponentTwo {
  display: block;
  position: absolute;
  margin-top: 25px;
}
.users-bg{
  margin-top: 70px;
  height: 658px;
}
  .users-bg {
    &::after {
      content: "";
      position: absolute;
      top: 185px;
      left: 0;
      width: 100%;
      height: 1px;
      background: none;
    }
  }
}
</style>
