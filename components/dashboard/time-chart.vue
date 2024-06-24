<template>
  <ClientOnly>
    <div>
      <el-row class="items-center ml-2">
        <el-col>
          <h3 class="text-[18px]">시간별 실행 횟수</h3>
          <p class="text-blue-500">조회 기간 내 실행 횟수</p>
        </el-col>
      </el-row>
      <VueApexCharts
          ref="chart"
          type="area"
          height="330"
          :options="chartOptions"
          :series="series">
      </VueApexCharts>
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

const series = computed(() => {
  return [{
    name: 'total',
    data: _.map(props.chartData, 'cnt')
  }]
})
const categories = computed(() => {
  return _.map(props.chartData, 'hour');
})

const chartOptions = computed(() => {
  return {
    type: 'area',
    stroke: {
      curve: 'smooth',
      width: 2.5,
    },
    chart:{
      zoom: {
        enabled: false,
        type: 'xy',
      },
      toolbar: {
        show: false
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 1000,
        dynamicAnimation: {
          enabled: true,
          speed: 500
        }
      },
    },
    dataLabels: {
      enabled: false
    },
    colors: ['rgba(33,150,243, 1)','rgba(231, 76, 94, 1)'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100]
      },
    },
    legend: {
      show: false
    },
    xaxis: {
      tickPlacement: 'between',
      labels: {
        formatter: function (value) {
          return value + "시";
        }
      },
      categories: categories.value
    },
    tooltip: {}
  }
});
</script>