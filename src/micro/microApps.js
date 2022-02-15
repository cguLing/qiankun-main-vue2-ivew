import store from './store'
const microApps = [
  {
    name: 'sub-cicd',
    entry: '//localhost:8010/subapp/sub-cicd', // process.env.VUE_APP_SUB_VUE,
    icon: 'ios-american-football-outline',
    container: '#subapp-viewport', // 子应用挂载的div
    title: '子应用1',
    activeRule: '/sub-cicd'
  },
  {
    name: 'cicd',
    entry: '//127.0.0.1:8020', // process.env.VUE_APP_SUB_VUE,
    icon: 'ios-cog-outline',
    container: '#subapp-viewport', // 子应用挂载的div
    title: '大禹平台',
    activeRule: '/cicd'
  }
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
