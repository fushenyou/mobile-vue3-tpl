import { createApp } from "vue";
import App from "./App.vue";
import router from "./routers";

const main = createApp(App);
main.use(router);
main.mount("#app");
