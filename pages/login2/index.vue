<template>
  <el-row class="flex container h-full justify-center	items-center max-w-full">
    <el-card class="login-box">
      <el-row class="mb-3 px-2 py-2 row items-end">
        <div>
          <el-image
              :src="logo"
              style="width: 120px"
              alt=""
          />
        </div>
        <h2 class="title ml-auto">개발지원실 관리자</h2>
      </el-row>
      <form>
        <div class="mb-5">
          <el-input
              id="account-email"
              size="large"
              placeholder="아이디를 입력해주세요."
              v-model="account.username"
          >
            <template #prepend>
              <el-icon><UserFilled/></el-icon>
            </template>
          </el-input>
        </div>
        <div class="mb-5">
          <el-input
              id="account-password"
              size="large"
              type="password"
              placeholder="비밀번호를 입력해주세요."
              v-model="account.password"
          >
            <template #prepend>
              <el-icon><Lock/></el-icon>
            </template>
          </el-input>
        </div>
      </form>
      <el-row class="flex login-btn-box mb-5">
        <el-button
            size="large"
            class="login-btn"
            :loading="processLogin"
        >로그인
        </el-button>
      </el-row>
    </el-card>
  </el-row>
</template>
<script>
import logo from '@/assets/img/logo.png';
import {Lock, UserFilled} from "@element-plus/icons-vue";
import {useAuthStore} from '@/stores/auth';

export default {
  setup() {
    definePageMeta({
      layout: 'blank',
      middleware: 'auth'
    })
  },
  components: {UserFilled, Lock},
  data:() => ({
    logo:logo,
    account:{
      username:null,
      password:null
    },
    rememberEmail: false,
    processLogin: false
  }),
  created() {
    console.log("created")
  },
  mounted() {
    console.log("mounted");
    this.test()
  },
  computed:{
    testData(){
      return useAuthStore().token
    }
  },
  methods:{
    test(){
      console.log("test")
      useAuthStore().actionsTest()
      console.log(useAuthStore().getToken)
    }
  }
}
</script>
<script setup>
/*definePageMeta({
  layout: 'blank',
  middleware: 'auth'
})*/

console.log("1");

onBeforeMount(() => {
  console.log("onBeforeMount")
})
onMounted(() => {
  console.log("onMounted")
})
</script>
<style lang="scss" scoped>
.container {
  .login-box {
    width: 375px;
    .title{
      color: #212121;
      font-size: 1.4em;
      font-weight: bold;
    }
    .login-btn-box{
      .login-btn{
        background-color:#2196F3;
        color:#fff;
        width: 100%;
      }
    }
  }
}
</style>