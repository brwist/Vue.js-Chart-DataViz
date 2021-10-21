<template>
  <v-container fluid>
    <v-row
      class="pb-1"
      style="min-width: 500px"
    >
      <v-text-field
        v-model="filters.search"
        label="Search Components"
        single-line
        hide-details
        class="ml-3 mb-8"
        style="max-width: 280px"
      >
        <template v-slot:prepend-inner>
          <v-icon left>
            search
          </v-icon>
        </template>
      </v-text-field>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-data-table
          dense
          fixed-header
          :headers="headers"
          :items="projects"
          :group-by="groupBy"
          item-key="name"
          hide-default-footer
          :items-per-page="-1"
          class="elevation-1"
          multi-sort
          :height="tableHeight"
          :search="filters.search"
        >
          <template v-slot:[`item.more`]="{ item }">
            <v-btn
              icon
              size="sm"
              :class="getMoreClass(item.projectID)"
              @click="onMoreClick(item)"
            >
              <v-icon small>
                navigate_next
              </v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import RoutingHandler from "../utils/routingHandler.mixin";
export default {
  name: "Library",
  mixins: [RoutingHandler],
  data() {
    return {
      filters: {
        search: '',
        state: [],
      },
      windowHeight: window.innerHeight,
      selected: [],
      headers: [
        {text: "Project ID", value: "projectID", align: 'start', sortable: false},
        {text: "Container Component Name", value: "containerComponentName", align: 'start', sortable: false},
        {text: "Project Description", value: "projectDescription", align: 'start', sortable: false},
        {text: "Project Category", value: 'projectCategory', align: 'start', sortable: false,},
        {text: "Route to Component", value: 'more', align: 'center', sortable: false,},
        {text: "Developer Name", value: "developerName", align: 'start', sortable: false},
        {text: "Developer Email", value: "developerEmail", align: 'start', sortable: false},
        {text: "Github Profile", value: "developerGithub", align: 'start', sortable: false},
        {text: "Linkedin Profile", value: "developerLinkedin", align: 'start', sortable: false},
        {text: "Dev Time", value: 'devTime', align: 'start', sortable: false,},
        {text: "Comments", value: 'comments', align: 'start', sortable: false,},
      ],
      projects: [
        {
          projectID: "AAA",
          containerComponentName: "ReturnComparison",
          developerName: "Giorgi Ghviniashvili ",
          developerEmail: "mr.g.ghv@gmail.com",
          developerGithub: "https://github.com/giorgi-ghviniashvili",
          developerLinkedin: "https://www.linkedin.com/in/giorgi-ghviniashvili/",
          projectDescription: "Line chart for comparing return series",
          projectCategory: "chart",
          devTime: "3 hours",
          comments: "",
        },
        {
          projectID: "AAD",
          containerComponentName: "OverlappingHistograms",
          developerName: "Giorgi Ghviniashvili ",
          developerEmail: "mr.g.ghv@gmail.com",
          developerGithub: "https://github.com/giorgi-ghviniashvili",
          developerLinkedin: "https://www.linkedin.com/in/giorgi-ghviniashvili/",
          projectDescription: "Overlapping Histograms",
          projectCategory: "chart",
          devTime: "3 hours",
          comments: "",
        },
      ],
    };
  },
  computed: {
    groupBy() {
      if (this.projects.length) {
        return 'name';
      } else {
        return null;
      }
    },
    tableHeight() {
      return this.windowHeight - 206;
    },
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.windowHeight = window.innerHeight;
    });
  },
  methods: {
    getMoreClass(id) {
      const selected = this.selected.some(d => d.id === id);
      return `more-btn ${selected ? 'selected-row' : ''}`;
    },
    onMoreClick(item) {
      this.routeToView(item.projectID);
    },
  },
};
</script>

<style scoped>

</style>
