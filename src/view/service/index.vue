<template>
  <Card>
    <Tabs type="card">
      <TabPane label="服务列表">
        <Button type="primary" ghost style='color:#2d8cf0;' @click="showType = true">添加分类</Button>
        <Collapse v-model="panelPick" style="margin-top:15px">
            <Panel v-for="(key, idx) in Object.keys(list)" :key="key" :name="key">
                {{key}}
                <div style="float:right;margin-right:10px;font-size:12px">
                  <Button type="text" size="small" icon="md-add" style='color:#19be6b;' @click="handleShowAddService(idx)">添加服务</Button>
                  <Button type="text" size="small" icon="ios-create" style='color:#2d8cf0;' @click="handleEditType(idx)">编辑分类</Button>
                  <Poptip
                    confirm
                    title="确定删除所选分类吗？"
                    :transfer="true"
                    @on-ok="handleDeleteType(idx)">
                    <Button type="text" size="small" icon="ios-trash" style='color:#ed4014;'>删除分类</Button>
                  </Poptip>
                </div>
                <div slot="content">
                  <Row :gutter="10">
                    <Col span="6" v-for="item in list[key]" :key="item.name">
                      <Card>
                        <p slot="title">
                            <Badge :status="item.status?'success':'default'" />
                            {{item.name}}
                        </p>
                        <Button 
                          slot="extra" type="primary" size="small"
                          ghost style="margin-right:5px" @click="handleEditService(item)">
                          编辑
                        </Button>
                        <Poptip
                          confirm
                          slot="extra"
                          title="确定删除所选服务吗？"
                          :transfer="true"
                          @on-ok="handleDeleteService(item.id)">
                          <Button type="error" size="small" ghost>删除</Button>
                        </Poptip>
                        <ul>
                          <li>
                            <span style="font-weight:bold">名称：</span>
                            <span>{{item.name}}</span>
                          </li>
                          <li>
                            <span style="font-weight:bold">描述：</span>
                            <span>{{item.desc}}</span>
                          </li>
                          <li>
                            <span style="font-weight:bold">popo：</span>
                            <span>{{item.popo}}</span>
                          </li>
                          <li>
                            <span style="font-weight:bold">文档链接：</span>
                            <span>{{item.doc}}</span>
                          </li>
                          <li>
                            <span style="font-weight:bold">接入名称：</span>
                            <span>{{item.menu}}</span>
                          </li>
                          <li>
                            <span style="font-weight:bold">接入状态：</span>
                            <span>{{item.status?'已接入':'未接入'}}</span>
                          </li>
                          <li>
                            <span style="font-weight:bold">跳转路由：</span>
                            <span>{{item.url}}</span>
                          </li>
                        </ul>
                      </Card>
                    </Col>
                  </Row>
                </div>
            </Panel>
        </Collapse>
      </TabPane>
      <TabPane label="微服务接入">
        <Row style="margin-bottom: 15px">
          <Button type="primary" ghost style='color:#2d8cf0;' @click="showMicro = true">接入微服务</Button>
        </Row>
        <Row :gutter="10">
          <Col span="6" v-for="item in microList" :key="item.id">
            <Card>
              <p slot="title">
                  <Icon :type="item.icon" />
                  {{item.name}}
              </p>
              <Button
                slot="extra" type="primary" size="small" ghost
                style="margin-right:5px" @click="handleEditMicro(item)">
                编辑</Button>
              <Poptip
                confirm
                slot="extra"
                title="确定删除所选服务吗？"
                :transfer="true"
                @on-ok="handleDeleteMicro(item.id)">
                <Button type="error" size="small" ghost>删除</Button>
              </Poptip>
              <ul>
                <li>
                  <span style="font-weight:bold">名称：</span>
                  <span>{{item.name}}</span>
                </li>
                <li>
                  <span style="font-weight:bold">接入链接：</span>
                  <span>{{item.entry}}</span>
                </li>
                <li>
                  <span style="font-weight:bold">菜单标题：</span>
                  <span>{{item.title}}</span>
                </li>
                <li>
                  <span style="font-weight:bold">接入路由：</span>
                  <span>{{item.activeRule}}</span>
                </li>
              </ul>
            </Card>
          </Col>
        </Row>
      </TabPane>
    </Tabs>
    <Modal
        v-model="showType"
        :title="typeTitle"
        :loading="typeLoading"
        @on-cancel="handleCancelType"
        @on-ok="handleAddType">
      <Form ref="typeForm" :model="typeForm" :rules="typeRules" :label-width="80">
        <FormItem label="分类名" prop="class_name">
            <Input v-model="typeForm.class_name" placeholder="请输入分类名称"></Input>
        </FormItem>
        <FormItem label="排序">
            <InputNumber :max="20" :min="0" v-model="typeForm.index"></InputNumber>
        </FormItem>
      </Form>
    </Modal>
    <Modal
        v-model="showService"
        :title="serviceTitle"
        :loading="serviceLoading"
        @on-cancel="handleCancelService"
        @on-ok="handleAddService">
      <Form ref="serviceForm" :model="serviceForm" :rules="serviceRules" :label-width="80">
        <FormItem label="类别" prop="class_id">
          <Select v-model="serviceForm.class_id" filterable>
            <Option v-for="item in serviceType" :value="item.id" :key="item.id">{{ item.class_name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="名称" prop="name">
          <Input v-model="serviceForm.name" placeholder="请输入服务名称"></Input>
        </FormItem>
        <FormItem label="链接" prop="url">
          <Input v-model="serviceForm.url" placeholder="请输入跳转链接"></Input>
        </FormItem>
        <FormItem label="描述" prop="desc">
          <Input v-model="serviceForm.desc" placeholder="请精简的进行描述"></Input>
        </FormItem>
        <FormItem label="POPO群" prop="popo">
          <Input v-model="serviceForm.popo" placeholder="请提供答疑POPO群号"></Input>
        </FormItem>
        <FormItem label="文档链接" prop="doc">
          <Input v-model="serviceForm.doc" show-word-limit placeholder="请提供说明文档链接"></Input>
        </FormItem>
        <FormItem label="是否接入" prop="status">
          <i-switch v-model="serviceForm.status"/>
        </FormItem>
        <div v-show="serviceForm.status">
          <FormItem label="微服务" prop="menu_id">
            <Select v-model="serviceForm.menu_id" filterable>
              <Option v-for="item in microList" :value="item.id" :key="item.id" :label="item.title">
                {{ item.title }}
                <span style="font-size:11px;float: right; color: #8492a6;">{{ item.name }}</span>
              </Option>
            </Select>
          </FormItem>
        </div>
      </Form>
    </Modal>
    <Modal
        v-model="showMicro"
        :title="microTitle"
        :loading="microLoading"
        @on-cancel="handleCancelMicro"
        @on-ok="handleAddMicro">
      <Form ref="microForm" :model="microForm" :rules="microRules" :label-width="80">
        <FormItem label="名称" prop="name">
          <Input v-model="microForm.name" placeholder="请输入服务名称(英文)"></Input>
        </FormItem>
        <FormItem label="接入链接" prop="entry">
          <Input v-model="microForm.entry" placeholder="请输入接入链接"></Input>
        </FormItem>
        <FormItem label="图标" prop="icon">
          <Input v-model="microForm.icon" placeholder="请输入图标代号"></Input>
        </FormItem>
        <FormItem label="菜单标题" prop="title">
          <Input v-model="microForm.title" :maxlength="10" show-word-limit placeholder="请输入菜单标题"></Input>
        </FormItem>
        <FormItem label="接入路由" prop="activeRule">
          <Input v-model="microForm.activeRule" placeholder="请输入接入路由"></Input>
        </FormItem>
      </Form>
    </Modal>
  </Card>
</template>

<script>
import {
  serviceTypeGet,
  serviceListGet,
  serviceTypePost,
  serviceTypePut,
  serviceTypeDelete,
  serviceListPost,
  serviceListPut,
  serviceListDelete,
  microListGet,
  microListPost,
  microListPut,
  microListDelete
} from '@/api/service'
export default {
  name: 'home',
  components: {

  },
  data () {
    return {
      panelPick: [],
      microList: [],
      serviceType: [],
      serviceList: [],
      list: {},
      showType: false,
      typeLoading: false,
      typeForm: {
        class_name: '',
        index: 0
      },
      typeTitle: '添加分类',
      typeRules: {
        class_name: [
          { required: true, message: '分类名不能为空', trigger: 'blur' }
        ]
      },
      showService: false,
      serviceLoading: false,
      serviceForm: {
        class_id: '',
        status:false,
        name: '',
        desc:'',
        url: '',
        popo:'',
        doc: '',
        menu_id: undefined
      },
      serviceTitle: '添加服务',
      serviceRules: {
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '链接不能为空', trigger: 'blur' }
        ],
        // desc: [
        //   { required: true, message: '描述不能为空', trigger: 'blur' }
        // ]
      },
      showMicro: false,
      microLoading: false,
      microForm: {
        name: '',
        entry: '',
        icon: '',
        title: '',
        activeRule: ''
      },
      microTitle: '添加接入服务',
      microRules: {
        entry: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        activeRule: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.init()
    this.initMicro ()
  },
  methods: {
    init () {
      serviceTypeGet().then((res) => {
        this.serviceType = res.data.data
      }).then(() => {
        serviceListGet().then((res) => {
          let tmpList = {}
          this.serviceType.forEach(item => {
            tmpList[item.class_name] = []
          })
          this.serviceList = res.data.data
          res.data.data.forEach((item) => {
            tmpList[item.class_name].push(item)
          })
          this.list = tmpList
        }).then(()=>{
          this.$store.commit('setServiceList', this.serviceList)
          this.$store.commit('setMenuRouter')
        })
      })
      // setTimeout(() => {
      //   this.panelPick = [this.serviceType[0], this.serviceType[1]]
      // }, 50)
    },
    initMicro () {
      microListGet().then((res) => {
        this.microList = res.data.data
        this.$store.commit('setMicroApps',  res.data.data)
      })
    },
    handleCancelMicro () {
      this.showMicro = false
      this.microLoading = false
      this.microTitle = '添加接入服务'
      this.microForm = {
        name: '',
        entry: '',
        status: false,
        icon: '',
        title: '',
        activeRule: ''
      }
    },
    handleDeleteMicro (id) {
      microListDelete({id:id}).then(() => {
        this.$Message.success('删除成功！')
        this.initMicro()
      }).catch((err) => {
        this.$Message.error('删除失败：' + err)
      })
    },
    handleAddMicro () {
      this.$refs['microForm'].validate((valid) => {
        if (valid) {
          this.microLoading = true
          if(this.microTitle == '添加接入服务'){
            microListPost(this.microForm).then(() => {
              this.$Message.success('添加成功！')
              this.initMicro()
              this.handleCancelMicro()
            }).catch((err) => {
              this.$Message.error('添加失败：' + err)
              this.handleCancelMicro()
            })
          } else if(this.microTitle == '编辑接入服务'){
            microListPut(this.microForm).then(() => {
              this.$Message.success('编辑成功！')
              this.initMicro()
              this.handleCancelMicro()
            }).catch((err) => {
              this.$Message.error('编辑失败：' + err)
              this.handleCancelMicro()
            })
          }
        }
      })
    },
    handleShowAddService (idx) {
      this.serviceForm = {
        class_id: this.serviceType[idx].id,
        name: '',
        status: false,
        desc: '',
        url: '',
        popo:'',
        doc: '',
        menu_id: undefined
      }

      this.showService = true
    },
    handleEditMicro (item) {
      this.microTitle = '编辑接入服务'
      this.microForm = item
      this.showMicro = true
    },
    handleEditService (item) {
      this.serviceTitle = '编辑服务'
      this.serviceForm = {
        id: item.id,
        class_id: item.class_id,
        name: item.name,
        status: item.status==0?false:true,
        desc: item.desc,
        url: item.url,
        menu_id: item.menu_id
      }
      this.showService = true
    },
    handleCancelService () {
      this.showService = false
      this.serviceLoading = false
      this.serviceTitle = '添加服务'
      // this.serviceForm = {
      //   class_id: undefined,
      //   name: ''
      // }
    },
    handleDeleteService (id) {
      serviceListDelete({id:id}).then(() => {
        this.$Message.success('删除成功！')
        this.init()
      }).catch((err) => {
        this.$Message.error('删除失败：' + err)
      })
    },
    handleAddService () {
      this.$refs['serviceForm'].validate((valid) => {
        if (valid) {
          this.serviceLoading = true
          if(this.serviceTitle == '添加服务'){
            this.serviceForm.status=(this.serviceForm.status?1:0)
            serviceListPost(this.serviceForm).then(() => {
              this.$Message.success('添加成功！')
              this.init()
              this.handleCancelService()
            }).catch((err) => {
              this.$Message.error('添加失败：' + err)
              this.handleCancelService()
            })
          } else if(this.serviceTitle == '编辑服务'){
            this.serviceForm.status=(this.serviceForm.status?1:0)
            serviceListPut(this.serviceForm).then(() => {
              this.$Message.success('编辑成功！')
              this.init()
              this.handleCancelService()
            }).catch((err) => {
              this.$Message.error('编辑失败：' + err)
              this.handleCancelService()
            })
          }
        }
      })
    },
    handleCancelType () {
      this.showType = false
      this.typeLoading = false
      this.typeTitle = '添加分类'
      this.typeForm = {
        class_name: '',
        index: 0
      }
    },
    handleAddType () {
      this.$refs['typeForm'].validate((valid) => {
        if (valid) {
          this.typeLoading = true
          if(this.typeTitle == '添加分类'){
            serviceTypePost(this.typeForm).then(() => {
              this.$Message.success('添加成功！')
              this.init()
              this.handleCancelType()
            }).catch((err) => {
              this.$Message.error('添加失败：' + err)
              this.handleCancelType()
            })
          } else if(this.typeTitle == '编辑分类'){
            serviceTypePut(this.typeForm).then(() => {
              this.$Message.success('编辑成功！')
              this.init()
              this.handleCancelType()
            }).catch((err) => {
              this.$Message.error('编辑失败：' + err)
              this.handleCancelType()
            })
          }
        }
      })
    },
    handleEditType (idx) {
      this.typeTitle = '编辑分类'
      this.typeForm = this.serviceType[idx]
      this.showType = true
    },
    handleDeleteType (idx) {
      serviceTypeDelete({id: this.serviceType[idx].id}).then(() => {
        this.$Message.success('删除成功！')
        this.init()
      }).catch((err) => {
        this.$Message.error('删除失败：' + err)
      })
    },
    handleEdit () {

    }
  }
}
</script>

<style lang="less">
li {list-style-type:none;}
</style>
