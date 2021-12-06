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
              ref="chart"
              class="line-chart"
              :style="`height: ${chartHeight}px; width: 100%;`"
            />
          </v-col>
          <v-col
            ref="legend"
            class="flex-grow-0"
            style="flex-basis: 210px;"
          />
        </v-row>
        <v-row>
          <v-col
            ref="legendTwo"
            style="max-height: 100px;"
          />
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

const paletteAdobe = [
  '#00C0C7',
  '#DA3490',
  '#47E26F',
  '#5144D3',
  '#E8871A',
  '#9089FA',
  '#C0C0C0',
  '#2780EB',
  '#DFBF03',
  '#6F38B1',
  '#268D6C',
  '#CB6F10',
];

const dashPatterns = [
  '3,0',
  '3,3',
  '8,4,2,4',
  '2,5',
  '8,4'
];

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
      chartHeight: 600,
      loading: false,
      skipQuery: true,
      skipPoll: true,
      opIDs: [],
      chart: null,
      legend: null, // sectors
      legendTwo: null, // branches
      dimmedSectors: {},
      dimmedBranches: {},
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
    dev() {
      // In development mode the component will then use the default example data object instead of making graphql hits. View the component at http://localhost:3000/playground in dev mode
      return process.env.NODE_ENV === 'development';
    }
  },
  watch:
  {
    selectedBranches:
    {
      deep: true,
      handler(newVal)
      {
        this.updateChart(this.wrangleData(newVal));
      }
    },
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  },
  mounted() {
    this.createPlot(); //create chart element
    // this executes when component is in dev mode. Since no resources will be selected, we need the mounted hook to call initChart
    if (this.dev) {
      this.updateChart(this.wrangleData(testData)); //wrangle data of static testing data object into chart ready format
    } else {  // this executes when component is not in dev mode
      if (this.selectedBranches.length > 0) {
        this.$apollo.queries.batchGetBranchMetrics.setVariables({
          branchNames: this.selectedBranches
        });
        this.skipQuery = false;
      } else {
        //send notification to user that they need to select branches
        this.pushSnackbar({
          text: "The SectorContributionComparison component needs selected branches",
          color: "error"
        });
      }
    }
  },
  methods:
  {
    ...mapActions("global", [
      "closePopup", "pushSnackbar", "closeSnackbar"
    ]),
    createPlot() {
      //create chart element
      const chart = am4core.create(
        this.$refs.chart,
        am4charts.XYChart
      );

      chart.maxHeight = this.chartHeight;
      chart.maskBullets = false;

      const xAxis = chart.xAxes.push(new am4charts.DateAxis());
      xAxis.renderer.minGridDistance = 50;
      xAxis.baseInterval = {
        timeUnit: 'day',
        count: 1
      };
      xAxis.skipEmptyPeriods = true;
      xAxis.tooltipDateFormat = 'MMMM d, yyyy'; // format for the X cursor marker
      xAxis.dateFormats.setKey('day', 'MMM, yyyy');
      xAxis.periodChangeDateFormats.setKey('day', 'MMM, yyyy');

      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.minGridDistance = 25;
      valueAxis.renderer.minWidth = 35;
      valueAxis.numberFormatter.numberFormat = '0%';

      // add cursors and disable zooming
      const cursor = new am4charts.XYCursor();
      cursor.behavior = 'zoomX';
      cursor.xAxis = xAxis;
      cursor.maxTooltipDistance = -1;
      chart.cursor = cursor;

      let legend = new am4charts.Legend();
      legend.position = 'right';
      legend.valign = 'top';
      legend.width = 210;
      legend.scrollable = true;
      legend.labels.template.truncate = false;
      legend.itemContainers.template.togglable = false;

      // toggle sectors
      legend.itemContainers.template.events.on("hit", (ev) =>
      {
        this.toggleSector(ev.target.dataItem);
      });

      // use square markers instead of the default horizontal lines
      legend.useDefaultMarker = true;
      let markerTemplate = legend.markers.template;
      markerTemplate.width = 15;
      markerTemplate.height = 15;
      let marker = markerTemplate.children.getIndex(0);
      marker.fillOpacity = 1;

      // define "active" state
      let as = marker.states.create('active');
      as.properties.fillOpacity = 0.1;
      let labelTemplate = legend.labels.template;
      labelTemplate.fillOpacity = 1;
      as = labelTemplate.states.create('active');
      as.properties.fillOpacity = 0.6;

      // create a container for our custom legend
      let legendContainer = am4core.create(this.$refs.legend, am4core.Container);
      legendContainer.width = am4core.percent(100);
      legendContainer.height = am4core.percent(100);
      legend.parent = legendContainer;
      this.legend = legend;

      // create another legend for the branches and show their corresponding dash style
      legend = new am4charts.Legend();
      legend.position = 'bottom';
      legend.itemContainers.template.togglable = false;
      legend.useDefaultMarker = true;

      // toggle kinds
      legend.itemContainers.template.events.on("hit", (ev) =>
      {
        this.toggleBranch(ev.target.dataItem);
      });

      markerTemplate = legend.markers.template;
      markerTemplate.disposeChildren();
      markerTemplate.width = 35;
      markerTemplate.height = 16;

      // define "active" state
      labelTemplate = legend.labels.template;
      labelTemplate.fillOpacity = 1;
      as = labelTemplate.states.create('active');
      as.properties.fillOpacity = 0.5;

      // add custom Sprite
      const dash = markerTemplate.createChild(am4core.Line);
      dash.width = 35;
      dash.height = 16;
      dash.strokeWidth = 4;
      dash.x1 = 0;
      dash.x2 = 34;
      dash.y1 = 7;
      dash.y2 = 7;
      dash.propertyFields.stroke = 'stroke';
      dash.propertyFields.strokeDasharray = 'dash';

      legendContainer = am4core.create(this.$refs.legendTwo, am4core.Container);
      legendContainer.width = am4core.percent(100);
      legendContainer.height = am4core.percent(100);
      legend.parent = legendContainer;
      this.legendTwo = legend;

      this.chart = chart;
    },
    zoomToDates({ value, unit }) {
      const date = moment()
          .subtract(value, unit)
          .toDate();
      this.chart.xAxes.getIndex(0).zoomToDates(date, new Date());
    },
    wrangleData(primaryJson)
    {
      // we create a nested structure - branch/sector/dataPointsArray
      const result = {};
      let branchNode;
      primaryJson.data.batchContributionMetrics.forEach(branch =>
      {
        branch.historicalContributions.forEach(info =>
        {
          if (!result[branch.branchName]) result[branch.branchName] = {};
          branchNode = result[branch.branchName];
          info.contributions.forEach(contrib =>
          {
            if (!branchNode[contrib.id]) branchNode[contrib.id] = [];
            branchNode[contrib.id].push({
              x: info.effectiveDate,
              value: contrib.contribution,
              percent: 100 * contrib.contribution,
              branch: branch.branchName,
              sector: contrib.id,
            });
          });
        });
      });
      return result;
    },
    updateChart(data)
    {
      const series = this.chart.series;
      // we have to reset the series - because we do not recreate the chart when updating the values (to speedup the things a little)
      while (series.length > 0) series.removeIndex(0).dispose();
      // clear the legend
      this.legend.data = [];
      this.legendTwo.data = [];
      this.dimmedSectors = {};
      this.dimmedBranches = {};

      const legendItems = {};
      const branchItems = [];
      // create series
      Object.keys(data).forEach((branch, bIndex) =>
      {
        const branchNode = data[branch];
        branchItems.push({
          name: branch,
          stroke: am4core.color('#111'),
          dash: dashPatterns[bIndex],
        });
        Object.keys(branchNode).forEach((sector, sIndex) =>
        {
          this.createSeries(bIndex, branch, sIndex, sector, branchNode[sector].sort((a, b) => a.x < b.x ? -1 : a.x > b.x ? +1 : 0)); // we must sort data points by date, because amCharts does not do it for us
          if (!legendItems[sector]) legendItems[sector] = {
            name: sector,
            fill: am4core.color(paletteAdobe[sIndex % paletteAdobe.length]),
          };
        });
      });
      this.legend.data = Object.values(legendItems); // sectors
      this.legendTwo.data = branchItems; // branches
    },
    createSeries(bIndex, branch, sIndex, sector, data)
    {
      const lineSeries = this.chart.series.push(new am4charts.LineSeries());
      lineSeries.dataFields.dateX = 'x';
      lineSeries.dataFields.valueY = 'value';
      lineSeries.dataFields.branch = 'branch';
      lineSeries.dataFields.sector = 'sector';
      lineSeries.branch = branch; // we need these both as dataField and direct property - they are used in different way
      lineSeries.sector = sector;
      lineSeries.name = `${branch} - ${sector}`;
      lineSeries.data = data;

      lineSeries.adapter.add('tooltipHTML', (txt, target) =>
      {
        const currentSeries = target.tooltipDataItem;
        const idx = currentSeries.index;
        // don't show tooltip for dimmed series or series from a sector which is different from the currently hovered
        if (idx < 0) return '';
        let text = "<table><thead><tr><th style='padding: 0;'>Branch</th><th style='padding: 0 5px;'>Sector</th><th style='padding: 0;'>Contribution</th></tr></thead><tbody>";
        this.chart.series.each(item =>
        {
          if (!item.isActive && currentSeries.sector === item.sector)
          {
            text += '<tr><td style="padding: 0; color:' + item.stroke.hex + ';">' +
                    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 10" width="28" height="16" style="vertical-align: middle;">' +
                    '<line x1="0" x2="28" y1="5" y2="5" stroke="currentColor" stroke-width="2" stroke-dasharray="' + item.strokeDasharray + '"></line></svg> ' + item.branch +
                    '</td><td style="padding: 0 5px;">' + item.sector +
                    '</td><td align="right" style="padding: 0; color:' + item.stroke.hex + ';">' + item.data[idx].percent.toFixed(2) + '%</td></tr>';
          }
        });
        text += '</tbody></table>';
        return text;
      });
      lineSeries.tooltip.fontSize = 12;
      lineSeries.tooltip.background.strokeWidth = 0;
      lineSeries.tooltip.getFillFromObject = false;
      lineSeries.tooltip.background.fill = am4core.color('#fff');
      lineSeries.tooltip.label.fill = am4core.color('#000');
      // Prevent cross-fading of tooltips
      lineSeries.tooltip.defaultState.transitionDuration = 0;
      lineSeries.tooltip.hiddenState.transitionDuration = 0;

      // use a dash pattern for different branches
      lineSeries.strokeDasharray = dashPatterns[bIndex];
      lineSeries.strokeWidth = 2;
      lineSeries.strokeOpacity = 1;
      lineSeries.stroke = am4core.color(paletteAdobe[sIndex % paletteAdobe.length]);

      // Enable interactions on series segments
      const segment = lineSeries.segments.template;
      segment.interactionsEnabled = true;
      segment.events.on('hit', (ev) =>
      {
        const series = ev.target.dataItem.component.tooltipDataItem;
        let legendIndex = this.legend.data.findIndex(item => item.name === series.sector);
        this.toggleSector(this.legend.data[legendIndex].legendDataItem);
        legendIndex = this.legendTwo.data.findIndex(item => item.name === series.branch);
        this.toggleBranch(this.legendTwo.data[legendIndex].legendDataItem);
      });

      // "active" is actually used for dimming, while "standout" makes the lines thicker
      let hs = segment.states.create("active");
      hs.properties.strokeOpacity = 0.15;
      hs.properties.strokeWidth = 1;
      hs = segment.states.create('standout');
      hs.properties.strokeWidth = 5;

      const bullet = lineSeries.bullets.push(new am4charts.CircleBullet());
      bullet.circle.stroke = am4core.color('#fff');
      bullet.circle.strokeWidth = 2;
      bullet.circle.fill = lineSeries.stroke;
      bullet.scale = 0;
      bullet.events.on('hit', (ev) =>
      {
        const series = ev.target.dataItem;
        const legendIndex = this.legend.data.findIndex(item => item.name === series.sector);
        this.toggleSector(this.legend.data[legendIndex].legendDataItem);
      });

      hs = bullet.states.create('hover');
      hs.properties.scale = 1;

      return lineSeries;
    },
    toggleSector(legendItem)
    {
      this.updateLegend(legendItem, this.dimmedSectors);
    },
    toggleBranch(legendItem)
    {
      this.updateLegend(legendItem, this.dimmedBranches);
    },
    updateLegend(item, dimmedList)
    {
      const active = item.toggled = !item.toggled;
      item.marker.isActive = active;
      item.label.isActive = active;
      dimmedList[item.dataContext.name] = active;
      this.updateDimming();
    },
    updateDimming()
    {
      this.chart.series.each(series =>
      {
        const dimmed = this.dimmedSectors[series.sector] || this.dimmedBranches[series.branch];
        series[dimmed ? 'hide' : 'show']();
        series.bullets.getIndex(0).visible = !dimmed;
        series.segments.each(segment =>
        {
          segment[dimmed ? 'hide' : 'show']();
        });
      });
    },
  },
};
</script>
