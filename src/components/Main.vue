<script setup>
import MyError from '../pages/errors/MyError.vue';
import { useMyErrorStore } from '../store/error/useMyErrorStore';

const myErrorStore = useMyErrorStore();
</script>

<template>
  <MyError v-if="myErrorStore.isError"></MyError>
  <router-view v-else></router-view>
</template>
