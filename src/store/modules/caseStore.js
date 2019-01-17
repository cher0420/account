

  const  caseStore = {

  state: {
    indexPage:true,

  },
  getters: {

  },
  mutations: {
    detailshow:(state) =>{
      state.indexPage = false;

    },


  },
  actions: {
    detailshow:(context)=>{
      context.commit("detailshow")
    },

  }



}

export default  caseStore
