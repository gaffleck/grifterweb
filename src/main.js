import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import store from "./store/";
import dayjs from "dayjs";
import Tooltip from "vue-directive-tooltip";
import "vue-directive-tooltip/css/index.css";
import ApiService from "./services/api.service";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTimes,
  faPlus,
  faSearch,
  faEye,
  faStickyNote
} from "@fortawesome/free-solid-svg-icons";
import VCalendar from "v-calendar";
import "v-calendar/lib/v-calendar.min.css";
import "@/styles/general.scss";

library.add(faTimes, faPlus, faSearch, faEye, faStickyNote);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(VCalendar, {
  firstDayOfWeek: 2
});
Vue.use(Tooltip);

Object.defineProperty(Vue.prototype, "$dayjs", { value: dayjs });

Vue.config.productionTip = false;

//INIT API REQUESTS VIA AXIOS WITH BASE URL
ApiService.init(process.env.VUE_APP_ROOT_API);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
