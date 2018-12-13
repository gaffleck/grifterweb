import ApiService from "@/services/api.service";

const state = {
  customers: [],
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
  async getMatchingCustomers({ commit }) {
    console.log("NICE");
    try {
      await delay(2000);
      commit("setCustomers", customers);
      return { success: true };
    } catch (e) {
      return { success: false, error: "THERE HAS BEEN AN ERRR-OR" };
    }
  },
  sendMessage({ commit }, update) {
    commit("addMessage", update);
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
  toggleCreateCustomer({ commit, state }, { ...args }) {
    let value = !state.creatingCustomer.value;
    commit("setCreateCustomer", {
      value,
      targetDate: args.targetDate || null,
      customerid: args.customerid || null
    });
  }
};

// mutations
const mutations = {
  setCreateCustomer(state, update) {
    Object.assign(state.creatingCustomer, update);
  },
  setCurrentCustomer(state, value) {
    return (state.currentCustomer = value);
  },
  setCustomers(state, update) {
    update.forEach(item => {
      state.customers[item.id] = item;
    });
  },
  addMessage(state, update) {
    state.customers[update.customerid].warmedAssets.push(update.equipid);
    state.messages.push({
      equipid: update.equipid,
      customerid: update.customerid,
      sent: new Date()
    });
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
