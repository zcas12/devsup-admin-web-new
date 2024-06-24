<template>
  <div>
    <div v-if="scenarioDetail.id" class="row flex-nowrap align-center">
      <el-col :span="12">
        <el-radio v-model="chatbotType" label="contents">Contents</el-radio>
        <el-radio v-model="chatbotType" label="link">Link</el-radio>
      </el-col>
      <el-col :span="12" class="text-right mr-3">
        <el-button v-if="!editMode" text @click="modify()">수정</el-button>
        <el-button v-if="editMode" text @click="cancel()">취소</el-button>

        <el-button v-if="editMode" text @click="save()">저장</el-button>
      </el-col>
    </div>
    <div v-if="!scenarioDetail.id">
      <el-empty :image-size="200"></el-empty>
    </div>
    <div v-if="scenarioDetail.id" class="message-box">
      <div v-if="chatbotType === 'contents'" class="row flex-nowrap">
        <img :src="profile" alt="프로필" class="icon_bot chatbot" >
        <div class="text-wrap">
          <div
              v-if="!editMode"
              class="text-box"
              v-html="scenarioDetail.contents"
          >
          </div>

          <client-only>
            <tiptap-editor
                v-if="editMode"
                class="text-box"
                :key="tiptapKey"
                :contents="scenarioDetail.contents"
                @input="scenarioDetail.contents = $event"
            />
          </client-only>
          <ul class="select-box" :class="{'border-none': !childrenYn && !editMode}">
            <li
                v-for="(item, index) in children"
                :key="index"
                class="select-item row items-center justify-center"
            >
              <el-input v-if="editMode" v-model="item.name" placeholder="" ></el-input>
              <el-button
                  v-if="editMode"
                  class="ml-2"
                  :icon="Close"
                  circle plain
                  @click="remove(item,index)"
              >
              </el-button>
              <p v-if="!editMode">{{item.name}}</p>
            </li>
            <li
                v-if="editMode"
                class="select-item add-button row items-center justify-center"
                @click="addMenu()"
            >
              <el-icon style="font-size: 24px;"><Plus/></el-icon>
            </li>
          </ul>
        </div>
      </div>

      <div v-if="chatbotType === 'link'" style="width: 100%" class="row mt-5">
        <el-input
            v-model="scenarioDetail.url"
            :disabled="!editMode"
            placeholder="URL Link를 입력해주세요."
        >
          <template #prepend>URL</template>
        </el-input>
      </div>
    </div>
  </div>
</template>
<script setup>
import {useScenarioStore} from "~/stores/scenario";
import {storeToRefs} from "pinia";
import profile from '@/assets/img/profile.png'
import {Close, Plus} from '@element-plus/icons-vue'
const _ = useNuxtApp().$_;
const scenarioStore = useScenarioStore();
const {getSelectedScenario} = storeToRefs(scenarioStore);
const router = useRouter();
const currentRoute = router.currentRoute;

const tiptapKey = ref(0);
const editMode = ref(false);
const chatbotType = ref("contents");
const scenarioDetail = ref({});
const children = ref([]);
const deleteList = ref([]);

const selectChildren = computed(() => {
  return _.cloneDeep(getSelectedScenario.value?.children);
})
const childrenYn = computed(() => {
  return selectChildren.value?.length > 0
})
watch(
    () => getSelectedScenario.value,
    () => {
      editMode.value = false;
      scenarioDetail.value = {...getSelectedScenario.value}
      children.value =[];
      deleteList.value = [];
      if (childrenYn.value) children.value = [...selectChildren.value]
    },
    { immediate: true}
);
watch(
    () => scenarioDetail.value,
    (val) => {
      tiptapKey.value++;
      /*contents모드와 link 모드 분기점*/
      if (val?.contents){
        chatbotType.value = 'contents'
      }else{
        chatbotType.value = 'link'
      }
    },
    { immediate: true}
);

/*시나리오 상세 조회*/
const loadDetail = (id) => {
  const param ={scenarioId: id}
  scenarioStore.selectScenario(param);
}
/*수정버튼*/
const modify = () => {
  editMode.value = true;
}
/*취소 버튼*/
const cancel = () => {
  deleteList.value = [];
  loadDetail(currentRoute.value.query.id);
  editMode.value = false;
}
/*저장버튼*/
const save = async () => {
  if (chatbotType.value === 'contents'){
    if(!scenarioDetail.value.contents){
      alert("내용을 입력해주세요.");
    }
    const params = {
      id: scenarioDetail.value.id,
      contents: scenarioDetail.value.contents,
      children: children.value
    }
    try {
      /*컨텐츠와 메뉴 버튼 명(하위 메뉴) 저장*/
      if (children.value.length > 0){ // 하위 메뉴 있을시 요청
        await scenarioStore.saveScenarioChild(params);
      }
      if (deleteList.value.length > 0){
        const deleteIds = {
          ids: [...deleteList.value]
        }
        await scenarioStore.deleteScenario(deleteIds);
      }
      await scenarioStore.saveScenario(params);

      alert("저장했습니다.");
      await scenarioStore.loadScenario();
    }catch (error) {
      console.log(error)
      alert('에러 발생:'+ error.response.data?.resultMsg);
    }finally{
      cancel();
    }
  }else if (chatbotType.value === 'link'){
    /*경로 저장*/
    if(!scenarioDetail.value.url){
      alert("경로를 입력해주세요.");
      return;
    }
    const params = {
      id: scenarioDetail.value.id,
      url: scenarioDetail.value.url
    }
    try {
      await scenarioStore.saveScenario(params)
      alert("저장했습니다.");
      await scenarioStore.loadScenario();
    }catch (error) {
      alert('에러 발생:'+ error.response.data?.resultMsg);
      console.error('에러 발생:', error.response.data?.resultMsg);
    }finally{
      cancel();
    }
  }
}
const remove = (item,index) => {
  if (item.id) deleteList.value.push(item.id)
  children.value.splice(index, 1);
}
const addMenu = () => {
  const seq = children.value.length + 1
  const addChildren = {
    name:"",
    level: scenarioDetail.value.level + 1,
    seq:seq,
    parentId: scenarioDetail.value.id
  }
  children.value = [...children.value, addChildren]
}
</script>