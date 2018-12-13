import Vue from "vue";
import Vuex from "vuex";
import customers from "./modules/customers";
import accounts from "./modules/accounts";
import equipment from "./modules/equipment";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    customers,
    accounts,
    equipment
  }
});
