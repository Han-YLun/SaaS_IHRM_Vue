<template>
  <div class="historicalArcBox">
    <div class="historicalArcTop">
      <div class="title">
        <span>员工历史归档</span>
        <div class="yearChange">
          部门：
          <el-select
            v-model="requestParameters.departmentId"
            placeholder="请选择"
            @change="handleChange"
          >
            <el-option
              v-for="item in departmentData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-date-picker
            v-model="yearVal"
            type="year"
            format="yyyy"
            value-format="yyyy"
            width="130px"
            placeholder="选择年"
            @change="handleChangeYear"
          ></el-date-picker>
        </div>
      </div>
    </div>
    <div class="historicalTable">
      <div v-show="showArchivig" class="archivig">该年份无归档报表</div>
      <div class="itemes" v-for="( itemes, index) in tableData" :key="index">
        <div class="itemTopLab" :class="{act: itemes.act}">
          <div @click="openTable(itemes,index)" class="lab">
            <i class="fa fa-chevron-right" aria-hidden="true"></i>
          </div>
          <div>
            <p class="title" ref="sheelName">{{itemes.month}}月员工报表</p>
            <p @click="openTable(itemes,index)" class="labTit">考勤统计</p>
          </div>
          <div class="fr">
            <div>
              <p class="itemTit">
                <span>总人数</span>
              </p>
              <p class="itemNum">{{itemes.totalNumber}}</p>
            </div>
            <div>
              <p class="itemTit">
                <span>全勤人数</span>
              </p>
              <p class="itemNum">{{itemes.fullAttendance}}</p>
            </div>
          </div>
        </div>
        <div class="itemDropDown" v-show="itemes.act">
          <el-alert
            title="迟到、早退和补签的统计单位为“次”；所有假期类型、外出、旷工的统计单位均为“天”。"
            type="warning"
            :closable="false"
            show-icon
          ></el-alert>
          <div class="topLab">
            <div class="rightLabBox">
              <!-- <div class="serachInput">
                  <el-input
                    placeholder="搜索"
                    v-model="baseData.keyword"
                    clearable
                    @keyup.enter.native="dataSearch(itemes,index)">
                  </el-input> 
              </div>-->
              <a
                class="el-button fr el-button--primary el-button--mini"
                title="导出"
                @click="handleExport(index)"
              >导出</a>
            </div>
          </div>
          <el-table
            :data="contentData"
            height="300"
            border
            style="width: 100%;text-align: center"
            id="item"
          >
            <el-table-column prop="name" label="姓名" width="120"></el-table-column>
            <el-table-column prop="workNumber" label="工号" width="100"></el-table-column>
            <el-table-column prop="mobile" label="手机号" width="200"></el-table-column>
            <el-table-column prop="atteSolution" label="当月考勤方案" width="200"></el-table-column>
            <el-table-column prop="department" label="一级部门" width="200"></el-table-column>
            <!-- <el-table-column prop="twoLevelDepartment" label="二级部门" width="200"></el-table-column>
            <el-table-column prop="threeLevelDepartment" label="三级部门" width="200"></el-table-column>-->
            <el-table-column prop="workCity" label="工作城市" width="200"></el-table-column>
            <el-table-column prop="leaveDays" label="事假" width="100"></el-table-column>
            <el-table-column prop="dayOffLeaveDays" label="调休" width="100"></el-table-column>
            <el-table-column prop="normalDays" label="正常" width="100"></el-table-column>
            <el-table-column prop="laterTimes" label="迟到次数" width="100"></el-table-column>
            <el-table-column prop="earlyTimes" label="早退次数" width="100"></el-table-column>
            <el-table-column prop="hoursPerDays" label="日均时长（自然日）" width="150"></el-table-column>
            <el-table-column prop="hoursPerWorkDay" label="日均时长（工作日）" width="150"></el-table-column>
            <el-table-column prop="hoursPerRestDay" label="日均时长（休息日）" width="150"></el-table-column>
            <el-table-column prop="clockRate" label="打卡率（%）" width="120"></el-table-column>
            <el-table-column prop="absenceDays" label="旷工天数" width="100"></el-table-column>
            <el-table-column prop="isFullAttendanceint" label="是否全勤" width="100"></el-table-column>
            <el-table-column prop="actualAtteUnofficialDays" label="实际出勤天数（非正式）" width="180"></el-table-column>
            <el-table-column prop="actualAtteOfficialDays" label="实际出勤天数（正式）" width="180"></el-table-column>
            <el-table-column prop="workingDays" label="应出勤工作日" width="120"></el-table-column>
            <el-table-column prop="salaryStandards" label="计薪标准" width="100"></el-table-column>
            <el-table-column prop="salaryAdjustmentDays" label="计薪天数调整" width="120"></el-table-column>
            <el-table-column prop="workHour" label="工作时长" width="100"></el-table-column>
            <el-table-column prop="salaryUnofficialDays" label="计薪天数（非正式）" width="150"></el-table-column>
            <el-table-column prop="salaryOfficialDays" label="计薪天数（正式）" width="150"></el-table-column>
          </el-table>
          <!-- 分页 -->
          <!-- <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-size="requestParameters.pagesize"
              layout="total, prev, pager, next"
              :total="Number(counts)">
            </el-pagination>
          </div>-->
          <!-- end -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { minHeight, getBlob } from "@/filters/index";
