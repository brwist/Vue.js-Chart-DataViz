import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import ML_CAGR_Return from "@/components/giorgi/cagrReturnComparisonLineChart/ML_CAGR_Return";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/ML_CAGR_Return",
    name: "ML_CAGR_Return",
    component: ML_CAGR_Return,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
