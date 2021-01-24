/**
 *  States
 */

const state = {
  isLoggedIn: false,
  refreshTokenPromise: null
};

/**
 *  Getters
 */

const getters = {
  isLoggedIn: state => {
    return state.isLoggedIn;
  },
  refreshTokenPromise: state => {
    return state.refreshTokenPromise;
  }
};

/**
 *   Actions
 */
const actions = {
  setLoggedIn({ commit }, val) {
    commit("setLoggedIn", val);
  },
  refreshTokenPromise({ commit }, promise) {
    commit("refreshTokenPromise", promise);
  }
};

/**
 *  Mutations
 */
const mutations = {
  setLoggedIn(state, val) {
    state.isLoggedIn = val;
  },
  refreshTokenPromise(state, promise) {
    state.refreshTokenPromise = promise;
  }
};

export const auth = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
