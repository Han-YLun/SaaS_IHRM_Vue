<template>
  <div class="monthStatementBox">
    <div class="monthStatementTop">
      <div class="title">
        <span>社保报表</span>
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
              @click="handleExport"
            >导出</a>
          </div>
        </div>
        <el-table
          :data="contentData"
          border
          style="width: 100%;text-align: center"
          id="item"
          empty-text="暂无数据"
          fit
          highlight-current-row
          :key="tableKey"
        >
          <el-table-column type="index" label="序号" center width="50"></el-table-column>
          <el-table-column prop="username" label="姓名" width="150px"></el-table-column>
          <el-table-column prop="timeOfEntry" label="入职时间" :formatter="dateFormat" width="150px"></el-table-column>
          <el-table-column prop="mobile" label="手机号" width="150px"></el-table-column>
          <el-table-column prop="idNumber" label="身份证号码" width="150px"></el-table-column>
          <el-table-column prop="theHighestDegreeOfEducation" label="学历" width="150px"></el-table-column>
          <el-table-column prop="bankCardNumber" label="开户行" width="150px"></el-table-column>
          <el-table-column prop="firstLevelDepartment" label="一级部门" width="150px"></el-table-column>
          <el-table-column prop="twoLevelDepartment" label="二级部门" width="150px"></el-table-column>
          <el-table-column prop="workingCity" label="工作城市" width="150px"></el-table-column>
          <el-table-column prop="socialSecurityComputerNumber" label="社保电脑号" width="150px"></el-table-column>
          <el-table-column prop="providentFundAccount" label="公积金账号" width="150px"></el-table-column>
          <el-table-column prop="leaveDate" label="离职时间" width="150px"></el-table-column>
          <el-table-column prop="householdRegistrationType" label="户籍类型" width="150px"></el-table-column>
          <el-table-column prop="participatingInTheCity" label="参保城市" width="150px"></el-table-column>
          <el-table-column prop="socialSecurityMonth" label="社保月份" width="150px"></el-table-column>
          <el-table-column prop="socialSecurityBase" label="社保基数" width="150px"></el-table-column>
          <el-table-column prop="socialSecurity" label="社保合计" width="150px"></el-table-column>
          <el-table-column prop="socialSecurityEnterprise" label="社保企业" width="150px"></el-table-column>
          <el-table-column prop="socialSecurityIndividual" label="社保个人" width="150px"></el-table-column>
          <el-table-column prop="providentFundCity" label="公积金城市" width="150px"></el-table-column>
          <el-table-column prop="providentFundMonth" label="公积金月份" width="150px"></el-table-column>
          <el-table-column prop="providentFundBase" label="公积金基数" width="150px"></el-table-column>
          <el-table-column prop="accumulationFundEnterpriseBase" label="公积金企业基数" width="150px"></el-table-column>
          <el-table-column
            prop="proportionOfProvidentFundEnterprises"
            label="公积金企业比例"
            width="150px"
          ></el-table-column>
          <el-table-column prop="individualBaseOfProvidentFund" label="公积金个人基数" width="150px"></el-table-column>
          <el-table-column prop="personalRatioOfProvidentFund" label="公积金个人比例" width="150px"></el-table-column>
          <el-table-column prop="totalProvidentFund" label="公积金合计" width="150px"></el-table-column>
          <el-table-column prop="providentFundEnterprises" label="公积金企业" width="150px"></el-table-column>
          <el-table-column prop="providentFundIndividual" label="公积金个人" width="150px"></el-table-column>
          <el-table-column prop="pensionEnterpriseBase" label="养老企业基数" width="150px"></el-table-column>
          <el-table-column prop="proportionOfPensionEnterprises" label="养老企业比例" width="150px"></el-table-column>
          <el-table-column prop="pensionEnterprise" label="养老企业" width="150px"></el-table-column>
          <el-table-column prop="personalPensionBase" label="养老个人基数" width="150px"></el-table-column>
          <el-table-column prop="personalPensionRatio" label="养老个人比例" width="150px"></el-table-column>
          <el-table-column prop="oldAgeIndividual" label="养老个人" width="150px"></el-table-column>
          <el-table-column prop="unemploymentEnterpriseBase" label="失业企业基数" width="150px"></el-table-column>
          <el-table-column prop="proportionOfUnemployedEnterprises" label="失业企业比例" width="150px"></el-table-column>
          <el-table-column prop="unemployedEnterprise" label="失业企业" width="150px"></el-table-column>
          <el-table-column prop="theNumberOfUnemployedIndividuals" label="失业个人基数" width="150px"></el-table-column>
          <el-table-column prop="percentageOfUnemployedIndividuals" label="失业个人比例" width="150px"></el-table-column>
          <el-table-column prop="unemployedIndividual" label="失业个人" width="150px"></el-table-column>
          <el-table-column prop="medicalEnterpriseBase" label="医疗企业基数" width="150px"></el-table-column>
          <el-table-column prop="proportionOfMedicalEnterprises" label="医疗企业比例" width="150px"></el-table-column>
          <el-table-column prop="medicalEnterprise" label="医疗企业" width="150px"></el-table-column>
          <el-table-column prop="medicalPersonalBase" label="医疗个人基数" width="150px"></el-table-column>
          <el-table-column prop="medicalPersonalRatio" label="医疗个人比例" width="150px"></el-table-column>
          <el-table-column prop="medicalIndividual" label="医疗个人" width="150px"></el-table-column>
          <el-table-column prop="baseOfIndustrialInjuryEnterprises" label="工伤企业基数" width="150px"></el-table-column>
          <el-table-column
            prop="proportionOfIndustrialInjuryEnterprises"
            label="工伤企业比例"
            width="150px"
          ></el-table-column>
          <el-table-column prop="industrialInjuryEnterprise" label="工伤企业" width="150px"></el-table-column>
          <el-table-column prop="fertilityEnterpriseBase" label="生育企业基数" width="150px"></el-table-column>
          <el-table-column prop="proportionOfFertilityEnterprises" label="生育企业比例" width="150px"></el-table-column>
          <el-table-column prop="childbearingEnterprise" label="生育企业" width="150px"></el-table-column>
          <el-table-column prop="baseOfSeriousIllness" label="大病企业基数" width="150px"></el-table-column>
          <el-table-column prop="proportionOfSeriouslyIllEnterprises" label="大病企业比例" width="150px"></el-table-column>
          <el-table-column prop="bigDiseaseEnterprise" label="大病企业" width="150px"></el-table-column>
          <el-table-column prop="personalBaseOfSeriousIllness" label="大病个人基数" width="150px"></el-table-column>
          <el-table-column prop="personalProportionOfSeriousIllness" label="大病个人比例" width="150px"></el-table-column>
          <el-table-column prop="aPersonOfGreatDisease" label="大病个人" width="150px"></el-table-column>
          <el-table-column prop="providentFundNotes" label="公积金备注" width="150px"></el-table-column>
          <el-table-column prop="socialSecurityNotes" label="社保备注" width="150px"></el-table-column>
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
// import PageTool from "../components/ScoialPageTool.vue";
import FileSaver from "file-saver";
import XLSX from "xlsx";
import { getBlob } from "@/filters/index";
import {
  getArchivingList,
  getArchivingCont,
  getArchivingExport,
  getArchivingFirst,
  getArchivingArchive,
  newReport
} from "@/api/hrm/socialSecuritys";
export default {
  name: "historicalArchiving",
  // components: {
  //   PageTool
  // },
  data() {
    return {
      num: 0,
      tableKey: 0,
      yearMonth: "",
      contentData: [
        {
          username: "xx"
        }
      ]
    };
  },
  methods: {
    async init() {
      let yearMonth = this.yearMonth;
      let opType = 1;
      const { data: listRes } = await getArchivingCont({ yearMonth, opType });
      this.contentData = listRes.data;
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
    },
    async archivingReport() {
      // let yearMonth = this.yearMonth;
      // const { data: firstRes } = await getArchivingFirst({ yearMonth });
      // let first = firstRes.data;
      this.archivingReportForm();
    },
    async archive() {
      let yearMonth = this.yearMonth;
      const { data: archiveRes } = await getArchivingArchive({ yearMonth });
    },
    async createNewReport(yearMonth) {
      const { data: archiveRes } = await newReport({ yearMonth });
    },
    // 归档报表
    archivingReportForm(first) {
      let msg = "您确认归档当月报表吗？(报表归档将覆盖上一次归档记录，无法恢复)";
      // if (first == false) {
      //   msg =
      //     "您确定要归档" +
      //     this.yearMonth.substring(0, 4) +
      //     "年" +
      //     this.yearMonth.substring(4) +
      //     "月报表？报表归档将覆盖上一次归档记录，无法恢复。";
      // } else {
      //   msg = "您确认归档当月报表吗？";
      // }
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
    clickCancel() {
      this.$router.back(-1);
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
    }
  },
  mounted() {},
  created() {
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
            // border: solid 1px $green;
            color: #ffff;
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
