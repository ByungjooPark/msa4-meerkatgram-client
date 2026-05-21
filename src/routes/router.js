import { createRouter, createWebHistory } from "vue-router";
import PostIndex from "../pages/posts/PostIndex.vue";

const routes = [
  {
    path: '/',
    component: PostIndex,
  },
  {
    path: '/posts',
    component: PostIndex,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
