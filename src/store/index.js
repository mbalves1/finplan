import { createStore } from 'vuex'
import release from './releases.js'

const store = createStore({
  modules: {
    release
  }
})

export default store