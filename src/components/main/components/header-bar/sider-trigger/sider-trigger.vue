<template>
  <a @click="handleChange" type="text" :class="['sider-trigger-a', collapsed ? '' : 'collapsed']">
    <Icon :type="icon" :size="size" />
  </a>
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
    }
  },
  methods: {
    handleChange (state) {
      this.$emit('on-change', state)
    }
  }
}
</script>
<style lang="less">
@import './sider-trigger.less';
</style>
