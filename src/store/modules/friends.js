const state = {
  creatingFriend: false,
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
  toggleCreateFriend({ commit, state }) {
    let value = !state.creatingFriend;
    commit("setCreateFriend", value);
  }
};

// mutations
const mutations = {
  setCreateFriend(state, value) {
    return (state.creatingFriend = value);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
