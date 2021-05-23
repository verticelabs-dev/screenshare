import Vue from "vue";
import VueRouter from "vue-router";
import Display from "../views/Display";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Display",
    component: Display
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
