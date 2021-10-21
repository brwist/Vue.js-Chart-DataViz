<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <Header
      :tabs="[]"
      :app-name="'alis_ Component Library'"
    />
    <v-main>
      <!-- bottom padding 48px because of fixed footer -->
      <v-container class="pt-6 pb-12">
        <library-container />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Header from "@/layout/Header";
import LibraryContainer from "./views/LibraryContainer";

export default {
  name: "App",

  components: {
    Header,
    LibraryContainer,
  },
};
</script>
