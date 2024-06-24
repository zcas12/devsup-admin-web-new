<template>
  <el-container direction="horizontal" class="h-full">
    <layouts-nav></layouts-nav>
    <el-container direction="vertical">
      <layouts-header></layouts-header>
      <el-main id="main" class="h-full">
        <slot />
      </el-main>
      <layouts-footer></layouts-footer>
    </el-container>
  </el-container>
</template>
<script setup>

</script>