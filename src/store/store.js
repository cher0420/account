import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);



import caseStore from "./modules/caseStore" // 案例库模块



export const store = new Vuex.Store({

  modules: {
    caseStore,
  },


});


