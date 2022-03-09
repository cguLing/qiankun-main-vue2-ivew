<template>
  <div class="side-menu-wrapper">
    <slot></slot>
    <Menu ref="menu"
      v-show="!collapsed" :active-name="activeName" :open-names="openedNames"
      :accordion="accordion" :theme="theme" width="auto" @on-select="handleSelect">
      <template v-for="item in menuList">
          <!-- <menu-item :name="item.name" :key="`menu-${item.name}`"><common-icon :type="item.meta.icon"/><span>{{ item.title }}</span></menu-item> -->
        <template v-if="item.children && item.children.length === 1">
          <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item" />
          <menu-item
            v-else
            style="font-size:14px;margin-left:4px;background-color: #1e1e28;padding:8px 8px 8px 14px;"
            :name="getNameOrHref(item, true)"
            :key="`menu-${item.children[0].name}`"
            :class="currentPath==item.children[0].path?'nowMenu':''">
            <common-icon
              :type="item.children[0].meta.icon || ''"
              :size="25"
              :style="currentPath==item.children[0].path?'font-weight:bolder':''"/>
              <span>{{ showTitle(item.children[0]) }}</span>
            </menu-item>
        </template>
        <template v-else>
          <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item" />
          <menu-item
            v-else
            style="font-size:14px;margin-left:4px;background-color: #1e1e28;padding:8px 8px 8px 14px;"
            :name="getNameOrHref(item)" :key="`menu-${item.name}`"
            :class="currentPath==item.path?'nowMenu':''">
            <common-icon
              :type="item.meta.icon || ''"
              :size="rootIconSize"
              :style="currentPath==item.path?'font-weight:bolder':''"/>
            <span>{{ showTitle(item) }}</span>
          </menu-item>
        </template>
      </template>
    </Menu>
    <div class="menu-collapsed" v-show="collapsed" :list="menuList">
      <template v-for="item in menuList">
        <!-- <menu-item :name="item.name" :key="`menu-${item.name}`"><common-icon :type="item.meta.icon"/></menu-item> -->
        <collapsed-menu
          v-if="item.children && item.children.length > 1"
          @on-click="handleSelect"
          hide-title :root-icon-size="rootIconSize" :icon-size="iconSize" :theme="theme"
          :parent-item="item" :key="`drop-menu-${item.name}`">
        </collapsed-menu>
        <!-- <Tooltip transfer v-else :content="showTitle(item.children && item.children[0] ? item.children[0] : item)" placement="right" :key="`drop-menu-${item.name}`"> -->
          <a v-else
            :key="`drop-menu-${item.name}`"
            @click="handleSelect(getNameOrHref(item, true))"
            class="drop-menu-a">
            <common-icon
              :size="rootIconSize"
              :color="textColor"
              :style="currentPath==item.path?'font-weight:bolder':'color:rgba(255, 255, 255, 0.7)'"
              :type="item.meta.icon || (item.children && item.children[0].meta.icon) || ''"/>
          </a>
        <!-- </Tooltip> -->
      </template>
    </div>
    <Card v-show="!collapsed&&openList" dis-hover class="sider-list">
      <Row>
        <AutoComplete
          v-model="serviceSearch"
          icon="ios-search"
          placeholder="输入以搜索"
          @on-select="handleSelectService"
          @on-search="handleSearchService">
          <div class="demo-auto-complete-item"
            v-for="(key, idx) in Object.keys(searchList)" :key="key+idx">
              <div class="demo-auto-complete-group" v-show="searchList[key].length>0">
                  <span>{{ key }}</span>
              </div>
              <Option v-for="item in searchList[key]" :value="item.name" :key="item.name">
                <a :href="item.url" target="_blank">
                  <span class="demo-auto-complete-title">{{ item.name }}</span>
                  <span class="demo-auto-complete-count">{{ item.desc }}</span>
                </a>
              </Option>
          </div>
         </AutoComplete>
      </Row>
      <Row style="margin-top:8px">
        <span>常用服务：</span>
        <Tag type="border" color="primary">Matrix</Tag>
        <Tag type="border" color="primary">CloudDB</Tag>
      </Row>
      <Row v-for="key in Object.keys(list)" :key="key" style="margin-top:15px">
        <span style="font-weight:bold;color:#2d8cf0">&ensp;· {{key}}</span>
        <Divider style="margin:8px" />
        <div v-for="(item,index) in list[key]" :key="item.name+index"
          @mouseenter="item.show_en = true" @mouseleave="item.show_en = false">
          <Button type="text" :to="item.url" target="_blank">
            &emsp;<Badge :status="item.status ? 'success' : 'default'" />
            <span style="font-size:14px">{{item.name}}</span>&ensp;
            <span style="color:#9dabc2">{{item.desc}}</span>
          </Button>
          <a @click="handleClickStar(key, index)">
            <Icon v-show="item.show_en&&!item.enshrine"
            style="float:right;margin-right:10px;font-size:18px"
            type="md-star-outline" />
          </a>
          <a @click="handleClickStar(key, index)">
            <Icon v-show="item.enshrine"
              style="color:#ff9900;float:right;margin-right:10px;font-size:18px"
              type="md-star" />
          </a>
        </div>
      </Row>
    </Card>
  </div>
