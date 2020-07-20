import Vue from 'vue'
import Router from 'vue-router'
import manage from '@/pages/manage'
import login from '@/pages/login'
import admin from '@/pages/child/admin'
import user from "@/pages/child/user"
import commodity from '@/pages/child/commodity'
import criticism from "@/pages/child/criticism"
import movie from '@/pages/child/movie'
import book from '@/pages/child/book'
import music from "@/pages/child/music"
import addmovie from '@/pages/child/addmovie'
import addbook from '@/pages/child/addbook'
import addmusic from "@/pages/child/addmusic"
import Accounts from '@/pages/child/Accounts'
import explain from "@/pages/child/explain"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/manage',
      //name: 'manage',
      component: manage,
      children:[
      	{
      		path: 'user',
			    name: 'user',
			    component: user,
			    meta:["数据管理","用户管理"]
      	},
      	{
      		path: 'admin',
			    name: 'admin',
			    component: admin,
			    meta:["数据管理","管理员管理"]
      	},
      	{
      		path: 'commodity',
			    name: 'commodity',
			    component: commodity,
			    meta:["数据管理","商品管理"]
      	},
      	{
      		path: 'criticism',
			    name: 'criticism',
			    component: criticism,
			    meta:["数据管理","评论管理"]
      	},
      	{
      		path: 'movie',
			    name: 'movie',
			    component: movie,
			    meta:["商品列表","电影列表"]
      	},
      	{
      		path: 'book',
			    name: 'book',
			    component: book,
			    meta:["商品列表","图书列表"]
      	},
      	{
      		path: 'music',
			    name: 'music',
			    component: music,
			    meta:["商品列表","音乐列表"]
      	},
      	{
      		path: 'addmovie',
			    name: 'addmovie',
			    component: addmovie,
			    meta:["添加数据","添加电影"]
      	},
      	{
      		path: 'addbook',
			    name: 'addbook',
			    component: addbook,
			    meta:["添加数据","添加图书"]
      	},
      	{
      		path: 'addmusic',
			    name: 'addmusic',
			    component: addmusic,
			    meta:["添加数据","添加音乐"]
      	},
      	{
      		path: 'Accounts',
			    name: 'Accounts',
			    component: Accounts,
			    meta:["设置","管理员设置"]
      	},
      	{
      		path: 'explain',
			    name: 'explain',
			    component: explain,
			    meta:["说明","说明"]
      	}
      ]
    }
  ]
})
