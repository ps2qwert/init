import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from "axios"

Vue.use(VueRouter)

Vue.prototype.$http = axios
//定义组件



const router = new VueRouter({
	mode : 'hash',
	base : __dirname,
	routes : [
		{
			path : '/',
			component : App
		},
	]
})

const app = new Vue({
  router: router,
  render: h => h(App)
}).$mount("#app")
