import Vue from "vue";
import Vuex from "vuex";
import customers from "./modules/customers";
import conversations from "./modules/conversations";
import accounts from "./modules/accounts";
import equipment from "./modules/equipment";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    customers,
    conversations,
    accounts,
    equipment
  }
});
