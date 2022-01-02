import Vue from "vue";
import VueRouter from "vue-router";

import JoinRoom from "../views/JoinRoom";
import MeetingRoom from "../views/MeetingRoom";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "MeetingRoom",
    component: MeetingRoom,
    meta: {
      sideapp: true,
      sidebar: true,
    },
  },
  {
    path: "/join",
    name: "JoinRoom",
    component: JoinRoom,
    meta: {
      sidebar: false,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
