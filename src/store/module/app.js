/* eslint-disable */
import {
  getHomeRoute,
  localSave,
  localRead
} from '@/libs/util'
import config from '@/config'
const { homeName } = config

export default {
  state: {
    homeRoute: {},
    local: localRead('local'),
    loadingFlag: false,
  },
  getters: {
  },
  mutations: {
    changeLoading(state, flag) {
      state.loadingFlag=flag
    },
    setHomeRoute(state, routes) {
      state.homeRoute = getHomeRoute(routes, homeName)
    },
    setLocal(state, lang) {
      localSave('local', lang)
      state.local = lang
    },
  },
  actions: {
  }
}
