<template>
  <div class="header-bar">
    <!-- <sider-trigger :collapsed="collapsed" icon="ios-menu" @on-change="handleCollpasedChange"></sider-trigger> -->
    <!-- <custom-bread-crumb show-icon style="margin-left: 30px;" :list="breadCrumbList"></custom-bread-crumb> -->
    <transition name="sidebarLogoFade">
      <router-link key="expand" class="sidebar-logo-link" to="/">
        <img src="@/assets/images/logo.png" class="sidebar-logo">
        <span class="sidebar-title">子衿微服务</span>
      </router-link>
       <!-- <MenuItem name="4" to="/">
          <img src="/assets/images/logo.png" class="sidebar-logo">一体化-Unite
      </MenuItem> -->
    </transition>
    &emsp;&emsp;
    <div class="project">
      <Dropdown trigger="click" class="re-drop" @on-click="handleClick">
          <span style="font-size:14px;color:#9dabc2;">项目</span>&emsp;
          <span style="font-size:14px;color:#fff">{{proj_click}}</span>&emsp;
          <Icon style="color:#fff" type="ios-arrow-down"></Icon>
        <DropdownMenu slot="list">
            <DropdownItem v-for="item in projects" :key="item" :name="item"><span style="font-size:14px;color:#fff">{{item}}</span></DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <div class="custom-content-con">
      <slot></slot>
    </div>
  </div>
</template>
<script>
// import siderTrigger from './sider-trigger'
// import customBreadCrumb from './custom-bread-crumb'
import './header-bar.less'
export default {
  name: 'HeaderBar',
  components: {
    // siderTrigger
    // customBreadCrumb
  },
  props: {
    collapsed: Boolean
  },
  data () {
    return {
      proj_click: 'xxx项目',
      projects: ['xxx项目', 'yyy项目', 'zzz项目']
    }
  },
  computed: {
    // breadCrumbList () {
    //   return this.$store.state.app.breadCrumbList
    // }
  },
  methods: {
    handleCollpasedChange (state) {
      this.$emit('on-coll-change', state)
    },
    handleClick (pro) {
      this.proj_click = pro
    }
  }
}
</script>
<style scoped>
.re-drop >>> .ivu-select-dropdown{
  background-color: #183054;
  top:35px !important;
  border-radius:0 0 4px 4px;
}
</style>
