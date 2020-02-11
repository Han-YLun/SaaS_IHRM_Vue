<template>
  <div class="boxInfo">
        <el-alert v-if="barSearch.alertText !== ''" :title="barSearch.alertText" type="info" class="alert" :closable='false'
          show-icon>
        </el-alert>
        <!-- 搜索栏 / -->
        <!-- 数据表格 -->
        <div class="tags-container tagInfo">
          <el-tag v-for="item in seleList" :key="item" :disable-transitions="false" closable @close="seleClose(item)" class="active">
            {{item}}
          </el-tag>
        </div>
        <div class="fr clearfix searchInfo">
          <div class="serachInput">
            <el-input
              placeholder="搜索"
              v-model="requestParameters.keyword"
              clearable
              @keyup.enter.native='dataSearch()'>
            </el-input> 
          </div>
          <a class="el-button fr el-button--primary el-button--mini" title="导出" @click='handleExport(1)'>导出</a>
           <!-- 
          <a class="el-button fr el-button--primary el-button--mini" title="导出" :href="exportUrl">导出</a>
         
          <a class="el-button fr el-button--primary el-button--mini" title="导出" @click='handleExport(1)'>导出</a>
          -->
        </div>
        <el-table :key='tableKey' :data="tables" v-loading="listLoading" element-loading-text="给我一点时间" fit
          highlight-current-row style="width: 100%; margin-top:10px;" border>
          <el-table-column prop="fullName" label="姓名" width="120"></el-table-column>
          <el-table-column prop="sex" label="性别" width="80"></el-table-column>
          <el-table-column prop="mobilePhone" label="手机" width="120"></el-table-column>
          <el-table-column prop="onTheJobStatus" label="在职状态" width="120"></el-table-column>
          <el-table-column prop="dateOfBirth" label="出生日期" width="120"></el-table-column>
          <el-table-column prop="theHighestDegreeOfEducation" label="最高学历" width="120"></el-table-column>
          <el-table-column prop="nationalArea" label="国家地区" width="200"></el-table-column>
          <el-table-column prop="iDNumber" label="身份证号" width="200"></el-table-column>
          <el-table-column prop="iDCardPhoto" label="身份证照片" width="200"></el-table-column>
          <el-table-column prop="staffPhoto" label="员工照片" width="200"></el-table-column>
          <el-table-column prop="birthday" label="生日" width="120"></el-table-column>
          <el-table-column prop="zodiac" label="属相" width="80"></el-table-column>
          <el-table-column prop="age" label="年龄" width="80"></el-table-column>
          <el-table-column prop="constellation" label="星座" width="80"></el-table-column>
          <el-table-column prop="personalMailbox" label="个人邮箱" width="200"></el-table-column>
          <el-table-column prop="socialSecurityComputerNumber" label="社保电脑号" width="200"></el-table-column>
          <el-table-column prop="providentFundAccount" label="公积金账号" width="200"></el-table-column>
          <el-table-column prop="bankCardNumber" label="银行卡号" width="200"></el-table-column>
          <el-table-column prop="openingBank" label="开户行" width="120"></el-table-column>
          <el-table-column prop="homeCompany" label="上家公司" width="200"></el-table-column>
          <el-table-column prop="passportNo" label="护照号" width="200"></el-table-column>
          <el-table-column prop="nativePlace" label="籍贯" width="200"></el-table-column>
          <el-table-column prop="nation" label="民族" width="80"></el-table-column>
          <el-table-column prop="englishName" label="英文名" width="120"></el-table-column>
          <el-table-column prop="maritalStatus" label="婚姻状况" width="80"></el-table-column>
          <el-table-column prop="bloodType" label="血型" width="80"></el-table-column>
          <el-table-column prop="domicile" label="户籍所在地" width="200"></el-table-column>
          <el-table-column prop="politicalOutlook" label="政治面貌" width="80"></el-table-column>
          <el-table-column prop="timeToJoinTheParty" label="入党时间" width="120"></el-table-column>
          <el-table-column prop="archivingOrganization" label="存档机构" width="200"></el-table-column>
          <el-table-column prop="stateOfChildren" label="子女状态" width="200"></el-table-column>
          <el-table-column prop="doChildrenHaveCommercialInsurance" label="子女有无商业保险" width="200"></el-table-column>
          <el-table-column prop="isThereAnyViolationOfLawOrDiscipline" label="有无违法违纪行为" width="200"></el-table-column>
          <el-table-column prop="areThereAnyMajorMedicalHistories" label="有无重大病史" width="200"></el-table-column>
          <el-table-column prop="qQ" label="QQ" width="120"></el-table-column>
          <el-table-column prop="weChat" label="微信" width="120"></el-table-column>
          <el-table-column prop="residenceCardCity" label="居住证城市" width="200"></el-table-column>
          <el-table-column prop="dateOfResidencePermit" label="居住证办理日期" width="120"></el-table-column>
          <el-table-column prop="residencePermitDeadline" label="居住证截止日期" width="120"></el-table-column>
          <el-table-column prop="placeOfResidence" label="现居住地" width="200"></el-table-column>
          <el-table-column prop="postalAddress" label="通讯地址" width="200"></el-table-column>
          <el-table-column prop="contactTheMobilePhone" label="联系手机" width="120"></el-table-column>
          <el-table-column prop="emergencyContact" label="紧急联系人" width="120"></el-table-column>
          <el-table-column prop="emergencyContactNumber" label="紧急联系电话" width="120"></el-table-column>
          <el-table-column prop="educationalType" label="学历类型" width="100"></el-table-column>
          <el-table-column prop="graduateSchool" label="毕业学校" width="100"></el-table-column>
          <el-table-column prop="enrolmentTime" label="入学时间" width="120"></el-table-column>
          <el-table-column prop="graduationTime" label="毕业时间" width="120"></el-table-column>
          <el-table-column prop="major" label="专业" width="120"></el-table-column>
          <el-table-column prop="graduationCertificate" label="毕业证书" width="200"></el-table-column>
          <el-table-column prop="certificateOfAcademicDegree" label="学位证书" width="200"></el-table-column>
          <el-table-column prop="title" label="职称" width="200"></el-table-column>
          <el-table-column prop="resume" label="简历" width="200"></el-table-column>
          <el-table-column prop="isThereAnyCompetitionRestriction" label="有无竞业限制" width="200"></el-table-column>
          <el-table-column prop="proofOfDepartureOfFormerCompany" label="前公司离职证明" width="200"></el-table-column>
          <el-table-column prop="remarks" label="备注" width="200"></el-table-column>
          <el-table-column prop="dateOfEntry" label="入职日期" width="200"></el-table-column>
          <el-table-column prop="post" label="岗位" width="200"></el-table-column>
          <el-table-column prop="workMailbox" label="工作邮箱" width="200"></el-table-column>
          <el-table-column prop="workNumber" label="工号" width="200"></el-table-column>
          <el-table-column prop="dateOfCorrection" label="转正日期" width="200"></el-table-column>
          <el-table-column prop="rank" label="职级" width="200"></el-table-column>
          <el-table-column prop="reportingObject" label="汇报对象" width="200"></el-table-column>
          <el-table-column prop="hRBP" label="HRBP" width="200"></el-table-column>
          <el-table-column prop="formOfEmployment" label="聘用形式" width="200"></el-table-column>
          <el-table-column prop="formOfManagement" label="管理形式" width="200"></el-table-column>
          <el-table-column prop="adjustmentAge" label="调整司龄天" width="200"></el-table-column>
          <el-table-column prop="ageOfDivision" label="司龄" width="200"></el-table-column>
          <el-table-column prop="workingTimeForTheFirstTime" label="首次参加工作时间" width="200"></el-table-column>
          <el-table-column prop="adjustmentOfLengthOfService" label="调整工龄天" width="200"></el-table-column>
          <el-table-column prop="workingYears" label="工龄" width="200"></el-table-column>
          <el-table-column prop="workingCity" label="工作城市" width="200"></el-table-column>
          <el-table-column prop="taxableCity" label="纳税城市" width="200"></el-table-column>
          <el-table-column prop="currentContractStartTime" label="现合同开始时间" width="200"></el-table-column>
          <el-table-column prop="closingTimeOfCurrentContract" label="现合同结束时间" width="200"></el-table-column>
          <el-table-column prop="otherRecruitmentChannels" label="其他招聘渠道" width="200"></el-table-column>
          <el-table-column prop="recruitmentChannels" label="招聘渠道" width="200"></el-table-column>
          <el-table-column prop="socialRecruitment" label="社招校招" width="200"></el-table-column>
          <el-table-column prop="workingPlace" label="工作地点" width="200"></el-table-column>
          <el-table-column prop="initialContractStartTime" label="首次合同开始时间" width="200"></el-table-column>
          <el-table-column prop="firstContractTerminationTime" label="首次合同结束时间" width="200"></el-table-column>
          <el-table-column prop="contractPeriod" label="合同期限" width="200"></el-table-column>
          <el-table-column prop="contractDocuments" label="合同文件" width="200"></el-table-column>
          <el-table-column prop="renewalNumber" label="续签次数" width="200"></el-table-column>
          <el-table-column prop="recommenderBusinessPeople" label="推荐企业人" width="200"></el-table-column>
          <el-table-column prop="firstLevelDepartment" label="一级部门" width="200"></el-table-column>
          <el-table-column prop="departmentCode" label="部门编码" width="200"></el-table-column>
          <el-table-column prop="leaveDate" label="离职日期" width="200"></el-table-column>
          <el-table-column prop="stateOfCorrection" label="转正状态" width="200"></el-table-column>
          <el-table-column prop="accountStatus" label="账号状态" width="200"></el-table-column>
          <el-table-column prop="informationIntegrity" label="信息完整性" width="200"></el-table-column>
          <el-table-column prop="directReports" label="直接下属" width="200"></el-table-column>
          <el-table-column prop="typeOfTurnover" label="离职类型" width="200"></el-table-column>
          <el-table-column prop="reasonsForLeaving" label="离职原因" width="200"></el-table-column>
          <el-table-column prop="reasonsForLeaving" label="申请离职原因" width="200"></el-table-column>
          <el-table-column prop="departureTime" label="办理离职时间" width="200"></el-table-column>
          <el-table-column prop="personalMainCause" label="个人主因" width="200"></el-table-column>
          <el-table-column prop="theMainCauseOfTheCompany" label="公司主因" width="200"></el-table-column>
          <el-table-column prop="reasonsForPassiveTurnover" label="被动离职原因" width="200"></el-table-column>
        </el-table>
        <!-- 数据表格 / -->
        <div class="butList">
          <el-button type="primary" @click="archivingReportForm(2)">归档报表</el-button>
          <el-button @click="handleRest">取消</el-button>
        </div>
  </div>
