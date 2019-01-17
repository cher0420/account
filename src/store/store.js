import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);



import caseStore from "./modules/caseStore" //  可忽略



export const store = new Vuex.Store({

  modules: {
    caseStore,

  },


});


