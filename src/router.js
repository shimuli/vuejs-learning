import { createRouter, createWebHistory } from "vue-router";
import AvengersHeros from "./pages/AvengersHeros";
import Calendar from "./pages/Calendar";
import Home from "./pages/Home";
import Markdown from "./pages/Markdown";
import Slider from "./pages/slider";
import Calculator from "./pages/Calculator";
import ReusableMpdal from "./pages/ReusableModal";
import Chats from "./pages/Chats";
import store from "./store/index";

const routes = [
  { path: "/", component: Home },
  { path: "/avengers-heros", component: AvengersHeros, meta: { middleware: "auth" }, },
  { path: "/calendar", component: Calendar },
  { path: "/markdown", component: Markdown, meta: { middleware: "auth" }, },
  { path: "/slider", component: Slider },
  { path: "/calculator", component: Calculator, meta: { middleware: "auth" }, },
  { path: "/reusable-modal", component: ReusableMpdal },
  {path: "/chats",component: Chats,meta: { middleware: "auth" },},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  if (to.meta.middleware) {
    const middleware = require(`./middleware/${to.meta.middleware}`);
    if (middleware) {
      middleware.default(next, store);
    }
    else{
        next();
    }
  }
  else{
      next()
  }
});
export default router;
