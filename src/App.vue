<template>
  <v-app v-bind:style="{ background: $vuetify.theme.themes.light.background }">
    <Header :tabs="[]" :appName="'alis_ Component Library'" />
    <v-main>
      <!-- bottom padding 48px because of fixed footer -->
      <v-container class="pt-6 pb-12">
        <home />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Header from "@/layout/Header";
import Home from "./views/Home";


export default {
  name: "App",

  components: {
    Header,
    Home
  },
};
</script>
