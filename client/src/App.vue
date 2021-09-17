<template>
  <v-app v-bind:style="{ background: $vuetify.theme.themes.light.background }">
    <Header :tabs="tabs" :appName="'Vue App Template'" />
    <v-main>
      <router-view></router-view>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";

export default {
  name: "App",

  components: {
    Header,
    Footer,
  },
};
</script>
