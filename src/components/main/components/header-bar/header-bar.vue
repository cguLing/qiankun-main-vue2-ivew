<template>
  <div class="header-bar">
    <!-- <sider-trigger :collapsed="collapsed" icon="md-menu" @on-change="handleCollpasedChange"></sider-trigger> -->
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
    <div class="custom-content-con">
      <slot></slot>
    </div>
  </div>
</template>
<script>
// import siderTrigger from './sider-trigger'
import customBreadCrumb from './custom-bread-crumb'
import './header-bar.less'
export default {
  name: 'HeaderBar',
  components: {
    // siderTrigger,
    customBreadCrumb
  },
  props: {
    collapsed: Boolean
  },
  computed: {
    // breadCrumbList () {
    //   return this.$store.state.app.breadCrumbList
    // }
  },
  methods: {
    handleCollpasedChange (state) {
      this.$emit('on-coll-change', state)
    }
  }
}
</script>
