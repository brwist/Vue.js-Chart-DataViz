<template>
  <Fragment>
    <!-- bottom padding 48px because of fixed footer -->
    <v-container fluid class="pl-6 pr-6 pt-6 pb-12">
      <v-row class="text-center">
        <v-col cols="12"> 
          <h3>
          Welcome to alis project template. It is a vue app powered by vuetify.
          <br> You can find /components/HelloWorld.vue for some examples.
          </h3>
        </v-col>
      </v-row>
    </v-container>
  </Fragment>
</template>

<script>
import { Fragment } from "vue-fragment";

export default {
  name: "Home",

  components: {
    Fragment,
  },

  data() {
    return {};
  },
};
</script>

<style></style>
