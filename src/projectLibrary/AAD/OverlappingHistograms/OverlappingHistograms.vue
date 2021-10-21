<template>
  <div class="overlapping-histogram">
    <div class="dropdown">
      <v-select
        v-model="name"
        :items="items"
        label="Select Name"
        solo
      />
    </div>
    <div
      ref="chart"
      class="chart-wrapper"
    />
  </div>
</template>

<script>
import Histogram from "./components/Histogram";
import data from "./data/data.json";

export default {
  data() {
    return {
      name: "P",
      items: Array.from(
        data.data.batchGetRollingHistogramMetrics.map((d) => d.name)
      ),
      chart: null,
    };
  },
  computed: {
    chartData() {
      const found = data.data.batchGetRollingHistogramMetrics.find(d => d.name === this.name);
      if (found) {
        return found.histograms;
      }
      return [];
    }
  },
  watch: {
    chartData() {
      this.chart.updateData(this.chartData);
    }
  },
  mounted() {
    this.chart = Histogram({
      data: this.chartData,
      container: this.$refs.chart,
      height: 450,
    }).render();
  },
};
</script>

<style lang="scss">
.overlapping-histogram {
  .chart-tooltip {
    min-width: 150px;
    border: 1px solid #ddd;
    pointer-events: none;
    padding: 10px;
    border-radius: 6px;
    background-color: #fff;

    h5 {
      margin-bottom: 10px;
    }
  }

  .chart-tooltip[data-dir="left"] {
    transform: translateX(-100%);
  }

  .dropdown {
    max-width: 300px;
  }

  path:focus {
    outline: none;
  }

  .axis {
    path {
      display: none;
    }
    text {
      fill: rgba(0, 0, 0, 0.4);
    }
    line {
      stroke: rgba(0, 0, 0, 0.4);
    }
  }
}
</style>
