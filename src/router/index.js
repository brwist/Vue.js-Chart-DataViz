import Vue from "vue";
import VueRouter from "vue-router";
import Library from "../views/Library";
import ReturnComparison from "../projectLibrary/AAA/ReturnComparison/ReturnComparison";
import OverlappingHistograms from "../projectLibrary/AAD/OverlappingHistograms/OverlappingHistograms";
import LibraryContainer from "../views/LibraryContainer";
import Projects from "../views/Projects";


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
      {
        path: "projects",
        name: "Projects",
        component: Projects,
        children: [
          {
            // Path Format: {{projectID}}/{{containerComponent}}
            path: "AAA/return-comparison",
            // Name Format: {{projectID}}
            name: "AAA",
            // Component Format: {{containerComponent}}
            component: ReturnComparison,
          },
          {
            path: "AAD/overlapping-histograms",
            name: "AAD",
            component: OverlappingHistograms,
          },
        ]
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

