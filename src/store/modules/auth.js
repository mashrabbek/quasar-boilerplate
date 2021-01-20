/**
 *  States
 */

const state = {
  isLoggedIn: false
};

/**
 *  Getters
 */

const getters = {
  isLoggedIn: state => {
    return state.isLoggedIn;
  }
};

/**
 *   Actions
 */
const actions = {
  setLoggedIn({ commit }, val) {
    commit("setLoggedIn", val);
  }
};

/**
 *  Mutations
 */
const mutations = {
  setLoggedIn(state, val) {
    state.isLoggedIn = val;
  }
};

export const auth = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
