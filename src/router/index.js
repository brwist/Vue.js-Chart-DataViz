import Vue from "vue";
import VueRouter from "vue-router";
import Library from "../views/Library";
import ReturnComparison from "../projectLibrary/AAA/ReturnComparison/ReturnComparison";
import OverlappingHistograms from "../projectLibrary/AAD/OverlappingHistograms/OverlappingHistograms";
import LibraryContainer from "../views/LibraryContainer";
import Projects from "../views/Projects";
import AAB from "@/projectLibrary/AAB/RollingHistograms/AAB";
import AAC from "@/projectLibrary/AAC/OverlappingHistograms/AAC";


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
        component: AAB,
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

