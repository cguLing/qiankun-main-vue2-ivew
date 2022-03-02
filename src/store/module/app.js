/* eslint-disable */
import {
  getHomeRoute,
  localSave,
  localRead
} from '@/libs/util'
import config from '@/config'
import microApps from '@/micro/microApps.js'
import router from '@/router/routers'
const { homeName } = config
const menu = router.filter((obj)=>{ return !obj.meta.hideInMenu })
export default {
  state: {
    homeRoute: {},
    local: localRead('local'),
    loadingFlag: false,
    enshireList: [],
    menuRouter:[]
  },
  getters: {
  },
  mutations: {
    setMenuRouter(state) {
      state.menuRouter = menu.concat(microApps.filter((item) => {
        return state.enshireList.includes(item.name)
      }).map((obj) => {
        return {
          path: obj.activeRule,
          name: obj.name,
          meta: {
            hideInMenu: false,
            title: obj.title,
            icon: obj.icon
          }
        }
      }))
    },
    changeLoading(state, flag) {
      state.loadingFlag=flag
    },
    setHomeRoute(state, routes) {
      state.homeRoute = getHomeRoute(routes, homeName)
    },
    changeEnshire(state, obj) {
      switch (obj.type) {
        case 'add':
          if(!state.enshireList.includes(obj.name)){
            state.enshireList.push(obj.name)
            this.commit('setMenuRouter')
          }
          break;
          
        case 'remove':
          let idx = state.enshireList.indexOf(obj.name)
          if(idx!=-1){
            let arr = state.enshireList
            let newList = arr.slice(0,idx).concat(arr.slice(idx+1));
            state.enshireList = newList;
            this.commit('setMenuRouter')
          }
        break;
      
        default:
          break;
      }
    },
    setLocal(state, lang) {
      localSave('local', lang)
      state.local = lang
    },
  },
  actions: {
  }
}
