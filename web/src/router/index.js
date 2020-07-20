import Vue from 'vue'
import Router from 'vue-router'

import user from '@/pages/user'
import cinema from '@/pages/cinema'
import read from '@/pages/read'
import music from '@/pages/music'
import login from "@/pages/login"
import reg from "@/pages/reg"
import my from "@/pages/my"
import loUser from "@/pages/lo_user"
import noUser from "@/pages/no_user"

import detail from '@/pages/detail'
import info from '@/pages/info'
import all from "@/pages/all"
import files from "@/pages/files"
import data from "@/pages/data"
import musicfiles from "@/pages/music_files"
import mark from "@/pages/mark"
import diary from '@/pages/diary'
import fabu from "@/pages/fabu"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'cinema',
      component: cinema,
    },
    {
      path: '/read',
      name: 'read',
      component: read
    },
    {
      path: '/music',
      name: 'music',
      component: music
    },
    {
      path: '/fabu',
      name: 'fabu',
      component: fabu
    },
    {
      path: '/my',
      name: 'my',
      component: my
    },
    {
      path: '/diary',
      name: 'diary',
      component: diary
    },
    {
      path: '/loUser',
      name: 'loUser',
      component: loUser
    },
    {
      path: '/noUser',
      name: 'noUser',
      component: noUser
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/reg',
      name: 'reg',
      component: reg
    },
    {
      path: '/user',
      name: 'user',
      component: user
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail
    },
    {
      path: '/all',
      name: 'all',
      component: all
    },
    {
      path: '/files',
      name: 'files',
      component: files
    },
    {
      path: '/data',
      name: 'data',
      component: data
    },
    {
      path: '/musicfiles',
      name: 'musicfiles',
      component: musicfiles
    },
    {
      path: '/info',
      name: 'info',
      component: info
    },
    {
      path: '/mark',
      name: 'mark',
      component: mark
    }
  ]
})
