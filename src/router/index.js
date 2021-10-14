import Vue from "vue";
import VueRouter from "vue-router";
import Library from "../views/Library";
import ReturnComparison from "../library/AAA/ReturnComparison/ReturnComparison";
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
            // format path: {{projectID}}/{{containerComponent}}
            path: "AAA/return-comparison",
            // format name: {{projectID}}
            name: "AAA",
            // format component: {{containerComponent}}
            component: ReturnComparison,
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

