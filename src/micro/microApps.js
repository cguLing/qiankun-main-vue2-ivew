import store from './store'
const microApps = [
  {
    name: 'bus',
    // entry: '//bus.site.zhidaoxuexiao.com/subapp/bus/', // process.env.VUE_APP_SUB_VUE,
    entry: '//localhost:8000/subapp/bus/', // process.env.VUE_APP_SUB_VUE,
    icon: 'ios-american-football-outline',
    container: '#subapp-viewport', // 子应用挂载的div
    title: '服务',
    activeRule: '/bus'
  },
  // {
  //   name: 'flow',
  //   entry: '//bus.site.zhidaoxuexiao.com/subapp/flow/', // process.env.VUE_APP_SUB_VUE,
  //   // entry: '//localhost:8003/subapp/flow/', // process.env.VUE_APP_SUB_VUE,
  //   icon: 'ios-american-football-outline',
  //   container: '#subapp-viewport', // 子应用挂载的div
  //   title: '需求管理',
  //   activeRule: '/flow'
  // },
  // {
  //   name: 'test',
  //   entry: '//bus.site.zhidaoxuexiao.com/subapp/test/', // process.env.VUE_APP_SUB_VUE,
  //   // entry: '//localhost:8004/subapp/test/', // process.env.VUE_APP_SUB_VUE,
  //   icon: 'ios-american-football-outline',
  //   container: '#subapp-viewport', // 子应用挂载的div
  //   title: '软件测试',
  //   activeRule: '/test'
  // },
  // {
  //   name: 'cicd',
  //   // entry: '//bus.site.zhidaoxuexiao.com/subapp/cicd/', // process.env.VUE_APP_SUB_VUE,
  //   entry: '//localhost:8000/subapp/cicd/', // process.env.VUE_APP_SUB_VUE,
  //   icon: 'ios-american-football-outline',
  //   container: '#subapp-viewport', // 子应用挂载的div
  //   title: '大禹CICD',
  //   activeRule: '/cicd'
  // },
  {
    name: 'vpn',
    // entry: '//bus.site.zhidaoxuexiao.com/subapp/vpn/', // process.env.VUE_APP_SUB_VUE,
    entry: '//localhost:8001/subapp/vpn/', // process.env.VUE_APP_SUB_VUE,
    icon: 'ios-color-palette',
    container: '#subapp-viewport', // 子应用挂载的div
    title: '彩虹桥VPN',
    activeRule: '/vpn'
  }
  // {
  //   name: 'api',
  //   entry: '//bus.site.zhidaoxuexiao.com/subapp/api/', // process.env.VUE_APP_SUB_VUE,
  //   // entry: '//localhost:8005/subapp/api/', // process.env.VUE_APP_SUB_VUE,
  //   icon: 'ios-american-football-outline',
  //   container: '#subapp-viewport', // 子应用挂载的div
  //   title: 'API接口',
  //   activeRule: '/api'
  // }

]
const apps = microApps.map(item => {
  return {
    ...item,
    props: {
      routerBase: item.activeRule, // 下发基础路由
      getGlobalState: store.getGlobalState // 下发getGlobalState方法
    }
  }
})
export default apps
