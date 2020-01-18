import Vue from 'vue'
import Router from 'vue-router'

import Fpage from "../views/Fpage.vue"
import Mpage from "../views/Mpage"
import Assort from "../views/Assort.vue"
import Ranking from "../views/Ranking.vue"
import Bookshelf from "../views/Bookshelf.vue"
import Xsreader from "../views/reader/xsreader.vue"
import Detail from '../views/detail.vue'
import Login from '../views/user/Login.vue'
import Register from '../views/user/register'
import Mulu from '../components/mulu'
import Xssearch from '../views/Xssearch'
import Success from '../views/user/success'
import Userinfo from '../views/user/userinfo'
import Editname from '../views/user/editname'














Vue.use(Router)

export default new Router({

	mode: 'history',
	base: "",


	routes: [
		{
			path: '/m',
			name: 'Fpage',
			component: Fpage
		},

		{
			path: '/',
			name: 'Mpage',
			component: Mpage
		},
		{
			path: '/Assort/:name/:page',
			name: 'Assort',
			component: Assort,
			meta: {
				pageTitle: '分类',
				keepAlive: true
			}
		},
		{
			path: '/Ranking',
			name: 'Ranking',
			component: Ranking
		},
		{
			path: '/Bookshelf',
			name: 'Bookshelf',
			component: Bookshelf
		},
		{
			path: "/xsreader/:name/:id",
			name: "Xsreader",
			component: Xsreader,
			
		},
		
			{
			path: "/detail/:id",
			name: "detail",
			props:true,
			component: () => import("../views/detail.vue"),
		},
		{
			path: "/login",
			name: "登录",
			component: Login
		},
		{
			path: "/register",
			name: "注册",
			component: Register
		},
		{
			path: "/mulu/:id/:page",
			name: "mulu",
			component: Mulu
		},

		{
			path: "/Xssearch",
			name: "seasrch",
			component: Xssearch,
			meta: {
				pageTitle: '搜索',
				keepAlive: true
			}
			
		},

		{
			path: "/success",
			name: "注册成功",
			component: Success,
		},
		{
			path: "/userinfo",
			name: "用户中心",
			component: Userinfo,
		},
		{
			path: "/editname",
			name: "修改昵称",
			component: Editname,
		}

	],

	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return
		} else {
			return {
				x: 0,
				y: 0
			}
		}
	}
})