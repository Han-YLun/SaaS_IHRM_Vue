<template>
<div class="dashboard-container">
    <div class="app-container">
      <el-card :style="{minHeight:boxHeight}">
        <el-breadcrumb separator="/" class="titInfo ">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>
            <router-link :to="{'path':'/employees/index'}">员工管理</router-link>
          </el-breadcrumb-item>
          <el-breadcrumb-item>离职</el-breadcrumb-item>
        </el-breadcrumb>
        <h2 class="centInfo">{{formBase.fullName}}-离职</h2>
        <div class="leaveInfo">
          <el-row>
            <el-col :span="4">
              <!-- 头像 -->
              <component v-bind:is="userHead" :headImg="formBase.headPortrait"></component>
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
           <el-form :rules="ruleInline" ref="dataForm" :model="formBase" label-position="right" label-width="120px"  style='margin-left:200px;width:60%;'>
              <el-form-item prop="typeOfTurnover">
                <span slot="label">离职类型：</span>
                <el-select class="filter-item" v-model="formBase.typeOfTurnover">
                  <el-option
                  v-for="item in baseData.leaveType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="resignationTime">
                <span slot="label">离职时间：</span>
                <el-date-picker
                    v-model="formBase.resignationTime"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
              </el-form-item>
              <el-form-item prop="reasonsForLeaving">
                <span slot="label">申请离职原因：</span>
                <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="formBase.reasonsForLeaving">
                  </el-input>
              </el-form-item>
              <el-form-item prop="compensation">
                <span slot="label">补偿金：</span>
                <input class="el-input__inner inputW" type="number" placeholder="大于等于0的数，小数部分最多两位" v-model="formBase.compensation" @input="handleInput(formBase.compensation,1)" />&nbsp;&nbsp;<em class="col999">￥</em>
              </el-form-item>
              <el-form-item prop="notifications">
                <span slot="label">代通知金：</span>
                <input class="el-input__inner inputW" type="number" placeholder="大于等于0的数，小数部分最多两位" v-model="formBase.notifications" @input="handleInput(formBase.notifications,2)" />&nbsp;&nbsp;<em class="col999">￥</em>
              </el-form-item>
              <el-form-item prop="socialSecurityReductionMonth">
                <span slot="label">社保减员月：</span>
                <el-select class="filter-item" v-model="formBase.socialSecurityReductionMonth">
                  <el-option
                  v-for="item in baseData.attritionMonth"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="providentFundReductionMonth">
                <span slot="label">公积金减员月：</span>
                <el-select class="filter-item" v-model="formBase.providentFundReductionMonth">
                  <el-option
                  v-for="item in baseData.attritionMonth"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="surplusAnnualLeave">
                <span slot="label">剩余年假：</span>
                <!-- <input class="el-input__inner inputW" type="number" placeholder="" disabled v-model="formBase.surplusAnnualLeave"/> -->
                <el-input placeholder="0" disabled v-model="formBase.surplusAnnualLeave" class="inputW"></el-input>
              </el-form-item>
              <el-form-item prop="remainder">
                <span slot="label">剩余调休：</span>
                <!-- <input class="el-input__inner inputW" type="number" placeholder="" disabled v-model="formBase.remainder"/> -->
                <el-input placeholder="0" disabled v-model="formBase.remainder" class="inputW"></el-input>
              </el-form-item>
           </el-form>
           <div slot="footer" class="dialog-footer">
             <el-button type="primary" @click="submitData('dataForm')">提交</el-button>
              <router-link :to="{'path':'/employees/index'}" class="el-button el-button--default el-button--medium">返回</router-link>
            </div>
        </div>
      </el-card>
    </div>
</div>
</template>

<script>
import { minHeight } from '@/filters/index'
import constantApi from '@/api/constant/employees' // 基础数据
import { leave, leaveDetail } from '@/api/base/employees'
import userHead from './../components/component/user-head.vue'
import * as userApi from "@/api/base/users"
var _this = null
export default {
  name: 'leaveList',
  components: {
    userHead
  },
  data() {
    return {
      userHead: 'userHead',
      userData:{},
      baseData: '',
      boxHeight: '',
      fileList: [],
      formBase: {
        typeOfTurnover: '', // 离职类型
        resignationTime: '', // 离职时间
        reasonsForLeaving: '', // 离职原因
        compensation: '', // 补偿金
        notifications: '', // 代通知金
        socialSecurityReductionMonth: '', // 社保减员月
        providentFundReductionMonth: '', // 公积金减员月
        surplusAnnualLeave: '', // 剩余年假
        remainder: '', // 剩余调休
        directReports: '' // 直属下属数量
      },
      ruleInline: {
        // 表单验证
        socialSecurityReductionMonth: [
          {
            required: true,
            message: '请选社保减员月',
            trigger: 'change'
          }
        ],
        providentFundReductionMonth: [
          {
            required: true,
            message: '请选公积金减员月',
            trigger: 'change'
          }
        ],
        resignationTime: [
          {
            required: true,
            message: '请选择离职时间',
            trigger: 'change'
          }
        ],
        typeOfTurnover: [
          {
            required: true,
            message: '请选择离职类型',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    // 业务方法
    setupUI() {
      this.baseData = constantApi
      this.boxHeight = minHeight() // 右边内容高度
    },
    // 获取详情
    getObjInfo() {
      // console.log(this.$route.params.id)
      leaveDetail({ id: this.$route.params.id }).then(ret => {
        this.formBase = ret.data.data
      })
      userApi.detail({ id: this.$route.params.id }).then(res => {
          this.userData = res.data.data
      })
    },
    handleClose() {},
    // 表单提交
    submitData(obj) {
      this.$refs[obj].validate(valid => {
        if (valid) {
          this.formBase.id = this.$route.params.id
          leave(this.formBase).then(() => {
            this.$router.push({
              path: '/employees/index/'
            })
            this.formBase = ''
          })
        } else {
          _this.$Message.error('*号为必填项!')
        }
      })
    },
    handleInput: function(obj, num) {
      var regT = /^[0-9]*/g
      var regS = /^\d*(\.?\d{0,1})/g
      var reg = /^\d*(\.?\d{0,2})/g

      if (!regT.test(obj)) {
        this.$message.error('请输入正确的数值')
      } else {
        if (num === 1) {
          this.formBase.compensation = obj.match(reg)[0]
        }
        if (num === 2) {
          this.formBase.notifications = obj.match(reg)[0]
        }
        if (num === 3) {
          this.formBase.surplusAnnualLeave = obj.match(regT)[0]
        }
        if (num === 4) {
          this.formBase.remainder = obj.match(regS)[0]
        }
      }
    }
    // 界面交互
  },
  // 挂载结束
  mounted: function() {},
  // 创建完毕状态
  created: function() {
    _this = this
    this.setupUI()
    this.getObjInfo()
  },
  // 组件更新
  updated: function() {}
}
</script>

<style rel="stylesheet/scss" lang="scss">
.colRed input::-webkit-input-placeholder {
  color: red;
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
