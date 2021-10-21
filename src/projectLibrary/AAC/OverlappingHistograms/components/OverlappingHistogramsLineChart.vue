<template>
  <div class="d-flex flex-column">
    <div class="d-flex justify-end pb-4">
      <v-select
        v-model="currentGroup"
        :items="groupsList"
        label="Choose a group"
        outlined
        dense
        hide-details
        class="flex-grow-0"
        menu-props="offsetY"
      />
      <v-select
        v-model.number="samplingRate"
        :items="rateList"
        label="Sampling rate"
        outlined
        dense
        hide-details
        class="ml-4 flex-grow-0"
        menu-props="offsetY"
      />
    </div>
    <div
      ref="chart"
      class="flex-grow-1 overlapping_histograms"
    />
  </div>
</template>

<script>
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

const paletteAdobe = [ // eslint-disable-line no-unused-vars
  '#00C0C7',
  '#5144D3',
  '#E8871A',
  '#DA3490',
  '#9089FA',
  '#47E26F',
  '#2780EB',
  '#6F38B1',
  '#DFBF03',
  '#268D6C',
  '#CB6F10',
  '#C0C0C0',
];

const paletteDutch = [ // eslint-disable-line no-unused-vars
  '#e60049',
  '#0bb4ff',
  '#50e991',
  '#e6d800',
  '#9b19f5',
  '#ffa300',
  '#dc0ab4',
  '#b3d4ff',
  '#00bfa0'
];

const palettePastel = [ // eslint-disable-line no-unused-vars
  '#fd7f6f',
  '#7eb0d5',
  '#b2e061',
  '#bd7ebe',
  '#ffb55a',
  '#ffee65',
  '#beb9db',
  '#fdcce5',
  '#8bd3c7'
];

