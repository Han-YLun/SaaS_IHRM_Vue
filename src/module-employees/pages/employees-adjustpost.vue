<template>
<div class="dashboard-container">
    <div class="app-container">
      <el-card :style="{minHeight:boxHeight}">
        <el-breadcrumb separator="/" class="titInfo ">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>
            <router-link :to="{'path':'/employees/index'}">员工管理</router-link>
          </el-breadcrumb-item>
          <el-breadcrumb-item>调岗</el-breadcrumb-item>
        </el-breadcrumb>
        <h2 class="centInfo">{{formData.fullName}}</h2>
        <!-- 信息提示 -->
        <!-- <div class="infoTip">
          <el-alert
            title="没有更改的字段不会被替换。"
            type="warning"
            show-icon
            :closable="false">
          </el-alert>
        </div> -->
        <div class="leaveInfo">
          <el-row>
            <el-col :span="4">
              <!-- 头像 -->
              <component v-bind:is="userHead" :headImg="objInfoDataes.headPortrait"></component>
            </el-col>
            <el-col :span="20">
              <div class="headInfo">
                <p><strong>{{userData.username}}</strong></p>
                <p><span>手机</span><em>{{userData.mobile}}</em><span>部门</span><em>{{userData.departmentName}}</em></p>
                <p><span>入职时间</span><em>{{userData.timeOfEntry}}</em></p>
              </div>
            </el-col>
          </el-row>
        </div>
        <div>
           <el-form :rules="ruleInline" ref="dataForm" :model="formData" label-position="right">
              <el-form-item class="formInfo">               
                <el-row :gutter="20">
                  <el-col :span="12">
                      <el-row>
                        <el-col :span="6">
                            <span class="textR">岗位：</span>
                        </el-col>
                        <el-col :span="18">
                              {{objInfoDataes.post}}
                        </el-col>
                      </el-row>
                  </el-col>
                  <el-col :span="1"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></el-col>
                  <el-col :span="11" class="editInfo">
                    <el-input v-model="formData.post" placeholder="1-20位字符" maxlength="20" class="inputW"></el-input>
                  </el-col>
                </el-row>

              </el-form-item>         
              <el-form-item class="formInfo">
                <el-row :gutter="20">
                  <el-col :span="12">
                      <el-row>
                        <el-col :span="6">
                            <span class="textR">职级：</span>
                        </el-col>
                        <el-col :span="18">
                              {{objInfoDataes.rank}}
                        </el-col>
                      </el-row>
                  </el-col>
                  <el-col :span="1"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></el-col>
                  <el-col :span="11" class="editInfo">
                    <el-input v-model="formData.rank" placeholder="1-20位字符" maxlength="20" class="inputW"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item class="formInfo">
                <el-row :gutter="20">
                  <el-col :span="12">
                      <el-row>
                        <el-col :span="6">
                            <span class="textR">汇报对象：</span>
                        </el-col>
                        <el-col :span="18">
                              {{objInfoDataes.reportingObject}}
                        </el-col>
                      </el-row>
                  </el-col>
                  <el-col :span="1"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></el-col>
                  <el-col :span="11" class="editInfo">
                    <el-select class="filter-item" v-model="formData.reportingObject">
                      <el-option
                        v-for="item in employeesSimpleListData"
                        :key="item.id" :label="item.fullName" :value="item.id">
                        <!-- <span>{{item.fullName}}</span> -->
                    </el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item class="formInfo">
                <el-row :gutter="20">
                  <el-col :span="12">
                      <el-row>
                        <el-col :span="6">
                            <span class="textR">HRBP：</span>
                        </el-col>
                        <el-col :span="18">
                              {{objInfoDataes.hrbp}}
                        </el-col>
                      </el-row>
                  </el-col>
                  <el-col :span="1"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></el-col>
                  <el-col :span="11" class="editInfo">
                    <el-select class="filter-item" v-model="formData.hrbp">
                      <el-option
                      v-for="item in employeesSimpleListData"
                        :key="item.id" :label="item.fullName" :value="item.id">
                        <!-- <span>{{item.fullName}}</span> -->
                    </el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item class="formInfo"  prop="adjustmentTime">
                <el-row :gutter="20">
                  <el-col :span="12">
                      <el-row>
                        <el-col :span="6">
                            <span class="textR"><em class="colRed">*</em>调岗时间：</span>
                        </el-col>
                        <el-col :span="18">
                           <el-date-picker v-model="formData.adjustmentTime" value-format="yyyy-MM-dd" type="date">
                           </el-date-picker>
                        </el-col>
                      </el-row>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item class="formInfo">
                <el-row :gutter="20">
                  <el-col :span="12">
                      <el-row>
                        <el-col :span="6">
                            <span class="textR">调岗原因：</span>
                        </el-col>
                        <el-col :span="18">
                            <el-input type='textarea' placeholder="0-300字符" v-model="formData.causeOfAdjustingPost" class="infoPosition"></el-input>
                        </el-col>
                      </el-row>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item class="formInfo">
                <el-row :gutter="20">
                  <el-col :span="12">
                      <el-row>
                        <el-col :span="6">
                            <span class="textR">现合同开始时间：</span>
                        </el-col>
                        <el-col :span="18">
                              {{objInfoDataes.currentContractStartTime}}
                        </el-col>
                      </el-row>
                  </el-col>
                  <el-col :span="1"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></el-col>
                  <el-col :span="11" class="editInfo">
                    <el-date-picker v-model="formData.currentContractStartTime" type="date" value-format="yyyy-MM-dd">
                    </el-date-picker>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item class="formInfo">
                <el-row :gutter="20">
                  <el-col :span="12">
                      <el-row>
                        <el-col :span="6">
                            <span class="textR">现合同结束时间：</span>
                        </el-col>
                        <el-col :span="18">
                              {{objInfoDataes.closingTimeOfCurrentContract}}
                        </el-col>
                      </el-row>
                  </el-col>
                  <el-col :span="1"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></el-col>
                  <el-col :span="11" class="editInfo">
                    <el-date-picker v-model="formData.closingTimeOfCurrentContract" type="date" value-format="yyyy-MM-dd">
                    </el-date-picker>
                  </el-col>
                </el-row>
              </el-form-item>

              <el-form-item class="formInfo">
                <el-row :gutter="20">
                  <el-col :span="12">
                      <el-row>
                        <el-col :span="6">
                            <span class="textR">工作地点：</span>
                        </el-col>
                        <el-col :span="18">
                              {{objInfoDataes.workingPlace}}
                        </el-col>
                      </el-row>
                  </el-col>
                  <el-col :span="1"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></el-col>
                  <el-col :span="11" class="editInfo">
                    <el-input v-model="formData.workingPlace" placeholder="请输入" class="infoPosition"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>

              <el-form-item class="formInfo">
                <el-row :gutter="20">
                  <el-col :span="12">
                      <el-row>
                        <el-col :span="6">
                            <span class="textR">首次合同开始时间：</span>
                        </el-col>
                        <el-col :span="18">
                              {{objInfoDataes.initialContractStartTime}}
                        </el-col>
                      </el-row>
                  </el-col>
                  <el-col :span="1"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></el-col>
                  <el-col :span="11" class="editInfo">
                    <el-date-picker v-model="formData.initialContractStartTime" type="date" value-format="yyyy-MM-dd">
                    </el-date-picker>
                  </el-col>
                </el-row>
              </el-form-item>

              <el-form-item class="formInfo">
                <el-row :gutter="20">
                  <el-col :span="12">
                      <el-row>
                        <el-col :span="6">
                            <span class="textR">首次合同结束时间：</span>
                        </el-col>
                        <el-col :span="18">
                              {{objInfoDataes.firstContractTerminationTime}}
                        </el-col>
                      </el-row>
                  </el-col>
                  <el-col :span="1"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></el-col>
                  <el-col :span="11" class="editInfo">
                    <el-date-picker v-model="formData.firstContractTerminationTime" type="date" value-format="yyyy-MM-dd">
                    </el-date-picker>
                  </el-col>
                </el-row>
              </el-form-item>

              <el-form-item class="formInfo">
                <el-row :gutter="20">
                  <el-col :span="12">
                      <el-row>
                        <el-col :span="6">
                            <span class="textR">合同期限：</span>
                        </el-col>
                        <el-col :span="18">
                              {{objInfoDataes.contractPeriod}}
                        </el-col>
                      </el-row>
                  </el-col>
                  <el-col :span="1"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></el-col>
                  <el-col :span="11" class="editInfo">
                    <el-select class="filter-item" v-model="formData.contractPeriod">
                      <el-option
                      v-for="item in baseData.contractPeriod"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </el-form-item>

              <el-form-item class="formInfo">
                <el-row :gutter="20">
                  <el-col :span="12">
                      <el-row>
                        <el-col :span="6">
                            <span class="textR">续签次数：</span>
                        </el-col>
                        <el-col :span="18">
                              {{objInfoDataes.renewalNumber}}
                        </el-col>
                      </el-row>
                  </el-col>
                  <el-col :span="1"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></el-col>
                  <el-col :span="11" class="editInfo">
                    <el-select class="filter-item" v-model="formData.renewalNumber">
                      <el-option
                      v-for="item in baseData.renewalCount"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </el-form-item>

              <el-form-item class="formInfo">
                <el-row :gutter="20">
                  <el-col :span="12">
                      <el-row>
                        <el-col :span="6">
                            <span class="textR">推荐企业/人：</span>
                        </el-col>
                        <el-col :span="18">
                              {{objInfoDataes.recommenderBusinessPeople}}
                        </el-col>
                      </el-row>
                  </el-col>
                  <el-col :span="1"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></el-col>
                  <el-col :span="11" class="editInfo">
                    <el-input v-model="formData.recommenderBusinessPeople" placeholder="请输入" class="infoPosition"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
           </el-form>
           <div slot="footer" class="dialog-footer">
             <el-button type="primary" @click="submitData">提交</el-button>
              <router-link :to="{'path':'/employees/index'}" class="el-button el-button--default el-button--medium">返回</router-link>
            </div>
        </div>
      </el-card>
    </div>
