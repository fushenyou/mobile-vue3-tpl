import { createApp } from "vue";
import App from "./App.vue";
import router from "./routers";

import "amfe-flexible";

const main = createApp(App);
main.use(router);
main.mount("#app");
