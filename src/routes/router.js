import { createRouter, createWebHistory } from "vue-router";
import PostIndex from "../pages/posts/PostIndex.vue";
import Login from "../pages/auth/Login.vue";
import { useAuthStore } from "../store/auth/useAuthStore.js";

const setMeta= (isAuthenticated = false, guestOnly = false) => {
  return {
    isAuthenticated,
    guestOnly,
  }
}

const routes = [
  {
    path: '/',
    redirect: '/posts',
    meta: setMeta(false, false),
  },
  // 인증 관련
  {
    path: '/login',
    component: Login,
    meta: setMeta(false, true),
  },
  // 게시글 관련
  {
    path: '/posts',
    component: PostIndex,
    meta: setMeta(false, false),
  },
  // {
  //   path: '/posts/:id',
  //   component: PostShow,
  //   meta: setMeta(true, false),
  // },
  // 유저관련
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 네비게이터 라우터
router.beforeEach(async (to, from, next) => {
  // authStore 확인
  const authStore = useAuthStore();
  
  // 토큰 재발급 시도(리프래시 대응)
  if(!authStore.isLoggedIn && !authStore.isTryReissue) {
    try {
      await authStore.reissue();
    } catch (error) {
      // 재발급 실패시 로그인 페이지로로
      return next('/login');
    }
  }

  // 인증이 필요한 페이지인데 로그인 안된된 경우 로그인으로 이동
  if(to.meta.isAuthenticated && !authStore.isLoggedIn) {
    return next('/login');
  }

  // 게스트만 접근 가능한 페이지인데 로그인 중이면면 메인으로 이동
  if(to.meta.guestOnly && authStore.isLoggedIn) {
    return next('/');
  }

  // 그 외는 통과과
  next();
});

export default router;
