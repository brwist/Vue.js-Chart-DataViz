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

import _ from "lodash";
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
// TODO uncomment this when implementing in our actual repo
// import {BATCH_GET_DAILY_RETURN_INDEX_METRICS} from "@/apollo/queries";
import testData from "./testingData/DailyReturnIndexBottom.json";
import moment from 'moment';
import {mapActions} from "vuex";


export default {
  name: "DailyReturnIndexBottom",
  components: {
  },
  props: {
    config: {
      type: Object,
      default: () => {
        return {};
      }
    },
    selectedModels: {
      type: Array,
      default: () => {
        return [];
      }
    },
    selectedVersions: {
      type: Array,
      default: () => {
        return [];
      }
    },
  },

  data() {
    return {
      dev: true,  //set to true when in dev mode. The component will then use the default example data object instead of making graphql hits. TODO set dev = false when implementing in our actual repo
      loading: false,
      dataField: "bottom",
      withLegend: true,
      chartHeight: 400,
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
    };},


  computed: {
  },

  watch: {
    selectedVersions: {
      deep: true,
      handler: function () {
          this.initChart();
      },
    },
  },

  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  },
  mounted() {
    // this executes when component is in dev mode. Since no versions will be selected, we need the mounted hook
    if (this.dev === true) {
      this.initChart();
    }
  },
  methods: {
    ...mapActions("global", [
      "pushSnackbar",
    ]),
    //method that wrangles data of static testing data object into chart ready format
    wrangleData(resp) {
      let data = [];
      let metricData = resp.batchGetModelMetrics.filter((d) => d.dailyReturnsIndexMetric !== null);
      metricData.map((version) => {
        let name = _.get(version, "versionName");
        let versionData = _.get(version, "dailyReturnsIndexMetric").map((dataPoint) =>{
          return {
            date: _.get(dataPoint, 'effectiveDate'),
            value: _.get(dataPoint, this.dataField)*100,
          };
        });
        data.push({
          name: name,
          data: versionData.sort((a, b) =>
          {
            if (a.date > b.date)
            {
              return 1;
            }
            else if (a.date < b.date)
            {
              return -1;
            }
            else
            {
              return 0;
            }
          }),
        });
      });
      return data;
    },
    //method that creates chart element with wrangled data
    createPlot() {
      const chart = am4core.create(
          this.$el.querySelector('.line-chart'),
          am4charts.XYChart
      );

      chart.paddingRight = 20;
      chart.paddingLeft = 10;
      chart.maxHeight = this.chartHeight;

      // Create axes
      const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.minGridDistance = 60;
      chart.yAxes.push(new am4charts.ValueAxis());

      // Create series
      this.series.forEach((d) =>
      {
        const { name, data } = d;

        const series = chart.series.push(new am4charts.LineSeries());

        series.dataFields.valueY = 'value';
        series.dataFields.valueYShow = "change";
        series.dataFields.dateX = 'date';
        series.name = name;
        series.data = data;

        // series.stroke = am4core.color(color);

        series.tooltipText = '{name}: {valueY.change.formatNumber(\'#.00\')}%';
        series.tooltip.getFillFromObject = false;
        series.tooltip.background.fill = am4core.color(series.stroke);

        series.tooltip.pointerOrientation = 'vertical';

        // this.setFadeProps(series);
      });

      chart.legend = new am4charts.Legend();

      chart.cursor = new am4charts.XYCursor();
      chart.cursor.xAxis = dateAxis;

      const scrollbar = new am4core.Scrollbar();
      chart.scrollbarX = scrollbar;

      return chart;
    },
    initChart() {

      let data = [];

      // this executes when component is in dev mode
      if (this.dev === true) {
        data = this.wrangleData(testData.data);   //method that wrangles data of static testing data object into chart ready format
        this.series = data;
        this.chart = this.createPlot();           //method that creates chart element with wrangled data
      } else {  // this executes when component is not in dev mode
        if (this.selectedVersions.length > 0) {
          // TODO uncomment this when implementing in our actual repo
          // let request = {
          //   query: BATCH_GET_DAILY_RETURN_INDEX_METRICS,
          //   variables: {
          //     versionNames: this.selectedVersions,
          //   },
          //   fetchPolicy: "network-only",
          // };
          //
          // this.loading = true; //change chart to loading state to show that we are waiting for a data response
          //
          // this.$apollo
          //     .query(request)
          //     .then((resp) => {
          //       data = this.wrangleData(resp.data);   //wrangle data of query into chart ready format
          //       this.series = data;
          //       this.chart = this.createPlot();
          //       this.loading = false; //remove loading state to show that we have received data
          //     })
          //     .catch((e) => {
          //       console.error("Error executing batchMetrics query: ", e.message);
          //       this.pushSnackbar({text: "Error when fetching data for DailyReturnIndexBottom component",color: "error"}); //send notification to user that error has occurred
          //       this.loading = false; //remove loading state to show that we are no longer waiting for a response, but we have had an error
          //     });
        } else {
          this.pushSnackbar({text: "The DailyReturnIndexBottom component needs selected versions",color: "error"}); //send notification to user that they need to select versions
        }
      }

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
