import ApiService from "@/services/api.service";

const state = {
  signingUp: false,
  currentUser: null,
  watchlist: []
};

// getters
const getters = {
  isOnWatchlist: state => id => {
    return state.watchlist.indexOf(id) >= 0;
  }
};

// actions
const actions = {
  toggleSignUp({ commit, state }) {
    let value = !state.signingUp;
    commit("setSignUp", value);
  },
  async signUp({ commit, state }, user) {
    let data = {
      first_name: user.first_name,
      last_name: user.last_name
    };
    try {
      const customer = await ApiService.post("customers/", data);
      commit("addCustomer", customer.data);
      return true;
    } catch (e) {
      console.log(e.message);
      return false;
    }
  },
  async getACustomer({ commit, state }, customerId) {
    try {
      const customer = await ApiService.get("customers/" + customerId);
      commit("setCurrentCustomer", customer.data);
      return true;
    } catch (e) {
      console.log(e.message);
      return false;
    }
  },
  async getAllCustomers({ commit }) {
    try {
      const customers = await ApiService.get("customers");
      commit("setCustomers", customers.data);
      return true;
    } catch (e) {
      console.log(e.message);
      return false;
    }
    //   commit("setCustomers", mockCustomers());
  },
  async createFriend({ commit, state, rootState }, values) {
    let newFriend = {
      first_name: values.first_name,
      last_name: values.last_name,
      customer: rootState.friends.creatingFriend.customerid
    };
    console.log(newFriend);
    try {
      const friend = await ApiService.post("friends/", newFriend);
      commit("addFriend", friend.data);
      return true;
    } catch (e) {
      console.log(e.message);
      return false;
    }
  },
  async addToWatchlist({ commit }, asset) {
    commit("addToWatchlist", asset);
  }
};

// mutations
const mutations = {
  setSignUp(state, value) {
    return (state.signingUp = value);
  },
  addCustomer(state, value) {
    state.customers.push(value);
  },
  setCustomers(state, value) {
    return (state.customers = value);
  },
  setCurrentCustomer(state, value) {
    return (state.currentCustomer = value);
  },
  addFriend(state, value) {
    state.currentCustomer.friends.push(value);
  },
  addToWatchlist(state, asset) {
    if (state.watchlist.indexOf(asset) === -1) state.watchlist.push(asset);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

function mockCustomers() {
  return [
    {
      userName: "liamlevesque",
      email: "liamlevesque@gmail.com",
      customerId: 0,
      friends: [
        {
          friendID: 0,
          firstName: "Andrew",
          lastName: "Devlin",
          giftBudget: 5000,
          birthDay: "1983-02-12T22:13:05.500Z",
          giftHistory: [
            {
              giftID: 0,
              giftName: "Power Ranger Action Figure",
              dateGiven: "2018-12-01T22:13:05.500Z"
            }
          ]
        },
        {
          friendID: 1,
          firstName: "Ryan",
          lastName: "McGinnis",
          giftBudget: 10000,
          birthDay: "2018-02-12T22:13:05.500Z",
          giftHistory: [
            {
              giftID: 0,
              giftName: "Power Ranger Action Figure",
              dateGiven: "2018-12-01T22:13:05.500Z"
            }
          ]
        },
        {
          friendID: 2,
          firstName: "Shannon",
          lastName: "Levesque",
          giftBudget: 250000,
          birthDay: "1983-08-17T22:13:05.500Z",
          giftHistory: [
            {
              giftID: 0,
              giftName: "Power Ranger Action Figure",
              dateGiven: "2018-12-01T22:13:05.500Z"
            }
          ]
        }
      ]
    },
    {
      userName: "andrewdevlin",
      email: "adevlin@gmail.com",
      customerId: 1,
      friends: [
        {
          friendID: 0,
          firstName: "Tommy",
          lastName: "Caldwell",
          giftBudget: 50,
          birthDay: "2018-12-01T22:13:05.500Z",
          giftHistory: [
            {
              giftID: 0,
              giftName: "Power Ranger Action Figure",
              dateGiven: "2018-12-01T22:13:05.500Z"
            }
          ]
        }
      ]
    },
    {
      userName: "jamesmallion",
      email: "jmallion@gmail.com",
      customerId: 2,
      friends: [
        {
          friendID: 0,
          firstName: "Ruth",
          lastName: "Murray",
          giftBudget: 2000,
          birthDay: "2018-12-01T22:13:05.500Z",
          giftHistory: [
            {
              giftID: 0,
              giftName: "Super Soaker 150",
              dateGiven: "2018-12-01T22:13:05.500Z"
            }
          ]
        }
      ]
    }
  ];
}
