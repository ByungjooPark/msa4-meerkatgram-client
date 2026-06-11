import { defineStore } from "pinia";
import myAxios from "../../api/myAxios";

export const useFileStore = defineStore('fileStore', () => {
  // State

  // Getters

  // Actions
  const uploadProfile = async (file) => {
    try {
      const url = '/api/files/profiles';

      // Form Data 생성
      const data = new FormData();
      data.append('file', file);

      // Content-type 변경
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      const res = await myAxios.post(url, data, config);
      return res.data.data.fileUri;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  const uploadPost = async (file) => {
    try {
      const url = '/api/files/posts';

      // Form Data 생성
      const data = new FormData();
      data.append('file', file);

      // Content-type 변경
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      const res = await myAxios.post(url, data, config);
      return res.data.data.fileUri;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  return {
    uploadProfile,
    uploadPost,
  }
});
