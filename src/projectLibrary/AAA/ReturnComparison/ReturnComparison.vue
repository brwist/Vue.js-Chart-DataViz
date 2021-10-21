<template>
  <return-comparison-line-chart
    :series="lineSeries"
    :faded-lines="faded"
  />
</template>

<script>
import data1 from "@/projectLibrary/AAA/ReturnComparison/data/290_16.json";
import data2 from "@/projectLibrary/AAA/ReturnComparison/data/290_20.json";
import data3 from "@/projectLibrary/AAA/ReturnComparison/data/291_01.json";
import data4 from "@/projectLibrary/AAA/ReturnComparison/data/291_03.json";
import ReturnComparisonLineChart from "@/projectLibrary/AAA/ReturnComparison/components/ReturnComparisonLineChart";

const transform = (arr) => {
  return arr
    .map((d) => {
      return {
        date: d.effectiveDate,
        value: d.spreadReturn,
      };
    })
    .sort((a, b) => {
      if (a.date > b.date) {
        return 1;
      } else if (a.date < b.date) {
        return -1;
      } else {
        return 0;
      }
    });
};

export default {
  // export name in component must match the project ID
  name: "AAA",
  components: {
    ReturnComparisonLineChart,
  },
  data() {
    return {
      faded: [
        data1.data.getModelMetrics.modelVersionName,
        data4.data.getModelMetrics.modelVersionName,
      ],
      lineSeries: [
        {
          data: transform(data1.data.getModelMetrics.cagrReturns),
          name: data1.data.getModelMetrics.modelVersionName,
          color: "#91B36D",
        },
        {
          data: transform(data2.data.getModelMetrics.cagrReturns),
          name: data2.data.getModelMetrics.modelVersionName,
          color: "#D16B5C",
        },
        {
          data: transform(data3.data.getModelMetrics.cagrReturns),
          name: data3.data.getModelMetrics.modelVersionName,
          color: "#EBBE53",
        },
        {
          data: transform(data4.data.getModelMetrics.cagrReturns),
          name: data4.data.getModelMetrics.modelVersionName,
          color: "#87C3D3",
        },
      ],
    };
  },
};
</script>