</div>
</template>

<script>
import { updatedFile, minHeight, imgHandle } from '@/filters/index'
import constantApi from '@/api/constant/employees' // 基础数据
import {
  list,
  adjustPost,
  adjustDetail,
  detail,
  employeesSimpleList
} from '@/api/base/employees'
import * as deptApi from '@/api/base/dept'
import fileUpload from './../components/upload'
import userHead from './../components/component/user-head.vue'
import * as userApi from "@/api/base/users"
var _this = null
export default {
  name: 'refortList',
  components: {
    fileUpload,
    userHead
  },
  data() {
    return {
      fileUpload: 'fileUpload',
      userData:{},
      userHead: 'userHead',
      objInfoDataes: [],
      fileList: [],
      positiveText: 5,
      baseData: '',
      boxHeight: '',
      isShowSelect: false,
      department: '',
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      cityList: [],
      formData: {
        // fullName: '', // 姓名
        // mobilePhone: '', // 手机
        department: '', // 部门
        timeOfEntry: '', // 入职时间
        post: '', // 岗位
        rank: '', // 职级
        reportingObject: '', // 汇报对象
        hrbp: '', // HRBP
        adjustmentTime: '', // 调岗时间
        causeOfAdjustingPost: '', // 调岗原因
        // enclosure: '', // 附件
        formOfManagement: '', // 管理形式
        workingCity: '', // 工作城市
        taxableCity: '', // 纳税城市
        currentContractStartTime: '', // 现合同开始时间
        closingTimeOfCurrentContract: '', // 现合同结束时间
        workingPlace: '', // 工作地点
        initialContractStartTime: '', // 首次合同开始时间
        firstContractTerminationTime: '', // 首次合同结束时间
        contractPeriod: '', // 合同期限
        renewalNumber: '', // 续签次数
        recommenderBusinessPeople: '', // 推荐企业人
        enclosure: '', // 附件
        // 传给后台的id
        inspectObject: '',
        // 输入框显示的
        inspectObjectName: ''
      },
      employeesSimpleListData: [],
      simpleData: [],
      editShow: {
        fullName: '', // 姓名
        mobilePhone: '', // 手机
        post: '', // 岗位
        rank: '', // 职级
        workingCity: '', // 工作城市
        taxableCity: '', // 纳税城市
        workingPlace: '',
        recommenderBusinessPeople: ''
      },
      ruleInline: {
        // 表单验证
        adjustmentTime: [
          {
            required: true,
            message: '请选择调岗时间',
            trigger: 'change'
          }
        ],
        department: [
          {
            required: true,
            message: '请选择部门',
            trigger: 'change'
          }
        ]
      }
    }
  },
  watch: {
    department(val) {
      this.$refs.tree2.filter(val)
    }
  },
  methods: {
    // 业务方法
    setupUI() {
      this.baseData = constantApi
      this.boxHeight = minHeight() // 右边内容高度
      this.getObjInfo()
      // 部门列表
       deptApi.list().then(ret => {
        this.simpleData.push(ret.data.items)
      })
      // // 员工列表
      userApi.simple().then(ret => {
        this.employeesSimpleListData = ret.data.data
      })
    },
    // 获取详情
    getObjInfo() {
      userApi.detail({ id: this.$route.params.id }).then(res => {
          this.userData = res.data.data
      })
      adjustDetail({ id: this.$route.params.id }).then(ret => {
        this.objInfoDataes = ret.data.data
        if (this.objInfoDataes.renewalNumber === null) {
          ret.data.renewalNumber = '0'
        }
        this.formData.adjustmentTime = this.objInfoDataes.adjustmentTime
        this.formData.causeOfAdjustingPost = this.objInfoDataes.causeOfAdjustingPost
      })
    },
    handleEdit: function(e, obj) {
      this.editShow[obj] = true
    },
    // 表单提交
    submitData() {
      // console.log(this.formBase)
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.formData.id = this.$route.params.id
          this.formData.renewalNumber = parseInt(this.formData.renewalNumber)
          adjustPost(this.formData)
            .then(() => {
              this.$router.push({
                path: '/employees/index/'
              })
            })
            .catch(err => {
              this.$Message.error(err)
            })
        } else {
          this.$Message.error('*号为必填项!')
        }
      })
    },
    // 图片下载
    fillDownload(fid) {

    },
    // 界面交互
    handleNodeClick(data) {
      this.department = data.name
      this.formData.department = this.department
      this.isShowSelect = false
    },
    filterNode(value, data) {
      if (!value) {
        return true
      } else {
        if (data.name !== null) {
          return data.name.indexOf(value) !== -1
        }
      }
    }
  },
  // 挂载结束
  mounted: function() {},
  // 创建完毕状态
  created: function() {
    _this = this
    this.setupUI()
  },
  // 组件更新
  updated: function() {
    // console.log(this.data2)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.colRed input::-webkit-input-placeholder {
  color: red;
}
.editInfo {
  .infoPosition {
    position: relative;
    padding-right: 100px;
  }
  .iconInfo {
    position: absolute;
    right: 80px;
    top: 0;
  }
}
.objectTree {
  position: absolute;
  overflow: auto;
  z-index: 100;
  width: 300px;
  border: 1px solid #dcdfe6;
  margin-top: 5px;
}
.objectTree > div:first-child.el-tree-node > div:first-child {
  display: none;
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.fa-long-arrow-right:before {
  color: #d4d4d4;
}
.upload-list {
  padding: 0;
  margin: 0;
  li {
    list-style: none;
  }
}
</style>
