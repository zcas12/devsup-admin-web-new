<template>
  <el-header id="header">
    <el-row class="row items-center h-full">
      <h2 class="text-[18px]">{{title}}</h2>
      <div class="ml-auto" >
        <el-tooltip class="item" effect="dark" content="로그아웃" placement="bottom">
          <el-button
              text
              class="pa-2"
              size="large"
              @click="logout">
            <i class="mdi mdi-logout text-[24px]"></i>
          </el-button>
        </el-tooltip>
      </div>
    </el-row>
  </el-header>
</template>
<script setup>
import {} from "@element-plus/icons-vue";
import {useLayoutsStore} from "~/stores/layouts.ts";
import {storeToRefs} from "pinia";
const router = useRouter();
const currentRoute = router.currentRoute;
const _ = useNuxtApp().$_;

const layoutsStore = useLayoutsStore();
const {getNavList} = storeToRefs(layoutsStore);
const title = ref("");

watch(
    () => currentRoute,
    (route) => {
      const result = _.find(getNavList.value, { name: route.value.name})
      title.value = result?.title
    },
    { deep: true, immediate: true }
);
const logout = () =>{
  localStorage.removeItem('accessToken');
  router.push('/login')
}
</script>
<style lang="scss">
#header{
  background-color: #ffffff;
  border-bottom: 1px solid #e1e1e1;
}
</style>
