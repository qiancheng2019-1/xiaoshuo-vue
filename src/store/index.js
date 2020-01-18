import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {  
      token:"",
      id:"",
     
  },
  mutations: {
      setuserinfo(state,data){
        state.token=data
        localStorage.token=data
      },
      setcateId(){
        state.id=data
      }
          
  },
  actions: {
  },
  modules: {
  }
})
