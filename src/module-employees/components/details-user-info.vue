<template>
  <div class="boxInfo">
    <!-- 表单内容 -->
    <div class="formInfo">
      <div>
        <!-- 头部信息  -->
        <div class="userInfo">
             <div class="headInfo clearfix">
               <div class="headText">
                 <el-form ref="formData" :model="userData" label-width="215px" label-position="right">
                 <el-row>
                    <el-col :span="12">
                       <span class="textR">工号：</span>
                       <el-input v-model="userData.workNumber" placeholder="请输入" class="inputW"></el-input>
                    </el-col>
                    <el-col :span="12">
                       <span class="textR">入职时间：</span>
                       <el-date-picker
                          v-model="userData.timeOfEntry"
                          type="date"
                          placeholder="选择日期"
                          value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                       <span class="textR">姓名：</span>
                       <el-input v-model="userData.username" placeholder="请输入" class="inputW"></el-input>
                    </el-col>
                    <el-col :span="12">
                         <div>
                       <span class="textR">部门：</span>
                         
                          <el-input placeholder="请选择"  v-model="userData.departmentName" icon="caret-bottom" class="inputW" @click.native="isShowSelect = !isShowSelect"></el-input>
                          <input v-model="userData.departmentId"  class="inputW"  type="hidden" >
                          <el-tree v-if="isShowSelect"
                            :expand-on-click-node="false"
                            :data="depts"
                            :props="{label:'name'}"
                            default-expand-all
                            @node-click="handleNodeClick"
                            class="objectTree inputW"
                            ref="tree2">
                          </el-tree>
                          </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                       <span class="textR">手机：</span>
                       <el-input v-model="userData.mobile" placeholder="请输入" class="inputW"></el-input>
                    </el-col>
                    <el-col :span="12">
                       <span class="textR">聘用形式：</span>
                        <el-select class="filter-item" v-model="userData.formOfEmployment">
                          <el-option v-for="item in baseData.hireType" :key="item.id" :label="item.value" :value="item.id">
                        </el-option>
                      </el-select>
                    </el-col>
                  </el-row> 
                  <el-row>
                    <el-form-item class="formInfo" label-width="100" label="员工照片：">
                      <div class="clearfix">
                      <RegShopImg :imgN='3' :imgs='userData.staffPhoto' ref="staffPhoto"></RegShopImg>
                      </div>
                      <span class="col999" style="vertical-align: bottom;">图片格式为 JPG/JPEG/PNG/PDF 大小在2MB内</span>
                    </el-form-item>                      
                  </el-row>
                  <el-row :span="42">
                    <span class="textR">  </span>
                    <router-link :to="{'path':'/employees/index'}" class="el-button el-button--default el-button--medium">返回</router-link>
                    <el-button type="primary" @click="saveUserData()">保存更新</el-button>
                  </el-row>                 
                 </el-form>
               </div>
             </div>
        </div>
        <!-- 头部信息 end  -->
        <div class="boxMain">
          <el-form ref="formData" :model="formData" label-width="215px" label-position="right">
                  <div class="mainInfo tabInfo" ref="tabInfo2">
                     <div class="titInfo ">基础信息</div>
                    <el-form-item class="formInfo" label="最高学历：">
                       <el-select v-model="formData.theHighestDegreeOfEducation" placeholder="请选择">
                          <el-option
                            v-for="item in baseData.highestDegree"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    <el-form-item class="formInfo" label="国家/地区：">
                      <el-select v-model="formData.nationalArea" placeholder="请选择">
                        <el-option
                          v-for="item in baseData.isOverseas"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                          >
                        </el-option>
                      </el-select>
                    </el-form-item>

                    <el-form-item class="formInfo" label="护照号：">
                      <el-input v-model="formData.passportNo" placeholder="正规护照格式" class="inputW"></el-input>
                    </el-form-item>
                    <el-form-item class="formInfo" label="身份证号：">
                        <el-input v-model="formData.idNumber" placeholder="正规身份证格式" class="inputW"></el-input>
                    </el-form-item>
                    <el-form-item class="formInfo" label="籍贯：">
                      <el-input v-model="formData.nativePlace"></el-input>
                    </el-form-item>
                    <el-form-item class="formInfo" label="民族：">
                      <el-input v-model="formData.nation" placeholder="请输入" class="inputW"></el-input>
                    </el-form-item>

                    <el-form-item class="formInfo" label="婚姻状况：">
                      <el-select v-model="formData.maritalStatus" placeholder="请选择">
                        <el-option
                          v-for="item in baseData.maritaStatus"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>



                    <el-form-item class="formInfo" label="生日：">
                      <el-input v-model="formData.birthday" placeholder="示例 0323" class="inputW"></el-input>
                    </el-form-item>

                    <el-form-item class="formInfo" label="属相：">
                      <el-select v-model="formData.zodiac" placeholder="请选择">
                        <el-option
                          v-for="item in baseData.animalSymbol"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>

                    <el-form-item class="formInfo" label="年龄：">
                      <el-input v-model="formData.age" placeholder="年龄" class="inputW"></el-input>
                    </el-form-item>

                    <el-form-item class="formInfo" label="星座：">
                      <el-select v-model="formData.constellation" placeholder="请选择">
                        <el-option
                          v-for="item in baseData.constellation"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>

                    <el-form-item class="formInfo" label="血型：">
                      <el-select v-model="formData.bloodType" placeholder="请选择">
                        <el-option
                          v-for="item in baseData.bloodType"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>

                    <el-form-item class="formInfo" label="户籍所在地：">
                      <el-input v-model="formData.domicile" placeholder="请输入"></el-input>
                    </el-form-item>

                    <el-form-item class="formInfo" label="政治面貌：">
                      <el-input v-model="formData.politicalOutlook" placeholder="请输入" class="inputW"></el-input>
                    </el-form-item>

                    <el-form-item class="formInfo" label="入党时间：">
                      <el-date-picker
                        v-model="formData.timeToJoinTheParty"
                        type="date"
                        placeholder="选择日期" class="inputW"
                        value-format="yyyy-MM-dd" >
                      </el-date-picker>
                    </el-form-item>

                    <el-form-item class="formInfo" label="存档机构：">
                      <el-input v-model="formData.archivingOrganization" placeholder="请输入"></el-input>
                    </el-form-item>

                    <el-form-item class="formInfo" label="子女状态：">
                      <el-input v-model="formData.stateOfChildren" placeholder="请输入"></el-input>
                    </el-form-item>

                    <el-form-item class="formInfo" label="子女有无商业保险：">
                      <el-radio-group v-model="formData.doChildrenHaveCommercialInsurance">
                        <el-radio label="1">有</el-radio>
                        <el-radio label="2">无</el-radio>
                      </el-radio-group>
                    </el-form-item>

                    <el-form-item class="formInfo" label="有无违法违纪状态：">
                      <el-input v-model="formData.isThereAnyViolationOfLawOrDiscipline" placeholder="请输入"></el-input>
                    </el-form-item>

                    <el-form-item class="formInfo" label="有无重大病史：">
                      <el-input  v-model="formData.areThereAnyMajorMedicalHistories" placeholder="请输入"></el-input>
                    </el-form-item>
                  </div>
                  
                  <div class="mainInfo tabInfo" ref="tabInfo2">
                    <div class="titInfo ">通讯信息</div>
                    <el-form-item class="formInfo" label="QQ">
                      <el-input v-model="formData.qq" placeholder="请输入" class="inputW"></el-input>
                      <span class="colRed">{{qqTip}}</span>
                    </el-form-item>
                    <el-form-item class="formInfo" label="微信：">
                      <el-input v-model="formData.wechat" placeholder="请输入" class="inputW"></el-input>
                    </el-form-item>
                    <el-form-item class="formInfo" label="现居住地：">
                      <el-input v-model="formData.placeOfResidence" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item class="formInfo" label="通讯地址：">
                      <el-input v-model="formData.postalAddress" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item class="formInfo" label="联系手机：">
                      <el-input v-model="formData.contactTheMobilePhone" placeholder="11位字符" maxlength="11" class="inputW"></el-input>
                      <span class="colRed">{{telTip}}</span>
                    </el-form-item>
                    <el-form-item class="formInfo" label="个人邮箱：">
                      <el-input v-model="formData.personalMailbox" placeholder="请输入" type='mail' class="inputW"></el-input>
                      <span class="colRed">{{mailTip}}</span>
                    </el-form-item>
                    <el-form-item class="formInfo" label="紧急联系人：">
                      <el-input v-model="formData.emergencyContact" placeholder="请输入" class="inputW"></el-input>
                    </el-form-item>
                    <el-form-item class="formInfo" label="紧急联系电话：">
                      <el-input v-model="formData.emergencyContactNumber" placeholder="11位字符" class="inputW"></el-input>
                      <span class="colRed">{{contactTip}}</span>
                    </el-form-item>
                  </div>
                  <div class="mainInfo tabInfo" ref="tabInfo3" >
                    <div class="titInfo">账号信息</div>
                    <el-form-item class="formInfo" label="社保电脑号：">
                        <el-input v-model="formData.socialSecurityComputerNumber" placeholder="请输入" class="inputW"></el-input>
                      </el-form-item>
                      <el-form-item class="formInfo" label="公积金账号：">
                        <el-input v-model="formData.providentFundAccount" placeholder="请输入" class="inputW"></el-input>
                      </el-form-item>
                      <el-form-item class="formInfo" label="银行卡号：">
                        <el-input v-model="formData.bankCardNumber" placeholder="请输入" class="inputW"></el-input>
                        <span class="colRed">{{bankCardTip}}</span>
                      </el-form-item>
                      <el-form-item class="formInfo" label="开户行：">
                        <el-input v-model="formData.openingBank" placeholder="请输入" class="inputW"></el-input>
                      </el-form-item>
                  </div>
                  <div class="mainInfo tabInfo" ref="tabInfo4">
                      <div class="titInfo">教育信息</div>
                      <el-form-item class="formInfo" label="学历类型：">
                        <el-select v-model="formData.educationalType" placeholder="请选择">
                          <el-option
                            v-for="item in baseData.educationType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item class="formInfo" label="毕业学校：">
                        <el-input v-model="formData.graduateSchool" placeholder="请输入" class="inputW"></el-input>
                      </el-form-item>
                      <el-form-item class="formInfo" label="入学时间：">
                        <el-date-picker v-model="formData.enrolmentTime"  type="data" placeholder='请输入时间' class="inputW" value-format="yyyy-MM-dd">
                        </el-date-picker>
                      </el-form-item>
                      <el-form-item class="formInfo" label="毕业时间：">
                        <el-date-picker v-model="formData.graduationTime" type="data" placeholder='请输入时间' class="inputW" value-format="yyyy-MM-dd">
                        </el-date-picker>
                      </el-form-item>
                      <el-form-item class="formInfo" label="专业：">
                        <el-input v-model="formData.major" placeholder="请输入" class="inputW"></el-input>
                      </el-form-item>
                    </div>
                    <div class="mainInfo tabInfo" ref="tabInfo5">
                      <div class="titInfo">从业信息</div>
                      <el-form-item class="formInfo" label="上家公司：">
                        <el-input v-model="formData.homeCompany" placeholder="请输入" class="inputW"></el-input>
                      </el-form-item>
                      <el-form-item class="formInfo" label="职称：">
                        <el-input v-model="formData.title" placeholder="请输入" class="inputW"></el-input>
                      </el-form-item>
                      <el-form-item class="formInfo" label="有无竞业限制：">
                        <el-input type="textarea" v-model="formData.isThereAnyCompetitionRestriction" placeholder="请输入" style="width:80%"></el-input>
                      </el-form-item>
                      <el-form-item class="formInfo" label="备注：">
                        <el-input type="textarea" v-model="formData.remarks" placeholder="请输入备注" style="width:80%"></el-input>
                      </el-form-item>
                    </div>
                    </el-form>
                <div slot="footer" class="dialog-footer">
                  <router-link :to="{'path':'/employees/index'}" class="el-button el-button--default el-button--medium">返回</router-link>
                  <el-button type="primary" @click="saveData('formData')">保存更新</el-button>
                </div>
              </div>
      
      </div>
    </div>
    </div>
