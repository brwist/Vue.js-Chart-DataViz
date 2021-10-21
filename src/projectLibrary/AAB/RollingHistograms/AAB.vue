<template>
  <RollingHistogramsLineChart
    :data-object="histogramsData"
    style="min-height: 800px;"
  />
</template>

<script>
import testData from './data/batchGetRollingHistogramMetrics.json';
import RollingHistogramsLineChart from './components/RollingHistogramsLineChart';

export default
{
  // export name in component must match the project ID
  name: 'AAB',
  components:
  {
    RollingHistogramsLineChart,
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
