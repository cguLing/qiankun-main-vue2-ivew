/* eslint-disable */
import {
  login,
  logout,
  getUserInfo,
  postSystemSetting
} from '@/api/user'
import { setToken, getToken, localSave } from '@/libs/util'
// import { initRouter } from '@/libs/router-util' // ①添 引入加载菜单

export default {
  state: {
    userName: 'admin',
    userId: '',
    avatorImgPath: '',
    token: getToken(),
    access: '',
    hasGetInfo: false,
    menuWay: true
  },
  mutations: {
    setMenuWay(state, menuWay) {
      state.menuWay = menuWay
    },
    setAvator(state, avatorPath) {
      state.avatorImgPath = avatorPath
    },
    setUserId(state, id) {
      state.userId = id
    },
    setUserName(state, name) {
      state.userName = name
    },
    setAccess(state, access) {
      state.access = access
    },
    setToken(state, token) {
      state.token = token
      setToken(token)
    },
    setHasGetInfo(state, status) {
      state.hasGetInfo = status
    }
  },
  getters: {
  },
  actions: {
    changeSystemSet({ commit }, data) {
      return new Promise((resolve, reject) => {
        postSystemSetting(data).then(res => {
          commit('setMenuWay', data.menuWay)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 登录
    handleLogin({ commit }, { userName, password }) {
      userName = userName.trim()
      return new Promise((resolve, reject) => {
        login({
          userName,
          password
        }).then(res => {
          const data = res.data
          commit('setToken', data.token)
          // initRouter().then(response => {
          //   resolve(response)
          // });
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut({ state, commit }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('setToken', '')
          commit('setAccess', [])
          localStorage.clear();
          location.reload()
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取用户相关信息
    getUserInfo({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          getUserInfo(state.token).then(res => {
            const data = res.data
            commit('setAvator', data.avator)
            commit('setUserName', data.name)
            commit('setUserId', data.user_id)
            commit('setAccess', data.access)
            commit('setHasGetInfo', true)
            resolve(data)
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    }
  }
}
