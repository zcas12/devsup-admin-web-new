<template>
  <div>
    <el-row class="items-center ml-2 mb-2">
      <h3 class="text-[18px]">기간별 메뉴 호출 순위</h3>
    </el-row>
    <client-only>
      <el-table
          :data="gridData"
          class="ml-3"
          border
          max-height="300"
          style="width: 100%;">
        <el-table-column
            type="index"
            label="순위"
            width="100">
        </el-table-column>
        <el-table-column
            prop="name"
            label="메뉴명"
            width="380">
        </el-table-column>
        <el-table-column
            prop="cnt"
            label="호출수">
        </el-table-column>
      </el-table>
    </client-only>
  </div>
</template>
<script setup>
const props = defineProps({
  gridData: {
    type: Array,
    required: true
  }
})
const menuCallData = [{
  rank: 1,
  name: '결제내역조회문의',
  cnt: 140
}, {
  rank: 2,
  name: '신규계약',
  cnt: 122
}, {
  rank: 3,
  name: '가맹점 정보변경',
  cnt: 99
}, {
  rank: 4,
  name: '환불/취소문의',
  cnt: 80
}, {
  rank: 5,
  name: '기술문의(연동오류)',
  cnt: 79
}]
</script>