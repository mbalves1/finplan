import { getReleases, postReleases } from "@/service/api.js";

const release = {
  state: {
    releases: [],
    type: null,
    loading: false,
  },
  getters: {
    getReleases: state => state.releases,
    loading: state => state.loading
  },
  mutations: {
    SET_RELEASE(state, releases) {
      state.releases = releases;
    },
    SET_TYPE(state, data) {
      state.type = data
    },
    SET_LOADING(state, data) {
      state.loading = data
    }
  },
  actions: {
    async getReleases({ commit }) {
      commit('SET_LOADING', true);
      try {
        const response = await getReleases();
        const data = await response.json();
        commit('SET_RELEASE', data);
        commit('SET_LOADING', false);
      } catch (error) {
        commit('SET_LOADING', false);
        console.error(error);
      }
    },
    async postReleases({ commit }, payload) {
      try {
        const response = await postReleases(payload);
        console.log("response", response);
        const data = await response.json();
        commit('SET_RELEASE', data);
      } catch (error) {
        console.error(error);
      }
    }
  }
};

export default release;