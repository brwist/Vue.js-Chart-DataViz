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

        // Example project route
        // Add a project route as a child of the Home component.
      {
        // Path format: library/project/{{projectID}}/{{projectContainerComponentName}}
        path: "library/project/AAA/ReturnComparison",

        // Name format: {{projectID}}
        name: "AAA",

        // Component format: {{Semantic name given to your main container component}}.
        // Component must match the name
        component: ReturnComparison,
      }
    //  ------> Add your new project's route here
    ]
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
