import { defineStore } from "pinia";
import { ref } from "vue";

export const useMyErrorStore = defineStore('myErrorStore', () => {
  // 1. State (ref)
  const isError = ref(false);
  const errorCode = ref('');
  const errorMsg = ref('');

  // 2. Getters (computed)

  // 3. Actions (function)
  const setErrorInfo = (error) => {
    const errorData = error.response?.data || {code: 'UNKNOWN_ERROR', message: '예기치 못한 에러가 발생했습니다.'};
    errorCode.value = errorData.code;
    errorMsg.value = errorData.message;
    isError.value = true;
  }

  const clearErrorInfo = () => {
    errorCode.value = '';
    errorMsg.value = '';
    isError.value = false;
  }

  return {
    isError,
    errorCode,
    errorMsg,
    setErrorInfo,
    clearErrorInfo,
  }
});
