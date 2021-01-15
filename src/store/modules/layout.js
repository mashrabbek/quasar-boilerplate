/**
 *  States
 */

const state = {
  leftDrawerOpen: false
};

/**
 *  Getters
 */

const getters = {
  leftDrawerOpen: state => {
    return state.leftDrawerOpen;
  }
};

/**
 *   Actions
 */
const actions = {
  setLeftDrawerOpen({ commit }, val) {
    commit("setLeftDrawerOpen", val);
  }
};

/**
 *  Mutations
 */
const mutations = {
  setLeftDrawerOpen(state, val) {
    state.leftDrawerOpen = val;
  }
};

export const layout = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
