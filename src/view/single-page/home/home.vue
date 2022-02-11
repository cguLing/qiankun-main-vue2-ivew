<template>
  <div class="login">
    <div class="login-con">
      <Card
        icon="log-in"
        title="欢迎登录"
        :bordered="false"
      >
        <div class="form-con">
          <p class="login-tip">输入任意用户名和密码即可</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {

  },
  data () {
    return {

    }
  },
  mounted () {
    //
  }
}
</script>

<style lang="less">
.count-style{
  font-size: 50px;
}
</style>
