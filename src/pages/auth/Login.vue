<script setup>
import { reactive } from 'vue';
import MyButton from '../../components/button/MyButton.vue';
import MyInput from '../../components/input/MyInput.vue';
import MyStrikeThroughBehindWord from '../../components/text-decoration/MyStrikeThroughBehindWord.vue';
import loginValidator from '../../utils/validator/domain/auth/loginValidator.js';
import { useAuthStore } from '../../store/auth/useAuthStore.js';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const inputs = reactive({
  email: '',
  password: '',
});

const handleSubmit = async () => {
  await authStore.login(inputs);
  router.replace('/posts');
}
</script>

<template>
<form @submit.prevent="handleSubmit">
  <MyInput
    :type="'text'"
    :placeholder="'Email'"
    :readonly="false"
    :required="true"
    :validatorFnc="loginValidator.email"
    v-model="inputs.email"
  ></MyInput>
  <MyInput
    :type="'password'"
    :placeholder="'Password'"
    :readonly="false"
    :required="true"
    :validatorFnc="loginValidator.password"
    v-model="inputs.password"
  ></MyInput>
  <MyButton
    :type="'submit'"
    :color="'gray'"
    :size="'middle'"
    :content="'Log in'"
  ></MyButton>

  <MyStrikeThroughBehindWord
    :content="'or'"
  ></MyStrikeThroughBehindWord>

  <MyButton
    :type="'button'"
    :color="'white'"
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
</style>
