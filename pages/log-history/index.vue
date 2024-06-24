<template>
  <el-container class="log-wrap" direction="vertical">
    <el-row class="row align-center ml-5 mt-5">
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
      <el-button class="ml-3" type="primary" :icon="Search" circle @click="searchBtn"/>
    </el-row>
    <el-row class="m-5">
      <client-only>
        <el-table
            id="log-table"
            style="width: 100%"
            :data="getLogHistoryList"
            size="default"
            border
            stripe
            max-height="800"
        >
          <el-table-column
              prop="createdAt"
              label="날짜"
          >
          </el-table-column>
          <el-table-column
              prop="userId"
              label="ID"
          >
          </el-table-column>
          <el-table-column
              prop="method"
              label="Method"
          >
          </el-table-column>
          <el-table-column
              prop="logName"
              label="LogName"
          >
          </el-table-column>
          <el-table-column
              prop="isSuccess"
              label="성공유무"
          >
            <template #default="scope">
              <el-tag
                :type="scope.row.isSuccess === 1 ? 'primary' : 'danger'"
                disable-transitions>
                {{scope.row.isSuccess === 1 ? '성공' : '실패'}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
              prop="logDesc"
              label="상세내용"
          >
          </el-table-column>
          <el-table-column
              prop="ipAddress"
              label="IP"
          >
          </el-table-column>
        </el-table>
      </client-only>
    </el-row>
  </el-container>
</template>
<script setup>
import {Search} from '@element-plus/icons-vue';
import {useLogHistoryStore} from "~/stores/log-history.js";
import {storeToRefs} from "pinia";
const dayjs = useNuxtApp().$dayjs;
const logHistoryStore = useLogHistoryStore();
const {getLogHistoryList} = storeToRefs(logHistoryStore);
const startDate = ref(dayjs().subtract(6, 'days').format('YYYY-MM-DD'));
const endDate = ref(dayjs().format('YYYY-MM-DD'));

definePageMeta({
  middleware: ["auth"]
})

onMounted(() => {
  searchBtn();
})
const searchBtn = async () =>{
  const params= {
    startDate: startDate.value,
    endDate: endDate.value
  }
  await logHistoryStore.loadLogHistory(params);
}
</script>
