<template>
  <div class="boxInfo">
    <!-- 表单内容 -->
    <div class="formInfo">
      <div>
        <!-- 头部信息  -->
        
        <div class="userInfo">
             <div class="headInfo clearfix">
               <div class="headText">
                 <el-row>
                    <el-col :span="12">
                       <span class="textR">姓名：</span>
                      {{userData.username}}
                    </el-col>
                    <el-col :span="12">
                       <span class="textR">入职日期：</span>
                      {{userData.timeOfEntry}}
                    </el-col>
                  </el-row>
                  <el-row style="overflow: initial">
                    <el-col :span="12">
                       <span class="textR">部门：</span>
                       {{userData.departmentName}}
                    </el-col>
                    <el-col :span="12">
                       <span class="textR">工号：</span>
                        {{userData.workNumber}}
                    </el-col>
                  </el-row>
               </div>
             </div>
        </div>
        <!-- 头部信息 end  -->
        <el-form ref="formData" :model="formData" label-width="215px" label-position="right">
        <div class="boxMain">
              <div class="mainInfo">
                 <el-form-item class="formInfo" label="岗位：">
                    <el-input v-model="formData.post" placeholder="请输入" class="inputW"></el-input>
                 </el-form-item>
                <el-form-item class="formInfo" label="转正日期：">
                  <el-date-picker
                    v-model="formData.dateOfCorrection"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                </el-form-item>
                <el-form-item class="formInfo" label="转正状态(正式)：">
                  <el-select v-model="formData.stateOfCorrection" placeholder="请选择" disabled>
                    <el-option
                      v-for="item in baseData.stateOfCorrection"
                      :key="item.value"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item class="formInfo" label="职级：">
                  <el-input v-model="formData.rank" class="inputW"></el-input>
                </el-form-item>
                <el-form-item class="formInfo" label="转正评价：">
                  <el-input type="textarea" v-model="formData.correctionEvaluation" placeholder="1-300位字符"></el-input>
                </el-form-item>
                <el-form-item class="formInfo" label="汇报对象：">
                  <el-select v-model="formData.reportingObject" filterable placeholder="请选择">
                    <el-option v-for="(item,index) in employeesSimpleListData" 
                        :key="index" :label="item.username" :value="item.id">
                    </el-option>

                  </el-select>
                </el-form-item>
                <el-form-item class="formInfo" label="HRBP：">
                  <el-select v-model="formData.hrbp" placeholder="请选择">
                    <el-option
                      v-for="item in employeesSimpleListData"
                        :key="item.id" :label="item.username" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item class="formInfo" label="聘用形式：">
                  <el-select v-model="formData.formOfEmployment" disabled placeholder="请选择" >
                    <el-option
                      v-for="item in baseData.hireType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item class="formInfo" label="管理形式：">
                  <el-select v-model="formData.formOfManagement" placeholder="请选择">
                    <el-option
                      v-for="item in baseData.subjection"
                      :key="item.id"
                      :label="item.value"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                
                <el-form-item class="formInfo" label="调整司龄(天)：">
                  <el-input type="number" v-model="formData.adjustmentAgedays" placeholder="请输入" class="inputW"></el-input>
                </el-form-item>
                <el-form-item class="formInfo" label="司龄：">
                  <el-input v-model="formData.ageOfDivision" placeholder="2.97年" class="inputW" disabled></el-input>
                </el-form-item>
                <el-form-item class="formInfo" label="首次参加工作时间：">
                  <el-date-picker
                    v-model="formData.workingTimeForTheFirstTime"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                </el-form-item>
                
                <el-form-item class="formInfo" label="调整工龄(天)：">
                  <el-input type="number" v-model="formData.adjustmentOfLengthOfService" placeholder="0" class="inputW"></el-input>
                </el-form-item>
                <el-form-item class="formInfo" label="工龄：">
                  <el-input v-model="formData.workingYears" placeholder="0.00年" class="inputW" disabled></el-input>
                </el-form-item>
                <el-form-item class="formInfo" label="直属下属数量：">
                  <el-input type="number" v-model="formData.numberOfSubordinateSubordinates" placeholder="1" class="inputW" disabled></el-input>
                </el-form-item>
              </div>
              <div class="mainInfo">
                <div class="titInfo">合同信息</div>
                <el-form-item class="formInfo" label="首次合同开始时间：">
                  <el-date-picker
                    v-model="formData.initialContractStartTime"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                </el-form-item>
                <el-form-item class="formInfo" label="首次合同结束时间：">
                  <el-date-picker
                    v-model="formData.firstContractTerminationTime"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                </el-form-item>
                <el-form-item class="formInfo" label="现合同开始时间：">
                  <el-date-picker
                    v-model="formData.currentContractStartTime"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                </el-form-item>
                <el-form-item class="formInfo" label="现合同结束时间：">
                  <el-date-picker
                    v-model="formData.closingTimeOfCurrentContract"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                </el-form-item>
                <el-form-item class="formInfo" label="合同期限：">
                  <el-select class="filter-item" v-model="formData.contractPeriod">
                      <el-option
                      v-for="item in baseData.contractPeriod"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="formInfo" label="续签次数：">
                  <el-select class="filter-item" v-model="formData.renewalNumber">
                      <el-option
                      v-for="item in baseData.renewalCount"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                    </el-select>
                </el-form-item>
                
              </div>
              <div class="mainInfo">
                  <div class="titInfo">招聘信息</div>
                  <el-form-item class="formInfo" label="其他招聘渠道：">
                    <!-- <el-input v-model="formData.otherRecruitmentChannels" placeholder="请输入" class="inputW"></el-input> -->
                    <el-select v-model="formData.otherRecruitmentChannels" placeholder="请选择">
                      <el-option
                        v-for="item in baseData.resumeSource"
                        :key="item.id"
                        :label="item.value"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item class="formInfo" label="招聘渠道：">
                    <el-select v-model="formData.recruitmentChannels" placeholder="请选择">
                      <el-option
                        v-for="item in baseData.resumeSource"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item class="formInfo" label='社招/校招：'>
                    <el-select v-model="formData.socialRecruitment" placeholder="请选择">
                      <el-option
                        v-for="item in baseData.hireSourceType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item class="formInfo" label="推荐企业/人：">
                    <el-input v-model="formData.recommenderBusinessPeople" placeholder="请输入" class="infoPosition inputW"></el-input>
                  </el-form-item>
              </div>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="saveData('formData')">保存更新</el-button>
              <router-link :to="{'path':'/employees/index'}" class="el-button el-button--default el-button--medium">返回</router-link>
            </div>
          </div>
      </el-form>
      </div>
    </div>
    </div>
