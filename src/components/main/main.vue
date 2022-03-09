<template>
  <Layout style="height: 100%" class="main">
    <div>
      <Header class="header-con">
        <!-- <header-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange"> -->
        <header-bar
          :collapsed="collapsed"
          :serviceList="serviceList"
          :list="list"
          :menuWay="menuWay"
          @on-coll-change="handleCollapsedChange">
          <user :message-unread-count="unreadCount" :user-avator="userAvator"/>
          <DevOpsDoc style="margin-right: 10px;"/>
        </header-bar>
      </Header>
    </div>
    <Layout>
      <div
        :collapsed="collapsed"
        @mouseenter="handleCollapsedChangeMenu"
        @mouseleave="handleCollapsedChange"
        style="overflow: 'hidden';position: relative;top:0px;">
        <transition name="fade">
        <Sider
          hide-trigger
          collapsible 
          :collapsed-width="50"
          v-model="collapsed"
          v-if="collapsed&&menuWay" class="left-sider">
          <side-menu
            accordion ref="sideMenu"
            :collapsed="collapsed"
            @on-select="turnToPage(item)"
            :current-path="current"
            :menu-list="routeList"
            :list="list"
            :serviceType="serviceType"
            :serviceList="serviceList"
            :enshrineList="enshrineList"
          >
            <sider-trigger :menuWay="menuWay" :collapsed="collapsed" icon="ios-menu"></sider-trigger>
          </side-menu>
        </Sider>
        <Sider
          hide-trigger
          collapsible
          v-else-if="!collapsed"
          v-model="collapsed"
          class="left-sider"
          style="width: 260px; min-width: 260px; max-width: 260px; flex: 0 0 260px; overflow: hidden;">
          <side-menu
            accordion ref="sideMenu"
            :openList="openList"
            :collapsed="collapsed"
            @on-select="turnToPage"
            :current-path="current"
            :menu-list="routeList"
            :list="list"
            :serviceType="serviceType"
            :serviceList="serviceList"
            :enshrineList="enshrineList"
          >
            <sider-trigger :menuWay="menuWay" :collapsed="collapsed" icon="ios-menu" @showList="showList"></sider-trigger>
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
            <div 
              v-show="!loading_flag"
              :class="menuWay?'main-content-menu':''"
              style="height:100%;">
              <slot></slot>
            </div>
          </Content>
        </Layout>
      </Content>
    </Layout>
    <Poptip placement="top-end" width="220" class="quick-ques">
      <Tooltip content="答疑POPO">
        <Button class="rt-button" type="primary" shape="circle" icon="ios-chatbubbles-outline"></Button>
      </Tooltip>
      <div slot="content" style="overflow-x: hidden;height:200px">
        <AutoComplete
          v-model="popoSearch"
          icon="ios-search"
          size="small"
          style="margin:8px 0 5px 0"
          placeholder="输入以搜索POPO答疑群"
          @on-select="handleSelectPopo"
          @on-search="handleSearchPopo">
          <Option v-for="item in searchList" :value="item.name" :key="item.name">
            <a>
            <Icon type="ios-chatbubbles-outline" />&ensp;
            <span class="demo-auto-complete-title">{{ item.name }}</span>
            <span class="demo-auto-complete-count">{{ item.desc }}</span>
            </a>
          </Option>
        </AutoComplete>
        <Col span="24" v-for="item in serviceList" :key="item.id" style="margin-bottom:-5px">
            <Button type="text" @click="handlePopo(item.popo)">
              <Icon type="ios-chatbubbles" />&ensp;
              <span style="font-size:14px">{{item.name}}</span>&ensp;
              <span style="color:#9dabc2">{{item.desc}}</span>
            </Button>
        </Col>
      </div>
    </Poptip>
  </Layout>
