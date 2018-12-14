import ApiService from "@/services/api.service";

const state = {
  customers: [],
  creatingContact: false,
  creatingCustomer: {
    value: false,
    targetDate: null,
    customerid: null
  },
  currentCustomer: null,
  messages: []
};

// getters
const getters = {};

// actions
const actions = {
  async getAllCustomers({ commit }) {
    try {
      const customers = await ApiService.get("contacts/");
      let cleanCustomers = customers.data.results.filter(
        item => typeof item != "undefined"
      );
      commit("setCustomers", cleanCustomers);
      return { success: true };
    } catch (e) {
      return { success: false, error: "THERE HAS BEEN AN ERRR-OR" };
    }
  },
  async getMatchingCustomers({ commit }) {
    try {
      await delay(1000);
      commit("setCustomers", customers);
      return { success: true };
    } catch (e) {
      return { success: false, error: "THERE HAS BEEN AN ERRR-OR" };
    }
  },
  async getACustomer({ commit, state }, { friendid }) {
    try {
      const friend = await ApiService.get("friends/" + friendid);
      commit("setCurrentCustomer", friend.data);
      return true;
    } catch (e) {
      console.log(e.message);
      return false;
    }
  },
  toggleAddContact({ commit }) {
    commit("setAddContact");
  },
  async createContact({ commit }, contact) {
    contact.user = 1;
    contact.image = "test.jpg";
    try {
      const result = await ApiService.post("contacts/", contact);
      commit("addContact", result.data);
      return { success: true };
    } catch (e) {
      return { success: false, error: "THERE HAS BEEN AN ERRR-OR" };
    }
  }
};

// mutations
const mutations = {
  setCreateCustomer(state, update) {
    Object.assign(state.creatingCustomer, update);
  },
  setAddContact(state) {
    state.creatingContact = !state.creatingContact;
  },
  setCurrentCustomer(state, value) {
    return (state.currentCustomer = value);
  },
  setCustomers(state, update) {
    state.customers = update;
  },
  addContact(state, result) {
    state.customers.push(result);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

const customers = [
  {
    name: "Geoff Affleck",
    id: 0,
    email: "gaffleck@gmail.com",
    img: "user1.jpg",
    industry: "Construction",
    quality: 7,
    notes: [
      {
        dateAdded: "Wed Dec 12 2018 05:23:26 GMT-0800 (Pacific Standard Time)"
      }
    ],
    warmedAssets: [],
    pastPurchases: [
      {
        asset: "2015 Cat 980",
        price: 12500000,
        img: "asset.jpg"
      }
    ]
  },
  {
    name: "John Denver",
    id: 1,
    email: "jdenver@gmail.com",
    img: "user1.jpg",
    industry: "Construction",
    quality: 9,
    notes: [
      {
        dateAdded: "Wed Dec 12 2018 05:23:26 GMT-0800 (Pacific Standard Time)"
      }
    ],
    warmedAssets: [],
    pastPurchases: [
      {
        asset: "2015 Cat 980",
        price: 12500000,
        img: "asset.jpg"
      }
    ]
  }
];

const delay = duration => new Promise(resolve => setTimeout(resolve, duration));
