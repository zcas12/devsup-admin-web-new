<template>
  <el-container direction="vertical">
    <el-row class="items-center my-3">
      <el-date-picker
          v-model="startDate"
          type="date"
          placeholder=""
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
      />
      <span class="mx-2">-</span>
      <el-date-picker
          v-model="endDate"
          type="date"
          placeholder=""
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
      />
      <el-button class="ml-3" type="primary" :icon="Search" circle @click="loadDashboard()" />
    </el-row>
    <el-row :gutter="12" class="my-3 items-start justify-center">
      <el-col :xs="24" :sm="24" :md="12" :lg="8">
        <el-card class="h-[250px]" shadow="never">
          <el-row class="items-start ml-2 h-[40px]">
            <h3 class="text-[18px]">누적 상담톡 실행 횟수</h3>
          </el-row>
          <el-row class="mt-5 items-center justify-center">
            <span class="text-[3.0em]">
              {{ totalCnt.toFixed() }}
            </span>
          </el-row>
          <el-row class="text-[#0C8C56] text-[1.2em] items-center justify-center">
            <span class="row items-center bg-[#CCF6E5] rounded-[20px] px-2">
              <el-icon>
                <CaretTop/>
              </el-icon>
              {{riseCnt.toFixed()}}
            </span>
          </el-row>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="8">
        <el-card class="h-[250px]" shadow="never">
          <el-row class="items-center ml-2 h-[40px]">
            <el-col>
              <h3 class="text-[18px]">상담톡 실행 횟수</h3>
              <p class="text-blue-500">조회 기간 내 실행 횟수</p>
            </el-col>
          </el-row>
          <el-row class="mt-5 items-center justify-center">
            <span class="text-[3.0em]">
              {{ searchCnt.toFixed() }}
            </span>
          </el-row>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="8">
        <el-card class="h-[250px] " shadow="never">
          <dashboard-pie-chart :chartData="getCategoryCnt"></dashboard-pie-chart>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="12" class="my-3">
      <el-col>
        <el-card shadow="never">
          <dashboard-time-chart :chartData="getTimezoneData"></dashboard-time-chart>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="12" class="row flex-warp my-3">
      <el-col :xs="24" :sm="6" :md="6" :lg="6" >
        <dashboard-click-state :rankData="getRankData"></dashboard-click-state>
      </el-col>
      <el-col :xs="24" :sm="18" :md="18" :lg="18" >
        <el-card shadow="never">
          <dashboard-rank-table :gridData="getRankData"></dashboard-rank-table>
        </el-card>
      </el-col>
    </el-row>
  </el-container>
</template>
<script setup>
import {CaretTop, Search} from '@element-plus/icons-vue'
import {useDashboardStore} from "~/stores/dashboard.js";
import {storeToRefs} from "pinia";
import { useTransition } from '@vueuse/core'

const dayjs = useNuxtApp().$dayjs;
const dashboardStore = useDashboardStore();
const {getCategoryCnt,getTotalCnt,getRiseCnt,getSearchCnt,getRankData,getTimezoneData} = storeToRefs(dashboardStore);
const startDate = ref(dayjs().subtract(6, 'days').format('YYYY-MM-DD'));
const endDate = ref(dayjs().format('YYYY-MM-DD'));
const totalCnt = useTransition(getTotalCnt);
const riseCnt = setTransition(getRiseCnt);
const searchCnt = setTransition(getSearchCnt);

definePageMeta({
  middleware: ["auth"]
})

onMounted(() => {
  loadDashboard();
})
const loadDashboard = () =>{
  const params={
    startDate: startDate.value,
    endDate: endDate.value
  }
  dashboardStore.loadExec(params);
  dashboardStore.loadRank(params);
  dashboardStore.loadTimezone(params);
}

function setTransition(val, options = {}) {
  // 기본 옵션 설정
  const defaultOptions = {
    duration: 1500, // 기본 전환 지속 시간
    ...options // 사용자 정의 옵션 병합
  }

  return useTransition(val, defaultOptions)
}
</script>