</template>

<script>
import { checkPhone, getBlob } from '@/filters/index'
import { refort, importDown } from '@/api/base/employees'
import {createAPI} from "@/utils/request"
export default {
  name: 'exampleList',
  components: {},
  props: ['showHeight', 'baseData'],
  data() {
    return {
      dataList: [],
      seleList: [],
      pageTitle: '用户', // 页面标题
      text: '', // 新增、编辑文本
      tableKey: 0,
      listLoading: true,
      stausInfo: '在职',
      showMore: false,
      barSearch: {
        alertText: ''
      },
      exportUrl:'',
      requestParameters: {
        type: 1,
        month: this.baseData.month,
        keyword: this.keyword
      },
      loading: false,
      multipleSelection: [],
      dialogVisible: false,
      formData: {},
      ruleInline: {
        mobilePhone: [{ validator: checkPhone, trigger: 'blur' }]
      }
    }
  },
  computed: {
    // 模糊搜索
    tables() {
      const search = this.requestParameters.keyword
      if (search) {
        return this.dataList.filter(data => {
          return Object.keys(data).some(key => {
            return (
              String(data[key])
                .toLowerCase()
                .indexOf(search) > -1
            )
          })
        })
      }
      return this.dataList
    }
  },
  methods: {
    // 业务方法
    doQuery(params) {
      this.listLoading = true
      refort(this.requestParameters)
        .then(data => {
          this.dataList = data.data.items
          this.listLoading = false
        })
        .catch(e => {
          this.$message.e('错了哦，这是一条错误消息')
        })
    },
    // 新增用户刷新列表
    handleLoadDataList() {
      this.doQuery()
    },
    // 界面交互
    // 界面初始数据
    handleRest() {
      this.requestParameters = {
        fullName: '', // 姓名
        sex: '', // 性别
        mobilePhone: '', // 手机
        onTheJobStatus: '', // 在职状态
        dateOfBirth: '', // 出生日期
        theHighestDegreeOfEducation: '' // 最高学历
      }
      this.requestParameters = {}
      this.seleList = []
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
    // 搜索信息
    handleSearch() {
      this.requestParameters.page = 1
      this.doQuery(this.requestParameters)
      var seleArr = []
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
    vPhone(value) {
      var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
      if (!reg.test(value)) {
        this.requestParameters.mobilePhone = ''
        return false
      }
    },
    // 下载文件
    handleExport(type) {
      this.baseData.type = type
      var data = {
        type: type,
        month: this.baseData.month
      }
      importDown(data)
        .then(res => {
          var elemIF = document.createElement("iframe");     
          elemIF.src = res.request.responseURL;     
          elemIF.style.display = "none";     
          document.body.appendChild(elemIF);     
        })
        .catch(e => {
          this.$message.error('导出报表失败！')
        })
    },

    // 下载文件
    // handleExport(type) {
    //   this.baseData.type = type
    //   var data = {
    //     type: type,
    //     month: this.baseData.month
    //   }
    //   importDown(data)
    // },
    // 归档报表
    archivingReportForm(type) {
      this.baseData.type = type
      this.$emit('archivingReportForm', this.baseData)
    },
    dataSearch() {
      this.doQuery(this.requestParameters)
    }
  },
  // 挂载结束
  mounted: function() {},
  // 创建完毕状态
  created: function() {
    var date = new Date()
    var year = date.getFullYear()
    var month = year + '-' + this.$route.params.month
    this.exportUrl = process.env.BASE_API+"/employees/export/"+month,
    this.doQuery()
  },
  // 组件更新
  updated: function() {}
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import './../../styles/variables.scss';
.butList {
  text-align: center;
  background: #fff;
  margin: 15px 0 0;
  span {
    display: inline-block;
    background: $green;
    color: #fff;
    padding: 8px 20px;
    border-radius: 3px;
    margin: 10px;
    cursor: pointer;
  }
  .cancel {
    background: #ccc;
    color: #666;
  }
}
</style>
