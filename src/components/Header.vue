<script setup>
import { ref } from 'vue';
import MyButton from './button/MyButton.vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth/useAuthStore.js';

const router = useRouter();
const authStore = useAuthStore();

function redirectMain() {
  router.push('/');
}
function redirectLogin() {
  router.push('/login');
}
function redirectRegistration() {
  router.push('/registration');
}
</script>

<template>
  <div class="header">
    <div class="title-box">
      <h1 class="title" @click="redirectMain()">Meerkatgram</h1>
    </div>
    <div class="btn-box">
      <MyButton
        @click="redirectLogin()"
        v-if="!authStore.isLoggedIn"
        :content="'Sign In'"
        :color="'gray'"
        :size="'small'"
      />
      <MyButton
        @click="redirectRegistration()"
        v-if="!authStore.isLoggedIn"
        :content="'Sign Up'"
        :color="'white'"
        :size="'small'"
      />
      <MyButton
        v-if="authStore.isLoggedIn"
        :content="'Logout'"
        :color="'black'"
        :size="'small'"
      />
    </div>
  </div>
</template>

<style scoped>
.header {
  padding: 10px;
  display: flex;
  justify-content: space-between;
}

.title-box {
  display: flex;
  align-items: center;
}

.title {
  font-size: 20px;
}

.btn-box {
  display: flex;
  gap: 10px;
}
</style>
