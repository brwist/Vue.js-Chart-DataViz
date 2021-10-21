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
    </div>
    <div class="flex-grow-1 d-flex overflow-auto grey lighten-4 pl-4 pt-4">
      <HistogramChart
        v-for="(histogram,index) in histogramsList"
        :key="index"
        :histogram-data="histogram"
        class="mr-4 mb-3"
      />
    </div>
  </div>
</template>

<script>
import HistogramChart from './HistogramChart';

export default
{
  name: 'RollingHistogramsLineChart',
  components:
    {
      HistogramChart,
    },
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
    };
  },
  computed:
    {
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
        return this.groupsMap[this.currentGroup] || [];
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
          }
        }
    }
};
</script>
