<template>
  <el-row class="row mb-3">
    <el-dropdown class="ml-auto" trigger="click" @command="download">
      <span class="el-dropdown-link">
        <el-button :icon="Download" class="ml-auto">export</el-button>
      </span>
      <template #dropdown>
        <el-dropdown-menu >
          <el-dropdown-item command="csv">
            CSV
          </el-dropdown-item>
          <el-dropdown-item command="json">
            JSON
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-row>
</template>
<script setup>
import {Download} from '@element-plus/icons-vue';
import {useScenarioStore} from "~/stores/scenario.js";
const dayjs = useNuxtApp().$dayjs;
const scenarioStore = useScenarioStore();

const download= (type) =>{
  const date = dayjs().format('YYYYMMDD')
  const filename = `시나리오${date}.${type}`
  const fileType = `text/${type};charset=utf-8;`
  console.log(filename)
  console.log(fileType)
  scenarioStore.exportScenario(type).then((result)=>{
    const blob = new Blob([result.data], { type: fileType }); // 인코딩 설정
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename; // 다운로드할 파일 이름 설정
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }).catch(()=>{
    alert("다운로드 실패");
  })
}
</script>