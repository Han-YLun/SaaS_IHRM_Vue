<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <span class="seleInfo">
          <el-select v-model="requestParameters.stausInfo">
            <el-option v-for="item in baseData.stausInfos" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </span>
        <span class="posInfo">
          本月&nbsp;&nbsp;(--)&nbsp;&nbsp;
          <span>在职：
            <em>--</em>
          </span>
          <span>入职：
            <em class="active">--</em>
          </span>
          <span>离职：
            <em class="disabled">--</em>
          </span>
        </span>
        <div class="fr">
            <router-link :to="{'path':'/employees/import/',query: {name: '员工'}}" class="el-button el-button--primary el-button--mini" title="导入">导入</router-link>
            <router-link :to="{'path':'/employees/archiving/'}" class="el-button el-button--primary el-button--mini" title="历史归档">历史归档</router-link>
            <router-link :to="{'path':'/employees/report/1'}" class="el-button el-button--primary el-button--mini" >1月份报表</router-link>
            <el-button  type="primary" size="mini" icon="el-icon-plus" @click="handlAdd">新增员工</el-button>
        </div>
      </el-card>
      <el-card shadow="never" class="boxMar">
        <el-table :data="dataList" fit style="width: 100%;" border>
          <el-table-column type="index" :index="1" label="序号" width="50"> </el-table-column>
          <el-table-column sortable prop="username" label="姓名" width="120"></el-table-column>
          <el-table-column sortable prop="mobile" label="手机号" width="150"></el-table-column>
          <el-table-column sortable prop="workNumber" label="工号" width="120"></el-table-column>
          <el-table-column sortable :formatter="judgeFormOfEmployment" label="聘用形势" width="120"></el-table-column>
          <el-table-column sortable prop="departmentName" label="部门" width="120"></el-table-column>
          <el-table-column sortable :formatter="formatterDate" prop="timeOfEntry" label="入职时间" width="150"></el-table-column>
          <el-table-column fixed="right" label="操作" align="center" width="260">
            <template slot-scope="scope">
              <router-link :to="{'path':'/employees/details/' + scope.row.id}" class="el-button el-button--text el-button--small">
                查看
              </router-link>
              <el-button @click="handlPositive(scope.row.id)" type="text" size="small">转正</el-button>
              <router-link :to="{'path':'/employees/leave/' + scope.row.id}" class="el-button el-button--text el-button--small">
                离职
              </router-link>   
              <el-button @click="handleRole(scope.row)" type="text" size="small">角色</el-button>
              <el-button  @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="pagination">
          <PageTool :paginationPage="requestParameters.page" :paginationPagesize="requestParameters.size" :total="counts" @pageChange="handleCurrentChange" @pageSizeChange="handleSizeChange">
          </PageTool>
        </div>
        <!-- end -->
        <!-- 新增员工弹层 -->
        <component v-bind:is="employeesAdd" ref="addUser" @doQuery="doQuery"></component>
        <!--分配角色组件 -->
        <component v-bind:is="addRole" ref="addRole"></component>
        <!-- 转正 -->
        <component v-bind:is="employeesPositive" ref="positive"></component>
      </el-card>
    </div>
  </div>
</template>

<script>
import constantApi from '@/api/constant/employees'
import {list,remove} from "@/api/base/users"
import {findRolesByUserId} from "@/api/base/role"
import PageTool from './../../components/page/page-tool'
import employeesAdd from './../components/add'
import addRole from './../components/addRole'
import {hasPermissionPoint} from '@/utils/permission'
import employeesPositive from './../components/turn-positive'
import employeesSet from './../components/setting'
import commonApi from '@/utils/common'
import {
  positiveDetail,
  settDetail,
  accountStatus
} from '@/api/base/employees'
export default {
  name: 'employeesList',
  components: {
    PageTool,employeesAdd,addRole,employeesPositive,employeesSet
  },
  data() {
    return {
      employeesAdd: 'employeesAdd',
      employeesPositive: 'employeesPositive',
      employeesSet: 'employeesSet', 
      addRole: 'addRole',
      baseData: constantApi,
      dataList: [],
      counts: '',
      requestParameters:{
        page: 1,
        size: 10,
      }    
    }
  },
  methods: {
    show(name) {
      return hasPermissionPoint(name)
    },
    // 业务方法
    doQuery(params) {
        list(this.requestParameters)
        .then(res => {
          this.dataList = res.data.data.rows
          this.counts = res.data.data.total
        })
    },
    // 每页显示信息条数
    handleSizeChange(size) {
      this.requestParameters.size = size
      if (this.requestParameters.page === 1) {
        this.doQuery(this.requestParameters)
      }
    },
    // 进入某一页
    handleCurrentChange(val) {
      this.requestParameters.page = val
      this.doQuery()
    },
    // 添加新员工
    handlAdd() {
      this.$refs.addUser.dialogFormVisible=true
    },
    // 删除
    handleDelete(item) {
      this.$confirm(
        `本次操作将删除${item.username}删除后账号将不可恢复，您确认删除吗？`,{
         type: 'warning'
        }
      ).then(() => {
          remove({ id: item.id })
            .then(res => {
              this.$message({message:res.data.message,type:res.data.success?'success':'error'})
              if(res.data.success) {
                this.doQuery();
              }
            })
        })
    },
    handleRole(item) {

      
      this.$refs.addRole.toAssignPrem(item.id)
      var req = {};
      req.id = item.id;
      console.log(req.id);
      findRolesByUserId(req).then(res => {
        this.$refs.addRole.addCheckedRoles(res.data.data.map(v=>v.id));
      });
    },
    /**转正代码 */
    handlPositive(id) {
      this.$refs.positive.dialogFormV(id)
    },
    judgeFormOfEmployment(data){
      return data.formOfEmployment == 1 ? '正式' : '非正式';
    },
    formatterDate(data){
      let date = data.timeOfEntry; 
      return commonApi.dateFormat(date);
    }
  },
  // 创建完毕状态
  created: function() {
    this.doQuery()
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.iconInfo {
  .fa {
    color: #999;
    font-size: 14px;
    cursor: pointer;
  }
  a {
    padding: 0 5px;
  }
}
.serachInput {
  .el-input--medium {
    width: 150px;
  }
}
.serachInput .el-input--medium .el-input__inner {
  height: 26px;
  line-height: 26px;
}
</style>
