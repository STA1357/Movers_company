/** @format */

import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Cabinet from "../components/Cabinet.vue";
import Exchange from "../components/Exchange.vue";
import Account from "../components/Account.vue";
import Vehicle from "../components/Vehicle.vue";
import Users from "../components/Users.vue";
import User from "../components/User.vue";
import AddUser from "../components/AddUser.vue";
import Profile from "../components/Profile.vue";
import EditProfile from "../components/EditProfile.vue";
import Admin from "../pages/Admin.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/login",
      name: "LogIn",
      component: Login,
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
    },
    {
      path: "/admin",
      name: "Admin",
      component: Admin,
      redirect: "/admin/exchange",
      children: [
        {
          path: "cabinet",
          name: "Cabinet",
          component: Cabinet,
        },
        {
          path: "exchange",
          name: "Exchange",
          component: Exchange,
        },
        {
          path: "profile",
          name: "Profile",
          component: Profile,
          children: [
            {
              path: "edit",
              name: "EditProfile",
              component: EditProfile,
            },
          ],
        },
        {
          path: "account",
          name: "Account",
          component: Account,
        },
        {
          path: "vehicle",
          name: "Vehicle",
          component: Vehicle,
        },
        {
          path: "users",
          name: "Users",
          component: Users,
        },
        {
          path: "add",
          name: "AddUser",
          component: AddUser,
        },
        {
          path: ":id",
          name: "User",
          component: User,
        },
      ],
    },
  ],
});

export default router;
