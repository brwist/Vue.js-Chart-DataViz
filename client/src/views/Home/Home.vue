<template>
  <Fragment>
    <!-- bottom padding 48px because of fixed footer -->
    <v-container fluid class="pl-6 pr-6 pt-6 pb-12">
      <v-row>
        <v-col :xs="12">Here goes the content</v-col>
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

<style>
</style>