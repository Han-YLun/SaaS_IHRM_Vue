<template>
  <div class="listContainer">
    <div class="cont-top-box">
      <div class="top-lable">
        <div class="careful-lab">
          <i class="el-icon-info"></i>
          本月{{tips.dateRange}}：入职 {{tips.worksCount}} 离职 {{tips.leavesCount}} 调薪 {{tips.adjustCount}} 未定薪 {{tips.unGradingCount}}
        </div>
        <div class="lable-tit">
          <router-link :to="{ 'path':'/salarys/setting'}">设置</router-link>
          <router-link :to="{'path':'/salarys/historicalArchiving'}">历史归档</router-link>
          <router-link :to="{'path':'/salarys/monthStatement',query:{'yearMonth':yearMonth}}">{{yearMonth.slice(0,4)+"年"+yearMonth.slice(4,6)}}月报表</router-link>
        </div>
      </div>
    </div>
    <div class="approvalsContent">
      <div class="topTitle">
        <div class="firstBox">
          <div class="type">
            <span>聘用形式：</span>
            <el-checkbox-group v-model="approvalsTypeChecks">
              <el-checkbox
                v-for="item in approvalsType"
                :label="item.type"
                :key="item.type"
                @change="changeSelectParams"
              >{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="state">
            <span>员工状态：</span>
            <el-checkbox-group v-model="approvalsStateChecks">
              <el-checkbox
                v-for="item in approvalsState"
                :label="item.state"
                :key="item.state"
                @change="changeSelectParams"
              >{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="secondBox">
          <div class="type">
            <span>部门：</span>
            <el-checkbox-group v-model="departmentChecks">
              <el-checkbox
                v-for="item in departmentList"
                :label="item.id"
                :key="item.id"
                @change="changeSelectParams"
              >{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
      <div class="content">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="index" label="序号" width="60"></el-table-column>
          <el-table-column prop="username" label="姓名" width="100"></el-table-column>
          <el-table-column prop="mobile" label="手机" width="130"></el-table-column>
          <el-table-column prop="workNumber" label="工号" width="100"></el-table-column>
          <el-table-column :formatter="judgeEmploymentType" label="聘用形式" width="130"></el-table-column>
          <el-table-column prop="departmentName" label="部门" width="130"></el-table-column>
          <el-table-column :formatter="judgeTimeOfEntry" label="入职时间" width="130"></el-table-column>
          <el-table-column :formatter="judgeCurrentBasicSalary" prop="currentBasicSalary" label="工资基数"></el-table-column>
          <el-table-column :formatter="judgeCurrentPostWage" label="津贴方案"></el-table-column>
          <el-table-column label="操作" width="260">
            <template slot-scope="scope" style>
              <el-button
                size="mini"
                type="primary"
                v-if="scope.row.currentBasicSalary != null"
                @click="changeSalary('changeSalary',scope.row.id)"
              >调薪</el-button>
              <el-button
                size="mini"
                type="danger"
                v-if="scope.row.currentBasicSalary == null"
                @click="fixedSalary('fixedSalary',scope.row.id)"
              >定薪</el-button>
              <span class="seeDet">
                <router-link :to="{'path': './details/'+yearMonth+'/'+scope.row.id}">查看</router-link>
              </span>
            </template>
          </el-table-column>
        </el-table>
        <div class="page-list">
          <el-pagination
            @size-change="onPageSizeChange"
            @current-change="onPageChange"
            background
            :total="Number(total)"
            :page-sizes="[10,20,30, 50]"
            layout="sizes, prev, pager, next, jumper"
          ></el-pagination>
        </div>
      </div>
    </div>
    <!--查看弹框-->
    <el-dialog :title="topLabel" :visible.sync="centerDialogVisible" width="50%" left>
      <ChangeSalary 
        v-show="seeState == 'changeSalary'" 
        v-on:onDialogCancel="onDialogCancel" 
        :userSalary="selectedSalaryInfo"/>
      <FixedSalary
        v-show="seeState == 'fixedSalary'"
        v-on:onDialogCancel="onDialogCancel"
        :userId="selectedUserId"
      />
    </el-dialog>
    <!--查看弹框-->
  </div>
</template>

<script>
import { getSalarysList, getTips,getSalary } from "@/api/hrm/salarysApi";
import { list as getDepartmentList } from "@/api/base/dept";
import ChangeSalary from "./../components/ChangeSalary";
import FixedSalary from "./../components/FixedSalary";
export default {
  name: "salarys-table-index",
  components: { ChangeSalary, FixedSalary },
  data() {
    return {
      tips: {},
      yearMonth: "",
      departmentList: [],
      departmentChecks: [],
      approvalsType : [{ type: 1, name: "正式" }, { type: 2, name: "非正式" }],
      approvalsTypeChecks: [],
      approvalsState: [{ state: 1, name: "在职" }, { state: 2, name: "离职" }],
      approvalsStateChecks: [],
      seeState: "becomeARegularWorker",
      centerDialogVisible: false,
      topLabel: "转正",
      tabLab: "launch",
      department: [],
      subsidyScheme: [],
      tableData: [],
      selectedUserId: "",
      selectedSalaryInfo:{},
      selectParams: {},
      total: 100
    };
  },
  methods: {
    async init() {
      // const { data: departmentRes } = await getDepartmentList({});
      // this.departmentList = departmentRes.data.depts;
      // let yearMonth = this.yearMonth;
      // const { data: tipsRes } = await getTips({ yearMonth });
      // this.tips = tipsRes.data;

      let {
        departmentChecks,
        approvalsTypeChecks,
        approvalsStateChecks,
        page,
        pageSize
      } = this.selectParams;
      const { data: listRes } = await getSalarysList({
        departmentChecks: departmentChecks,
        approvalsTypeChecks: approvalsTypeChecks,
        approvalsStateChecks: approvalsStateChecks,
        page: page,
        pageSize: pageSize
      });
      this.tableData = listRes.data.rows;
      this.total = listRes.data.total;
    },
    async changeSalary(obj, userId) {
      this.selectedUserId = userId;
      const { data: salaryRes } = await getSalary({userId})
      if(salaryRes.success == true){
        this.selectedSalaryInfo=salaryRes.data;
        console.log(this.selectedSalaryInfo.userId);
        this.topLabel = "调薪"
        this.seeState = obj
        this.centerDialogVisible = true
      }
    },
    fixedSalary(obj, userId) {
      this.topLabel = "定薪";
      this.seeState = obj;
      this.centerDialogVisible = true;
      this.selectedUserId = userId;
    },
    onDialogCancel() {
      this.centerDialogVisible = false;
      this.init()
    },
    onPageSizeChange(pageSize) {
      this.selectParams.pageSize=pageSize
      this.init()
    },
    onPageChange(page) {
      this.selectParams.page=page
      this.init()
    },
    changeSelectParams(){
      this.selectParams.departmentChecks=this.departmentChecks
      this.selectParams.approvalsTypeChecks=this.approvalsTypeChecks
      this.selectParams.approvalsStateChecks=this.approvalsStateChecks
      this.page=1
      this.init()
    },
    judgeEmploymentType(data){
      return data.formOfEmployment == 1 ? '正式员工' : '临时工';
    },
    judgeCurrentBasicSalary(data){
      return data.currentBasicSalary != null ? data.currentBasicSalary : 0;
    },
    judgeCurrentPostWage(data){
      return '通用方案';
    },
    judgeTimeOfEntry(data){
      return data.timeOfEntry.slice(0,10);
    }
  },
  mounted() {},
  created() {
    this.yearMonth = this.$route.query.yearMonth;
    this.selectParams.page=1
    this.selectParams.pageSize=10
    this.init();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "./../../styles/variables";
.listContainer {
  padding: 20px;
  .cont-top-box {
    padding: 20px;
    margin-bottom: 15px;
    background: #fff;
    border-radius: 3px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .top-lable {
    position: relative;
    line-height: 2;
    a {
      display: inline-block;
      padding: 0 10px;
    }
    .careful-lab {
      i {
        margin-right: 5px;
        color: #409eff;
      }
      display: inline-block;
      padding: 0px 10px;
      border-radius: 3px;
      border: 1px solid rgba(145, 213, 255, 1);
      background: rgba(230, 247, 255, 1);
    }
    .lable-tit {
      position: absolute;
      right: 0;
      top: 0px;
    }
  }
  .approvalsTop {
    color: #666;
    background: #fff;
    border-bottom: solid 1px #ccc;
    line-height: 40px;
    span {
      display: inline-block;
      padding: 0 25px;
      font-size: 18px;
      cursor: pointer;
    }
    .act {
      color: $blue;
      border-bottom: solid 2px $blue;
    }
  }
  .approvalsContent {
    .topTitle {
      background: #fff;
      padding: 15px;
      div {
        position: relative;
        margin: 15px 0;
        span {
          position: absolute;
          top: 2px;
          float: left;
          font-weight: bold;
        }
      }
      .firstBox,
      .secondBox {
        width: 600px;
        display: flex;
        .type,
        .state {
          flex: 1;
          .el-checkbox-group {
            position: absolute;
            top: -15px;
            left: 75px;
            .el-checkbox {
              font-weight: 400;
            }
          }
        }
      }
      .secondBox {
        width: 100%;
      }
    }
    .content {
      padding: 20px;
      background: #fff;
      border-radius: 3px;
      margin-top: 15px;
      margin-bottom: 15px;
      border: 1px solid #ebeef5;
    }
    .el-dropdown-link {
      color: #666;
      border: solid 1px #ccc;
      display: inline-block;
      width: 60px;
      text-align: center;
      height: 28px;
      padding: 2px 10px;
      font-size: 12px;
      border-radius: 3px;
    }
    .seeDet {
      display: inline-block;
      width: 56px;
      line-height: 26px;
      text-align: center;
      border: solid 1px #ccc;
      border-radius: 3px;
      margin-left: 10px;
      font-size: 12px;
    }
  }
  .page-list {
    text-align: right;
    margin-top: 10px;
  }
}
</style>
