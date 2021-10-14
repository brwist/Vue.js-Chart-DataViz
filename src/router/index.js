import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Library from "../views/Library";
import ReturnComparison from "../library/AAA/ReturnComparison/ReturnComparison";
import HomeUsefulLinks from "../views/HomeUsefulLinks";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    redirect: {name: "Library"},
    children: [
      {
        path: "/resources",
        name: "Resources",
        component: HomeUsefulLinks,
      },
      {
        path: "/library",
        name: "Library",
        component: Library,
      },

        // Example
        // Add a project routes as a child of Home component.
      {
        // format path: library/project/{{projectID}}/{{projectContainerName}}
        path: "library/project/AAA/ReturnComparison",

        // format name: {{projectID}}
        name: "AAA",

        // format component: {{Semantic name given to component}}.
        // Component must match the name
        component: ReturnComparison,
      }
    ]
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
