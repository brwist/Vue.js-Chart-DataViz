import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import ReturnComparison from "@/library/AAA/ReturnComparison/ReturnComparison";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/ML_CAGR_Return",
    name: "AAA",
    component: ReturnComparison,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
