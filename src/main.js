import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import store from "./store/";
import dayjs from "dayjs";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import VCalendar from "v-calendar";
import "v-calendar/lib/v-calendar.min.css";

library.add(faTimes, faPlus);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(VCalendar, {
  firstDayOfWeek: 2
});

Object.defineProperty(Vue.prototype, "$dayjs", { value: dayjs });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
