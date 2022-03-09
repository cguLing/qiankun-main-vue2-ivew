<template>
  <Modal
    v-model="open"
    :width="650"
    :title="title"
    @on-cancel="handleAction('cancel')">
      <Form ref="form" :model="form" :rules="rules">
        <FormItem>
          <Row :gutter="10" type="flex" justify="center">
            <Col span="7" style="text-align:center">
              <span style="color:red">&emsp;* </span>路由
            </Col>
            <Col span="11" style="text-align:center">
              <span style="color:red">&emsp;&emsp;* </span>子网&emsp;&emsp;&emsp;
              <Icon type="ios-repeat" :size=20 />&ensp;&emsp;&emsp;
              <span style="color:red">* </span>网段&emsp;&emsp;
            </Col>
            <!-- <Col span="4" style="text-align:center"><span style="color:red">* </span>网段</Col> -->
            <Col span="6" style="text-align:center"><span style="color:red">* </span>备注&emsp;&emsp;&emsp;&emsp;</Col>
          </Row>
        </FormItem>
        <Row
          :gutter="10" type="flex" justify="center"
          v-for="(item,idx) in form.routes" :key="idx">
          <Col span="1" v-show="showMulti">
            <Icon
              type="md-add-circle"
              style="color:#2d8cf0;float:left;margin-top:5px"
              :size=18
              @click="handleAdd" />
          </Col>
          <Col span="6" style="text-align:center">
            <FormItem
              :key="idx"
              :prop="'routes.'+idx+'.route'"
              :rules="{validator: isValidIp, trigger: 'blur'}"
            >
              <Input v-model="item.route" placeholder="请输入路由" clearable />
            </FormItem>
          </Col>
          <Col span="6" style="text-align:center">
            <FormItem
              :key="idx"
              :prop="'routes.'+idx+'.mask_decimal'"
              :rules="{required: true,  validator: isValidMask, trigger: 'blur'}"
            >
              <Input v-model="item.mask_decimal" @on-blur="trans('mask',item.mask_decimal,idx)" placeholder="请输入子网" clearable />
            </FormItem>
          </Col>
          <Col span="4" style="text-align:center">
            <FormItem
              :key="idx"
              :prop="'routes.'+idx+'.mask_bit'"
              :rules="{required: true,  validator: isValidMaskBit, trigger: 'blur'}"
            >
              <Input v-model="item.mask_bit" @on-blur="trans('bit',item.mask_bit,idx)" placeholder="请输入网段" clearable />
            </FormItem>
          </Col>
          <Col span="6" style="text-align:center">
            <FormItem
              :key="idx"
              :prop="'routes.'+idx+'.desc'"
              :rules="{required: true,  message: '必填', trigger: 'blur'}"
            >
              <Input v-model="item.desc" placeholder="请输入路由用途" clearable />
            </FormItem>
          </Col>
          <Col span="1" v-show="showMulti">
            <Icon type="md-close-circle"
              style="color:#ed4014;margin-top:5px"
              :size=18
              @click="handleRemove(idx)" />
          </Col>
        </Row>
      </Form>
      <Collapse simple v-show="showMulti">
        <Panel name="1">
          服务器刷新
          <div slot="content">
            <Table ref="selection"
              :columns="serverCols" :data="serverData"
              @on-selection-change="handleSelection"></Table>
          </div>
        </Panel>
      </Collapse>
      <Button slot="footer"
        v-for="item in actionButton"
        :key="item.name"
        :type="item.type"
        :icon="item.icon"
        :style="item.style"
        @click="handleAction(item.click)">{{item.name}}</Button>
  </Modal>
