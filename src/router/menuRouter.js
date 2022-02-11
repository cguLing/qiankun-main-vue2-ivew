import microApps from '@/micro/microApps.js'
export const menu = [
  {
    path: '/home',
    name: 'home',
    // redirect: '/home',
    meta: {
      hideInMenu: false,
      notCache: true,
      title: '首页',
      icon: ''
    }
  }
]

export const menuRouter = menu.concat(microApps.map((obj) => {
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
export default menuRouter
