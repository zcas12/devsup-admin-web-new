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
              @keyup.native.enter="authenticate()"
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
            @click="authenticate()"
        >로그인
        </el-button>
      </el-row>
    </el-card>
  </el-row>
</template>
<script setup>
import { ref } from 'vue'
import logo from '@/assets/img/logo.png'
import {Lock, UserFilled} from "@element-plus/icons-vue";
import {useAuthStore} from "~/stores/auth.js";
const router = useRouter();
const authStore = useAuthStore();
definePageMeta({
  layout: 'blank'
})
const account = ref({
  username: null,
  password: null
})
const rememberEmail = ref(false)
const processLogin = ref(false)


/*Methods 정의*/
const authenticate = () => {
  processLogin.value = true;
  const param = {
    username: account.value.username,
    password: account.value.password
  }
  authStore.login(param).then((res)=>{
    if (res.resultCd !== '200'){
      processLogin.value = false;
      if (res.resultMsg) alert(res.resultMsg);
      else throw new Error('로그인에 실패했습니다..');
    }else{
      router.push('/dashboard')
    }
  }).catch((e)=>{
    processLogin.value = false;
    alert("로그인에 실패했습니다.");
    console.log(e)
  })
}

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