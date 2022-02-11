import store from './store'
const microApps = [
  {
    name: 'sub-cicd',
    entry: '//localhost:8010/subapp/sub-cicd', // process.env.VUE_APP_SUB_VUE,
    icon: 'ios-cog-outline',
    container: '#subapp-viewport', // 子应用挂载的div
    title: '子应用1',
    activeRule: '/sub-cicd'
  }
  // {
  //   name: 'sub-vue',
  //   entry: '//localhost:8020/subapp/sub-vue', // process.env.VUE_APP_SUB_VUE,
  //   icon: 'ios-cog-outline',
  //   container: '#subapp-viewport', // 子应用挂载的div
  //   title: '子应用2',
  //   activeRule: '/sub-vue'
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
