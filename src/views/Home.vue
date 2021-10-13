<template>
  <Fragment>
    <v-row class="text-center">
      <v-col cols="12"> 
        <h3>
        Welcome to the alis_ Vue App Project Template. It is a vue app powered by vuetify.
        </h3>
      </v-col>
    </v-row>
    <home-useful-links />
  </Fragment>
</template>

<script>
import { Fragment } from "vue-fragment";
import HomeUsefulLinks from "@/views/HomeUsefulLinks";

export default {
  name: "Home",

  components: {
    HomeUsefulLinks,
    Fragment,
  },

  data() {
    return {};
  },
};
</script>

<style></style>
