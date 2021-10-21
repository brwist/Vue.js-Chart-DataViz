<template>
  <OverlappingHistogramsLineChart
    :data-object="histogramsData"
    style="min-height: 800px;"
  />
</template>

<script>
import testData from './data/batchGetRollingHistogramMetrics.json';
import OverlappingHistogramsLineChart from './components/OverlappingHistogramsLineChart';

export default
{
  // export name in component must match the project ID
  name: 'AAC',
  components:
  {
    OverlappingHistogramsLineChart,
  },
  computed:
    {
      histogramsData()
      {
        return testData;
      }
    }
};
</script>