</template>

<script>

import constantApi from '@/api/constant/employees'
import commonApi from '@/api/constant/common'
import {
  detail,
  edit,
  jobsDetail,
  postDetail
} from '@/api/base/employees'
import * as userApi from "@/api/base/users"
import  * as deptApi  from '@/api/base/dept'
import fileUp from './upload'
import { checkEmails } from '@/filters/index'
var _this = null
export default {
  name: 'userInfo',
  components: { fileUp },
  props: ['objId', 'datas'],
  data() {
    return {
      baseData: [],
      common: [],
      userData:{},
      attachments: [],
      // objInfoDataes: [],
      department: '',
      isShowSelect: false,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      editShow: {
        rank: true,
        correctionEvaluation: true,
        ageOfDivision: true,
        adjustmentAgedays: true,
        adjustmentOfLengthOfService: true,
        workingYears: true,
        numberOfSubordinateSubordinates: true,
        workingCity: true,
        taxableCity: true,
        otherRecruitmentChannels: true
      },
      saveShow: false,
      simpleData: [],
      employeesSimpleListData: [],
      formData: {
        
      }
    }
  },
  methods: {
    // 业务方法
    // 编辑
    handleEdit: function(e, obj) {
      this.editShow[obj] = false
    },
    handleSave: function(e, obj) {
      this.editShow[obj] = true
    },
    // 界面交互
    // 界面初始数据
    setupUI() {
      this.baseData = constantApi
      this.common = commonApi
      this.getObjInfo()
      // // 员工列表
      userApi.simple().then(ret => {
        this.employeesSimpleListData = ret.data.data
        console.log(this.employeesSimpleListData)
      })
    },
    // 退出
    handleClose() {},
    // 获取详情
    getObjInfo() {
      userApi.detail({ id: this.objId }).then(res => {
          this.userData = res.data.data
      })
      jobsDetail({ id: this.objId }).then(ret => {
        this.formData = ret.data.data
        if (!this.formData.renewalNumber || this.formData.renewalNumber == undefined || this.formData.renewalNumber === null) {
         this.formData.renewalNumber = '0'
        }
        this.formData.renewalNumber = this.formData.renewalNumber + '次'
        if (this.formData.renewalNumber === 4) {
          this.formData.renewalNumber = this.formData.renewalNumber + '次或以上'
        }
      })
    },
    // 表单提交
    saveData(obj) {
      this.formData.id = this.$route.params.id
      this.formData.renewalNumber = parseInt(this.formData.renewalNumber)
      this.formData.adjustmentAgedays = parseInt(
        this.formData.adjustmentAgedays
      )
      this.formData.adjustmentOfLengthOfService = parseInt(
        this.formData.adjustmentOfLengthOfService
      )
      postDetail(this.formData)
        .then(res => {
          this.formData = res.data
          this.loading = false
          this.$message.success('保存成功！')
          this.formData = []
          this.getObjInfo()
        })
    },
    handleChick() {
      this.isShowSelect = true
    },
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
  created () {
    this.setupUI();
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.el-collapse-item__arrow {
  float: left;
}

.el-collapse-item {
  position: relative;
  // width: 80%;
  // .el-collapse-item__header{width: 80%;}
  .infoR {
    position: absolute;
    background: #fff;
    display: inline-block;
    width: 100px;
    height: 35px;
    line-height: 35px;
    text-align: right;
    right: -100px;
    top: 0px;
  }
}
// .el-input--medium {
//   width: 80%;
// }
.linkage {
  display: inline-block;
}
.textBotm {
  vertical-align: text-bottom;
}
.navInfo {
  height: auto;
  font-size: 30px;
  color: #333;
  background-color: #e4e4e4;
  text-align: center;
  border-bottom: 1px solid #333;
}
.step {
  position: fixed;
  left: 220px;
  top: 50%;
  margin-top: -150px;
  background: #fff;
  z-index: 9;
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.objectTree {
  position: absolute;
  width: 300px;
  z-index: 999;
  border: 1px solid #dddee1;
  left: 85px;
  border-radius: 5px;
}
</style>
