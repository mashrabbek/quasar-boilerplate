/**
 *  States
 */

const state = {
  isAllLoaded: false,
  menus: []
};

/**
 *  Getters
 */
const getters = {
  userMenus: state => {
    return state.menus;
  },
  isAllLoaded: state => {
    return state.isAllLoaded;
  }
};

/**
 *   Actions
 */
const actions = {
  setUserMenu({ commit }, val) {
    commit("setUserMenu", val);
  },
  setAllLoaded({ commit }, val) {
    commit("setAllLoaded", val);
  }
};

/**
 *  Mutations
 */
const mutations = {
  setUserMenu(state, val) {
    state.menus = val;
  },
  setAllLoaded(state, val) {
    state.isAllLoaded = val;
  }
};

export const userdata = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
