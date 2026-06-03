import { defineStore } from "pinia";
import myAxios from "../../api/myAxios.js";

export const useFileStore = defineStore('fileStore', () => {
  // State

  // Getters

  // Actions
  const uploadProfileImage = async (file) => {
    try {
      const url = '/api/images/profiles';

      const form = new FormData();
      form.append('file', file);

      const config = {
        headers:{
          "Content-Type": 'multipart/form-data'
        }
      }

      const res = await myAxios.post(url, form, config);
      return res.data.data.fileUrl;
    } catch (error) {
      console.error(error);
    }
  }

  return {
    uploadProfileImage,
  }
});
