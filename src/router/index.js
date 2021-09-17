import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import ML_CAGR_Return from "../views/ML_CAGR_Return";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "ML_CAGR_Return",
    component: ML_CAGR_Return,
  },
  {
    path: "/about",
    name: "about",
    component: Home
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
