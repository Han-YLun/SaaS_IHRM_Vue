<template>
  <div class="usersApprovalsContainer">
    <div class="approvalsTop">
      <div class="topLab" ><span @click="tabSwitch('launch')" :class="[tabLab == 'launch' ? 'act' : '']">简历推荐</span><span @click="tabSwitch('approvals')" :class="[tabLab == 'approvals' ? 'act' : '']">面试信息</span><span @click="tabSwitch('copy')" :class="[tabLab == 'copy' ? 'act' : '']">已处理</span></div>
    </div>
    <div class="approvalsContent">
      <div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="approvalType" label="候选人" > </el-table-column>
          <el-table-column prop="applicant" label="应聘职位" > </el-table-column>
          <el-table-column prop="date" label="上家公司" > </el-table-column>
          <el-table-column prop="currentApprover" label="毕业学校" > </el-table-column>
          <el-table-column prop="approvalInitiationTime" label="推荐人" > </el-table-column>
          <el-table-column prop="stateOfApproval" label="推荐时间" > </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <router-link :to="{'path':'./recruitDetails'}">查看</router-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  import { approvalsList } from '@/api/hrm/usersApi'

  export default {
    name: 'users-table-index',
    data() {
      return {
        tabLab: 'launch',
        approvalsType: [],
        approvalsState: [],
        tableData: []
      }
    },
    methods: {
      init () {
        approvalsList({})
          .then(res => {
            this.tableData = res.data.items
            console.log(res)
            this.loading = false
          })
          .catch(err => {
            console.log(err)
            this.loading = false
          })
      },
      tabSwitch(obj) {
        this.tabLab = obj
      }
    },
    mounted() {
      this.init()
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "./../../styles/variables";
  .usersApprovalsContainer{
    padding: 20px;
    .approvalsTop{
      color:#666;
      background: #fff;
      border-bottom:solid 1px #ccc;
      line-height: 40px;
      span{
        display: inline-block;
        padding: 0 25px;
        font-size: 18px;
        cursor:pointer;
      }
      .act{
        color:$green;
        border-bottom: solid 2px $green;
      }
    }
    .approvalsContent{
      .topTitle{
        background: #fff;
        padding: 15px;
        div{
          margin: 15px 0;
          span{
            position: relative;
            top:2px;
            float:left;
            font-weight: bold;
          }
        }
      }
    }
  }
</style>