export default
{
  name: 'OverlappingHistogramsLineChart',
  props:
    {
      dataObject:
        {
          type: Object,
          required: true
        },
    },
  data()
  {
    return {
      currentGroup: null,
      samplingRate: 1,
      chart: null,
      hoveredSeries: {},
    };
  },
  computed:
    {
      rateList()
      {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      },
      histogramGroups()
      {
        return ((this.dataObject || {}).data || {}).batchGetRollingHistogramMetrics || [];
      },
      groupsList()
      {
        return this.histogramGroups.map(item => item.name);
      },
      groupsMap()
      {
        const result = {};
        this.histogramGroups.forEach(item =>
        {
          result[item.name] = item.histograms;
        });
        return result;
      },
      histogramsList()
      {
        return (this.groupsMap[this.currentGroup] || []).filter((item, index) => (index + 1) % this.samplingRate === 0);
      },
    },
  watch:
    {
      groupsList:
        {
          immediate: true,
          handler()
          {
            this.currentGroup = this.groupsList[0];
            this.samplingRate = 1;
          }
        },
      histogramsList()
      {
        // give some time to the drop-down to perform the "close" animation - otherwise the drop-down is not closed until the chart redraws with the new data
        setTimeout(() =>
        {
          this.updateChart();
        }, 50);
      },
    },
  created()
  {
    am4core.useTheme(this.myColorWheel);
  },
  beforeDestroy()
  {
    if (this.chart)
    {
      this.chart.dispose();
    }
  },
  mounted()
  {
    const chart = am4core.create(this.$refs.chart, am4charts.XYChart);
    chart.maskBullets = false;
    chart.events.on('out', this.processOut); // remove dimming when the mouse goes outside of the chart

    const xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    xAxis.dataFields.category = 'category';
    xAxis.renderer.minGridDistance = 10;
    xAxis.renderer.labels.template.fontSize = 12;
    xAxis.cursorTooltipEnabled = false; // no tooltips/cursor on the X axis

    xAxis.renderer.ticks.template.disabled = false;
    xAxis.renderer.ticks.template.strokeOpacity = 1;
    xAxis.renderer.ticks.template.stroke = am4core.color('#495C43');
    xAxis.renderer.ticks.template.strokeWidth = 1;
    xAxis.renderer.ticks.template.length = 5;

    xAxis.renderer.labels.template.rotation = -90;
    xAxis.renderer.labels.template.horizontalCenter = 'right';
    xAxis.renderer.labels.template.verticalCenter = 'middle';

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.max = 1;
    valueAxis.renderer.minGridDistance = 10;

    // add cursor on the Y axis only
    const cursor = new am4charts.XYCursor();
    cursor.behavior = 'none';
    cursor.fontSize = 12;
    cursor.lineX.disabled = true;
    cursor.maxTooltipDistance = -1;
    chart.cursor = cursor;

    const legend = new am4charts.Legend();
    legend.position = 'right';
    legend.valign = 'top';
    legend.width = 210;
    legend.scrollable = true;
    legend.labels.template.truncate = false;

    // use square markers instead of the default horizontal lines
    legend.useDefaultMarker = true;
    const markerTemplate = legend.markers.template;
    markerTemplate.width = 15;
    markerTemplate.height = 15;
    const marker = markerTemplate.children.getIndex(0);
    marker.strokeWidth = 1;
    marker.strokeOpacity = 1;
    marker.stroke = am4core.color('#222');
    chart.legend = legend;

    this.chart = chart;
    this.updateChart();
  },
  methods:
    {
      updateChart()
      {
        this.hoveredSeries = {};
        const series = this.chart.series;
        // we have to reset the series AND the colors - because we do not recreate the chart when updating the values (to speedup the things a little)
        // and without a reset we get different colors every time the chart is redrawn
        while (series.length > 0) series.removeIndex(0).dispose();
        this.chart.colors.reset();

        // create series
        this.histogramsList.forEach(this.createSeries);

        // we assume that bins are of the same size/length
        const dataPoints = [];
        this.histogramsList.forEach((histogram, idx) =>
        {
          histogram.bins.forEach((bin, i) =>
          {
            if (!dataPoints[i]) dataPoints[i] = {};
            const point = dataPoints[i];
            // we must escape the square brackets - amCharts uses them for formatting
            point.category = bin.bound.replace('[', '[[');
            point['frequency_' + idx] = bin.frequency;
            point['count_' + idx] = bin.count;
          });
        });
        this.chart.data = dataPoints;
      },
      createSeries(histogram, index)
      {
        const lineSeries = this.chart.series.push(new am4charts.LineSeries());
        lineSeries.dataFields.categoryX = 'category';
        lineSeries.dataFields.valueY = 'frequency_' + index;
        lineSeries.dataFields.counter = 'count_' + index;
        lineSeries.name = `${histogram.startDate} - ${histogram.endDate}`;

        lineSeries.tooltipText = '[' + lineSeries.stroke.hex + ']●[/] ' + lineSeries.name + ': Freq = {frequency_' + index + '.formatNumber("#.000")}, Cnt = {count_' + index + '}';
        lineSeries.tooltip.fontSize = 12;
        lineSeries.tooltip.background.strokeWidth = 0;
        lineSeries.tooltip.getFillFromObject = false;
        lineSeries.tooltip.background.fill = am4core.color('#fff');
        lineSeries.tooltip.label.fill = am4core.color('#000');
        // Prevent cross-fading of tooltips
        lineSeries.tooltip.defaultState.transitionDuration = 0;
        lineSeries.tooltip.hiddenState.transitionDuration = 0;

        lineSeries.strokeWidth = 2;
        lineSeries.strokeOpacity = 1;

        // Enable interactions on series segments
        const segment = lineSeries.segments.template;
        segment.interactionsEnabled = true;

        const hoverState = segment.states.create('hover');
        hoverState.properties.strokeWidth = 4;
        hoverState.properties.strokeOpacity = 1;

        const dimmed = segment.states.create('dimmed');
        dimmed.properties.strokeWidth = 2;
        dimmed.properties.strokeOpacity = 0.2;

        // Dim series on tooltip show/hide
        lineSeries.tooltip.events.on('shown', (ev) =>
        {
          const hoveredSet = this.hoveredSeries;
          hoveredSet[ev.target.targetSprite.name] = true;
          if (Object.keys(hoveredSet).length === 1) this.processOver(ev.target.targetSprite);
        });
        lineSeries.tooltip.events.on('hidden', (ev) =>
        {
          if (!ev.target.targetSprite) return;
          const hoveredSet = this.hoveredSeries;
          delete hoveredSet[ev.target.targetSprite.name];
          if (Object.keys(hoveredSet).length > 0)
          {
            this.chart.series.each(series =>
            {
              series.segments.each(segment =>
              {
                segment.setState(hoveredSet[series.name] ? 'hover' : 'dimmed');
              });
            });
          }
          else this.processOut();
        });

        const bullet = lineSeries.bullets.push(new am4charts.CircleBullet());
        bullet.circle.stroke = am4core.color('#fff');
        bullet.circle.strokeWidth = 2;
        bullet.scale = 0;
        const hs = bullet.states.create('hover');
        hs.properties.scale = 1;
      },
      myColorWheel(target)
      {
        // https://colorbrewer2.org/#type=qualitative&scheme=Paired&n=10
        if (target instanceof am4core.ColorSet)
        {
          target.list = paletteAdobe.map(color => am4core.color(color));
        }
      },
      processOver(hoveredSeries)
      {
        hoveredSeries.toFront();
        hoveredSeries.segments.each(segment =>
        {
          segment.setState('hover');
        });

        this.chart.series.each(series =>
        {
          if (series !== hoveredSeries)
          {
            series.segments.each(segment =>
            {
              segment.setState('dimmed');
            });
          }
        });
      },
      processOut()
      {
        this.chart.series.each(series =>
        {
          series.segments.each(segment =>
          {
            segment.setState('default');
          });
        });
      },
    }
};
</script>

<style lang="scss">
  .overlapping_histograms
  {
    g[opacity][filter][style]
    {
      /* hide AmCharts logo */
      display: none;
    }
  }
</style>
