import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("../components/LoginDisp.vue"),
  },
  {
    path: "/tokio",
    component: () => import("../components/ChatRoom0.vue"),
  },
  {
    path: "/shonan",
    component: () => import("../components/ChatRoom1.vue"),
  },
  {
    path: "/fuji",
    component: () => import("../components/ChatRoom2.vue"),
  },
  {
    path: "/ban",
    component: () => import("../components/BanDisp.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
