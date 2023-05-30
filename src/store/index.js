import { createStore } from 'vuex'

export default createStore({
  state: {
    releases: []
  },
  getters: {
    getReleases: state => state.releases
  },
  mutations: {
    SET_RELEASE(state, releases) {
      state.releases = releases;
    }
  },
  actions: {
    async getReleases({ commit }) {
      try {
        const response = await fetch('https://backend-finplan.vercel.app/api/services');
        const data = await response.json();
        commit('SET_RELEASE', data);
      } catch (error) {
        console.error(error);
      }
    }
  },
  modules: {
  }
})