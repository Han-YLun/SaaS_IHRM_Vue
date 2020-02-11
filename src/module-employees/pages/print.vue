<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card  :style="{minHeight:boxHeight}">
        <el-breadcrumb separator="/" class="titInfo ">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>
            <router-link :to="{'path':'/employees/index'}">员工管理</router-link>
          </el-breadcrumb-item>
          <el-breadcrumb-item>打印</el-breadcrumb-item>
        </el-breadcrumb>
        <div v-if="this.$route.query.name==='user'">
          <h2 class="centInfo">员工信息表</h2>
          <table cellspacing="0" width="100%" class="tableList">
          <tr class="title">
            <td colspan="8" class="centInfo">基本信息</td>
          </tr>
          <tr>
            <th style="width:10%">姓名</th>
            <td colspan="6" style="width:80%">{{objInfoDataes.fullName}}</td>
            <td  rowspan="5" style="width:10%"><img :src="objInfoDataes.staffPhoto"></td>
            
          </tr>
          <tr>
            <th>性别</th>
            <td colspan="6">{{objInfoDataes.sex}}</td>
          </tr>
          <tr>
            <th>手机</th>
            <td colspan="6">{{objInfoDataes.mobilePhone}}</td>
          </tr>
          <tr>
            <th>出生日期</th>
            <td colspan="6">{{objInfoDataes.dateOfBirth}}</td>
          </tr>
          <tr>
            <th>最高学历</th>
            <td colspan="6">{{objInfoDataes.theHighestDegreeOfEducation}}</td>
          </tr>
          <tr>
            <th style="width:10%">是否可编辑</th>
            <td style="width:35%">{{objInfoDataes.isItEditable}}</td>
            <th style="width:10%">是否隐藏号码</th>
            <td colspan="5" style="width:45%">{{objInfoDataes.doYouHideNumbers}}</td>
          </tr>
          <tr>
            <th>国家地区</th>
            <td>{{objInfoDataes.nationalArea}}</td>
            <th>护照号</th>
            <td colspan="5">{{objInfoDataes.passportNo}}</td>
          </tr>
          <tr>
            <th>身份证号</th>
            <td>{{objInfoDataes.iDNumber}}</td>
            <th>身份证照片</th>
            <td colspan="5">{{objInfoDataes.iDCardPhoto}}</td>
          </tr>
          <tr>
            <th>籍贯</th>
            <td>{{objInfoDataes.nativePlace}}</td>
            <th>民族</th>
            <td colspan="5">{{objInfoDataes.nation}}</td>
          </tr>
          <tr>
            <th>英文名</th>
            <td>{{objInfoDataes.englishName}}</td>
            <th>婚姻状况</th>
            <td colspan="5">{{objInfoDataes.maritalStatus}}</td>
          </tr>
          <tr>
            <th>员工照片</th>
            <td>{{objInfoDataes.staffPhoto}}</td>
            <th>生日</th>
            <td colspan="5">{{objInfoDataes.birthday}}</td>
          </tr>
          <tr>
            <th>属相</th>
            <td>{{objInfoDataes.zodiac}}</td>
            <th>年龄</th>
            <td colspan="5">{{objInfoDataes.age}}</td>
          </tr>
          <tr>
            <th>星座</th>
            <td>{{objInfoDataes.constellation}}</td>
            <th>血型</th>
            <td colspan="5">{{objInfoDataes.bloodType}}</td>
          </tr>
          <tr>
            <th>户籍所在地</th>
            <td>{{objInfoDataes.domicile}}</td>
            <th>政治面貌</th>
            <td colspan="5">{{objInfoDataes.politicalOutlook}}</td>
          </tr>
          <tr>
            <th>入党时间</th>
            <td>{{objInfoDataes.timeToJoinTheParty}}</td>
            <th>存档机构</th>
            <td colspan="5">{{objInfoDataes.archivingOrganization}}</td>
          </tr>
          <tr>
            <th>子女状态</th>
            <td>{{objInfoDataes.stateOfChildren}}</td>
            <th>子女有无商业保险</th>
            <td colspan="5">{{objInfoDataes.doChildrenHaveCommercialInsurance}}</td>
          </tr>
          <tr>
            <th>有无违法违纪行为</th>
            <td>{{objInfoDataes.isThereAnyViolationOfLawOrDiscipline}}</td>
            <th>有无重大病史</th>
            <td colspan="5">{{objInfoDataes.areThereAnyMajorMedicalHistories}}</td>
          </tr>
          <tr class="title">
            <td colspan="8" class="centInfo">通讯信息</td>
          </tr>
          <tr>
            <th>QQ</th>
            <td>{{objInfoDataes.qQ}}</td>
            <th>微信</th>
            <td colspan="5">{{objInfoDataes.weChat}}</td>
          </tr>
          <tr>
            <th>居住证城市</th>
            <td>{{objInfoDataes.residenceCardCity}}</td>
            <th>居住证办理日期</th>
            <td colspan="5">{{objInfoDataes.dateOfResidencePermit}}</td>
          </tr>
          <tr>
            <th>居住证截止日期</th>
            <td>{{objInfoDataes.residencePermitDeadline}}</td>
            <th>现居住地</th>
            <td colspan="5">{{objInfoDataes.placeOfResidence}}</td>
          </tr>
          <tr>
            <th>通讯地址</th>
            <td>{{objInfoDataes.postalAddress}}</td>
            <th>联系手机</th>
            <td colspan="5">{{objInfoDataes.contactTheMobilePhone}}</td>
          </tr>
          <tr>
            <th>个人邮箱</th>
            <td>{{objInfoDataes.personalMailbox}}</td>
            <th>紧急联系人</th>
            <td colspan="5">{{objInfoDataes.emergencyContact}}</td>
          </tr>
          <tr>
            <th>紧急联系电话</th>
            <td colspan="7">{{objInfoDataes.emergencyContactNumber}}</td>
          </tr>
          <tr class="title">
            <td colspan="8" class="centInfo">账号信息</td>
          </tr>
          <tr>
            <th>社保电脑号</th>
            <td>{{objInfoDataes.socialSecurityComputerNumber}}</td>
            <th>公积金账号</th>
            <td colspan="5">{{objInfoDataes.providentFundAccount}}</td>
          </tr>
          <tr>
            <th>银行卡号</th>
            <td>{{objInfoDataes.bankCardNumber}}</td>
            <th>开户行</th>
            <td colspan="5">{{objInfoDataes.openingBank}}</td>
          </tr>
          <tr class="title">
            <td colspan="8" class="centInfo">教育信息</td>
          </tr>
          <tr>
            <th>学历类型</th>
            <td>{{objInfoDataes.educationalType}}</td>
            <th>毕业学校</th>
            <td colspan="5">{{objInfoDataes.graduateSchool}}</td>
          </tr>
          <tr>
            <th>入学时间</th>
            <td>{{objInfoDataes.enrolmentTime}}</td>
            <th>毕业时间</th>
            <td colspan="5">{{objInfoDataes.graduationTime}}</td>
          </tr>
          <tr>
            <th>专业</th>
            <td>{{objInfoDataes.major}}</td>
            <th>毕业证书</th>
            <td colspan="5">{{objInfoDataes.graduationCertificate}}</td>
          </tr>
          <tr>
            <th>学位证书</th>
            <td colspan="7">{{objInfoDataes.certificateOfAcademicDegree}}</td>
          </tr>
          <tr class="title">
            <td colspan="8" class="centInfo">从业信息</td>
          </tr>
          <tr>
            <th>上家公司</th>
            <td>{{objInfoDataes.homeCompany}}</td>
            <th>职称</th>
            <td colspan="5">{{objInfoDataes.title}}</td>
          </tr>
          <tr>
            <th>简历</th>
            <td>{{objInfoDataes.resume}}</td>
            <th>有无竞业限制</th>
            <td colspan="5">{{objInfoDataes.isThereAnyCompetitionRestriction}}</td>
          </tr>
          <tr>
            <th>前公司离职证明</th>
            <td>{{objInfoDataes.proofOfDepartureOfFormerCompany}}</td>
            <th>备注</th>
            <td colspan="5">{{objInfoDataes.remarks}}</td>
          </tr>
        </table>
        <div class="foot">签字：___________日期:___________</div>
        </div>
        <div v-if="this.$route.query.name==='post'">
          <h2 class="centInfo">岗位信息表</h2>
          <table cellspacing="0" width="100%" class="tableList">
          <tr class="title">
            <td colspan="4" class="centInfo">基本信息</td>
          </tr>
          <tr>
            <th style="width:10%">姓名</th>
            <td style="width:40%">{{objInfoDataes.fullName}}</td>
            <th style="width:10%">入职日期</th>
            <td style="width:40%">{{objInfoDataes.dateOfEntry}}</td>
          </tr>
          <tr>
            <th>部门</th>
            <td>{{objInfoDataes.department}}</td>
            <th>岗位</th>
            <td>{{objInfoDataes.post}}</td>
          </tr>
          <tr>
            <th>工作邮箱</th>
            <td>{{objInfoDataes.workMailbox}}</td>
            <th>工号</th>
            <td>{{objInfoDataes.workNumber}}</td>
          </tr>
          <tr>
            <th>转正日期</th>
            <td>{{objInfoDataes.dateOfCorrection}}</td>
            <th>转正状态</th>
            <td>{{objInfoDataes.stateOfCorrection}}</td>
          </tr>
          <tr>
            <th>职级</th>
            <td>{{objInfoDataes.rank}}</td>
            <th>汇报对象</th>
            <td>{{objInfoDataes.reportingObject}}</td>
          </tr>
          <tr>
            <th>HRBP</th>
            <td>{{objInfoDataes.hRBP}}</td>
            <th>聘用形式</th>
            <td>{{objInfoDataes.formOfEmployment}}</td>
          </tr>
          
          <tr>
            <th>管理形式</th>
            <td>{{objInfoDataes.formOfManagement}}</td>
            <th>调整司龄（天）</th>
            <td>{{objInfoDataes.adjustmentAgedays}}</td>
          </tr>
          <tr>
            <th>司龄</th>
            <td>{{objInfoDataes.ageOfDivision}}</td>
            <th>首次参加工作时间</th>
            <td>{{objInfoDataes.workingTimeForTheFirstTime}}</td>
          </tr>
          
          <tr>
            <th>调整工龄天</th>
            <td>{{objInfoDataes.adjustmentOfLengthOfService}}</td>
            <th>工龄</th>
            <td>{{objInfoDataes.workingYears}}</td>
          </tr>
          <tr>
            <th>直属下属数量</th>
            <td>{{objInfoDataes.numberOfSubordinateSubordinates}}</td>
            <th>工作城市</th>
            <td>{{objInfoDataes.workingCity}}</td>
          </tr>
          <tr>
            <th>纳税城市</th>
            <td>{{objInfoDataes.taxableCity}}</td>
            <th>转正评价</th>
            <td>{{objInfoDataes.correctionEvaluation}}</td>
          </tr>
          <tr class="title">
            <td colspan="4" class="centInfo">合同信息</td>
          </tr>
          <tr>
            <th>首次合同开始时间</th>
            <td>{{objInfoDataes.initialContractStartTime}}</td>
            <th>首次合同结束时间</th>
            <td>{{objInfoDataes.firstContractTerminationTime}}</td>
          </tr>
          <tr>
            <th>现合同开始时间</th>
            <td>{{objInfoDataes.currentContractStartTime}}</td>
            <th>现合同结束时间</th>
            <td>{{objInfoDataes.closingTimeOfCurrentContract}}</td>
          </tr>
          
          <tr>
            <th>合同期限</th>
            <td>{{objInfoDataes.contractPeriod}}</td>
            <th>合同文件</th>
            <td>{{objInfoDataes.contractDocuments}}</td>
          </tr>
          <tr>
            <th>续签次数</th>
            <td colspan="3">{{objInfoDataes.renewalNumber}}</td>
          </tr>
          <tr class="title">
            <td colspan="4" class="centInfo">招聘信息</td>
          </tr>
          <tr>
            <th>其他招聘渠道</th>
            <td>{{objInfoDataes.otherRecruitmentChannels}}</td>
            <th>招聘渠道</th>
            <td>{{objInfoDataes.recruitmentChannels}}</td>
          </tr>
          <tr>
            <th>社招校招</th>
            <td>{{objInfoDataes.socialRecruitment}}</td>
            <th>推荐企业人</th>
            <td>{{objInfoDataes.recommenderBusinessPeople}}</td>
          </tr>
        </table>
          <div class="foot">签字：___________日期:___________</div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { personalDetail, jobsDetail } from '@/api/base/employees'
import { minHeight } from '@/filters/index'
var _this = null
export default {
  name: 'employeesprint',
  components: {},
  data() {
    return {
      objInfoDataes: [],
      boxHeight: ''
    }
  },
  methods: {
    // 业务方法
    getObjInfo() {
      if (this.$route.query.name === 'user') {
        personalDetail({ id: this.$route.params.id }).then(res => {
          this.objInfoDataes = res.data
        })
      } else {
        jobsDetail({ id: this.$route.params.id }).then(res => {
          this.objInfoDataes = res.data
        })
      }
    }
    // 界面交互
  },
  // 挂载结束
  mounted: function() {},
  // 创建完毕状态
  created: function() {
    _this = this
    this.boxHeight = minHeight() // 右边内容高度
    this.getObjInfo()
  },
  // 组件更新
  updated: function() {}
}
</script>

<style rel="stylesheet/scss" lang="scss">
.foot {
  padding: 30px 0;
  text-align: right;
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