</template>
<script>
export default {
  name: 'MyModal',
  props: {
    openModal: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: '创建'
    },
    actionButton: {
      type: Array,
      default: ()=>[
        {name:'取消',type:'default',icon:'', style:'',click:'cancel'},
        {name:'确定',type:'primary',icon:'', style:'',click:'addConfirm'}]
    },
    modalForm: {
      type:Object,
      default: ()=>{}
    },
    serverCols: {
      type: Array,
      required: true
    },
    serverData: {
      type: Array,
      default: ()=>[]
    }
  },
  data(){
    const isValidIp = (rule, value, callback) => {
      let ip = value
      let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
      if (!reg.test(ip)) {
        return callback(new Error('ip格式不规范'))
      } else {
        callback()
      }
      return true
    }
    const isValidMask = (rule, value, callback) => {
      let ip = value
      let reg = /^((128|192)|2(24|4[08]|5[245]))(\.(0|(128|192)|2((24)|(4[08])|(5[245])))){3}$/
      if (!reg.test(ip)) {
        return callback(new Error('子网掩码格式不规范'))
      } else {
        callback()
      }
      return true
    }
    const isValidMaskBit = (rule, value, callback) => {
      let ip = value
      let reg = /^([1-2][0-9]|3[0-2]|[1-9])$/
      if (!reg.test(ip)) {
        return callback(new Error('网段格式不规范'))
      } else {
        callback()
      }
      return true
    }
    return {
      isValidIp,
      isValidMask,
      isValidMaskBit,
      form:{
        routes:[{
          route:undefined,
          mask_decimal:undefined,
          mask_bit:undefined,
          desc:undefined
        }],
        server:[]
      },
      rules:{},
      open: false,
      showMulti: true
    }
  },
  watch: {
    openModal: {
      handler(val){
        this.open = val
        if(!val) {
          this.handleAction('cancel')
        }
      }
    },
    modalForm: {
      handler(val){
        if(Object.keys(val).length == 0){
          this.showMulti = true
        } else {
          this.form.routes = [val]
          this.showMulti = false
        }
      },
      deep: true
    }
  },
  methods: {
    trans(type,data,idx){
      switch (type) {
        case 'mask':
          let reg1 = /^((128|192)|2(24|4[08]|5[245]))(\.(0|(128|192)|2((24)|(4[08])|(5[245])))){3}$/
          if (reg1.test(data)) {
            let map = {255:8,254:7,252:6,248:5,240:4,224:3,192:2,128:1,0:0}
            let num = data.split('.').map(item=>parseInt(item))
            let bit = 0 
            num.forEach((item)=>{
              bit+=map[item.toString()]
            })
            this.form.routes[idx].mask_bit=bit
          }
          break;
          
        case 'bit':
          let reg2 = /^([1-2][0-9]|3[0-2]|[1-9])$/
          if (reg2.test(data)) {
            let count8=parseInt(parseInt(data)/8)
            let rest8=parseInt(data)%8
            let decimal=''
            for (let i = 0; i < count8; i++) {
              if(count8==4&&i==3){
                decimal+='255'
              } else {
                decimal+='255.'
              }              
            }
            if(count8!=4){
              if(rest8==0){
                decimal+='0'
              }else{
                decimal+=(256-Math.pow(2,(8-rest8))).toString()
              }
            }
            for (let i = 0; i < 3-count8; i++) {
              decimal+='.0'
            }
            this.form.routes[idx].mask_decimal=decimal
          }
          break;
      
        default:
          break;
      }
    },
    handleAction(type){
      switch (type) {
        case 'addConfirm':
          this.$refs['form'].validate((valid) => {
            if (valid) {
              this.$emit('handleAction', type, this.form)
            }
          })
          break;
        
        case 'changeConfirm':
          this.$refs['form'].validate((valid) => {
            if (valid) {
              this.$emit('handleAction', type, this.form)
            }
          })
          break;

        case 'cancel':
          this.open = false
          this.$emit('update:openModal', false)
          this.form = {
            routes:[{
              route:undefined,
              mask_decimal:undefined,
              mask_bit:undefined,
              desc:undefined
            }],
            server: []
          }
          break;
      
        default:
          this.$emit('handleAction', type)
          break;
      }
    },
    handleAdd(){
      this.form.routes.push({
        route:undefined,
        mask_decimal:undefined,
        mask_bit:undefined,
        desc:undefined
      })
    },
    handleRemove(idx){
      let list = this.form.routes;
      if(list.length>1){
        list.forEach((item, index,arr) => {
          if (idx === index) {
            let newList = arr.slice(0,index).concat(arr.slice(index+1));
            this.form.routes = newList;
          }
        });
      }
    },
    handleSelection(selections){
      this.form.server = selections
    }
  }
}
</script>