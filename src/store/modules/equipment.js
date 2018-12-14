import ApiService from "@/services/api.service";

const state = {
  currentEquipment: {},
  allEquipment: []
};

// getters
const getters = {};

// actions
const actions = {
  async getAllEquipment({ commit }) {
    try {
      const assets = await ApiService.get("assets/");
      commit("setAllEquipment", assets.data.results);
      return { success: true };
    } catch (e) {
      return { success: false, error: "THERE HAS BEEN AN ERRR-OR" };
    }
  },
  async getEquipment({ commit, state }, id) {
    try {
      const asset = await ApiService.get("assets/" + id + "/");
      commit("setCurrentEquipment", asset.data);
      return { success: true };
    } catch (e) {
      return { success: false, error: "THERE HAS BEEN AN ERRR-OR" };
    }
  }
};

// mutations
const mutations = {
  setCurrentEquipment(state, update) {
    Object.assign(state.currentEquipment, update);
  },
  setAllEquipment(state, update) {
    state.allEquipment = update;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

const assets = [
  {
    id: 0,
    description: "2018 CATERPILLAR 966L Wheel Loader",
    year: 2018,
    make: "Caterpillar",
    model: "966L",
    category: "Wheel Loader",
    lot: "255",
    sellingAt: "22 Jan 2018 in Edmonton",
    marketValue: 12500000,
    selling: true,
    img: [
      "asset.jpg",
      "asset2.jpg",
      "asset3.jpg",
      "asset4.jpg",
      "asset5.jpg",
      "asset6.jpg"
    ]
  }
];

const delay = duration => new Promise(resolve => setTimeout(resolve, duration));
