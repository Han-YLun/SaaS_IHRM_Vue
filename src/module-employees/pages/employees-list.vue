<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <span class="seleInfo">
          <el-select v-model="stausInfo">
            <el-option v-for="item in baseData.stausInfos" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </span>
        <span class="posInfo">
          本月&nbsp;&nbsp;({{totals.range}})&nbsp;&nbsp;
          <span>在职：
            <em>{{totals.actives}}</em>
          </span>
          <span>入职：
            <em class="active">{{totals.news}}</em>
          </span>
          <span>离职：
            <em class="disabled">{{totals.leaves}}</em>
          </span>
        </span>

        <div class="fr">
          <span class="iconInfo">
            <span class="serachInput">
              <i class="fa fa-search" aria-hidden="true" @click="searchIcon" v-show="iconShow" title="搜索"></i>
              <el-input
                placeholder="搜索"
                v-show="searchShow"
                @clear='handleClear'
                v-model="requestParameters.keyword"
                    clearable
                    @keyup.enter.native='dataSearch(itemes,index)'>
              </el-input>
            </span>
          </span>
            <router-link :to="{'path':'/employees/import/',query: {name: '员工'}}" class="el-button el-button--primary el-button--mini" title="导入">导入</router-link>
            <el-button type="primary" size="mini" title="设置" @click="handlSet">设置</el-button>
            <router-link :to="{'path':'/employees/archiving/'}" class="el-button el-button--primary el-button--mini" title="历史归档">历史归档</router-link>
          
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="handlAdd">新增员工</el-button>
          <router-link :to="{'path':'/employees/report/'+ totals.month}" class="el-button el-button--primary el-button--mini" >{{totals.month}}月份报表</router-link>
        </div>
      </el-card>
      <el-card shadow="never" v-loading="loading" class="boxMar" :style="{minHeight:boxHeight}">
        <!-- 搜索栏 -->
        <el-form :inline="true" :model="requestParameters" ref="requestParameters" label-width="150px" class="formInfo">
          <div style="overflow: hidden" :style="{height : showMore ? 'auto': showHeight + 'px'}">
            <el-row>
            <el-col :span="6">
               <el-form-item label="性别：">
                <el-radio-group v-model="requestParameters.gender">
                  <el-radio
                    v-for="item in baseData.gender"
                    :label="item.value"
                    :key="item.id"
                    :value="item.value">
                    {{item.value}}
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="聘用形式：">
                <el-radio-group v-model="requestParameters.formOfEmployment">
                  <el-radio
                  v-for="item in baseData.hireType"
                  :label="item.value"
                  :key="item.id"
                  :value="item.value">
                  {{item.value}}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="管理形式：">
                <el-radio-group v-model="requestParameters.formOfManagement">
                  <el-radio
                  v-for="item in baseData.subjection"
                  :label="item.value"
                  :key="item.id"
                  :value="item.value">
                  {{item.value}}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="账号状态：">
                <el-radio-group v-model="requestParameters.accountStatus">
                  <el-radio
                  v-for="item in common.enableState"
                  :label="item.value"
                  :key="item.id"
                  :value="item.value">
                  {{item.value}}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
                <el-form-item label="部门：">
                <el-radio-group v-model="requestParameters.department">
                  <el-radio
                  v-for="item in baseData.departments"
                   :label="item.value"
                   :key="item.id"
                   :value="item.value">
                  {{item.value}}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
                <el-form-item label="工作城市：">
                <el-radio-group v-model="requestParameters.workingCity">
                  <el-radio
                  v-for="item in baseData.isOverseas"
                  :label="item.value"
                  :key="item.id"
                  :value="item.value">
                  {{item.value}}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          </div>
          <div class="showMore" :class="{'show-more' : showMore}">
            <el-form-item>
              <el-button type="primary" @click="handleSearch">查询</el-button>
              <el-button @click="handleRest">重置</el-button>
              <el-button type="text" @click="toggleShowMore">{{ showMore ? '收起▲' : '展开▼'}}</el-button>
            </el-form-item>
          </div>
        </el-form>
        <el-alert v-if="barSearch.alertText !== ''" :title="barSearch.alertText" type="info" class="alert" :closable='false' show-icon>
        </el-alert>
        <!-- 搜索栏 / -->
        <!-- 数据表格 -->
        <div class="tags-container tagInfo">
          <el-tag v-for="item in seleList" :key="item" :disable-transitions="false" closable @close="seleClose(item)" class="active">
            {{item}}
          </el-tag>
        </div>
        <el-table :key='tableKey' :data="tables" v-loading="listLoading" element-loading-text="给我一点时间" fit highlight-current-row style="width: 100%; margin-top:10px;" border>
          <el-table-column sortable prop="id" label="序号" width="100" ></el-table-column>
          <el-table-column sortable prop="fullName" label="姓名" width="150"></el-table-column>
          <el-table-column sortable prop="mobilePhone" label="手机号" width="150"></el-table-column>
          <el-table-column sortable prop="workNumber" label="工号" width="120"></el-table-column>
          <el-table-column sortable prop="formOfEmployment" label="聘用形势" width="200"></el-table-column>
          <el-table-column sortable prop="department" label="部门" width="200"></el-table-column>
          <el-table-column sortable prop="timeOfEntry" label="入职时间" width="150">
            <template slot-scope="props">
               {{props.row.timeOfEntry | formatDate}}
             </template>
          </el-table-column>
          <el-table-column sortable label="账户状态" width="120">
            <template slot-scope="scope">
              <el-switch 
              v-model="scope.row.accountStatus" 
              active-color="#13ce66"
              inactive-color="#ff4949"
               @change="handleStatus(scope.row)">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="220">
            <template slot-scope="scope">
              <router-link :to="{'path':'/employees/details/' + scope.row.id}" class="el-button el-button--text el-button--small">
                查看
              </router-link>
              <el-button @click="handlPositive(scope.row.id)" type="text" size="small">转正</el-button>
              <router-link :to="{'path':'/employees/adjustPost/' + scope.row.id}" class="el-button el-button--text el-button--small">
                调岗
              </router-link>
              <router-link :to="{'path':'/employees/leave/' + scope.row.id}" class="el-button el-button--text el-button--small">
                离职
              </router-link>
              <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="requestParameters.pagesize"
            layout="total, prev, pager, next"
            :total="Number(counts)">
          </el-pagination>
        </div>
        <!-- end -->
        <!-- 数据表格 / -->
        <!-- 新增员工弹层 -->
        <component v-bind:is="employeesAdd" ref="addUser" :formData.sync='requestParameters' :text='text' :pageTitle='pageTitle' :formBase='formData' :baseData='baseData' :ruleInline='ruleInline' @clearFormDate='clearFormDate' v-on:newDataes="handleLoadDataList" v-on:handleCloseModal="handleCloseModal"  @doQuery='doQuery'>
        </component>
        <!-- 转正 -->
        <component v-bind:is="employeesPositive" ref="positive" :objInfoDataes='objInfoDataes' :formData.sync='requestParameters' :text='text' :pageTitle='pageTitle' :formBase='formData' :ruleInline='ruleInline' @clearFormDate='clearFormDate' v-on:newDataes="handleLoadDataList" v-on:handleCloseModal="handleCloseModal">
        </component>

        <!-- 设置 -->
        <component v-bind:is="employeesSet" ref="set" :objInfoDataes='objInfoDataes' :formData.sync='requestParameters' :setData='setData' @clearFormDate='clearFormDate' v-on:newDataes="handleLoadDataList" v-on:handleCloseModal="handleCloseModal">
        </component>
      </el-card>
    </div>
  </div>
