<template>
  <v-container>
    <v-row>
      <div
        class="line-chart"
        :style="`height: ${chartHeight}px; width: 100%;`"
      />
    </v-row>
    <v-row align="center">
      <v-col
        v-for="b in zoomBtns"
        :key="b.label"
        align="center"
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
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import moment from "moment";

export default {
  name: "ReturnComparisonLineChart",
  props: {
    chartHeight: {
      type: Number,
      default: 500,
    },
    fadedLines: {
      type: Array,
      required: true,
    },
    series: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      chart: null,
      zoomBtns: [
        { label: "1wk", value: 7, unit: "days" },
        { label: "1m", value: 1, unit: "months" },
        { label: "3m", value: 3, unit: "months" },
        { label: "6m", value: 6, unit: "months" },
        { label: "1yr", value: 1, unit: "years" },
        { label: "2yr", value: 2, unit: "years" },
        { label: "3yr", value: 3, unit: "years" },
        { label: "5yr", value: 5, unit: "years" },
      ],
    };
  },

  watch: {
    data() {
      if (this.chart) this.chart.dispose();
      this.initChart();
    },
  },

  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  },

  mounted() {
    this.initChart();
  },

  methods: {
    createLineChart() {
      let chart = am4core.create(
        this.$el.querySelector(".line-chart"),
        am4charts.XYChart
      );

      chart.paddingRight = 20;
      chart.paddingLeft = 10;
      chart.maxHeight = this.chartHeight;

      // Create axes
      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.minGridDistance = 60;
      chart.yAxes.push(new am4charts.ValueAxis());

      // Create series
      this.series.forEach((d) => {
        const { color, name, data } = d;

        let series = chart.series.push(new am4charts.LineSeries());

        series.dataFields.valueY = "value";
        series.dataFields.dateX = "date";
        series.name = name;
        series.data = data;

        series.stroke = am4core.color(color);

        series.tooltipText = "{name}: {valueY}";
        series.tooltip.getFillFromObject = false;
        series.tooltip.background.fill = am4core.color(color);

        series.tooltip.pointerOrientation = "vertical";

        this.setFadeProps(series);
      });

      chart.legend = new am4charts.Legend();

      chart.cursor = new am4charts.XYCursor();
      chart.cursor.xAxis = dateAxis;

      const scrollbar = new am4core.Scrollbar();
      chart.scrollbarX = scrollbar;

      return chart;
    },

    initChart() {
      if (this.series) {
        this.chart = this.createLineChart();
      }
    },

    fadeOut() {
      this.chart.series.each(this.setFadeProps);
    },

    setFadeProps(s) {
      const isFaded = this.fadedLines.indexOf(s.name) > -1;
      s.tooltip.background.fillOpacity = isFaded ? 0.2 : 1;
      s.strokeOpacity = isFaded ? 0.3 : 1;
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

<style>

</style>
