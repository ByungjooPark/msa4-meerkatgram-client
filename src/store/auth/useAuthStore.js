import { defineStore } from "pinia";
import { ref } from "vue";
import myAxios from "../../api/myAxios";
import { useMyErrorStore } from "../error/useMyErrorStore";

export const useAuthStore = defineStore('authStore', () => {
  // 1. State
  const isLoggedIn = ref(false);
  const accessToken = ref('');
  const userInfo = ref(null);

  // 2. Getters

  // 3. Actions
  const clearAuthStore = () => {
    isLoggedIn.value = false;
    accessToken.value = '';
    userInfo.value = null;
  }

  const login = async (loginForm) => {
    try {
      const url = '/api/login';

      const res = await myAxios.post(url, loginForm);
      const data = res.data.data;
      accessToken.value = data.accessToken;
      userInfo.value = data.user;
      isLoggedIn.value = true;
    } catch(error) {
      console.error(error);
      if(error.response) {
        if(error.response.data.code === 'E01') {
          alert(error.response.data.data);
          return;
        }
      }

      useMyErrorStore().setErrorInfo(error);
    }
  }

  const reissue = async () => {
    try {
      const url = '/api/reissue-token';

      const res = await myAxios.post(url);
      const data = res.data.data;
      accessToken.value = data.accessToken;
      userInfo.value = data.user;
      isLoggedIn.value = true;
    } catch (error) {
      clearAuthStore();
    }
  }

  const logout = async () => {
    try {
      const url = '/api/logout';

      await myAxios.post(url);
    } catch(error) {
      console.error(error);
    } finally {
      clearAuthStore();
    }
  }

  const registration = async (registrationData) => {
    try {
      const url = '/api/users';

      await myAxios.post(url, registrationData);
      return true;
    } catch(error) {
      console.error(error);
      if(error.response) {
        if(error.response.data.code === 'E05') {
          alert(error.response.data.data);
          return false;
        }
      }

      useMyErrorStore().setErrorInfo(error);
    } finally {
      clearAuthStore();
    }
  }

  return {
    // State
    isLoggedIn,
    accessToken,
    userInfo,

    // Getters

    // Actions
    login,
    reissue,
    logout,
    registration,
  }
});
