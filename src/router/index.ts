import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home/Home.vue";
import NewGame from "../views/NewGame/NewGame.vue";
import Ranking from "../views/Ranking/Ranking.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/new-game",
    name: "NewGame",
    component: NewGame,
  },
  {
    path: "/ranking",
    name: "Ranking",
    component: Ranking,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
