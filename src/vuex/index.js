import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './Getters'

Vue.use(Vuex)

const state = {
  title: ''
}

export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})