import { list } from "@/api/base/dept";
import commonApi from "@/utils/common";
import {
  getArchivingList,
  getArchivingCont,
  importArchive
} from "@/api/hrm/attendances";
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  name: "historicalArchiving",
  components: {
    // PageTool
  },
  data() {
    return {
      num: 0,
      yearVal: commonApi.getMonth().preDates,
      tableData: [],
      showArchivig: false,
      counts: "",
      requestParameters: {
        departmentId: "",
        year: commonApi.getMonth().preYear
      },
      baseData: {
        atteArchiveMonthlyId: ""
      },
      loading: false,
      showHeight: 40,
      boxHeight: "",
      departmentData: [],
      contentData:[]
    };
  },
  computed: {
    // 模糊搜索
    tables() {
      const search = this.baseData.keyword;
      for (var i = 0; i < this.tableData.length; i++) {
        if (search) {
          this.tableData[i].contentData.filter(data => {
            return Object.keys(data).some(key => {
              return (
                String(data[key])
                  .toLowerCase()
                  .indexOf(search) > -1
              );
            });
          });
        } else {
          return this.tableData[i].contentData;
        }
      }
    }
  },
  methods: {
    init(params) {
      getArchivingList(params)
        .then(res => {
          this.tableData = res.data.data;
          if (this.tableData.length === 0) {
            this.showArchivig = true;
          } else {
            this.showArchivig = false;
          }
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    // 部门
    async getdepartment() {
      await list().then(data => {
        this.departmentData = data.data.data.depts;
        this.requestParameters.departmentId = this.departmentData[0].id;
        this.init(this.requestParameters);
      });
    },
    // 获取列表
    openTable(obj, index) {
      this.baseData.atteArchiveMonthlyId = obj.id;
      if (!obj.act) {
        getArchivingCont(this.baseData)
          .then(res => {
            // this.$set(this.tableData[index], "contentData", res.data.data);
            this.contentData=res.data.data
            console.log(this.contentData)
            
            this.loading = false;
          })
          .catch(err => {
            if (err) {
              console.log(err);
            }
            this.loading = false;
          });
        this.$set(this.tableData[index], "act", true);
      } else {
        this.$set(this.tableData[index], "act", false);
      }
    },
    // 下载文件
    handleExport(index) {
      importArchive(this.baseData)
        .then(response => {
          // let getName = this.$refs.sheelName[index].innerText
          let getName = "考勤报表";
          let items = XLSX.utils.table_to_book(document.querySelector("#item"));
          getBlob(getName, items, XLSX.write, FileSaver.saveAs);
          this.$message.success("导出报表成功！");
        })
        .catch(e => {
          this.$message.error("导出报表失败！");
        });
    },
    // 选择部门
    handleChange(val) {
      this.requestParameters.departmentId = val;
      this.init(this.requestParameters);
    },
    // 选择年份
    handleChangeYear() {
      this.requestParameters.year = this.yearVal;
      this.init(this.requestParameters);
      if (this.tableData.length === 0) {
        this.showArchivig = true;
      } else {
        this.showArchivig = false;
      }
    },
    dataSearch() {},
    // 每页显示信息条数
    // handleSizeChange(pageSize) {
    //   this.requestParameters.pagesize = pageSize
    //   if (this.requestParameters.page === 1) {
    //     _this.init(this.requestParameters)
    //   }
    // },
    // 进入某一页
    // handleCurrentChange(val) {
    //   this.requestParameters.page = val
    //   _this.init()
    // },
  },
  mounted() {},
  created() {
    this.getdepartment();
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
            .btn {
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
