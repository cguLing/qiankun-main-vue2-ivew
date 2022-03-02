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
      <Sider hide-trigger  collapsible :collapsed-width="60" v-model="collapsed" v-if="collapsed" class="left-sider" style="width: 60px;">
        <side-menu accordion ref="sideMenu" :collapsed="collapsed" @on-select="turnToPage(item)" :current-path="current" :menu-list="routeList">
          <sider-trigger :collapsed="collapsed" icon="ios-menu"></sider-trigger>
        </side-menu>
      </Sider>
      <Sider hide-trigger collapsible v-else v-model="collapsed" class="left-sider" style="width: 260px; min-width: 260px; max-width: 260px; flex: 0 0 260px; overflow: hidden;">
        <side-menu accordion ref="sideMenu" :openList="openList" :collapsed="collapsed" @on-select="turnToPage" :current-path="current" :menu-list="routeList">
          <sider-trigger :collapsed="collapsed" icon="ios-menu" @showList="showList"></sider-trigger>
        </side-menu>
      </Sider>
      </transition>
      </div>
      <Content class="main-content-con" style="position: fixed;width:100%">
        <Layout class="main-layout-con">
          <Content class="main-content-wrapper">
            <div v-show="loading_flag" style="height:100%">
              <Loading />
            </div>
            <div v-show="!loading_flag" style="height:100%;margin-left:60px">
              <slot></slot>
            </div>
          </Content>
        </Layout>
      </Content>
    </Layout>
    <Tooltip class="quick-ques" content="答疑POPO">
       <Button class="rt-button" type="primary" shape="circle" icon="ios-chatbubbles-outline"></Button>
    </Tooltip>
  </Layout>
</template>
<script>
import SideMenu from './components/side-menu'
import siderTrigger from './sider-trigger'
import HeaderBar from './components/header-bar'
import DevOpsDoc from './components/doc'
import User from './components/user'
// import { mapMutations, mapActions } from 'vuex'
import './main.less'
import Loading from './components/loading'
export default {
  name: 'Main',
  components: {
    SideMenu,
    User,
    HeaderBar,
    DevOpsDoc,
    siderTrigger,
    Loading
  },
  data () {
    return {
      collapsed: true,
      current: '/home',
      routeList: [],
      openList: false
    }
  },
  computed: {
    menuRouter () {
      return this.$store.state.app.menuRouter
    },
    unreadCount () {
      return this.$store.state.user.unreadCount
    },
    userAvator () {
      return this.$store.state.user.avatorImgPath
    },
    loading_flag () {
      return this.$store.state.app.loadingFlag
    }
  },
  watch: {
    menuRouter () {
      this.initRoute()
    }
  },
  methods: {
    // ...mapMutations([
    //   'setLocal',
    //   'setHomeRoute'
    // ]),
    // ...mapActions([
    //   'handleLogin',
    //   'getUnreadMessageCount'
    // ]),
    showList () {
      setTimeout(() => {
        this.openList = true
      }, 300)
    },
    turnToPage (router) {
      let name = {}
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
    },
    handleCollapsedChange () {
      if (this.collapsed) this.openList = false
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
      this.routeList = this.menuRouter
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
<style scoped>
.quick-ques {
  position: fixed;
  bottom: 40px;
  /* top: 160px; */
  right: 30px;
}
.rt-button {
  text-align: center;
  z-index: 999;
  cursor: pointer;
  background-color: #183054;
  border-color: #183054;
  box-shadow: 0px 0px 10px rgb(150, 148, 148);
}
</style>
