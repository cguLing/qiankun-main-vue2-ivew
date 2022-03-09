/* eslint-disable */
import {
  getHomeRoute,
  localSave,
  localRead
} from '@/libs/util'
import config from '@/config'
import router from '@/router/routers'
const { homeName } = config
const menu = router.filter((obj)=>{ return !obj.meta.hideInMenu })
export default {
  state: {
    homeRoute: {},
    local: localRead('local'),
    loadingFlag: false,
    enshireList: [],
    serviceList: [],
    menuRouter:[],
    microApps: []
  },
  getters: {
  },
  mutations: {
    setMenuRouter(state) {
      let tmp = []
      for (let j = 0; j < state.enshireList.length; j++){
        const item = state.enshireList[j]
        let flag = false
        for (let i = 0; i < state.microApps.length; i++) {
          const obj = state.microApps[i];
          if(obj.name == item){
            tmp.push({
              path: obj.activeRule,
              name: obj.name,
              meta: {
                hideInMenu: false,
                title: obj.title,
                icon: obj.icon
              }
            })
            flag = true
            break
          }
        }
        if (flag) continue
        for (let i = 0; i < state.serviceList.length; i++) {
          const obj = state.serviceList[i];
          if(obj.menu == item){
            tmp.push({
              path: obj.url,
              name: obj.name,
              meta: {
                hideInMenu: false,
                title: obj.desc,
                icon: "ios-link",
                target: "link"
              }
            })
            break
          }
        }
      }
      state.menuRouter = menu.concat(tmp)
      // (state.microApps.filter((item) => {
      //   return state.enshireList.includes(item.name)
      // }).map((obj) => {
      //   return {
      //     path: obj.activeRule,
      //     name: obj.name,
      //     meta: {
      //       hideInMenu: false,
      //       title: obj.title,
      //       icon: obj.icon
      //     }
      //   }
      // }))
    },
    setServiceList(state, services) {
      state.serviceList = services
    },
    setMicroApps(state, micro) {
      state.microApps = micro
    },
    changeLoading(state, flag) {
      state.loadingFlag=flag
    },
    setHomeRoute(state, routes) {
      state.homeRoute = getHomeRoute(routes, homeName)
    },
    setEnshrine(state, enshrine) {
      state.enshireList = enshrine
      this.commit('setMenuRouter')
    },
    setLocal(state, lang) {
      localSave('local', lang)
      state.local = lang
    },
  },
  actions: {
    changeEnshrine({state,commit}, obj) {
      switch (obj.type) {
        case 'add':
          let tmpEnshrine = state.enshireList
          if(!state.enshireList.includes(obj.name)){
            tmpEnshrine.push(obj.name)
            commit('setEnshrine',tmpEnshrine)
          }
          break;
          
        case 'remove':
          let idx = state.enshireList.indexOf(obj.name)
          if(idx!=-1){
            let tmpEnshrine = state.enshireList
            let newList = tmpEnshrine.slice(0,idx).concat(tmpEnshrine.slice(idx+1));
            commit('setEnshrine',newList)
          }
        break;
      
        default:
          break;
      }
    },
  }
}
