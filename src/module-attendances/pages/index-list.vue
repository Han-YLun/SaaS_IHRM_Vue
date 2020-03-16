<template>
  <div class="dashboard-container">
    <div class="app-container">
      <AttendancesPageTool
        :monthOfReport="monthOfReport"
        @dataList="dataList"
        :formData="formData"
        :month="month"
        :yearMonth="yearMonth"
      />
      <div class="cont-bod-box">
        <div style=" width: 100%;position: relative;overflow-x: auto;" v-if="baseData.length>0">
          <div style=" width: 3000px;">
            <table border="0" align="center" cellpadding="0" cellspacing="0" class="tableInfo">
              <tr>
                <th width="50">序号</th>
                <th width="100">姓名</th>
                <th width="100">工号</th>
                <th width="200">部门</th>
                <th width="100">手机</th>
                <th
                  v-for="(it, ind) in monthOfReport"
                  :key="ind"
                  width="110"
                >{{attendInfo.month}}/{{ind+1}}</th>
              </tr>
              <tr v-for="(item, index) in baseData" :key="item.id">
                <td width="50">{{index}}</td>
                <td width="100">{{item.username}}</td>
                <td width="100">{{item.workNumber}}</td>
                <td width="200">{{item.departmentName}}</td>
                <td width="100">{{item.mobile}}</td>
                <td
                  v-for="(it,ind) in item.attendanceRecord"
                  @click="handleOver(item,ind,it)"
                  :key="ind"
                  width="110"
                >
                  <span v-if="it.adtStatu===1">√</span>
                  <span v-if="it.adtStatu===2">旷工</span>
                  <span v-if="it.adtStatu===3">迟到</span>
                  <span v-if="it.adtStatu===4">早退</span>
                  <span v-if="it.adtStatu===5">外出</span>
                  <span v-if="it.adtStatu===6">出差</span>
                  <span v-if="it.adtStatu===7">年假</span>
                  <span v-if="it.adtStatu===8">事假</span>
                  <span v-if="it.adtStatu===9">病假</span>
                  <span v-if="it.adtStatu===10">婚假</span>
                  <span v-if="it.adtStatu===11">丧假</span>
                  <span v-if="it.adtStatu===12">产假</span>
                  <span v-if="it.adtStatu===13">奖励产假</span>
                  <span v-if="it.adtStatu===14">陪产假</span>
                  <span v-if="it.adtStatu===15">探亲假</span>
                  <span v-if="it.adtStatu===16">工伤假</span>
                  <span v-if="it.adtStatu===17">调休</span>
                  <span v-if="it.adtStatu===18">产检假</span>
                  <span v-if="it.adtStatu===19">流产假2</span>
                  <span v-if="it.adtStatu===20">长期病假</span>
                  <span v-if="it.adtStatu===21">测试架</span>
                  <span v-if="it.adtStatu===22">补签</span>
                </td>
              </tr>
            </table>
          </div>
          <div class="page-list">
            <div class="pagination">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-size="formData.pagesize"
                layout="total, prev, pager, next"
                :total="Number(attendInfo.counts)"
              ></el-pagination>
            </div>
            <!-- end -->
          </div>
        </div>
        <div v-else class="textInfo">暂无数据</div>
        <el-dialog :visible.sync="centerDialogVisible" width="30%" center>
          <span
            slot="title"
            style="color:#fff;"
          >{{attendInfo.name}} {{attendInfo.month}}/{{attendInfo.getDate}}（实际工作日考勤方案）</span>
          <div class="attenInfo">
            <p class="colRed">注：统计考勤时，异常状态优先正常状态</p>
            <p class="check">
              <el-radio-group v-model="modifyData.adtStatu">
                <el-radio
                  v-for="item in stateData.vacationtype"
                  :label="item.id"
                  :key="item.id"
                  :value="item.name"
                >{{item.name}}</el-radio>
              </el-radio-group>
            </p>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleSub">确 定</el-button>
            <el-button @click="centerDialogVisible = false">取 消</el-button>
          </span>
        </el-dialog>
        <!-- <el-table  border :data="baseData" style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}" >
          <el-table-column type="index" width="50" fixed style="text-align: center;" label="序号"> </el-table-column>
          <el-table-column prop="name" label="姓名" fixed width="80" sortable> </el-table-column>
          <el-table-column prop="workNumber" label="工号" width="80"> </el-table-column>
          <el-table-column prop="department" label="部门" width="150"> </el-table-column>
          <el-table-column prop="mobilePhone" label="手机" width="110"> </el-table-column>
          <el-table-column prop="attendanceRecord">
            <template slot-scope="attendanceRecord">

              <el-table-column prop="attendanceRecord[3]">
                  <span slot="label">3</span>
              </el-table-column>
            </template>
          </el-table-column>
        </el-table>-->
      </div>
    </div>
  </div>
</template>

