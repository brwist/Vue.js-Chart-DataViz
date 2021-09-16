<template>
  <v-footer app fixed>
    <span class="caption">
      alis_ Technologies &copy; {{ new Date().getFullYear() }}
    </span>
    <v-spacer></v-spacer>
    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          x-small
          color="secondaryDark"
          dark
          v-bind="attrs"
          v-on="on"
          @click="issueTrackerClick"
          :disabled="loading"
          :loading="loading"
        >
          Log a Bug / Request a Feature
          <template v-slot:loader>
            <span>Generating Asana ticket...</span>
          </template>
        </v-btn>
      </template>
      <span
        >Clicking on this link will create an Asana task, add you as a
        collaborator and then redirect you to Asana to edit the details of the
        bug/request.</span
      >
    </v-tooltip>
    <v-spacer></v-spacer>
    <span class="caption">version: {{ version }}</span>
  </v-footer>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Footer",
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapState({
      version: (state) => state.version,
    }),
  },
  methods: {
    ...mapActions(["loadVersion", "getIssueRequestUrl"]),
    issueTrackerClick() {
      // this.loading = true;
      // this.getIssueRequestUrl().then((url) => {
      //   if (url) {
      //     this.loading = false;
      //     window.open(url, "_blank");
      //   }
      // });
    },
  },
  // created() {
  //   this.loadVersion();
  // },
};
</script>

<style></style>
