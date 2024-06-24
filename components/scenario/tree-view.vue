<template>
  <el-tree
      ref="scenarioList"
      :data="getScenarioList"
      :props="defaultProps"
      node-key="id"
      :indent="24"
      :highlight-current="true"
      current-node-key="selectId"
      :default-expanded-keys="[1,2,3,4]"
      @node-click="handleNodeClick"
  >
  </el-tree>
</template>
<script setup>
import {useScenarioStore} from "~/stores/scenario.js";
import {storeToRefs} from "pinia";
const router = useRouter();
const currentRoute = router.currentRoute;
const scenarioStore = useScenarioStore();
const {getScenarioList} = storeToRefs(scenarioStore);

const scenarioList = ref(null)

const defaultProps = {
  children: 'children',
  label: 'label'
}
onMounted(() => {

})
watch(
    () => currentRoute.value.query.id,
    (id) => {
      nextTick().then(() => {
        scenarioList.value?.setCurrentKey(id,true);
      })
    },
    { deep: true, immediate:true }
);
const handleNodeClick = async (data) => {
  await router.push({path: '/scenario', query: {id: data.id}});
  const param = {scenarioId: data.id}
  await scenarioStore.selectScenario(param);
}
</script>
<script>
export default {
  updated() {
    if(this.$route.query.id){
      this.$nextTick(() => {
        this.$refs.scenarioList.setCurrentKey(this.$route.query.id);
      })
    }
  },
}
</script>