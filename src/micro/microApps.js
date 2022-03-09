import store from './store'
import storeState from '@/store'
export const microApps = storeState.state.app.microApps
const apps = microApps.map(item => {
  return {
    ...item,
    container: '#subapp-viewport',
    props: {
      routerBase: item.activeRule, // 下发基础路由
      getGlobalState: store.getGlobalState // 下发getGlobalState方法
    }
  }
})
export default apps
