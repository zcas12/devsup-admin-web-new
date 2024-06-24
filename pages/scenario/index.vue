<template>
  <el-container class="scenario-wrap" direction="vertical">
    <el-row :gutter="24" class="row m-5 justify-center items-start">
      <el-col class="my-2" :xs="24" :sm="24" :md="8" :lg="8">
        <el-card class="tree-box" shadow="never">
          <scenario-export></scenario-export>
          <scenario-tree-view></scenario-tree-view>
        </el-card>
      </el-col>
      <el-col class="my-2" :xs="24" :sm="24" :md="16" :lg="16">
        <el-card class="tree-box" shadow="never">
          <scenario-detail></scenario-detail>
        </el-card>
      </el-col>
    </el-row>
  </el-container>
</template>
<script setup>
import {useScenarioStore} from "~/stores/scenario.js";
const router = useRouter();
const currentRoute = router.currentRoute;
const scenarioStore = useScenarioStore();

definePageMeta({
  middleware: ["auth"]
})

onMounted(() => {
  scenarioStore.loadScenario();
  if(currentRoute.value.query.id){
    const param ={scenarioId: currentRoute.value.query.id}
    scenarioStore.selectScenario(param);
  }else{
    scenarioStore.setSelectedScenario({});
  }
})
</script>
<style lang="scss">
@media (min-width: 992px) {
  .scenario-wrap{
    width: 992px;
    padding: 0;
  }
}

.tree-box{
  min-height: 600px;
}
.icon_bot {
  width: 34px;
  height: 34px;
  margin-top: 20px;
  border-radius: 20px;
  background-color: #CAE6FC;
}
.message-box {
  width: 100%;
  display: flex;
  .text-wrap {
    width: 100%;
    padding: 20px 10px 0 10px;
    /*컨텐츠 문구*/
    .text-box {
      white-space: pre-line;
      background-color: #DEE2E6;
      width: fit-content;
      max-width: 264px;
      padding: 14px;
      border-radius: 0 13px 13px 13px;
      color: #495057;
      line-height: 21px;
      margin-bottom: 10px;
      a{
        color: #007aff;
        text-decoration-line: underline;
        display: inline;
        overflow: hidden;
        word-break: break-all;
      }
      .text-red{
        color: #fa2828;
      }
      .text-blue{
        color: #007aff;
      }
      .text-bold{
        font-weight: 700;
      }
      .text-underline{
        text-decoration: underline;
      }
      .fs-15{
        font-size: 15px !important;
      }
      .fs-16{
        font-size: 16px !important;
      }
    }
    .text-edit-box{
      word-wrap: break-word;
      white-space: pre-line;
      background-color: #DEE2E6;
      width: fit-content;
      max-width: 314px;
      padding: 14px;
      border-radius: 0 13px 13px 13px;
      color: #495057;
      margin-bottom: 10px;
      p {
        display: block;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
      }
    }
  }
}
.border-none{
  border: none !important;
}
.select-box {
  max-width: 264px;
  border: 1px solid #DEE2E6;
  background-color: #fff;
  border-radius: 8px;
  text-align: center;
  margin: 10px 0 10px 0;
  overflow: hidden;
  /*메뉴 선택 item*/
  .select-item {
    color: #2196F3;
    font-size: 14px;
    line-height: 16px;
    background-color: transparent;
    padding: 0 20px 0 20px;
    height: 48px;
    border-bottom: 1px solid #DEE2E6;
  }
  .select-item:last-child{
    border-bottom: none;
  }
  .add-button:hover{
    background-color: #E9F5FE;
    cursor: pointer;
  }
  // 상담 종료시 버튼 비활성화
  .select-item-off{
    pointer-events: none;
    opacity: 0.7;
    background: #F4F6FB;
  }

}
</style>