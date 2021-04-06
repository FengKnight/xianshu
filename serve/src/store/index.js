import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'

Vue.use(Vuex)

const state = {
  name:'',
  isLogin: false,
  isChange:'book',
  books:[],
  bookId:1001,
  bigSort:[],
  smallSort:[],
  adminShow:'home',
  selectText:'',
  selectBook:[],
  message_id: ''
}


export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
  }
})
