import { createApp } from "vue";

import VCalendar from "v-calendar";
import App from "./App.vue";
import router from "./router";
import store from "./store";

createApp(App)
  .use(store)
  .use(VCalendar, {})
  .use(router)
  .mount("#app");
