import {
  RouteRecordRaw,
  createRouter,
  createWebHashHistory,
  Router,
  RouteLocationNormalized,
} from "vue-router";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $router: Router;
    $route: RouteLocationNormalized;
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import(/* webpackChunkName: "home" */ "@/views/home/index.vue"),
  },
  {
    path: "/list",
    component: () => import(/* webpackChunkName: "list" */ "@/views/list/index.vue"),
  },
];

export default createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});