<script>
import constantApi from "@/api/constant/employees";
import attendanceApi from "@/api/constant/attendance";
import { getNowFormatDate } from "@/filters/index";
import PageTool from "@/components/page/page-tool";
import { attendancesList, modify } from "@/api/hrm/attendances";
import { list } from "@/api/base/dept";
import AttendancesPageTool from "../components/Attendance-page-tool";
import commonApi from "@/utils/common";
let _this = null;
export default {
  name: "attendances",
  components: { AttendancesPageTool, PageTool },
  data() {
    return {
      baseData: [],
      selectData: [],
      stateData: [],
      total: 100,
      attendanceRecord: "",
      monthOfReport: "",
      centerDialogVisible: false,
      month: "",
      yearMonth: "",
      attendInfo: {
        month: "",
        getDate: "",
        getInfo: "",
        name: "",
        counts: "",
        tobeTaskCount: ""
      },
      formData: {
        page: 1,
        pagesize: 10
        // keyword: this.keyword,
        // deptID: this.deptID, // 性别
        // stateID: this.stateID
      },
      modifyData: {
        userId: "",
        day: "",
        adtStatu: "",
        departmentId:""
      },
      departmentData: [],
    };
  },
  methods: {
    // 业务方法
    setupUI() {
      this.selectData = constantApi;
      this.stateData = attendanceApi;
      this.dataList(this.formData);
      this.getdepartment();
    },
    // 部门
    async getdepartment() {
      await list().then(data => {
        this.departmentData = data.data.data.depts;
      });
    },
    // 初始化数据
    async dataList(dataParams) {
      // let dataParams={"page":1,"pagesize":10}
      await attendancesList(dataParams).then(data => {
        var data = data.data.data;
        if (data === null) {
          this.baseData = [];
        } else {
          this.baseData = data.data.rows;
          this.attendInfo.counts = data.data.total;
          var date = new Date();
          var year = date.getFullYear();
          var month = data.monthOfReport;
          this.attendInfo.month = data.monthOfReport;
          this.attendInfo.tobeTaskCount = data.tobeTaskCount;
          var d = new Date(year, month, 0);
          this.monthOfReport = d.getDate();
        }
      });
    },
    // 列表部门筛选
    handleDeptChange(val) {
      console.log(val)
      this.formData.deptID = val;
      this.dataList(this.formData);
    },
    handleStateChange(val) {
      this.formData.adtStatu = val;
      this.dataList(this.formData);
    },
    // 界面交互
    handleSub() {
      modify(this.modifyData).then(res => {
        this.centerDialogVisible = false;
        this.dataList(this.formData);
      });
    },
    // 每页显示信息条数
    handleSizeChange(pageSize) {
      this.formData.pagesize = pageSize;
      if (this.formData.page === 1) {
        _this.dataList(this.formData);
      }
    },
    // 进入某一页
    handleCurrentChange(val) {
      this.formData.page = val;
      _this.dataList();
    },
    handleOver(item, id, it) {
      this.modifyData.userId = item.id;
      this.modifyData.day = it.day;
      this.modifyData.departmentId = item.departmentId;
      switch (it.adtStatu) {
        case 1:
          this.modifyData.adtStatu = "1";
          break;
        case 2:
          this.modifyData.adtStatu = "2";
          break;
        case 3:
          this.modifyData.adtStatu = "3";
          break;
        case 4:
          this.modifyData.adtStatu = "4";
          break;
        case 5:
          this.modifyData.adtStatu = "5";
          break;
        case 6:
          this.modifyData.adtStatu = "6";
          break;
        case 7:
          this.modifyData.adtStatu = "7";
          break;
        case 8:
          this.modifyData.adtStatu = "8";
          break;
        case 9:
          this.modifyData.adtStatu = "9";
          break;
        case 10:
          this.modifyData.adtStatu = "10";
          break;
        case 11:
          this.modifyData.adtStatu = "11";
          break;
        case 12:
          this.modifyData.adtStatu = "12";
          break;
        case 13:
          this.modifyData.adtStatu = "13";
          break;
        case 14:
          this.modifyData.adtStatu = "14";
          break;
        case 15:
          this.modifyData.adtStatu = "15";
          break;
        case 16:
          this.modifyData.adtStatu = "16";
          break;
        case 17:
          this.modifyData.adtStatu = "17";
          break;
        case 18:
          this.modifyData.adtStatu = "18";
          break;
        case 19:
          this.modifyData.adtStatu = "19";
          break;
        case 20:
          this.modifyData.adtStatu = "20";
          break;
        case 21:
          this.modifyData.adtStatu = "21";
          break;
        default:
          this.modifyData.adtStatu = "22";
      }

      if (it.adtStatu !== "") {
        this.attendInfo.getDate = parseInt(id + 1);
        this.attendInfo.getInfo = it.adtStatu;
        this.attendInfo.name = item.name;
        this.centerDialogVisible = true;
      }
      // console.log(this.modifyData)
    }
  },
  // 挂载结束
  mounted() {
    this.yearMonth = commonApi.getMonth().preDates;
    this.month = commonApi.getMonth().preMonth;
  },
  // 创建完毕状态
  created: function() {
    _this = this;
    this.setupUI();
  },
  // 组件更新
  updated: function() {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.cont-bod-box {
  padding: 20px;
  background: #fff;
  border-radius: 3px;
  margin-top: 15px;
  margin-bottom: 15px;
  border: 1px solid #ebeef5;
  table {
    line-height: 36px;
    border: solid 1px #ebeef5;
    border-right: 0 none;
    border-bottom: 0 none;
    tr {
      th {
        height: 50px;
        text-align: center;
        border-right: solid 1px #ebeef5;
        border-bottom: solid 1px #ebeef5;
        border-bottom: 2px solid #e8e8e8;
        background: #fafafa;
      }
      td {
        height: 36px;
        text-align: center;
        border-right: solid 1px #ebeef5;
        border-bottom: solid 1px #ebeef5;
      }
    }
  }
}
.page-list {
  text-align: right;
  margin-top: 10px;
}
.attenInfo {
  p {
    &.check {
      padding: 20px 0 0;
    }
  }
}
</style>
