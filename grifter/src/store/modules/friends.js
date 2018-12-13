import ApiService from "@/services/api.service";

const state = {
  creatingFriend: {
    value: false,
    targetDate: null,
    customerid: null
  },
  currentFriend: null
};

// getters
const getters = {};

// actions
const actions = {
  async getAFriend({ commit, state }, { friendid }) {
    try {
      const friend = await ApiService.get("friends/" + friendid);
      commit("setCurrentFriend", friend.data);
      return true;
    } catch (e) {
      console.log(e.message);
      return false;
    }
  },
  toggleCreateFriend({ commit, state }, { ...args }) {
    let value = !state.creatingFriend.value;
    commit("setCreateFriend", {
      value,
      targetDate: args.targetDate || null,
      customerid: args.customerid || null
    });
  }
};

// mutations
const mutations = {
  setCreateFriend(state, update) {
    Object.assign(state.creatingFriend, update);
  },
  setCurrentFriend(state, value) {
    return (state.currentFriend = value);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
