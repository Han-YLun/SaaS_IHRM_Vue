<template>
  <div class="historicalArcBox">
    <div class="historicalArcTop">
      <div class="title">
        <span>全公司</span>
        <div class="yearChange">
          <el-date-picker
            v-model="yearVal"
            type="year"
            size="mini"
            value-format="yyyy"
            width="130px"
            placeholder="选择年"
          ></el-date-picker>
        </div>
      </div>
    </div>
    <div class="historicalTable">
      <div class="itemes" v-for="( itemes, index) in tableData" :key="index">
        <div class="itemTopLab" :class="{act: itemes.act}">
          <div @click="openTable(itemes,index)" class="lab">></div>
          <div>
            <p class="title">
              {{itemes.month}}薪资报表
              <span>{{itemes.creationTime}}</span>
            </p>
            <p @click="openTable(itemes,index)" class="labTit">社保报表</p>
          </div>
          <div>
            <p class="itemTit">
              <span>人工成本</span>
            </p>
            <p class="itemNum">{{itemes.artificialCost}}</p>
          </div>
          <div>
            <p class="itemTit">
              <span>税前工资</span>
            </p>
            <p class="itemNum">{{itemes.grossSalary}}</p>
          </div>
          <div>
            <p class="itemTit">
              <span>五险一金</span>
            </p>
            <p class="itemNum">{{itemes.fiveInsurances}}</p>
          </div>
        </div>
        <div class="itemDropDown" v-show="itemes.act">
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
          <el-table
            :data="itemes.contentData"
            height="300"
            border
            style="width: 100%;text-align: center"
            id="item"
          >
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
    </div>
  </div>
</template>

<script>
import {
  getArchivingList,
  getArchivingCont,
  getArchivingExport
} from "@/api/hrm/salarysApi";
import { minHeight, getBlob } from "@/filters/index";
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  name: "salarys-historicalArchiving",
  data() {
    return {
      num: 0,
      yearVal: "2019",
      tableData: []
    };
  },
  watch: {
    yearVal: function() {
      this.getdata();
    }
  },
  methods: {
    init() {
      this.getdata();
    },
    async getdata() {
      let year = this.yearVal;
      const { data: listRes } = await getArchivingList({ year });
      this.tableData = listRes.data;
    },
    async getSubData(index, yearMonth) {
      let opType = 2;
      const { data: listRes } = await getArchivingCont({ yearMonth, opType });
      this.$set(this.tableData[index], "contentData", listRes.data);
    },
    handleExport() {
      // console.log("items",items)
      // let yearMonth = items.month;
      // let opType=2
      // getArchivingExport({ yearMonth,opType })
      //   .then(response => {
      //     getBlob(response);
      //     this.$message.success("导出报表成功！");
      //   })
      //   .catch(e => {
      //     console.log("发生错误了",e)
      //     this.$message.error("导出报表失败！");
      //   });
      let xlsxParam = { raw: true };
      let getName = "社保报表";
      let items = XLSX.utils.table_to_book(
        document.querySelector("#item"),
        xlsxParam
      );
      getBlob(getName, items, XLSX.write, FileSaver.saveAs);
      this.$message.success("导出报表成功！");
    },
    openTable(obj, index) {
      if (!obj.act) {
        this.getSubData(index, obj.month);

        this.$set(this.tableData[index], "act", true);
      } else {
        this.$set(this.tableData[index], "act", false);
      }
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "./../../styles/variables.scss";

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