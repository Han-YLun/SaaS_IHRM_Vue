<template>
  <div class="monthStatementBox">
    <div class="monthStatementTop">
      <div class="title">
        <span>工资报表</span>
      </div>
    </div>
    <div class="monthStatementTable">
      <div class="itemDropDown">
        <div class="topLab">
          <div>
            <span style="background-color:#cfeffe;"></span>已离职
          </div>
          <div>
            <span style="background-color:#a8f8bb;"></span>再入职
          </div>
          <div>
            <span style="background-color:#fedbd7;"></span>公司合计
          </div>
          <div>
            <span style="background-color:#ffe8c9;"></span>一级部门
          </div>
          <div>
            <span style="background-color:#fdfcd5;"></span>二级部门
          </div>
          <div class="rightLabBox">
            <a href="/">
              <i class="el-icon-search"></i>
            </a>
            <span>&nbsp;</span>
            <a
              class="el-button fr el-button--primary el-button--mini"
              title="导出"
              @click="handleExport()"
            >导出</a>
          </div>
        </div>
        <el-table :data="contentData" border style="width: 100%;text-align: center" id="item">
          <el-table-column type="index" label="序号" center width="50"></el-table-column>
          <el-table-column prop="username" label="姓名" width="150px"></el-table-column>
          <el-table-column prop="mobile" label="手机号" width="150px"></el-table-column>
          <el-table-column prop="workNumber" label="工号" width="150px"></el-table-column>
          <el-table-column prop="departmentName" label="部门名称" width="150px"></el-table-column>
          <el-table-column prop="idNumber" label="身份证号" width="150px"></el-table-column>
          <el-table-column prop="inServiceStatus" label="在职状态" width="150px"></el-table-column>
          <el-table-column prop="formOfEmployment" label="聘用形式" width="150px"></el-table-column>
          <el-table-column prop="currentSalaryTotalBase" label="最新工资基数合计" width="150px"></el-table-column>
          <el-table-column prop="currentBaseSalary" label="最新基本工资基数" width="150px"></el-table-column>
          <el-table-column prop="baseSalaryByMonth" label="当月基本工资基数" width="150px"></el-table-column>
          <el-table-column prop="officialSalaryDays" label="计薪天数" width="150px"></el-table-column>
          <el-table-column prop="salaryStandard" label="计薪标准" width="150px"></el-table-column>
          <el-table-column prop="taxCountingMethod" label="计税方式" width="150px"></el-table-column>
          <el-table-column prop="baseSalaryToTaxByMonth" label="当月纳税基本工资" width="150px"></el-table-column>
          <el-table-column prop="attendanceDeductionMonthly" label="考勤扣款" width="150px"></el-table-column>
          <el-table-column prop="taxToProvidentFund" label="公积金需纳税额" width="150px"></el-table-column>
          <el-table-column prop="salaryBeforeTax" label="税前工资合计" width="150px"></el-table-column>
          <el-table-column prop="salary" label="工资合计" width="150px"></el-table-column>
          <el-table-column prop="salaryByTax" label="应纳税工资" width="150px"></el-table-column>
          <el-table-column prop="providentFundIndividual" label="公积金个人" width="150px"></el-table-column>
          <el-table-column prop="socialSecurityIndividual" label="社保个人" width="150px"></el-table-column>
          <el-table-column prop="oldAgeIndividual" label="养老个人" width="150px"></el-table-column>
          <el-table-column prop="medicalIndividual" label="医疗个人" width="150px"></el-table-column>
          <el-table-column prop="unemployedIndividual" label="失业个人" width="150px"></el-table-column>
          <el-table-column prop="aPersonOfGreatDisease" label="大病个人" width="150px"></el-table-column>
          <el-table-column prop="socialSecurity" label="社保扣款" width="150px"></el-table-column>
          <el-table-column prop="totalProvidentFund" label="公积金扣款" width="150px"></el-table-column>
          <el-table-column prop="paymentBeforeTax" label="税前实发" width="150px"></el-table-column>
          <el-table-column prop="tax" label="应扣税" width="150px"></el-table-column>
          <el-table-column prop="salaryAfterTax" label="税后工资合计" width="150px"></el-table-column>
          <el-table-column prop="payment" label="实发工资" width="150px"></el-table-column>
          <el-table-column prop="paymentRemark" label="实发工资备注" width="150px"></el-table-column>
          <el-table-column prop="socialSecurityEnterprise" label="社保企业" width="150px"></el-table-column>
          <el-table-column prop="pensionEnterprise" label="养老企业" width="150px"></el-table-column>
          <el-table-column prop="medicalEnterprise" label="医疗企业" width="150px"></el-table-column>
          <el-table-column prop="unemployedEnterprise" label="失业企业" width="150px"></el-table-column>
          <el-table-column prop="industrialInjuryEnterprise" label="工伤企业" width="150px"></el-table-column>
          <el-table-column prop="childbearingEnterprise" label="生育企业" width="150px"></el-table-column>
          <el-table-column prop="bigDiseaseEnterprise" label="大病企业" width="150px"></el-table-column>
          <el-table-column prop="providentFundEnterprises" label="公积金企业" width="150px"></el-table-column>
          <el-table-column
            prop="socialSecurityProvidentFundEnterprises"
            label="公积金社保企业"
            width="150px"
          ></el-table-column>
          <el-table-column prop="salaryCost" label="薪酬成本" width="150px"></el-table-column>
          <el-table-column prop="enterpriseLaborCost" label="企业人工成本" width="150px"></el-table-column>
          <el-table-column prop="salaryChangeAmount" label="调薪金额" width="150px"></el-table-column>
          <el-table-column prop="salaryChangeScale" label="调薪比例" width="150px"></el-table-column>
          <el-table-column prop="effectiveTimeOfPayAdjustment" label="调薪生效时间" width="150px"></el-table-column>
          <el-table-column prop="causeOfSalaryAdjustment" label="调薪原因" width="150px"></el-table-column>
          <el-table-column prop="remark" label="注释" width="150px"></el-table-column>
          <el-table-column prop="bankCardNumber" label="银行卡号" width="150px"></el-table-column>
          <el-table-column prop="openingBank" label="开户行" width="150px"></el-table-column>
          <el-table-column prop="paymentMonths" label="发薪月数" width="150px"></el-table-column>
        </el-table>
      </div>
    </div>
    <div class="butList">
      <span @click="archivingReport">归档{{this.yearMonth.substring(4)}}月份报表</span>
      <span @click="createReportForm">新建报表</span>
      <span class="cancel" @click="clickCancel">取消</span>
    </div>
  </div>
