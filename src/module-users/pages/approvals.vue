<template>
  <div class="usersApprovalsContainer">
    <div class="approvalsTop">
      <div class="topLab">
        <span @click="tabSwitch('launch')" :class="[tabLab == 'launch' ? 'act' : '']">全部</span>
        <span @click="tabSwitch('approvals')" :class="[tabLab == 'approvals' ? 'act' : '']">待审批</span>
        <span @click="tabSwitch('copy')" :class="[tabLab == 'copy' ? 'act' : '']">我发起的</span>
      </div>
    </div>
    <div class="approvalsContent">
      <div class="topTitle">
        <div>
          <span>审批类型：</span>
          <el-checkbox-group v-model="approvalsTypes">
            <el-checkbox
                v-for="item in approvalsType"
                :label="item"
                :key="item"
                @change="changeSelectParams"
            >{{item}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div>
          <span>审批状态：</span>
          <el-checkbox-group v-model="approvalsStates">
            <el-checkbox
                v-for="item in approvalsState"
                :label="item"
                :key="item"
                @change="changeSelectParams"
            >{{item}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="processId" width="28" hidden></el-table-column>
          <el-table-column type="selection" width="28"></el-table-column>
          <el-table-column type="index" label="序号" width="60"></el-table-column>
          <el-table-column prop="processName" label="审批类型"></el-table-column>
          <el-table-column prop="username" label="申请人"></el-table-column>
          <el-table-column prop="procCurrNodeUserName" label="当前审批人"></el-table-column>
          <el-table-column prop="procApplyTime" label="审批发起时间"></el-table-column>
          <el-table-column prop="finalOperationTime" label="最后操作时间"></el-table-column>
          <el-table-column :formatter="judgeProcessState" label="审批状态"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="item">
              <el-button v-show="tabLab == 'launch' && (item.row.stateOfApproval == '待审批' || item.row.stateOfApproval == '已驳回')" size="mini" type="primary" @click="clickCancel(item.row.id)">撤销</el-button>
              <el-button v-show="tabLab == 'approvals'  && item.row.procCurrNodeUserId == userId && item.row.processState != 2" size="mini" type="primary" @click="clickPass(item.row.processId)">通过</el-button>
              <el-button v-show="tabLab == 'approvals' && item.row.procCurrNodeUserId == userId && item.row.processState != 2" size="mini" type="primary" @click="clickBack(item.row.processId)">驳回</el-button>
              <el-button size="mini" type="primary" @click="clickDetail(item.row.id,item.row.approvalType)">查看</el-button>
              <el-button size="mini" type="danger">打印</el-button>
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
      <!-- <BecomeARegularWorker v-show="seeState == 'becomeARegularWorker'" /> -->
      <!-- <AdjustThePost v-show="seeState == 'adjustThePost'" /> -->
      <Quit v-on:closeDialog="closeDialog" v-show="seeState == 'quit'" :selectedId="selectedId" :tabLab='tabLab' ref="quit" />
      <!-- <Examine v-show="seeState == 'examine'" /> -->
      <Leave v-show="seeState == 'leave'"  :selectedId="selectedId" :tabLab='tabLab' ref="leave" v-on:closeDialog="closeDialog"/>
      <Overtime v-show="seeState == 'overtime'" :selectedId="selectedId" :tabLab='tabLab' ref="overtime" v-on:closeDialog="closeDialog"/>
      <!-- <Employment v-show="seeState == 'employment'" /> -->
    </el-dialog>
    <!--查看弹框-->
  </div>
</template>

<script>
import { approvalsList,approvalsDel,approvalsPass,approvalsReject } from "@/api/hrm/approvalsApi";
import BecomeARegularWorker from "./../components/BecomeARegularWorker";
import AdjustThePost from "./../components/AdjustThePost";
import Quit from "../components/Quit";
import Examine from "../components/Examine";
import Leave from "../components/LeaveJob";
import Overtime from "../components/Overtime";
import Employment from "../components/Employment";
import getters from '@/store/getters'

export default {
  name: "users-table-index",
  components: {
    BecomeARegularWorker,
    AdjustThePost,
    Quit,
    Examine,
    Leave,
    Overtime,
    Employment
  },
  data() {
    return {
      seeState: "becomeARegularWorker",
      centerDialogVisible: false,
      topLabel: "转正",
      tabLab: "launch",
      approvalsType:['离职','请假','加班'],
      approvalsTypes: [],
      approvalsState: ['审批中','审批通过','审批驳回','已撤回'],
      approvalsStates: [],
      tableData: [],
      page: 1,
      pageSize: 10,
      total:100,
      selectedId:'',
      userId:''
    };
  },
  methods: {
    async init() {
      this.userId = getters.userId;
      console.log(this.userId);
      let sendData = {};
      if (this.tabLab == "launch") {
        sendData.applicant=this.userId
      } else if (this.tabLab == "approvals") {
        sendData.currentApprover=this.userId
      } else if (this.tabLab == "copy") {
        sendData.ccPeople=this.userId
      }
      sendData.page=this.page
      sendData.pageSize=this.pageSize
      sendData.approvalTypes = this.approvalsTypes
      sendData.stateOfApprovals=this.approvalsStates
      const { data: listRes } = await approvalsList(sendData);
      if(listRes.success){
        this.total=listRes.total
        this.tableData = listRes.data.rows
      }
    },
    async delProcess(id){
      const { data: delRes } = await approvalsDel({id});
        if(delRes.success){
          this.$message.success("撤销成功")
          this.init()
        }
    },
    async passProcess(id){
      console.log("passProcess : " + id);
      let sendForm = {};
      sendForm.processId = id;
      sendForm.handleType = '2';
      sendForm.handleUserId = getters.userId;
      sendForm.handleOpinion = '同意';
      const { data: passRes } = await approvalsPass(sendForm);
        if(passRes.success){
          this.$message.success("操作成功")
          this.init()
        }
    },
    async rejectProcess(id){
      const { data: rejectRes } = await approvalsReject({id});
        if(rejectRes.success){
          this.$message.success("操作成功")
          this.init()
        }
    },
    changeSelectParams(){
      this.page=1
      this.init()
    },
    onPageSizeChange(pageSize) {
      this.pageSize=pageSize
      this.init()
    },
    onPageChange(page) {
      this.page=page
      this.init()
    },
    tabSwitch(obj) {
      this.tabLab = obj;
      this.page=1
      this.init()
    },
    clickCancel(id){
      this.$confirm("", "是否撤销该流程", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.delProcess(id)
        })
        .catch(() => {});
    },
    clickPass(id){
      this.$confirm("是否同意", "确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
                console.log("passProcess : " + id);
          this.passProcess(id)
        })
        .catch(() => {});
    },
    clickBack(id){
      this.$confirm("是否驳回", "确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.rejectProcess(id)
        })
        .catch(() => {});
    },
    clickDetail(id,approvalType){
      this.centerDialogVisible = true
      this.topLabel = approvalType
      switch (approvalType) {
        case "调岗":
          this.seeState = "adjustThePost";
          break;
        case "离职":
          this.seeState = "quit";
          this.selectedId = id
          this.$refs.quit.updateData(id)
          break;
        case "审核":
          this.seeState = "examine";
          break;
        case "加班":
          this.seeState = "overtime"
          this.selectedId = id
          this.$refs.overtime.updateData(id)
          break;
        case "录用":
          this.seeState = "employment"
          break;
        case "请假":
          this.seeState = "leave"
          this.selectedId = id
          this.$refs.leave.updateData(id)
          break;
        case "调休":
          this.seeState = "leave"
          this.selectedId = id
          this.$refs.leave.updateData(id)
          break;
        default:
          this.seeState = "becomeARegularWorker"
          this.topLabel = "转正";
      }
    },
    closeDialog(){
      this.centerDialogVisible = false
      this.init()
    },
    judgeProcessState(data){
      if(data.processState == 0){
        return '已提交';
      }else if(data.processState == 1){
        return '审批中';
      }else if(data.processState == 2){
        return '审批通过';
      }else if(data.processState == 3){
        return '审批不通过';
      }else if(data.processState == 4){
        return '撤销';
      }
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "./../../styles/variables";
.usersApprovalsContainer {
  padding: 20px;
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
        margin: 15px 0;
        span {
          position: relative;
          top: 2px;
          float: left;
          font-weight: bold;
        }
      }
    }
    .el-dropdown-link {
      color: #666;
      border: solid 1px #ccc;
      display: inline-block;
      width: 67px;
      height: 28px;
      padding: 2px 10px;
      font-size: 12px;
      border-radius: 3px;
      margin-right: 5px;
    }
  }
}
.page-list {
  text-align: right;
  margin-top: 10px;
}
</style>
