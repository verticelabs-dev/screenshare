import Vue from "vue";
import VueRouter from "vue-router";

import JoinRoom from "../views/JoinRoom";
import MeetingRoom from "../views/MeetingRoom";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "JoinRoom",
    component: JoinRoom,
  },
  {
    path: "/room",
    name: "MeetingRoom",
    component: MeetingRoom,
  },
  {
    path: "/:roomCode",
    name: "JoinMeetinByRoomId",
    component: MeetingRoom,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
