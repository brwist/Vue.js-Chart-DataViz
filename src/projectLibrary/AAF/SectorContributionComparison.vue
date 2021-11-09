<template>
  <v-card
    :loading="loading"
    class="rounded-0"
    width="100%"
    height="100%"
  >
    <v-card-text>
      <v-container>
        <v-row>
          <v-col>
            <div
              class="line-chart"
              :style="`height: ${chartHeight}px; width: 100%;`"
            />
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col
            v-for="b in zoomBtns"
            :key="b.label"
            class="align"
          >
            <v-btn
              fab
              small
              @click="zoomToDates(b)"
            >
              {{ b.label }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>

import testData from "./testingData/BatchContributionSector.json";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import moment from "moment";
// import colours from "../../utils/MaterialDesignColours"; //can use these colours if needed
import {mapActions} from "vuex";

export default {
  name: "SectorContributionComparison",
  props: {
    config: {
      type: Object,
      default: () => {
        return {};
      }
    },
    selectedPortfolios: {
      type: Array,
      default: () => {
        return [];
      }
    },
    selectedBranches: {
      type: Array,
      default: () => {
        return [];
      }
    },
  },
  data() {
    return {
      dev: true,  //set to true when in dev mode. The component will then use the default example data object instead of making graphql hits. View the component at http://localhost:3000/playground in dev mode
      chartHeight: 600,
      loading: false,
      skipQuery: true,
      skipPoll: true,
      opIDs: [],
      chart: null,
      series: [],
      zoomBtns: [
        {
          label: '1wk',
          value: 7,
          unit: 'days'
        },
        {
          label: '1m',
          value: 1,
          unit: 'months'
        },
        {
          label: '3m',
          value: 3,
          unit: 'months'
        },
        {
          label: '6m',
          value: 6,
          unit: 'months'
        },
        {
          label: '1yr',
          value: 1,
          unit: 'years'
        },
        {
          label: '2yr',
          value: 2,
          unit: 'years'
        },
        {
          label: '3yr',
          value: 3,
          unit: 'years'
        },
        {
          label: '5yr',
          value: 5,
          unit: 'years'
        },
      ],
    };
  },
  computed: {
  },
  watch: {
    selectedBranches: {
      deep: true,
      handler: function () {
        this.initChart();
        }
      },
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  },
  mounted() {
    // this executes when component is in dev mode. Since no resources will be selected, we need the mounted hook to call initChart
    if (this.dev === true) {
      this.initChart();
    }
  },
  methods: {
    ...mapActions("global", [
      "closePopup", "pushSnackbar", "closeSnackbar"
    ]),
    initChart() {
      let data = [];

      if (this.dev === true) {
        data = this.wrangleData(testData.data);   //wrangle data of static testing data object into chart ready format
        this.series = data; //assign wrangled data to data property that chart will use
        this.chart = this.createPlot(); //create chart element
      } else {  // this executes when component is not in dev mode TODO uncomment this when implementing component
        // if (this.selectedBranches.length > 0) {
        //   this.$apollo.queries.batchGetBranchMetrics.setVariables({
        //     branchNames: this.selectedBranches
        //   });
        //   this.skipQuery = false;
        // } else {
        //   this.pushSnackbar({text: "The SectorContributionComparison component needs selected branches",color: "error"}); //send notification to user that they need to select branches
        // }
      }

    },
    //wrangle data of static testing data object into chart ready format
    wrangleData(data) {
      return data;
    },
    //create chart element
    createPlot() {
      const chart = am4core.create(
          this.$el.querySelector('.line-chart'),
          am4charts.XYChart
      );

      chart.maxHeight = this.chartHeight;

      return chart;
    },
    zoomToDates({ value, unit }) {
      const date = moment()
          .subtract(value, unit)
          .toDate();
      this.chart.xAxes.getIndex(0).zoomToDates(date, new Date());
    },
    },
};
</script>
