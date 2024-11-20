<template>
  <div class="mt-3">
    <el-form :model="form" label-width="120px" style="max-width: 600px">
      <el-form-item label="아이디" required>
        <el-input v-model="form.username" placeholder="아이디를 입력해주세요.">
        </el-input>
      </el-form-item>
      <el-form-item label="비밀번호" required>
        <el-input v-model="form.password" type="password" placeholder="비밀번호를 입력해주세요.">
        </el-input>
      </el-form-item>
      <el-form-item label="비밀번호 확인" required>
        <el-input v-model="form.confirmPassword" type="password" placeholder="비밀번호 확인을 입력해주세요.">
        </el-input>
      </el-form-item>
      <el-form-item label="이름" required>
        <el-input v-model="form.name" placeholder="이름을 입력해주세요.">
        </el-input>
      </el-form-item>
      <el-form-item label="부서명" required>
        <el-input v-model="form.deptName" placeholder="부서명을 입력해주세요.">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="processSignUp" @click="onSubmit">가입하기</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue';
import {useAuthStore} from "~/stores/auth.js";
const authStore = useAuthStore();

const form = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  name: '',
  deptName: '',
});
const processSignUp = ref(false);

/*유효성 검사*/
const validateForm = () => {
  if (!form.username) {
    alert('아이디를 입력해주세요.');
    return false;
  }
  if (!form.password) {
    alert('비밀번호를 입력해주세요.');
    return false;
  }
  if (!form.confirmPassword) {
    alert('비밀번호 확인을 입력해주세요.');
    return false;
  }
  if (form.password !== form.confirmPassword) {
    alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
    return false;
  }
  if (!form.name) {
    alert('이름을 입력해주세요.');
    return false;
  }
  if (!form.deptName) {
    alert('부서명을 입력해주세요.');
    return false;
  }
  return true;
};
const onSubmit = () => {
  // 필수값 체크
  if (!validateForm()) return;

  processSignUp.value = true;

  const param = {
    username: form.username,
    password: form.password,
    name: form.name,
    deptName: form.deptName
  }
  authStore.signUp(param).then((res)=>{
    if (res.resultCd !== '200'){
      if (res.resultMsg) alert(res.resultMsg);
      else throw new Error('로그인에 실패했습니다..');
    }else{
      Object.assign(form, {
        username: '',
        password: '',
        confirmPassword: '',
        name: '',
        deptName: '',
      });
      alert('가입에 성공했습니다.');
    }
  }).catch((e)=>{
    alert("가입에 실패했습니다.");
    console.log("error", e);
  }).finally(()=>{
    processSignUp.value = false;
  })
}
/*definePageMeta({
  middleware: ["auth"]
})*/
</script>
<style lang="scss" scoped>

</style>