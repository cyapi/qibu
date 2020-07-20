import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export default new Vuex.Store({
state:{
	userName:"",
	back:"/",
	go:"/login",
	i:{
		
	}
},
mutations:{
	changeUser(state,val){
		state.userName = val;
	},
	changeUserI(state,val){
		state.i = val;
	},
	changeGo(state,val){
		state.go = val;
	},
	changeBack(state,val){
		state.back = val;
	},
	changeExit(state){
		state.userName = '';
	}
},
getters:{},
actions:{}
})
