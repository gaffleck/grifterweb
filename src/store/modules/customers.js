const state = {
  signingUp: false,
  customers: []
};

// getters
const getters = {};

// actions
const actions = {
  toggleSignUp({ commit, state }) {
    let value = !state.signingUp;
    commit("setSignUp", value);
  },
  signUp({ commit, state }, user) {
    return new Promise((resolve, reject) => {
      let data = {
        userName: user.userName,
        email: user.email
      };
      console.log(data);
      axios({
        method: "post",
        url: "https://grifter2.herokuapp.com/api/customers/",
        data: data,
        headers: {}
      })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  },
  getACustomer({ commit, state }, customerId) {
    return new Promise((resolve, reject) => {
      if (state.customers[customerId]) resolve(state.customers[customerId]);
      else {
        commit("setCustomers", mockCustomers());
        resolve(state.customers[customerId]);
      }
      //GO GET FROM THE SERVER
    });
  },
  getAFriend({ commit, state }, { customerid, friendid }) {
    return new Promise((resolve, reject) => {
      if (
        state.customers[customerid] &&
        state.customers[customerid].friends[friendid]
      )
        resolve(state.customers[customerid].friends[friendid]);
      else {
        commit("setCustomers", mockCustomers());
        resolve(state.customers[customerid].friends[friendid]);
      }
      //GO GET FROM THE SERVER
    });
  },
  getAllCustomers({ commit }) {
    return new Promise((resolve, reject) => {
      // axios
      //   .get("https://grifter2.herokuapp.com/api/customers/")
      //   .then(response => {
      //     commit("setCustomers", response.data);
      //     resolve(response);
      //   })
      //   .catch(error => {
      //     console.log(error);
      //     reject(error);
      //   });
      commit("setCustomers", mockCustomers());
      resolve("success");
    });
  }
};

// mutations
const mutations = {
  setSignUp(state, value) {
    return (state.signingUp = value);
  },
  setCustomers(state, value) {
    return (state.customers = value);
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
          birthDay: "2018-02-01T22:13:05.500Z",
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
          birthDay: "2018-02-01T22:13:05.500Z",
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
