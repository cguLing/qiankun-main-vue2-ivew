<template>
  <div class="header-bar">
    <sider-trigger
      v-if="!menuWay"
      :collapsed="collapsed"
      icon="ios-menu"
      @on-change="handleCollpasedChange"></sider-trigger>
    <!-- <custom-bread-crumb show-icon style="margin-left: 30px;" :list="breadCrumbList"></custom-bread-crumb> -->
    <transition name="sidebarLogoFade">
      <router-link key="expand" class="sidebar-logo-link" to="/">
        <img src="@/assets/images/logo.png" class="sidebar-logo" :style="menuWay?'':'margin-top:-40px'">
        <span class="sidebar-title">子衿微服务</span>
      </router-link>
       <!-- <MenuItem name="4" to="/">
          <img src="/assets/images/logo.png" class="sidebar-logo">一体化-Unite
      </MenuItem> -->
    </transition>
    &emsp;&emsp;
    <div class="project">
      <div class="rt-pop1">
        <Poptip placement="bottom-start" width="500">
          <Button type="text" ghost style="font-size:14px;color:#fff">服务列表</Button>
          <div slot="content" style="overflow-x: hidden;height:300px">
            <Row :gutter="10" style="margin:15px 0 10px 0">
              <Col span="12" v-for="key in Object.keys(list)" :key="key" >
                <span style="font-weight:bold;color:#2d8cf0">&ensp;· {{key}}</span>
                <Divider style="margin:8px" />
                <div v-for="(item,index) in list[key]" :key="item.name+index">
                  <Button type="text" :to="item.url" target="_blank">
                    &emsp;<Badge :status="item.status ? 'success' : 'default'" />
                    <span style="font-size:14px">{{item.name}}</span>&ensp;
                    <span style="color:#9dabc2">{{item.desc}}</span>
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </Poptip>
      </div>
      <div class="rt-pop2">
        <Poptip placement="bottom-start" width="500">
          <Button type="text" ghost style="font-size:14px;color:#fff">帮助文档</Button>
          <div slot="content" style="overflow-x: hidden;height:300px">
            <Row style="margin:15px 0 10px 0">
              <AutoComplete
                v-model="docSearch"
                icon="ios-search"
                placeholder="输入以搜索帮助文档"
                @on-select="handleSelectDoc"
                @on-search="handleSearchDoc">
                  <Option v-for="item in searchList" :value="item.name" :key="item.name">
                    <a>
                      <Icon type="md-link" />&ensp;
                      <span class="demo-auto-complete-title">{{ item.name }}</span>
                      <span class="demo-auto-complete-count">{{ item.desc }}</span>
                    </a>
                  </Option>
              </AutoComplete>
            </Row>
            <Row :gutter="10">
              <Col span="12" v-for="item in serviceList" :key="item.id" >
                <Button type="text" :to="item.doc" target="_blank">
                  <Icon type="md-link" />&ensp;
                  <span style="font-size:14px">{{item.name}}</span>&ensp;
                  <span style="color:#9dabc2">{{item.desc}}</span>
                </Button>
              </Col>
            </Row>
          </div>
        </Poptip>
      </div>
    </div>
    <div class="custom-content-con">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import siderTrigger from './sider-trigger'
// import customBreadCrumb from './custom-bread-crumb'
import './header-bar.less'
export default {
  name: 'HeaderBar',
  components: {
    siderTrigger
    // customBreadCrumb
  },
  props: {
    collapsed: Boolean,
    serviceList: {
      type: Array,
      required: true,
      default: () => []
    },
    list: {
      type: Object,
      required: true,
      default: () => {}
    },
    menuWay: {
      type: Boolean,
      required: true,
      default: true
    }
  },
  data () {
    return {
      docSearch: '',
      searchList: []
    }
  },
  computed: {
    // breadCrumbList () {
    //   return this.$store.state.app.breadCrumbList
    // }
  },
  methods: {
    handleSelectDoc (value) {
      for (let i = 0; i < this.serviceList.length; i++) {
        const item = this.serviceList[i];
        if(item.name == value){
          window.open(item.doc, '_blank')
          break
        }
      }
    },
    handleSearchDoc (value) {
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
.rt-pop1 {
  display: inline-block;
}
.rt-pop1 >>> .ivu-poptip-popper {
  left:-100px !important;
}
.rt-pop1 >>> .ivu-poptip-popper .ivu-poptip-arrow {
  left:130px;
}
.rt-pop2 {
  display: inline-block;
}
.rt-pop2 >>> .ivu-poptip-popper {
  left:-100px !important;
}
.rt-pop2 >>> .ivu-poptip-popper .ivu-poptip-arrow {
  left:220px;
}
</style>
