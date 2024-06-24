<template>
  <ClientOnly>
    <div>
      <el-row class="items-center ml-2">
        <h3 class="text-[18px]">대분류별 상담</h3>
      </el-row>
      <el-row class="mt-5 items-center justify-center">
        <VueApexCharts
            ref="chart"
            type="pie"
            :options="chartOptions"
            :series="series">

        </VueApexCharts>
      </el-row>
    </div>
  </ClientOnly>
</template>
<script setup>
import VueApexCharts from 'vue3-apexcharts';
const _ = useNuxtApp().$_;
const props = defineProps({
  chartData: {
    type: Array,
    required: true
  }
})

const labels = computed(() => {
  return _.map(props.chartData, 'name');
})
const series = computed(() => {
  return _.map(props.chartData, 'cnt');
})
const chartOptions = computed(() => {
  return {
    type: 'pie',
    chart: {
      width: '100%'
    },
    xaxis: {},
    yaxis: {
      show: false
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      position: 'right',
      width: 120
    },
    labels: labels.value,
    colors: ['rgba(33,150,243, 1)','rgba(231, 76, 94, 1)','rgba(240, 108, 0, 1)','rgba(255, 193, 7, 1)'],
    tooltip: {
      y: {
        formatter: (val) => {
          return val + "%";
        }
      }
    },
    markers: {}
  }
})

</script>