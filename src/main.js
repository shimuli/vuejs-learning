import { createApp } from 'vue'
import App from './App.vue'
import "./assets/style.css"
import router from "./router"
import store from "./store/index"


const app = createApp(App);
app.use(router);
app.mount('#app');
app.use(store);


