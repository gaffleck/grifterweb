import Vue from "vue";
import Vuex from "vuex";
import friends from "./modules/friends";
import customers from "./modules/customers";
import gifts from "./modules/gifts";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    friends,
    customers,
    gifts
  }
});
