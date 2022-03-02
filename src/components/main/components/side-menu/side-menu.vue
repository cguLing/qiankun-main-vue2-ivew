<template>
  <div class="side-menu-wrapper">
    <slot></slot>
    <Menu ref="menu" v-show="!collapsed" :active-name="activeName" :open-names="openedNames" :accordion="accordion" :theme="theme" width="auto" @on-select="handleSelect">
      <template v-for="item in menuList">
          <!-- <menu-item :name="item.name" :key="`menu-${item.name}`"><common-icon :type="item.meta.icon"/><span>{{ item.title }}</span></menu-item> -->
        <template v-if="item.children && item.children.length === 1">
          <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item" />
          <menu-item
            v-else
            style="font-size:15px;margin-left:-5px;background-color: #1e1e28;"
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
            style="font-size:15px;margin-left:-5px;background-color: #1e1e28;"
            :name="getNameOrHref(item)" :key="`menu-${item.name}`"
            :class="currentPath==item.path?'nowMenu':''">
            <common-icon
              :type="item.meta.icon || ''"
              :size="25"
              :style="currentPath==item.path?'font-weight:bolder':''"/>
            <span>{{ showTitle(item) }}</span>
          </menu-item>
        </template>
      </template>
    </Menu>
    <div class="menu-collapsed" v-show="collapsed" :list="menuList">
      <template v-for="item in menuList">
        <!-- <menu-item :name="item.name" :key="`menu-${item.name}`"><common-icon :type="item.meta.icon"/></menu-item> -->
        <collapsed-menu v-if="item.children && item.children.length > 1" @on-click="handleSelect" hide-title :root-icon-size="rootIconSize" :icon-size="iconSize" :theme="theme" :parent-item="item" :key="`drop-menu-${item.name}`"></collapsed-menu>
        <!-- <Tooltip transfer v-else :content="showTitle(item.children && item.children[0] ? item.children[0] : item)" placement="right" :key="`drop-menu-${item.name}`"> -->
          <a v-else :key="`drop-menu-${item.name}`" @click="handleSelect(getNameOrHref(item, true))" class="drop-menu-a">
            <common-icon :size="rootIconSize" :color="textColor" :style="currentPath==item.path?'font-weight:bolder':'color:rgba(255, 255, 255, 0.7)'" :type="item.meta.icon || (item.children && item.children[0].meta.icon) || ''"/>
          </a>
        <!-- </Tooltip> -->
      </template>
    </div>
    <Card v-show="!collapsed&&openList" dis-hover class="sider-list">
      <Row>
        <Input search placeholder="Enter something..." />
      </Row>
      <Row style="margin-top:8px">
        <span>常用服务：</span>
        <Tag type="border" color="primary">Matrix</Tag>
        <Tag type="border" color="primary">CloudDB</Tag>
      </Row>
      <Row v-for="(obj,idx) in list" :key="obj.title" style="margin-top:15px">
        <span style="font-weight:bold;color:#2d8cf0">&ensp;· {{obj.title}}</span>
        <Divider style="margin:8px" />
        <div v-for="(item,index) in obj.subList" :key="item.name" @mouseenter="item.show_en=true" @mouseleave="item.show_en=false">
          <Button type="text" :to="item.url" target="_blank">
            &emsp;<Badge :status="item.status" />
            <span style="font-size:14px">{{item.name}}</span>&ensp;
            <span style="color:#9dabc2">{{item.desc}}</span>
          </Button>
          <a @click="handleClickStar(idx, index)">
            <Icon v-show="item.show_en&&!item.enshrine"
            style="float:right;margin-right:10px;font-size:18px"
            type="md-star-outline" />
          </a>
          <a @click="handleClickStar(idx, index)">
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
      default: 25
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
    }
  },
  data () {
    return {
      openedNames: [],
      list: [{
        title: '基础设施',
        subList: [{
          status: 'success',
          name: 'VPN',
          menu: 'vpn',
          url: 'http://localhost:8001/subapp/vpn/',
          desc: '彩虹桥VPN系统',
          enshrine: false,
          show_en: false
        }, {
          status: 'success',
          name: 'Service',
          menu: 'bus',
          url: 'http://www.baidu.com',
          desc: '服务树',
          enshrine: false,
          show_en: false
        }]
      }, {
        title: '运维自动化',
        subList: [{
          status: 'default',
          name: 'CICD',
          menu: 'cicd',
          url: 'http://www.baidu.com',
          desc: '大禹部署上线平台',
          enshrine: false,
          show_en: false
        }, {
          status: 'default',
          name: 'LUNA',
          menu: 'luna',
          url: 'http://www.baidu.com',
          desc: '服务端代码发布服务',
          enshrine: false,
          show_en: false
        }]
      }]
    }
  },
  methods: {
    handleClickStar (idx, index) {
      let star = this.list[idx].subList[index].enshrine
      this.list[idx].subList[index].enshrine = !star
      if (star) {
        this.$store.commit('changeEnshire', { name: this.list[idx].subList[index].menu, type: 'remove' })
      } else {
        this.$store.commit('changeEnshire', { name: this.list[idx].subList[index].menu, type: 'add' })
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
    handleSelect (name) {
      this.$emit('on-select', name)
    }
  },
  computed: {
    textColor () {
      return this.theme === 'dark' ? '#fff' : '#848799'
    }
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
  mounted () {
    this.openedNames = getUnion(this.openedNames, this.getOpenedNamesByActiveName(name))
  }
}
</script>
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
