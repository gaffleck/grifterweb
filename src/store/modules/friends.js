const state = {
  creatingFriend: {
    value: false,
    targetDate: null
  },
  friends: [
    {
      firstName: "Liam",
      lastName: "Levesque",
      birthDay: "10/22/83",
      giftBudget: 1000,
      giftHistory: [
        {
          name: "Power Ranger Action Figure",
          cost: 500,
          date: "10/22/2017"
        },
        {
          name: "Power Ranger Action Figure",
          cost: 500,
          date: "10/22/2017"
        }
      ]
    }
  ]
};

// getters
const getters = {
  //   name: (state, getters) => {
  //     return getters.cartProducts.reduce((total, product) => {
  //       return total + product.price * product.quantity;
  //     }, 0);
  //   }
};

// actions
const actions = {
  // getAFriend({ commit, state }, { customerid, friendid }) {
  //   return new Promise((resolve, reject) => {

  //     if (state.customers[id]) resolve(state.friends[id]);
  //     else reject("FAIL FOOL");
  //     //GO GET FROM THE SERVER
  //   });
  // },
  toggleCreateFriend({ commit, state }, targetDate) {
    let value = !state.creatingFriend.value;
    commit("setCreateFriend", { value, targetDate });
  }
};

// mutations
const mutations = {
  setCreateFriend(state, update) {
    state.creatingFriend.value = update.value;
    state.creatingFriend.targetDate = update.targetDate;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
