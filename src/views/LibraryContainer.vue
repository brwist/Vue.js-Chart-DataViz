<template>
  <v-container fluid>
    <router-view />
    <popup-container
      v-for="popup in popups"
      :key="popup.projectID"
      :config="popup"
      :title="popup.title || ''"
      :sub-title="popup.subTitle || ''"
    >
      <popup-provider
        :config="popup"
      />
    </popup-container>
  </v-container>
</template>

<script>

import {mapState} from "vuex";
import PopupContainer from "@/components/Popups/PopupContainer";
import PopupProvider from "@/components/Popups/PopupProvider";

export default {
  name: "LibraryContainer",
  components: {
    PopupProvider,
    PopupContainer,
  },
  computed: {
    ...mapState("global", [
      "popups"
    ])
  },
  watch: {
    popups: {
      deep: true,
      handler: function () {
      }
    }
  }
};
</script>

<style>

</style>
