<template>
  <Layout style="height: 100%" class="main">
    <div>
      <Header class="header-con">
        <!-- <header-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange"> -->
        <header-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange">
          <user :message-unread-count="unreadCount" :user-avator="userAvator"/>
          <DevOpsDoc style="margin-right: 10px;"/>
        </header-bar>
      </Header>
    </div>
    <Layout>
      <div :collapsed="collapsed" @mouseenter="handleCollapsedChange" @mouseleave="handleCollapsedChange" style="overflow: 'hidden';position: relative;top:0px;">
      <transition name="fade">
      <Sider hide-trigger  collapsible :collapsed-width="64" v-model="collapsed" v-if="collapsed" class="left-sider" style="overflow: 'hidden';z-index: 100000;width: 64px; min-width: 64px; max-width: 640px; flex: 0 0 64px; left: 0px; top: 0px; bottom: 0px;height:100%">
        <side-menu accordion ref="sideMenu" :collapsed="collapsed" @on-select="turnToPage(item)" :menu-list="routeList">
          <sider-trigger :collapsed="collapsed" icon="md-menu"></sider-trigger>
        </side-menu>
      </Sider>
      <Sider hide-trigger collapsible v-else v-model="collapsed" class="left-sider" style="overflow: 'hidden';z-index: 100000;width: 270px; min-width: 270px; max-width: 270px; flex: 0 0 270px; overflow: hidden; left: 0px; top: 0px; bottom: 0px;height:100%">
        <side-menu accordion ref="sideMenu" :collapsed="collapsed" @on-select="turnToPage" :menu-list="routeList">
          <sider-trigger :collapsed="collapsed" icon="md-menu"></sider-trigger>
        </side-menu>
      </Sider>
      </transition>
      </div>
      <Content class="main-content-con" style="padding-left: 64px;position: fixed;width:100%">
        <Layout class="main-layout-con">
          <Content class="content-wrapper">
            <keep-alive>
              <slot></slot>
              <!-- <router-view/> -->
            </keep-alive>
          </Content>
        </Layout>
      </Content>
    </Layout>
  </Layout>
</template>
<script>
import SideMenu from './components/side-menu'
import siderTrigger from './sider-trigger'
import HeaderBar from './components/header-bar'
import DevOpsDoc from './components/doc'
import User from './components/user'
import { mapMutations, mapActions } from 'vuex'
// import minLogo from '@/assets/images/logo_min.png'
// import maxLogo from '@/assets/images/logo.png'
import './main.less'
import menuRouter from '@/router/menuRouter'
export default {
  name: 'Main',
  components: {
    SideMenu,
    User,
    HeaderBar,
    DevOpsDoc,
    siderTrigger
  },
  data () {
    return {
      collapsed: true,
      // minLogo,
      // maxLogo,
      current: '/home',
      menuRouter,
      routeList: []
    }
  },
  computed: {
    unreadCount () {
      return this.$store.state.user.unreadCount
    },
    userAvator () {
      return this.$store.state.user.avatorImgPath
    }
  },
  methods: {
    ...mapMutations([
      'setBreadCrumb',
      'setTagNavList',
      'addTag',
      'setLocal',
      'setHomeRoute',
      'closeTag'
    ]),
    ...mapActions([
      'handleLogin',
      'getUnreadMessageCount'
    ]),
    turnToPage (router) {
      // const route = this.query(router)
      console.log('**选中的路由**')
      console.log(router)
      let name = {}
      // let { name, params, query } = {}
      if (typeof router === 'string') name = router
      else {
        name = router.name
        params = router.params
        query = router.query
      }
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1])
        return
      }
      history.pushState(null, name, name)
      // this.$router.push({
      //   name,
      //   params,
      //   query
      // })
      // console.log('rule*******************')
      // console.log(this.current)
      // console.log(rule[0].activeRule)
      // console.log('rule*******************')
      // history.pushState(null, rule[0].activeRule, rule[0].activeRule)
    },
    // query (name) {
    //   return this.microApps.filter(data => {
    //     if (data.name === name) {
    //       return data
    //     }
    //   })
    // },
    handleCollapsedChange () {
      this.collapsed = !this.collapsed
    },
    bindCurrent () {
      const path = window.location.pathname
      if (this.menuRouter.findIndex(item => item.path === path) >= 0) {
        this.current = path
      }
    },
    listenRouterChange () {
      const _wr = function (type) {
        const orig = history[type]
        return function () {
          const rv = orig.apply(this, arguments)
          const e = new Event(type)
          e.arguments = arguments
          window.dispatchEvent(e)
          return rv
        }
      }
      history.pushState = _wr('pushState')

      window.addEventListener('pushState', this.bindCurrent)
      window.addEventListener('popstate', this.bindCurrent)

      this.$once('hook:beforeDestroy', () => {
        window.removeEventListener('pushState', this.bindCurrent)
        window.removeEventListener('popstate', this.bindCurrent)
      })
    },
    initRoute () {
      // this.routeList = this.menuRouter.concat(this.microApps.map((obj) => {
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
      this.routeList = this.menuRouter
      console.log('**完整路由**')
      console.log(this.routeList)
    }
  },
  created () {
    this.bindCurrent()
    this.initRoute()
  },
  mounted () {
    this.listenRouterChange()
  }
}
</script>
<style lang="less">
.ivu-layout-sider.left-sider {
  transition: all .3s;
  text-overflow: ellipsis;
  font: 14px/1.6 Helvetica Neue,Helvetica,Tahoma,Arial,Microsoft YaHei,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,sans-serif;
}
.ivu-menu-item {
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
