<template>
  <Fragment>
    <!-- bottom padding 48px because of fixed footer -->
    <v-container fluid class="pl-6 pr-6 pt-6 pb-12">
      <v-row class="text-center">
        <v-col cols="12"> 
          <h3>
          Welcome to the alis_ Vue App Project Template. It is a vue app powered by vuetify.
          <br> You can find examples and documentation on our way of working at /components/HelloWorld.vue.
          </h3>
        </v-col>
      </v-row>
      <HelloWorld></HelloWorld>
    </v-container>
  </Fragment>
</template>

<script>
import { Fragment } from "vue-fragment";
import HelloWorld from "@/components/HelloWorld";

export default {
  name: "Home",

  components: {
    HelloWorld,
    Fragment,
  },

  data() {
    return {};
  },
};
</script>

<style></style>