</template>
<script>
import SideMenu from './components/side-menu'
import siderTrigger from './components/sider-trigger'
import HeaderBar from './components/header-bar'
import DevOpsDoc from './components/doc'
import User from './components/user'
import {
  // mapMutations,
  mapState,
  mapActions } from 'vuex'
import './main.less'
import Loading from './components/loading'
import {
  serviceTypeGet,
  userEnshrineGet
} from '@/api/service'
import {
  getSystemSetting
} from '@/api/user'
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
      popoSearch:'',
      searchList: [],
      collapsed: true,
      current: '/home',
      routeList: [],
      openList: false,
      list: {},
      serviceType: [],
      enshrineList: []
    }
  },
  computed: {
    ...mapState({
      name: state => state.user.userName,
      menuWay: state => state.user.menuWay
    }),
    serviceList () {
      return this.$store.state.app.serviceList
    },
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
    ...mapActions([
      'changeEnshrine'
    ]),
    handlePopo (popo) {
      window.open("http://popo.netease.com/static/html/open_popo.html?ssid="+popo+"&sstp=1", '_blank')
    },
    handleSelectPopo (value) {
      for (let i = 0; i < this.serviceList.length; i++) {
        const item = this.serviceList[i];
        if(item.name == value){
          this.handlePopo(item.popo)
          break
        }
      }
    },
    handleSearchPopo (value) {
      let tmpList = []
      this.serviceList.forEach((item) => {
        if (item.name.toUpperCase().indexOf(value.toUpperCase()) !== -1) {
          tmpList.push({
            name: item.name,
            desc: item.desc
          })
        }
      })
      this.searchList = tmpList
    },
    showList () {
      setTimeout(() => {
        this.openList = true
      }, 300)
    },
    turnToPage (menu) {
      // let name = {}
      // if (typeof router === 'string') name = router
      // else {
      //   name = router.name
      //   params = router.params
      //   query = router.query
      // }
      
      // if(target === 'link'){
      //   window.open(path, '_blank')
      //   return
      // }
      // else if (name.indexOf('isTurnByHref_') > -1) {
      //   window.open(name.split('_')[1])
      //   return
      // }
      if(menu.meta.target && menu.meta.target == 'link'){
        window.open(menu.path, '_blank')
        return
      }
      history.pushState(null, menu.path, menu.path)
    },
    handleCollapsedChangeMenu () {
      if(this.menuWay){
        if (this.collapsed) {
          this.openList = false
          this.collapsed = false
        } else {
          this.collapsed = true
        }
      }
    },
    handleCollapsedChange () {
      if (this.collapsed) {
        this.openList = false
        this.collapsed = false
      } else {
        this.collapsed = true
      }
    },
    bindCurrent () {
      const path = window.location.pathname
      if (this.menuRouter.findIndex(item => item.path === path) >= 0) {
        this.current = path
      } else {
        this.current = ''
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
    },
    initService() {
      serviceTypeGet().then((res) => {
        this.serviceType = res.data.data.map(obj => obj.class_name)
      }).then(() => {
        userEnshrineGet({ userName: this.name }).then((res) => {
          this.enshrineList = res.data.data.map(obj => obj.service_id)
        }).then(() => {
          // serviceListGet().then((res) => {
            let tmpList = {}
            this.serviceType.forEach(item => {
              tmpList[item] = []
            })
            this.serviceList.forEach((item) => {
              let tmpStar = false
              if (this.enshrineList.includes(item.id)) {
                this.changeEnshrine({ name: item.menu, type: 'add' })
                tmpStar = true
              }
              tmpList[item.class_name].push({
                ...item,
                enshrine: tmpStar,
                show_en: false
              })
            })
            this.list = tmpList
          // })
        })
      })
    },
    initSystem(){
      getSystemSetting({ldap:this.name}).then((res)=>{
        this.$store.commit('setMenuWay',res.data.data.menuWay)
      })
    }
  },
  created () {
    this.bindCurrent()
    this.initRoute()
  },
  mounted () {
    this.initService()
    this.initSystem()
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
