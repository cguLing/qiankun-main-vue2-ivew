<template>
  <div>
    <Row type="flex" justify="end">
      <Form ref="searchForm" :model="searchForm" inline>
        <FormItem prop="inst_type" v-if="searchForm.hasOwnProperty('inst_type')">
          <Dropdown @on-click="handleDrop">
            <a href="javascript:void(0)" style="font-size:16px;font-weight:bolder">
              {{searchForm.inst_type}}
              <Icon type="ios-arrow-down"></Icon>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem name="IDC">IDC</DropdownItem>
              <DropdownItem name="IT">IT</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </FormItem>
        <FormItem prop="keyword" style="width:300px" v-if="searchForm.hasOwnProperty('keyword')">
          <Input search v-model="searchForm.keyword" :placeholder="searchPlace" />
        </FormItem>
        <FormItem v-if="searchForm.hasOwnProperty('keyword')">
          <Button type="primary" ghost @click="handleSearch">{{searchButton}}</Button>
        </FormItem>
      </Form>
    </Row>
    <Row style="margin:-25px 0 10px 0">
      <Button type="primary" icon="md-add" ghost @click="handleAdd">{{addButton}}</Button>
    </Row>
    <Row>
      <Table :loading="tableLoading" :columns="tableCols" :data="tableData">
        <template slot-scope="{ row, index }" slot="action">
          <div
            v-for="item in actionButton"
            :key="item.name"
            style="display:inline-block">
            <div v-if="item.click=='delete'">
              <Poptip
                confirm
                title="确定删除选中记录吗？"
                :transfer="true"
                @on-ok="handleAction(row,item.click)">
                <Button
                  size="small"
                  :type="item.type"
                  :icon="item.icon"
                  ghost
                  :style="item.style">{{item.name}}</Button>
              </Poptip>
            </div>
            <Button
              v-else
              size="small"
              :type="item.type"
              :icon="item.icon"
              ghost
              :style="item.style"
              @click="handleAction(row,item.click)">
              {{item.name}}</Button>
          </div>
        </template>
      </Table>
    </Row>
    <Row type="flex" justify="end" style="margin-top:15px" v-if="searchForm.hasOwnProperty('total')">
      <Page
        :total="searchForm.total"
        :page-size="searchForm.page_size"
        :current.sync="searchForm.page"
        show-total show-elevator show-sizer
        @on-change="handlePage">
      </Page>
    </Row>
  </div>
</template>
<script>
export default {
  name: 'CommonTable',
  props: {
    searchPlace: {
      type: String,
      default: '请输入关键字搜索'
    },
    searchButton: {
      type: String,
      default: '查询'
    },
    addButton: {
      type: String,
      default: '新增'
    },
    tableCols: {
      required: true,
      type: Array
    },
    tableData: {
      type: Array,
      default: ()=>[]
    },
    tableLoading: {
      type: Boolean,
      default: false
    },
    actionButton: {
      type: Array,
      default: ()=>[
        {name:'编辑',type:'text',icon:'md-create', style:'color:#2d8cf0;',click:'edit'},
        {name:'删除',type:'text',icon:'md-trash', style:'color:#ed4014;',click:'delete'}]
    },
    searchForm: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
    }
  },
  watch: {
  },
  methods: {
    handleDrop(name){
      this.searchForm.inst_type=name
      this.handleSearch
    },
    handleSearch(){
      this.$emit('handleSearch', this.searchForm)
    },
    handleAdd(){
      this.$emit('handleAdd')
    },
    handleAction(row, type){
      this.$emit('handleAction', row, type)
    },
    handlePage(){}
  }
}
</script>