</template>

<script>
import constantApi from '@/api/constant/employees'
import RegShopImg from './imgUpload'
import fileUp from './upload'
import * as userApi from "@/api/base/users"
import { personalDetail, personal } from '@/api/base/employees'
import commonApi from '@/utils/common'
import  * as deptApi  from '@/api/base/dept'
import {
  checkEmails,
  checkiDNumber,
  checkCode,
  checkQq,
  checkTel,
  formatBankNo
} from '@/filters/index'
var _this = null
export default {
  name: 'userInfo',
  components: {
    RegShopImg: RegShopImg,
    fileUp
  },
  props: ['objId'],
  data() {
    return {
      identityCard_Z: 'identityCard_Z',
      identityCard_F: 'identityCard_F',
      isShowSelect: false,
      depts: [],
      userData:{},
      baseData: [],
      idCardTip: '',
      mailTip: '',
      englishNTip: '',
      qqTip: '',
      telTip: '',
      emergencyTip: '',
      phoneTip: '',
      contactTip: '',
      bankCardTip: '',
      saveShow: false,
      fileData: [],
      steps: {
        active: 0,
        step: [
          { title: '基本信息' },
          { title: '通讯信息' },
          { title: '账号信息' },
          { title: '教育信息' },
          { title: '从业信息' }
        ]
      },
      formData: {}
    }
  },
  methods: {
    // 业务方法
    // 第三步：证件照片上传
    imgthing(imgthing) {
      // 合并对象
      this.Imgthing = Object.assign(this.Imgthing, imgthing)
      // 填充到ruleForm对应项,用来判断是否有数据
      this.ruleForm.identityCard_Z = this.Imgthing.identityCard_Z
      this.ruleForm.identityCard_F = this.Imgthing.identityCard_F
      this.ruleForm.identityCard_S = this.Imgthing.identityCard_S
    },
    // 编辑
    handleEdit: function(e, obj) {
      this.editShow[obj] = false
    },
    handleSave: function(e, obj) {
      this.editShow[obj] = true
    },
    init() {

    },
    // 获取详情
    getObjInfo() {
      personalDetail({ id: this.objId }).then(res => {
          this.formData = res.data.data
        })
      userApi.detail({ id: this.objId }).then(res => {
          this.userData = res.data.data
      })
    },
    saveUserData() {
      userApi.update(this.userData)
        .then(res => {
         this.$message({message:res.data.message,type:res.data.success?"success":"error"});
      })
    },
    handleNodeClick(data) {
      this.userData.departmentName = data.name
      this.userData.departmentId = data.id
      this.isShowSelect = false
    },
    saveData(obj) {
      this.formData.id = this.$route.params.id
      this.formData.username = this.userData.username
      this.formData.departmentName = this.userData.departmentName
      this.formData.mobile = this.userData.mobile
      this.formData.timeOfEntry = this.userData.timeOfEntry
      personal(this.formData).then(res => {
          this.$message({message:res.data.message,type:res.data.success?"success":"error"});
          this.getObjInfo()
      })
    },
    // 界面交互
    // 界面初始数据
    setupUI() {
      this.baseData = constantApi
      this.getObjInfo()
      this.init()
    }
  },
  // 挂载结束
  mounted: function() {},
  // 创建完毕状态
  created: function() {
     deptApi.list().then(ret => {
      this.depts = commonApi.transformTozTreeFormat(ret.data.data.depts)
    })
    this.setupUI()
  },
  // 组件更新
  updated: function() {}
}
</script>

<style rel="stylesheet/scss" lang="scss">
.el-collapse-item__arrow {
  float: left;
}
.headInfo {
  .headText {
    .el-row {
      overflow: visible;
      line-height: 36px;
      margin-bottom: 10px;
    }
  }
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
.objectTree{
  position: absolute;
  width:300px;
  z-index:999;
  border: 1px solid #dddee1;
  right: 65px;
  border-radius: 5px;
}
</style>