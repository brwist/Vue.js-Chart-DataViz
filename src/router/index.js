import Vue from "vue";
import VueRouter from "vue-router";
import Library from "../views/Library";
import LibraryContainer from "../views/LibraryContainer";
import SectorContributionComparison from "@/projectLibrary/AAF/SectorContributionComparison";


Vue.use(VueRouter);

const routes = [

  {
    path: "/",
    name: "LibraryContainer",
    redirect: {name: "Library"},
    component: LibraryContainer,
    children: [
      {
        path: "/library",
        name: "Library",
        component: Library,
      },
      //add your component to this dev path when you are working on a component
      {
        path: "/dev",
        name: "ComponentDevView",
        component: SectorContributionComparison,
      },
    ]
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

