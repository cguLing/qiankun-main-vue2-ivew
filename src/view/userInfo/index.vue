<template>
  <div class="userInfoTab">
    <Tabs type="card" :animated="false">
      <TabPane label="用户信息">待获取</TabPane>
      <TabPane label="系统设置">
        <Form ref="systemForm" :model="systemForm" :rules="systemRules">
          <FormItem prop="menuWay">
            <span style="font-weight:bold">
              触发式菜单栏：
            </span>
            <i-switch v-model="systemForm.menuWay" />
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmitSystem">确定</Button>
            <Button @click="handleResetSystem" style="margin-left: 8px">重置</Button>
          </FormItem>
        </Form>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import {
  mapState,
  mapActions } from 'vuex'
export default {
  name: 'userInfo',
  computed: {
    ...mapState({
      name: state => state.user.userName
    }),
    menuWay () {
      return this.$store.state.user.menuWay
    },
  },
  data () {
    return {
      systemRules:{},
      systemForm: {
        ldap: undefined,
        menuWay:undefined
      }
    }
  },
  mounted () {
    this.handleResetSystem()
  },
  watch: {
  },
  methods: {
    ...mapActions([
      'changeSystemSet'
    ]),
    handleSubmitSystem() {
      this.$refs['systemForm'].validate((valid) => {
        if (valid) {
          this.changeSystemSet(this.systemForm)
        }
      })
    },
    handleResetSystem(){
      this.systemForm={
        ldap: this.name,
        menuWay: this.menuWay
      }
    }
  }
}
</script>

<style lang="less">
.userInfoTab {
  // background: #e3e8ee;
  padding:20px 10px 10px 10px;
}
.userInfoTab > .ivu-tabs-card > .ivu-tabs-content {
    height: 120px;
    margin-top: -16px;
}

.userInfoTab > .ivu-tabs-card > .ivu-tabs-content > .ivu-tabs-tabpane {
    background: #fff;
    padding: 16px;
}

.userInfoTab > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
    border-color: transparent;
}

.userInfoTab > .ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active {
    border-color: #fff;
}
</style>
