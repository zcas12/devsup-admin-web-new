<template>
  <div>
    <el-card shadow="never">
      <el-row class="text-[18px] items-center ml-2">
        <h3>클릭수 </h3>
        <el-icon><Top /></el-icon>
        <h3> Top 1</h3>
      </el-row>
      <el-row class="my-5 items-center justify-center">
        <span class="text-[22px] text-blue-500">{{topRank?.name}}</span>
      </el-row>
    </el-card>
    <el-card class="mt-3" shadow="never">
      <el-row class="text-[18px] items-center ml-2">
        <h3>클릭수 </h3>
        <el-icon><Bottom/></el-icon>
        <h3> Top 1</h3>
      </el-row>
      <el-row class="my-5 items-center justify-center">
        <span class="text-[22px] text-red-500">{{ bottomRank?.name }}</span>
      </el-row>
    </el-card>
  </div>
</template>
<script setup>
import {Top,Bottom} from "@element-plus/icons-vue";
const props = defineProps({
  rankData: {
    type: Array,
    required: true
  }
})
const topRank = computed(() => {
  return props.rankData[0];
})
const bottomRank = computed(() => {
  const index = props.rankData.length - 1
  return props.rankData[index]
})
</script>