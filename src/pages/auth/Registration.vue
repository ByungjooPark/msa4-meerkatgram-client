<script setup>
import { onBeforeUnmount, reactive, ref } from 'vue';
import MyButton from '../../components/button/MyButton.vue';
import MyInput from '../../components/input/MyInput.vue';
import { useFileStore } from '../../store/file/useFileStore.js';
import { useAuthStore } from '../../store/auth/useAuthStore.js';
import { useRouter } from 'vue-router';

const fileStore = useFileStore();
const authStore = useAuthStore();
const router = useRouter();

const previewImage = ref(null);
const selectedFile = ref(null);
const registrationForm = reactive({
  email: '',
  password: '',
  passwordChk: '',
  nick: '',
  profile: '',
});

const handleSubmit = async () => {
  if(await authStore.registration(registrationForm)) {
    alert('회원가입을 완료했습니다.');
    router.replace('/login');
  }
}

const handleImageUpload = async (e) => {
  const file = e.target.files[0];

  if(file) {
    if(previewImage.value) {
      // 기존에 생성된 메모리 URL이 있다면 해제 (메모리 누수 방지)
      URL.revokeObjectURL(previewImage.value);
    }
    
    const fileUrl = await fileStore.uploadProfileImage(file);
    registrationForm.profile = fileUrl;

    selectedFile.value = file;
    // 파일 객체를 브라우저에서 접근 가능한 임시 URL로 변환
    previewImage.value = URL.createObjectURL(file);
  }
}

onBeforeUnmount(() => {
  if(previewImage.value) {
    // 기존에 생성된 메모리 URL이 있다면 해제 (메모리 누수 방지)
    URL.revokeObjectURL(previewImage.value);
  }
});
</script>

<template>
<form @submit.prevent="handleSubmit">
  <MyInput
    :type="'email'"
    :placeholder="'Email'"
    :readonly="false"
    :required="true"
    v-model="registrationForm.email"
  ></MyInput>
  <MyInput
    :type="'password'"
    :placeholder="'Password'"
    :readonly="false"
    :required="true"
    v-model="registrationForm.password"
  ></MyInput>
  <MyInput
    :type="'password'"
    :placeholder="'PasswordChk'"
    :readonly="false"
    :required="true"
    v-model="registrationForm.passwordChk"
  ></MyInput>
  <MyInput
    :type="'text'"
    :placeholder="'Nick'"
    :readonly="false"
    :required="true"
    v-model="registrationForm.nick"
  ></MyInput>
  
  <div
    class="preview-image"
    v-if="previewImage"
    :style="{backgroundImage: `url(${previewImage})`}"
  ></div>

  <input
    type="file"
    accept="image/*"
    @change="handleImageUpload"
  >

  <MyButton
    :btn-type="'submit'"
    :color="'black'"
    :size="'middle'"
    :content="'Sign Up'"
  ></MyButton>
</form>
</template>

<style scoped>
form {
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.preview-image {
  width: 70px;
  height: 70px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
}
</style>
