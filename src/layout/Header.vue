<template>
  <Fragment>
    <v-app-bar
      dark
      app
      color="secondary"
      clipped-left
      clipped-right
    >
      <!--      <v-app-bar-nav-icon disabled @click.stop="drawer = !drawer" />-->
      <v-toolbar-title @click="routeToView('Home')">
        <v-img
          src="@/assets/logo.gif"
          contain
          width="100"
        />
      </v-toolbar-title>
      <!--      <div-->
      <!--        style="max-width: 320px; width: 100%"-->
      <!--      >-->
      <!--        <header-product-team />-->
      <!--      </div>-->
      <v-spacer />
      <v-btn
        class="font-weight-regular"
        text
        @click="routeToView('Library')"
      >
        Component Library
      </v-btn>
      <!--      <v-btn-->
      <!--          class="font-weight-regular"-->
      <!--          text-->
      <!--          @click="routeToView('UsefulLinks')"-->
      <!--      >-->
      <!--        Useful Links-->
      <!--      </v-btn>-->
    </v-app-bar>
  </Fragment>
</template>

<script>
import { Fragment } from "vue-fragment";
import RoutingHandler  from "../utils/routingHandler.mixin";


export default {
  name: "Header",
  components: {
    Fragment,
  },
  mixins:[RoutingHandler],
};
</script>

<style>
html {
  overflow-y: auto !important;
}
</style>