</template>
<script>
import SideMenuItem from './side-menu-item.vue'
import CollapsedMenu from './collapsed-menu.vue'
import { getUnion } from '@/libs/tools'
import mixin from './mixin'
// import routes from '@/router/routers'
import {
  mapState,
  mapActions } from 'vuex'
import {
  userEnshrinePost,
  userEnshrineDelete
} from '@/api/service'
export default {
  name: 'SideMenu',
  mixins: [mixin],
  components: {
    SideMenuItem,
    CollapsedMenu
  },
  props: {
    menuList: {
      type: Array,
      default () {
        return []
      }
    },
    openList: {
      type: Boolean
    },
    collapsed: {
      type: Boolean
    },
    theme: {
      type: String,
      default: 'dark'
    },
    rootIconSize: {
      type: Number,
      default: 22
    },
    iconSize: {
      type: Number,
      default: 16
    },
    accordion: Boolean,
    activeName: {
      type: String,
      default: ''
    },
    openNames: {
      type: Array,
      default: () => []
    },
    currentPath: {
      type: String,
      default: '/home'
    },
    serviceType: {
      type: Array,
      required: true,
      default: () => []
    },
    serviceList: {
      type: Array,
      required: true,
      default: () => []
    },
    enshrineList: {
      type: Array,
      required: true,
      default: () => []
    },
    list: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  computed: {
    ...mapState({
      name: state => state.user.userName
    }),
    textColor () {
      return this.theme === 'dark' ? '#fff' : '#848799'
    }
  },
  data () {
    return {
      openedNames: [],
      serviceSearch: '',
      searchList: {}
    }
  },
  mounted () {
    // console.log(this.list)
  },
  watch: {
    activeName (name) {
      if (this.accordion) this.openedNames = this.getOpenedNamesByActiveName(name)
      else this.openedNames = getUnion(this.openedNames, this.getOpenedNamesByActiveName(name))
    },
    openNames (newNames) {
      this.openedNames = newNames
    },
    openedNames () {
      this.$nextTick(() => {
        this.$refs.menu.updateOpened()
      })
    }
  },
  methods: {
    ...mapActions([
      'changeEnshrine'
    ]),
    handleSelectService (value) {
      for (let i = 0; i < this.serviceList.length; i++) {
        const item = this.serviceList[i];
        if(item.name == value){
          window.open(item.url, '_blank')
          break
        }
      }
    },
    handleSearchService (value) {
      let tmpList = {}
      this.serviceType.forEach(item => {
        tmpList[item] = []
      })
      this.serviceList.forEach((item) => {
        if (item.name.toUpperCase().indexOf(value.toUpperCase()) !== -1) {
          tmpList[item.class_name].push({
            name: item.name,
            url: item.url,
            desc: item.desc
          })
        }
      })
      this.searchList = tmpList
    },
    handleClickStar (key, index) {
      let star = this.list[key][index].enshrine
      this.list[key][index].enshrine = !star
      if (star) {
        userEnshrineDelete({user_name:this.name,service_id:this.list[key][index].id}).then(()=>{
          this.changeEnshrine({ name: this.list[key][index].menu, type: 'remove' })
        })
      } else {
        userEnshrinePost({user_name:this.name,service_id:this.list[key][index].id}).then(()=>{
          this.changeEnshrine({ name: this.list[key][index].menu, type: 'add' })
        })
      }
    },
    handleCollpasedChange () {
      this.$emit('on-coll-change', !this.collapsed)
    },
    getOpenedNamesByActiveName (name) {
      return this.$route.matched.map(item => item.name).filter(item => item !== name)
    },
    updateOpenName (name) {
      if (name === this.$config.homeName) this.openedNames = []
      else this.openedNames = this.getOpenedNamesByActiveName(name)
    },
    handleSelect (path) {
      for (let i = 0; i < this.menuList.length; i++) {
        const item = this.menuList[i];
        if(path == item.path){
          this.$emit('on-select', item)
          break;
        }
      }
    }
  }
}
</script>
<style>
  .demo-auto-complete-item{
      padding: 4px 0;
      border-bottom: 1px solid #F6F6F6;
  }
  .demo-auto-complete-group{
      font-size: 12px;
      padding: 4px 6px;
  }
  .demo-auto-complete-group span{
      color: #666;
      font-weight: bold;
  }
  .demo-auto-complete-group a{
      float: right;
  }
  .demo-auto-complete-count{
      float: right;
      color: #999;
  }
  .demo-auto-complete-more{
      display: block;
      margin: 0 auto;
      padding: 4px;
      text-align: center;
      font-size: 12px;
  }
</style>
<style lang="less">
@import './side-menu.less';
// .menu >>> .ivu-menu-item {
//   font-size: 30px;
// }
// .ivu-menu-item {
//   font-size: 30px;
// }
.nowMenu {
  font-weight: bolder;
  color: #fff !important;
}
</style>