</template>

<script>
import { checkPhone, minHeight, formatDate } from '@/filters/index'
import constantApi from '@/api/constant/employees'
import commonApi from '@/api/constant/common'
import {
  list,
  positiveDetail,
  settDetail,
  accountStatus
} from '@/api/base/employees'
import employeesAdd from './../components/add'
import employeesPositive from './../components/turn-positive'
import employeesSet from './../components/setting'
var _this = null
export default {
  name: 'employeesList',
  components: {
    employeesAdd,
    employeesPositive,
    employeesSet
  },
  data() {
    return {
      employeesAdd: 'employeesAdd',
      employeesPositive: 'employeesPositive',
      employeesSet: 'employeesSet',
      baseData: [],
      dataList: [],
      seleList: [],
      common: [],
      totals: {},
      pageTitle: '用户', // 页面标题
      text: '', // 新增、编辑文本
      tableKey: 0,
      listLoading: true,
      stausInfo: '在职',
      counts: '',
      showHeight: 40,
      showMore: false,
      boxHeight: '',
      barSearch: {
        alertText: ''
      },
      requestParameters: {
        page: 1,
        pagesize: 10,
        gender: this.gender, // 性别
        keyword: this.keyword,
        formOfEmployment: this.formOfEmployment, // 聘用形式
        department: this.department, // 部门
        accountStatus: this.accountStatus, // 账号状态
        formOfManagement: this.formOfManagement, // 管理形式
        workingCity: this.workingCity // 工作城市
      },
      loading: false,
      multipleSelection: [],
      dialogVisible: false,
      iconShow: true,
      searchShow: false,
      objInfoDataes: [],
      setData: {
        dateOfBirth: {},
        fullName: {},
        mobilePhone: {},
        sex: {},
        theHighestDegreeOfEducation: {}
      },
      formData: {
        timeOfEntry: '', // 入职时间
        mobilePhone: '', // 手机
        fullName: '', // 姓名
        workNumber: '', // 工号
        formOfEmployment: '', // 聘用形式
        department: '', // 部门
        formOfManagement: '', // 管理形式
        workingCity: '', // 工作城市
        correctionTime: '', // 转正时间
        accountStatus: '', // 绑定状态
        informalType: '',
        positiveId: ''
      },
      ruleInline: {
        // 表单验证
        fullName: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        mobilePhone: [{ validator: checkPhone, trigger: 'blur' }],
        timeOfEntry: [
          {
            required: true,
            message: '请选择入职时间',
            trigger: 'change'
          }
        ],
        formOfEmployment: [
          {
            required: true,
            message: '请选择聘用形式',
            trigger: 'change'
          }
        ]
      }
    }
  },
  filters: {
    formatDate(time) {
      if (time !== 0) {
        var date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    }
  },
  computed: {
    // 模糊搜索
    tables() {
      const search = this.requestParameters.keyword
      if (search) {
        return this.dataList.items.filter(data => {
          return Object.keys(data).some(key => {
            return (
              String(data[key])
                .toLowerCase()
                .indexOf(search) > -1
            )
          })
        })
      }
      return this.dataList.items
    }
  },
  methods: {
    // 业务方法
    doQuery(params) {
      this.listLoading = true
      list(this.requestParameters)
        .then(data => {
          this.dataList = data.data

          this.counts = data.data.counts
          this.totals = data.data.totals
          this.barSearch.alertText = `共 ${this.counts} 条记录`
          this.listLoading = false
          for (var i = 0; i < this.dataList.items.length; i++) {
            for (var j = 0; j < this.baseData.informaltype.length; j++) {
              if (
                this.dataList.items[i].formOfEmployment ===
                this.baseData.informaltype[j].id
              ) {
                this.dataList.items[i].formOfEmployment = this.baseData.informaltype[j].value
              }
              if (this.dataList.items[i].formOfEmployment === '1') {
                this.dataList.items[i].formOfEmployment = '正式'
              }
            }
          }
        })
        .catch(e => {
          this.$message.e('错了哦，这是一条错误消息')
        })
    },
    clearFormDate() {
      this.formData.fullName = ''
      this.formData.mobilePhone = ''
      this.formData.timeOfEntry = ''
      this.formData.formOfEmployment = ''
      this.formData.workNumber = ''
      this.formData.department = ''
      this.formData.managementForm = ''
      this.formData.workingCity = ''
      this.formData.correctionTime = ''
    },
    // 新增用户刷新列表
    handleLoadDataList() {
      this.doQuery()
    },
    // 弹框关闭
    handleCloseModal() {
      this.$refs.addUser.dialogFormH()
      this.$refs.positive.dialogFormH()
    },
    handleStatus(obj) {
      if (obj.accountStatus === 'true') {
        obj.accountStatus = '1'
      } else {
        obj.accountStatus = '0'
      }
      var data = {
        id: obj.id,
        status: obj.accountStatus
      }
      accountStatus(data).then(res => {
        this.$message.success('设置成功' + '!')
        this.doQuery(this.requestParameters)
      })
    },
    // 界面交互
    // 界面初始数据
    setupUI() {
      this.baseData = constantApi
      this.common = commonApi
      this.boxHeight = minHeight() // 右边内容高度
    },
    handleRest() {
      this.requestParameters = {
        gender: '',
        formOfEmployment: '',
        department: '',
        bindingState: '',
        accountStatus: '',
        management: '',
        workingCity: ''
      }
      _this.requestParameters = {}
      _this.seleList = []
    },
    toggleShowMore() {
      this.showMore = !this.showMore
    },
    seleClose(tag) {
      this.seleList.splice(this.seleList.indexOf(tag), 1)
      for (let i in this.requestParameters) {
        if (this.requestParameters[i] === tag) {
          this.requestParameters[i] = ''
        }
      }
    },
    // 集合搜索
    searchIcon() {
      this.iconShow = false
      this.searchShow = true
    },
    // 清除搜索数据
    handleClear() {
      this.iconShow = true
      this.searchShow = false
      this.doQuery(this.requestParameters)
    },
    dataSearch() {
      this.doQuery(this.requestParameters)
    },
    // 搜索信息
    handleSearch() {
      this.requestParameters.page = 1
      this.doQuery(this.requestParameters)
      var seleArr = []
      // console.log(this.requestParameters)
      for (let i in this.requestParameters) {
        if (
          this.requestParameters[i] !== undefined &&
          (this.requestParameters[i] !== this.requestParameters.page &&
            this.requestParameters[i] !== this.requestParameters.pagesize)
        ) {
          seleArr.push(this.requestParameters[i])
        }
      }
      this.seleList = seleArr
    },
    // 每页显示信息条数
    handleSizeChange(pageSize) {
      this.requestParameters.pagesize = pageSize
      if (this.requestParameters.page === 1) {
        _this.doQuery(this.requestParameters)
      }
    },
    // 进入某一页
    handleCurrentChange(val) {
      this.requestParameters.page = val
      _this.doQuery()
    },
    // 添加新员工
    handlAdd() {
      this.$refs.addUser.dialogFormV()
    },
    handlPositive(id) {
      this.formData.positiveId = id
      positiveDetail({ id: id }).then(ret => {
        this.objInfoDataes = ret.data
        if (ret.data.headPortrait !== '') {
          this.$refs.positive.fillDownload(ret.data.headPortrait)
        }
      })
      this.$refs.positive.dialogFormV(id)
    },
    handlSet() {
      this.$refs.set.dialogFormV()
      settDetail().then(res => {
        this.setData.dateOfBirth = res.data.dateOfBirth
        this.setData.fullName = res.data.fullName
        this.setData.mobilePhone = res.data.mobilePhone
        this.setData.sex = res.data.sex
        this.setData.theHighestDegreeOfEducation =
          res.data.theHighestDegreeOfEducation
      })
    },
    // 删除
    handleDelete(item) {
      this.$confirm(
        '本次操作将删除' +
          item.fullName +
          item.mobilePhone +
          '删除后账号将不可恢复，您确认删除吗？',
        {
          type: 'warning'
        }
      )
        .then(() => {
          // remove({ id: item })
          //   .then(response => {
          //     this.$message.success('删除成功' + '!')
          //     _this.dataList.splice(item, 1)
          //   // _this.doQuery()
          //   })
          //   .catch(response => {
          //     this.$message.error('删除失败!')
          //   })
          this.$message.success('删除成功' + '!')
          _this.dataList.items.splice(item, 1)
        })
        .catch(() => {
          this.$message.info('已取消操作!')
        })
    }
  },
  // 挂载结束
  mounted: function() {},
  // 创建完毕状态
  created: function() {
    _this = this
    this.setupUI()
    this.doQuery()
  },
  // 组件更新
  updated: function() {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.iconInfo {
  .fa {
    color: #999;
    font-size: 14px;
    cursor: pointer;
  }
  a {
    padding: 0 5px;
  }
}
.serachInput {
  .el-input--medium {
    width: 150px;
    .el-input__inner {
    }
  }
}
.serachInput .el-input--medium .el-input__inner {
  height: 26px;
  line-height: 26px;
}
</style>
