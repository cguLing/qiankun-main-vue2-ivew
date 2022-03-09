<template>
  <div>
    <Button
      :size="buttonSize"
      type="text"
      style="background-color:#1e1e28;color:#fff"
      to="http://www.baidu.com"
      target="_blank">
      {{ title }}
      <Icon type="md-bonfire" style="font-size:16px;margin:0 0px 3px -2px" />
    </Button>
  </div>
</template>

<script>
export default {
  name: 'DevOpsDoc',
  props: {
    lang: String
  },
  data () {
    return {
      title: '新手引导',
      buttonSize: 'default'
    }
  }
}
</script>

<style scoped>
.ivu-btn-text{
  color:#fff;
  padding: 5px 0px 6px;
}
</style>
