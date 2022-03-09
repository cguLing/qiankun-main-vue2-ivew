/* eslint-disable */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import i18n from '@/locale'
import config from '@/config'
// import importDirective from '@/directive'
// import { directive as clickOutside } from 'v-click-outside-x'
import installPlugin from '@/plugin'
import './index.less'
import '@/assets/icons/iconfont.css'
// import { initRouter } from '@/libs/router-util' // ①新增  引入动态菜单渲染

// 实际打包时应该不引入mock
/* eslint-disable */
if (process.env.NODE_ENV !== 'production') require('@/mock')

Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
})

/**
 * @description 注册admin内置插件
 */
 installPlugin(Vue)
 /**
  * @description 生产环境关掉提示
  */
 Vue.config.productionTip = false
 /**
  * @description 全局注册应用配置
  */
 Vue.prototype.$config = config

const instance = new Vue({
  el: '#app',
  i18n,
  router,
  store,
  render: h => h(App),
  // mounted() {
  //   initRouter(this);  // ①新增 调用方法,动态生成路由
  // }
})

// 定义loader方法，loading改变时，将变量赋值给App.vue的data中的isLoading
function loader (loading) {
  if (instance && instance.$children) {
    // instance.$children[0] 是App.vue，此时直接改动App.vue的isLoading
    instance.$children[0].isLoading = loading
  }
}

// 给子应用配置加上loader方法

import {
  microListGet,
  serviceListGet
} from "@/api/service"
import {
  registerMicroApps,
  addGlobalUncaughtErrorHandler,
  start,
  // setDefaultMountApp
} from 'qiankun'
// import microApps from './micro/microApps'
serviceListGet().then((res)=>{
  store.commit('setServiceList',  res.data.data)
})
microListGet().then((res)=>{
  store.commit('setMicroApps',  res.data.data)
  let microApps = require('./micro/microApps')
  const apps = microApps.default.map(item => {
    return {
      ...item,
      loader
    }
  })
  
  registerMicroApps(apps, {
    beforeLoad: app => {
      store.commit('changeLoading', true);
      console.log('before load app.name====>>>>>', app.name)
    },
    beforeMount: [
      app => {
        console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name)
      }
    ],
    afterMount: [
      app => {
        store.commit('changeLoading', false);
        console.log('[LifeCycle] after mount %c%s', 'color: green;', app.name)
      }
    ],
    afterUnmount: [
      app => {
        console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name)
      }
    ]
  })
  /**
   * 添加全局的未捕获异常处理器
   */
  addGlobalUncaughtErrorHandler((event) => {
    console.error(event)
    // const msg = event
    // // 加载失败时提示
    // if (msg && msg.includes('died in status LOADING_SOURCE_CODE')) {
    //   console.error('微应用加载失败，请检查应用是否可运行')
    // }
  })
  // setDefaultMountApp('/subapp/sub-cicd')
  start({sandbox:{experimentalStyleIsolation:true}})
})
/**
 * 注册指令
 */
// importDirective(Vue)
// Vue.directive('clickOutside', clickOutside)

// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   i18n,
//   store,
//   render: h => h(App),
//   mounted() {
//     initRouter(this);  // ①新增 调用方法,动态生成路由
//   }
// })
