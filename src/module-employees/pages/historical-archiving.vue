<template>
  <div class="historicalArcBox">
    <el-card shadow="never" v-loading="loading" :style="{minHeight:boxHeight}">
    <div class="historicalArcTop">
      <div class="title">
        <span>员工历史归档</span>
        <div class="yearChange">
          <el-date-picker v-model="requestParameters.year" type="year" size="mini" width="130px" placeholder="选择年" value-format="yyyy" @change="handleYear"> </el-date-picker>
        </div>
      </div>
    </div>
    <div class="historicalTable">
      <div v-if="tableData.length===0" class="warningTip">该年份无归档报表</div>
      <div class="itemes" v-for="( itemes, index) in tableData" :key="index">
        <div class="itemTopLab" :class="{act: itemes.act}">
          <div @click="openTable(itemes,index)" class="lab"><i class="fa fa-chevron-right" aria-hidden="true"></i></div>
          <div>
              <p class="title">{{itemes.month}}员工报表 <span>{{itemes.archiveTime}}</span></p>
              <p @click="openTable(itemes,index)" class="labTit">员工报表</p>
          </div>
          <div class="fr">
            <div>
              <p class="itemTit"><span>总人数</span></p>
              <p class="itemNum">{{itemes.totals}}</p>
            </div>
            <div>
              <p class="itemTit"><span>在职人数</span></p>
              <p class="itemNum">{{itemes.payrolls}}</p>
            </div>
            <div>
              <p class="itemTit"><span>离职人数</span></p>
              <p class="itemNum">{{itemes.departures}}</p>
            </div>
          </div>
        </div>
        <div class="itemDropDown" v-show="itemes.act">
          <div class="topLab">
            <div class="fr clearfix searchInfo">
              <div class="serachInput">
                <el-input
                  placeholder="搜索"
                  v-model="baseData.keyword"
                  clearable
                  @keyup.enter.native='dataSearch()'>
                </el-input> 
              </div>
              <a class="el-button fr el-button--primary el-button--mini" title="导出" @click='handleExport(itemes.month,1)'>导出</a>
            </div>
          </div>
          <el-table :data="tables" height="300" border style="width: 100%;text-align: center">
            <el-table-column prop="fullName" label="姓名" width="120"></el-table-column>
          <el-table-column prop="sex" label="性别" width="80"></el-table-column>
          <el-table-column prop="mobilePhone" label="手机" width="120"></el-table-column>
          <el-table-column prop="onTheJobStatus" label="在职状态" width="100"></el-table-column>
          <el-table-column prop="dateOfBirth" label="出生日期" width="120"></el-table-column>
          <el-table-column prop="theHighestDegreeOfEducation" label="最高学历" width="100"></el-table-column>
          <el-table-column prop="nationalArea" label="国家地区" width="200"></el-table-column>
          <el-table-column prop="iDNumber" label="身份证号" width="200"></el-table-column>
          <el-table-column prop="iDCardPhoto" label="身份证照片" width="200"></el-table-column>
          <el-table-column prop="staffPhoto" label="员工照片" width="200"></el-table-column>
          <el-table-column prop="birthday" label="生日" width="100"></el-table-column>
          <el-table-column prop="zodiac" label="属相" width="80"></el-table-column>
          <el-table-column prop="age" label="年龄" width="80"></el-table-column>
          <el-table-column prop="constellation" label="星座" width="80"></el-table-column>
          <el-table-column prop="personalMailbox" label="个人邮箱" width="200"></el-table-column>
          <el-table-column prop="socialSecurityComputerNumber" label="社保电脑号" width="200"></el-table-column>
          <el-table-column prop="providentFundAccount" label="公积金账号" width="200"></el-table-column>
          <el-table-column prop="bankCardNumber" label="银行卡号" width="200"></el-table-column>
          <el-table-column prop="openingBank" label="开户行" width="200"></el-table-column>
          <el-table-column prop="homeCompany" label="上家公司" width="200"></el-table-column>
          <el-table-column prop="passportNo" label="护照号" width="200"></el-table-column>
          <el-table-column prop="nativePlace" label="籍贯" width="200"></el-table-column>
          <el-table-column prop="nation" label="民族" width="120"></el-table-column>
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
          <el-table-column prop="dateOfResidencePermit" label="居住证办理日期" width="200"></el-table-column>
          <el-table-column prop="residencePermitDeadline" label="居住证截止日期" width="200"></el-table-column>
          <el-table-column prop="placeOfResidence" label="现居住地" width="200"></el-table-column>
          <el-table-column prop="postalAddress" label="通讯地址" width="200"></el-table-column>
          <el-table-column prop="contactTheMobilePhone" label="联系手机" width="200"></el-table-column>
          <el-table-column prop="emergencyContact" label="紧急联系人" width="200"></el-table-column>
          <el-table-column prop="emergencyContactNumber" label="紧急联系电话" width="200"></el-table-column>
          <el-table-column prop="educationalType" label="学历类型" width="120"></el-table-column>
          <el-table-column prop="graduateSchool" label="毕业学校" width="200"></el-table-column>
          <el-table-column prop="enrolmentTime" label="入学时间" width="120"></el-table-column>
          <el-table-column prop="graduationTime" label="毕业时间" width="120"></el-table-column>
          <el-table-column prop="major" label="专业" width="120"></el-table-column>
          <el-table-column prop="graduationCertificate" label="毕业证书" width="200"></el-table-column>
          <el-table-column prop="certificateOfAcademicDegree" label="学位证书" width="200"></el-table-column>
          <el-table-column prop="title" label="职称" width="120"></el-table-column>
          <el-table-column prop="resume" label="简历" width="200"></el-table-column>
          <el-table-column prop="isThereAnyCompetitionRestriction" label="有无竞业限制" width="200"></el-table-column>
          <el-table-column prop="proofOfDepartureOfFormerCompany" label="前公司离职证明" width="200"></el-table-column>
          <el-table-column prop="remarks" label="备注" width="200"></el-table-column>
          <el-table-column prop="dateOfEntry" label="入职日期" width="120"></el-table-column>
          <el-table-column prop="post" label="岗位" width="120"></el-table-column>
          <el-table-column prop="workMailbox" label="工作邮箱" width="200"></el-table-column>
          <el-table-column prop="workNumber" label="工号" width="100"></el-table-column>
          <el-table-column prop="dateOfCorrection" label="转正日期" width="120"></el-table-column>
          <el-table-column prop="rank" label="职级" width="100"></el-table-column>
          <el-table-column prop="reportingObject" label="汇报对象" width="120"></el-table-column>
          <el-table-column prop="hRBP" label="HRBP" width="120"></el-table-column>
          <el-table-column prop="formOfEmployment" label="聘用形式" width="120"></el-table-column>
          <el-table-column prop="formOfManagement" label="管理形式" width="120"></el-table-column>
          <el-table-column prop="adjustmentAge" label="调整司龄天" width="100"></el-table-column>
          <el-table-column prop="ageOfDivision" label="司龄" width="100"></el-table-column>
          <el-table-column prop="workingTimeForTheFirstTime" label="首次参加工作时间" width="120"></el-table-column>
          <el-table-column prop="adjustmentOfLengthOfService" label="调整工龄天" width="80"></el-table-column>
          <el-table-column prop="workingYears" label="工龄" width="80"></el-table-column>
          <el-table-column prop="workingCity" label="工作城市" width="200"></el-table-column>
          <el-table-column prop="taxableCity" label="纳税城市" width="200"></el-table-column>
          <el-table-column prop="currentContractStartTime" label="现合同开始时间" width="120"></el-table-column>
          <el-table-column prop="closingTimeOfCurrentContract" label="现合同结束时间" width="120"></el-table-column>
          <el-table-column prop="otherRecruitmentChannels" label="其他招聘渠道" width="120"></el-table-column>
          <el-table-column prop="recruitmentChannels" label="招聘渠道" width="120"></el-table-column>
          <el-table-column prop="socialRecruitment" label="社招校招" width="120"></el-table-column>
          <el-table-column prop="workingPlace" label="工作地点" width="200"></el-table-column>
          <el-table-column prop="initialContractStartTime" label="首次合同开始时间" width="120"></el-table-column>
          <el-table-column prop="firstContractTerminationTime" label="首次合同结束时间" width="120"></el-table-column>
          <el-table-column prop="contractPeriod" label="合同期限" width="80"></el-table-column>
          <el-table-column prop="contractDocuments" label="合同文件" width="200"></el-table-column>
          <el-table-column prop="renewalNumber" label="续签次数" width="80"></el-table-column>
          <el-table-column prop="recommenderBusinessPeople" label="推荐企业人" width="120"></el-table-column>
          <el-table-column prop="firstLevelDepartment" label="一级部门" width="200"></el-table-column>
          <el-table-column prop="departmentCode" label="部门编码" width="120"></el-table-column>
          <el-table-column prop="leaveDate" label="离职日期" width="120"></el-table-column>
          <el-table-column prop="stateOfCorrection" label="转正状态" width="120"></el-table-column>
          <el-table-column prop="accountStatus" label="账号状态" width="120"></el-table-column>
          <el-table-column prop="informationIntegrity" label="信息完整性" width="200"></el-table-column>
          <el-table-column prop="directReports" label="直接下属" width="120"></el-table-column>
          <el-table-column prop="typeOfTurnover" label="离职类型" width="120"></el-table-column>
          <el-table-column prop="reasonsForLeaving" label="离职原因" width="200"></el-table-column>
          <el-table-column prop="reasonsForLeaving" label="申请离职原因" width="200"></el-table-column>
          <el-table-column prop="departureTime" label="办理离职时间" width="120"></el-table-column>
          <el-table-column prop="personalMainCause" label="个人主因" width="120"></el-table-column>
          <el-table-column prop="theMainCauseOfTheCompany" label="公司主因" width="200"></el-table-column>
          <el-table-column prop="reasonsForPassiveTurnover" label="被动离职原因" width="200"></el-table-column>
          </el-table>
        </div>
      </div>
      <!-- 分页 -->
        <div class="pagination" v-if="tableData.length!==0">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="requestParameters.pagesize"
            layout="total, prev, pager, next"
            :total="Number(counts)">
          </el-pagination>
        </div>
        <!-- end -->
    </div>
    </el-card>
  </div>