</template>

<script>
import { getBlob } from "@/filters/index";
import FileSaver from "file-saver";
import XLSX from "xlsx";
import {
  getArchivingList,
  getArchivingCont,
  newReport,
  getArchivingExport,
  getArchivingFirst,
  getArchivingArchive
} from "@/api/hrm/salarysApi";
export default {
  name: "historicalArchiving",
  data() {
    return {
      num: 0,
      yearVal: "2018",
      contentData: [],
      yearMonth: ""
    };
  },
  methods: {
    async init() {
      let yearMonth = this.yearMonth;
      let opType = 1;
      const { data: listRes } = await getArchivingCont({ yearMonth, opType });
      this.contentData = listRes.data;
    },
    clickCancel() {
      this.$router.back(-1);
    },
    async archivingReport() {
      let yearMonth = this.yearMonth;
      const { data: firstRes } = await getArchivingFirst({ yearMonth });
      let first = firstRes.data;
      this.archivingReportForm(first);
    },
    // 归档报表
    archivingReportForm(first) {
      let msg = "";
      if (first == false) {
        msg =
          "您确定要归档" +
          this.yearMonth.substring(0, 4) +
          "年" +
          this.yearMonth.substring(4) +
          "月报表？报表归档将覆盖上一次归档记录，无法恢复。";
      } else {
        msg = "您确认归档当月报表吗？";
      }
      this.$confirm(msg, "归档" + this.yearMonth + "报表", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.archive();
        })
        .catch(() => {});
    },
    async archive(){
      let yearMonth = this.yearMonth;
      const { data: archiveRes } = await getArchivingArchive({ yearMonth });
      if(archiveRes.success == true){
        this.$message.success("归档成功");
      }
    },
    // 新建报表
    createReportForm() {
      let yearMonth = this.getNextMonth();
      let year = yearMonth.substring(0, 4);
      let month = yearMonth.substring(4);
      this.$confirm(
        "您将创建 《 " + year + "年" + month + "月 》 报表",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        }
      ).then(() => {
        this.yearMonth = yearMonth;
        this.createNewReport(yearMonth);
        this.$router.push({
          path: "./monthStatement",
          query: { yearMonth: this.yearMonth }
        });
        this.init();
      });
    },
    async createNewReport(yearMonth) {
      const { data: archiveRes } = await newReport({ yearMonth });
    },
    getNextMonth() {
      let year = this.yearMonth.substring(0, 4);
      let month = this.yearMonth.slice(4);
      let year2 = year;
      let month2 = parseInt(month) + 1;
      if (month2 == 13) {
        year2 = parseInt(year2) + 1;
        month2 = 1;
      }
      if (month2 < 10) {
        month2 = "0" + month2;
      }
      let t2 = year2 + month2;
      return t2;
    },
    handleExport() {
      let xlsxParam = { raw: true };
      let getName = "社保报表";
      let items = XLSX.utils.table_to_book(
          document.querySelector("#item"),
          xlsxParam
        );
      getBlob(getName, items, XLSX.write, FileSaver.saveAs);
      this.$message.success("导出报表成功！");
    }
  },
  mounted() {
    this.yearMonth = this.$route.query.yearMonth;
    this.init();
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "./../../styles/variables.scss";

.monthStatementBox {
  padding: 20px;
  .monthStatementTop {
    position: relative;
    background: #fff;
    padding: 10px 15px 0 15px;
    border-bottom: solid 1px #f4f4f4;
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
  .monthStatementTable {
    background: #fff;
    .itemTopLab {
      border-top: solid 1px #f0f0f0;
      border-bottom: solid 3px #ccc;
      padding: 15px;
      div {
        display: inline-block;
        padding: 0 50px;
        border-right: solid 1px #ccc;
      }
      div:last-child,
      div:first-child {
        border: none;
      }
      .lab {
        position: relative;
        top: -15px;
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
        padding: 15px;
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
  .butList {
    border-top: solid 1px #f4f4f4;
    text-align: center;
    background: #fff;
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
}
</style>
