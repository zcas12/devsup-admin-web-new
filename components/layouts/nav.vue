<template>
  <el-menu
      :default-active="active"
      :router="true"
      :collapse="getIsCollapse"
      class="h-full el-menu-nav"
      text-color="#909399"
      active-text-color="#2196f3"
      background-color="#f4f4f4"
  >
    <el-row class="row h-[50px] mt-2 justify-center items-center">
      <div v-if="!getIsCollapse">
        <el-image
            style="width: 120px;"
            :src="logo"
            fit
        >
        </el-image>
      </div>
    </el-row>
    <el-menu-item
        v-for="(menu, index) in getNavList"
        :key="index"
        :index="menu.path"
    >
      <el-icon v-if="menu.name === 'dashboard'"><Platform/></el-icon>
      <el-icon v-if="menu.name === 'scenario'"><ChatLineRound/></el-icon>
      <el-icon v-if="menu.name === 'log-history'"><Document/></el-icon>
      <span slot="title">{{ menu.title }}</span>
    </el-menu-item>
<!--    <el-menu-item index="/dashboard/">
      <el-icon><Platform /></el-icon>
      <span slot="title">대시보드</span>
    </el-menu-item>
    <el-menu-item index="/scenario/">
      <el-icon><ChatLineRound /></el-icon>
      <span slot="title">시나리오</span>
    </el-menu-item>
    <el-menu-item index="/log-history/">
      <el-icon><Document /></el-icon>
      <span slot="title">활동내역</span>
    </el-menu-item>-->
  </el-menu>
</template>
<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import {useLayoutsStore} from "~/stores/layouts.ts";
import logo from '@/assets/img/logo.png'
import {ChatLineRound, Document, Platform} from "@element-plus/icons-vue";
const route = useRoute();

const layoutsStore = useLayoutsStore();
const {getIsCollapse,getNavList} = storeToRefs(layoutsStore)

const windowWidth = ref(1200);

onMounted(() => {
  windowWidth.value = window.innerWidth
  window.addEventListener('resize', handleResize);
})
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});


watch(windowWidth, (value) => {
  if (value < 800 && !getIsCollapse.value) {
    layoutsStore.setIsCollapse(true);
  } else if (value > 800 && getIsCollapse.value) {
    layoutsStore.setIsCollapse(false);
  }
}, { immediate: true })

const active = computed(() => {
  let path = route.path;
  const last = path.charAt(path.length - 1);
  if (last !== "/") path += "/";
  return path;
});

const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

</script>
<style lang="scss">
.el-menu-nav:not(.el-menu--collapse) {
  min-width: 250px !important;
}
.el-menu--collapse {
  min-width: 64px;
}
</style>