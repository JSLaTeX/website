import { createApp } from "vue";
import { Quasar } from "quasar";
import App from "./app.vue";
import "virtual:windi.css";
import "quasar/src/css/index.sass";
import "./css/global.postcss";

const app = createApp(App);
app.use(Quasar);
app.mount("#app");