</template>

<script>
import { minHeight, getBlob } from '@/filters/index'
import { getArchivingList, refort, importDown } from '@/api/base/employees'
export default {
  name: 'historicalArchiving',
  components: {},
  data() {
    return {
      num: 0,
      tableData: [],
      counts: '',
      requestParameters: {
        page: 1,
        pagesize: 10,
        year: ''
      },
      loading: false,
      showHeight: 40,
      boxHeight: '',
      baseData: {
        month: '',
        type: 1,
        keyword: this.keyword
      }
    }
  },
  computed: {
    // 模糊搜索
    tables() {
      const search = this.baseData.keyword
      for (var i = 0; i < this.tableData.length; i++) {
        if (search) {
          this.tableData[i].contentData.filter(function(data) {
            return Object.keys(data).some(key => {
              return (
                String(data[key])
                  .toLowerCase()
                  .indexOf(search) > -1
              )
            })
          })
        } else {
          return this.tableData[i].contentData
        }
      }
    }
  },
  methods: {
    init() {
      getArchivingList(this.requestParameters)
        .then(res => {
          this.tableData = res.data.items
          this.counts = res.data.counts
          this.loading = false
        })
        .catch(err => {
          console.log(err)
          this.loading = false
        })
    },
    openTable(obj, index) {
      this.baseData.month = obj.month
      if (!obj.act) {
        refort(this.baseData)
          .then(res => {
            this.$set(this.tableData[index], 'contentData', res.data.items)
            this.loading = false
          })
          .catch(err => {
            if (err) {
              console.log(err)
            }
            this.loading = false
          })
        this.$set(this.tableData[index], 'act', true)
      } else {
        this.$set(this.tableData[index], 'act', false)
      }
    },
    // 下载文件
    handleExport(month, type) {
      this.baseData.type = type
      this.baseData.month = month
      importDown(this.baseData)
        .then(response => {
          getBlob(response)
          this.$message.success('导出报表成功！')
        })
        .catch(e => {
          this.$message.error('导出报表失败！')
        })
    },
    dataSearch() {
      this.openTable(this.baseData)
    },
    // 每页显示信息条数
    handleSizeChange(pageSize) {
      this.requestParameters.pagesize = pageSize
      if (this.requestParameters.page === 1) {
        _this.init(this.requestParameters)
      }
    },
    // 进入某一页
    handleCurrentChange(val) {
      this.requestParameters.page = val
      _this.init()
    },
    handleYear(year) {
      if (this.requestParameters.year !== null) {
        this.requestParameters.year = year
        this.init(this.requestParameters)
      }
    },
    // 清除搜索数据
    handleClear() {
      this.requestParameters.year = '2017'
      this.init(this.requestParameters)
    }
  },
  mounted() {
    this.init()
  },
  created: function() {
    this.boxHeight = minHeight() // 右边内容高度
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import './../../styles/variables.scss';

.historicalArcBox {
  padding: 20px;
  .historicalArcTop {
    position: relative;
    background: #fff;
    padding: 10px 15px 0 15px;
    .title {
      color: $panGreen;
      line-height: 40px;
      border-bottom: solid 2px $panGreen;
      font-size: 18px;
      font-weight: bold;
      display: inline-block;
      padding: 0 25px;
      .yearChange {
        position: absolute;
        top: 5px;
        right: 10px;
      }
    }
  }
  .historicalTable {
    background: #fff;
    .itemes {
      .itemTopLab {
        border-top: solid 1px #f0f0f0;
        border-bottom: solid 3px #ccc;
        padding: 15px;
        .fr {
          text-align: center;
        }
        div {
          display: inline-block;
          padding: 10px 50px 0;
        }

        div:last-child,
        div:first-child {
          border: none;
        }
        .lab {
          position: relative;
          top: -30px;
          padding-right: 0;
          padding-left: 15px;
        }
        .labTit {
          cursor: pointer;
        }
        .title {
          font-size: 16px;
          margin: 10px 0;
          span {
            position: relative;
            bottom: -2px;
            font-size: 13px;
            color: #999;
            margin-left: 5px;
          }
        }
        .itemTit {
          color: #999;
          margin: 8px 0;
          font-size: 13px;
        }
        .itemNum {
          font-size: 20px;
          margin: 0;
        }
      }
      .itemDropDown {
        background: #fff;
        .topLab {
          position: relative;
          padding: 15px 15px 30px;
          div {
            display: inline-block;
            margin: 0 10px;
            span {
              display: inline-block;
              position: relative;
              top: 2px;
              margin-right: 5px;
              width: 15px;
              height: 15px;
              background: $cl-1;
            }
          }
          .rightLabBox {
            position: absolute;
            right: -10px;
            top: 10px;
            div {
              border: solid 1px $green;
              color: $green;
              border-radius: 3px;
              padding: 4px 10px;
              font-size: 14px;
            }
          }
        }
      }
      .act {
        border-bottom: solid 3px $panGreen;
        .lab {
          color: $panGreen;
        }
        .labTit {
          color: $panGreen;
        }
      }
    }
    .itemes:hover {
      background: #fafbff;
    }
    .itemes .lab:hover {
      cursor: pointer;
    }
  }
}
</style>
