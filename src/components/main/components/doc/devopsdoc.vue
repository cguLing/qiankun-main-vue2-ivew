<template>
  <div>
    <Button
      :size="buttonSize"
      type="text"
      style="background-color:#183054;"
      to="http://www.baidu.com"
      target="_blank">
      {{ title }}
      <Icon type="md-help" style="margin:0 0px 3px -2px" />
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
      title: '使用文档',
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
