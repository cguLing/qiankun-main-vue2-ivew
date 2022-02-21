import store from './store'
const microApps = [
  {
    name: 'bus',
    entry: '//bus.site.zhidaoxuexiao.com/subapp/bus/', // process.env.VUE_APP_SUB_VUE,
    icon: 'ios-american-football-outline',
    container: '#subapp-viewport', // 子应用挂载的div
    title: '业务线与服务',
    activeRule: '/bus'
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
