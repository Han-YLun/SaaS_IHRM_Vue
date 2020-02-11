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
              <div class="userHead" v-if="objInfoDataes.headPortrait===null"><img src="./../../assets/img.jpeg" width="100px" height="100px"></div>
            <div class="userHead" v-else>
              <span v-for="item in fileList" :key='item.id' class="fileImg">
                <img :src="item.url" width="100px" height="100px">
              </span>
            </div>
            </el-col>
            <el-col :span="20">
              <div class="headInfo">
                <p><strong>{{objInfoDataes.fullName}}</strong></p>
                <p><span>手机</span><em>{{objInfoDataes.mobilePhone}}</em><span>部门</span><em>{{objInfoDataes.department}}</em></p>
                <p><span>入职时间</span><em>{{objInfoDataes.timeOfEntry}}</em></p>
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
                    <el-input v-show="editShow.post" v-model="formData.post" placeholder="1-20位字符" maxlength="20" class="inputW"></el-input>
                    <div class="iconInfo">
                        <i class="fa fa-pencil-square-o" aria-hidden="true" @click.stop="handleEdit($event,'post')" title="编辑" v-show="true"></i>
                    </div>
                  </el-col>
                </el-row>

              </el-form-item>
              <el-form-item class="formInfo">
                <el-row :gutter="20">
                  <el-col :span="12">
                      <el-row>
                        <el-col :span="6">
                            <span class="textR"><em class="colRed">*</em>部门：</span>
                        </el-col>
                        <el-col :span="18">
                              {{objInfoDataes.department}}
                        </el-col>
                      </el-row>
                  </el-col>
                  <el-col :span="1"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></el-col>
                  <el-col :span="11" class="editInfo">
                    <el-select class="filter-item" v-model="formData.department" filterable>
                      <el-option
                      v-for="item in simpleData"
                      :key="item.title"
                      :label="item.title"
                      :value="item.title">
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
                            <span class="textR">职级：</span>
                        </el-col>
                        <el-col :span="18">
                              {{objInfoDataes.rank}}
                        </el-col>
                      </el-row>
                  </el-col>
                  <el-col :span="1"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></el-col>
                  <el-col :span="11" class="editInfo">
                    <el-input v-show="editShow.rank" v-model="formData.rank" placeholder="1-20位字符" maxlength="20" class="inputW"></el-input>
                    <div class="iconInfo">
                        <i class="fa fa-pencil-square-o" aria-hidden="true" @click.stop="handleEdit($event,'rank')" title="编辑" v-show="true"></i>
                    </div>
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
                      v-for="item in employessDate"
                      :key="item.value"
                      :label="item.fullName"
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
                      v-for="item in employessDate"
                      :key="item.value"
                      :label="item.fullName"
                      :value="item.value">
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
                           <el-date-picker v-model="formData.adjustmentTime" type="date">
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
                            <span class="textR">附件：</span>
                        </el-col>
                        <el-col :span="18">
                            <component v-bind:is="fileUpload" ref="positive" :formData.sync='formData' :formBase='formData' ></component>
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
                            <span class="textR">管理形式：</span>
                        </el-col>
                        <el-col :span="18">
                              {{objInfoDataes.formOfManagement}}
                        </el-col>
                      </el-row>
                  </el-col>
                  <el-col :span="1"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></el-col>
                  <el-col :span="11" class="editInfo">
                    <el-select class="filter-item" v-model="formData.formOfManagement">
                      <el-option
                      v-for="item in baseData.subjection"
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
                            <span class="textR">工作城市：</span>
                        </el-col>
                        <el-col :span="18">
                              {{objInfoDataes.workingCity}}
                        </el-col>
                      </el-row>
                  </el-col>
                  <el-col :span="1"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></el-col>
                  <el-col :span="11" class="editInfo">
                    <el-input v-show="editShow.workingCity" v-model="formData.workingCity" placeholder="1-50位字符" class="infoPosition"></el-input>
                    <div class="iconInfo">
                        <i class="fa fa-pencil-square-o" aria-hidden="true" @click.stop="handleEdit($event,'workingCity')" title="编辑" v-show="true"></i>
                    </div>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item class="formInfo">
                <el-row :gutter="20">
                  <el-col :span="12">
                      <el-row>
                        <el-col :span="6">
                            <span class="textR">纳税城市：</span>
                        </el-col>
                        <el-col :span="18">
                              {{objInfoDataes.taxableCity}}
                        </el-col>
                      </el-row>
                  </el-col>
                  <el-col :span="1"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></el-col>
                  <el-col :span="11" class="editInfo">
                    <el-input v-show="editShow.taxableCity" v-model="formData.taxableCity" placeholder="1-50位字符" class="infoPosition"></el-input>
                    <div class="iconInfo">
                        <i class="fa fa-pencil-square-o" aria-hidden="true" @click.stop="handleEdit($event,'taxableCity')" title="编辑" v-show="true"></i>
                    </div>
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
                    <el-date-picker v-model="formData.currentContractStartTime" type="date">
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
                    <el-date-picker v-model="formData.closingTimeOfCurrentContract" type="date">
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
                    <el-input v-show="editShow.workingPlace" v-model="formData.workingPlace" placeholder="请输入" class="infoPosition"></el-input>
                    <div class="iconInfo">
                        <i class="fa fa-pencil-square-o" aria-hidden="true" @click.stop="handleEdit($event,'workingPlace')" title="编辑" v-show="true"></i>
                    </div>
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
                    <el-date-picker v-model="formData.initialContractStartTime" type="date">
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
                    <el-date-picker v-model="formData.firstContractTerminationTime" type="date">
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
                    <el-input v-show="editShow.recommenderBusinessPeople" v-model="formData.recommenderBusinessPeople" placeholder="请输入" class="infoPosition"></el-input>
                    <div class="iconInfo">
                        <i class="fa fa-pencil-square-o" aria-hidden="true" @click.stop="handleEdit($event,'recommenderBusinessPeople')" title="编辑" v-show="true"></i>
                    </div>
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
import { updatedFile, minHeight } from '@/filters/index'
import constantApi from '@/api/constant/employees' // 基础数据
import { list, adjustPost, adjustDetail, detail } from '@/api/base/employees'
import fileUpload from './../components/upload'
var _this = null
export default {
  name: 'refortList',
  components: {
    fileUpload
  },
  data() {
    return {
      fileUpload: 'fileUpload',
      objInfoDataes: [],
      fileList: [],
      baseData: '',
      boxHeight: '',
      formData: {
        // fullName: '', // 姓名
        // mobilePhone: '', // 手机
        // department: '', // 部门
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
        attachments: [],
        // 传给后台的id
        inspectObject: '',
        // 输入框显示的
        inspectObjectName: ''
      },
      employessDate: [],
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
      simpleList().then(ret => {
        this.simpleData = ret.data
      })
      list().then(ret => {
        this.employessDate = ret.data.items
      })
    },
    // 获取详情
    getObjInfo() {
      adjustDetail({ id: this.$route.params.id }).then(ret => {
        this.objInfoDataes = ret.data
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
          this.formData.enclosure = this.$refs.positive.positiveList.join(',')
          adjustPost(this.formData).then(() => {
            this.$router.push({
              path: '/employees/index/'
            })
            this.formData = ''
          })
        } else {
          this.$Message.error('*号为必填项!')
        }
      })
    },
    // 图片 blob 流转化为可用 src
    imgHandle(obj) {
      return window.URL.createObjectURL(obj)
    },
    // 图片下载
    fillDownload(fid) {
      imgDownload({ id: fid }).then(res => {
        this.fileList = [{ name: 'img', url: this.imgHandle(res.data) }]
      })
    }
    // 界面交互
  },
  // 挂载结束
  mounted: function() {},
  // 创建完毕状态
  created: function() {
    _this = this
    this.setupUI()
  },
  // 组件更新
  updated: function() {}
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
