import ApiService from "@/services/api.service";
import { stat } from "fs";

const state = {
  conversations: {},
  messages: {},
  activeConversation: null
};

// getters
const getters = {
  customerConversation: state => phone => {
    return state.messages[phone] || false;
  },
  assetCustomerConversation: state => (equipid, customerid) => {
    let convo = Object.values(state.conversations).find(
      conversation =>
        conversation.asset === equipid && conversation.contact === customerid
    );
    console.log(convo);
    return convo ? convo.id : false;
  }
};

// actions
const actions = {
  async getMessages({ commit }) {
    try {
      const messages = await ApiService.get("twilioMessages/");
      commit("initMessages", messages.data.results);
      return { success: true };
    } catch (e) {
      return { success: false, error: "THERE HAS BEEN AN ERRR-OR" };
    }
  },
  async getConversations({ commit }) {
    try {
      const conversations = await ApiService.get("conversations/");
      commit("initConversations", conversations.data.results);
      return { success: true };
    } catch (e) {
      return { success: false, error: "THERE HAS BEEN AN ERRR-OR" };
    }
  },
  async startConversation({ commit }, update) {
    try {
      const conversation = await ApiService.post(
        "conversations/",
        update.conversation
      );
      commit("addConversation", conversation.data);
      const firstMessage = {
        Body: update.message,
        To: conversation.data.id
      };
      const message = await ApiService.post("twilioMessages/", firstMessage);
      commit("addMessage", message.data);
      return { success: true };
    } catch (e) {
      return { success: false, error: "THERE HAS BEEN AN ERRR-OR" };
    }
  },
  async sendMessage({ commit }, message) {
    console.log(message);
    try {
      const result = await ApiService.post("twilioMessages/", message);
      commit("addMessage", result.data);
      return { success: true };
    } catch (e) {
      return { success: false, error: "THERE HAS BEEN AN ERRR-OR" };
    }
  },
  hideConversation({ commit }) {
    commit("hideConversation");
  },
  showConversation({ commit }, id) {
    commit("showConversation", id);
  }
};

// mutations
const mutations = {
  initMessages(state, update) {
    update.forEach(message => {
      let id = message.From ? message.From : message.To;
      if (!state.messages[id]) state.messages[id] = [];
      state.messages[id].push(message);
    });
  },
  initConversations(state, update) {
    update.forEach(item => {
      state.conversations[item.id] = item;
      item.messages.forEach(message => {
        state.messages[message.id] = message;
      });
    });
  },
  addConversation(state, update) {
    state.conversations[update.id] = update;
  },
  addMessage(state, message) {
    if (!state.messages[message.To]) state.messages[message.To] = [];
    state.messages[message.To].push(message);
  },
  hideConversation(state) {
    state.activeConversation = null;
  },
  showConversation(state, id) {
    state.activeConversation = state.messages[id];
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
