<template>
  <div>
    <a type="text" :class="['sider-trigger-a', collapsed ? '' : 'collapsed']">
      <Icon v-show="menuWay" :type="icon" :size="size" />
    </a>
    <a class="list" v-if="!collapsed" @mouseenter="handleShowList">
      <span style="float:right;">服务列表
      <Icon style="font-size:18px" type="ios-more" /></span>
    </a>
  </div>
</template>
<script>
export default {
  name: 'siderTrigger',
  props: {
    collapsed: Boolean,
    icon: {
      type: String,
      default: 'navicon-round'
    },
    size: {
      type: Number,
      default: 24
    },
    menuWay: {
      type: Boolean,
      default: true,
      required: true
    }
  },
  methods: {
    handleChange () {
      this.$emit('on-change', !this.collapsed)
    },
    handleShowList () {
      this.$emit('showList')
    }
  }
}
</script>
<style lang="less">
@import './sider-trigger.less';
</style>
