import { getReleases, postReleases } from "@/service/api.js";

const release = {
  state: {
    releases: [],
    type: null
  },
  getters: {
    getReleases: state => state.releases
  },
  mutations: {
    SET_RELEASE(state, releases) {
      state.releases = releases;
    },
    SET_TYPE(state, data) {
      state.type = data
    }
  },
  actions: {
    async getReleases({ commit }) {
      try {
        const response = await getReleases();
        const data = await response.json();
        commit('SET_RELEASE', data);
      } catch (error) {
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