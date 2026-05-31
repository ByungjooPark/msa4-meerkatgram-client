import { defineStore } from "pinia";
import { ref } from "vue";
import myAxios from "../../api/myAxios";
import { useMyErrorStore } from "../error/useMyErrorStore";

export const useAuthStore = defineStore('authStore', () => {
  // 1. State (ref)
  const isLoggedIn = ref(false);
  const accessToken = ref('');
  const userInfo = ref(null);
  const isTryReissue = ref(false);

  // 2. Getters (computed)
  // 3. Actions (function)
  const clearAuthStore = () => {
    isLoggedIn.value = false;
    accessToken.value = '';
    userInfo.value = null;
  }

  const clearAuthStoreReissue = () => {
    clearAuthStore();
    isTryReissue.value = true;
  }

  const login = async (inputs) => {
    try {
      const url = '/api/login';

      const res = await myAxios.post(url, inputs);
      const data = res.data.data;
      isLoggedIn.value = true;
      accessToken.value = data.accessToken;
      userInfo.value = data.user;
      isTryReissue.value = false;
    } catch(error) {
      clearAuthStore();
      console.error(error);
      useMyErrorStore().setErrorInfo(error);
    }
  }

  const reissue = async() => {
    try {
      const url = '/api/reissue-token';

      const res = await myAxios.post(url);
      const data = res.data.data;
      isLoggedIn.value = true;
      accessToken.value = data.accessToken;
      userInfo.value = data.user;
    } catch(error) {
      clearAuthStoreReissue();
    }
  }
  
  return {
    // state
    isLoggedIn,
    accessToken,
    userInfo,
    isTryReissue,

    // getters

    // actions
    clearAuthStore,
    clearAuthStoreReissue,
    login,
    reissue,
  }
});
