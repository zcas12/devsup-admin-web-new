<template>
  <el-main id="blank-main" class="h-full ">
    <slot />
  </el-main>
</template>
<script>
export default {
  name:'blank'
}
</script>
<style lang="scss" scoped>
#blank-main{
  background-color: #F1F3F5;
  padding: 0 !important;
;
}
</style>
