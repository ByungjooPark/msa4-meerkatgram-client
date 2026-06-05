<script setup>
import { onBeforeMount, onBeforeUnmount, ref } from 'vue';
import MyButton from '../../components/button/MyButton.vue';
import { usePostIndexStore } from '../../store/post/usePostIndexStore.js';
import { useRouter } from 'vue-router';
import { useMyErrorStore } from '../../store/error/useMyErrorStore.js';

const router = useRouter();
const postIndexStore = usePostIndexStore();
const myErrorStore = useMyErrorStore();

const getPagination = async (page = 1) => {
  try {
    await postIndexStore.getPostPagination(page);
  } catch (error) {
    myErrorStore.setErrorInfo(error);
    router.replace('/error');
  }
}

const getNextPage = async () => {
  await getPagination(postIndexStore.getNextPageNumber);
}

const redirectShow = (id) => {
  router.push(`/posts/${id}`);
}

// 라이프 사이클
onBeforeMount(getPagination);
onBeforeUnmount(postIndexStore.clearPostIndex);
</script>

<template>
<div class="card-container">
  <div
    class="card"
    v-for="item in postIndexStore.items"
    :key="item.id"
    :style="{backgroundImage: `url(${item.image})`}"
    @click="redirectShow(item.id)"
  ></div>
</div>
<MyButton
  v-if="!postIndexStore.isLastPage"
  :color="'gray'"
  :size="'big'"
  :content="'Show more posts from Kanna_Kamui'"
  @click="getNextPage()"
/>
</template>

<style scoped>
.card-container {
  padding: 10px;
  gap: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
}
.card {
  padding-top: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 10px;
}
</style>
