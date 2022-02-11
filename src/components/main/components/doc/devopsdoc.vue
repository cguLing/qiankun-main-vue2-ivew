<template>
  <div>
    <Button :size="buttonSize" icon="ios-document-outline" type="primary" to="http://www.baidu.com" target="_blank">{{ title }}</Button>
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
