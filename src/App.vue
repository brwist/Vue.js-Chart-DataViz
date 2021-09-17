<template>
  <v-app v-bind:style="{ background: $vuetify.theme.themes.light.background }">
    <Header :tabs="[]" :appName="'Vue App Template'" />
    <v-main>
      <!-- bottom padding 48px because of fixed footer -->
      <v-container class="pl-6 pr-6 pt-6 pb-12">
        <router-view></router-view>
      </v-container>
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
