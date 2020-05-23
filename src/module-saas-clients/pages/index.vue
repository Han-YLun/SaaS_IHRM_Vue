<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card shadow="never">
        <!--elementui的table组件
          data：数据模型
         -->
        <el-table  :data="dataList"  border>
            <!--el-table-column : 构造表格中的每一列 
              prop： 数组中每个元素对象的属性名
            -->
            <el-table-column fixed type="index" label="序号" width="50"></el-table-column>
            <el-table-column fixed prop="name" label="企业名称" ></el-table-column>
            <el-table-column fixed prop="version" label="版本"  width="150"></el-table-column>
            <el-table-column fixed prop="companyPhone" label="联系电话"  width="150"></el-table-column>
            <el-table-column fixed :formatter="formatterDate" prop="expirationDate" label="截至时间"  width="150"></el-table-column>
            <el-table-column prop="state" label="状态"  width="150">
              <template slot-scope="scope">
                <el-switch
                    v-model="scope.row.state"
                    @click.native.prevent="changeSwitch(scope.row,scope.row.state)"
                     :active-value="1" 
                     :inactive-value="0"
                    disabled
                    >
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <router-link :to="'/saas-clients/details/' + scope.row.id">查看</router-link>
              </template>
            </el-table-column>
          </el-table>
      </el-card>
     </div>
  </div>
</template>

<script>
import {list} from '@/api/base/saasClient'
import {putState} from '@/api/base/saasClient'
import commonApi from '@/utils/common'
export default {
  name: 'saas-clients-index',
  data () {
    return {
      dataList:[],
    }
  },
  methods: {
    getList() {
      //调用API发起请求
      //res=响应数据
      list().then(res => {
        this.dataList = res.data.data
      })
    },
    async changeSwitch(row,state){   
      let dialogText = '';  
      if(state == 0){
        dialogText = '是否启用公司所有账号, 是否继续?';
      }else{
        dialogText = '是否禁用公司所有账号, 是否继续?';
      }
      const info = await this.$confirm(dialogText, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err=>err);

      if(info == 'confirm'){
          if(row.state == 0){
            row.state = 1;
          }else{
            row.state = 0;
          }
          putState(row).then(res => {
            this.$message.success("更新成功");
          })
      }

    },
    formatterDate(data){
      let date = data.expirationDate; 
      return commonApi.dateFormat(date);
    }
  },
  // 创建完毕状态
  created() {
    this.getList()
  }
 
} 
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.alert {
  margin: 10px 0px 0px 0px;
}
.pagination {
  margin-top: 10px;
  text-align: right;
}
.app-container /deep/ .el-switch__core,
.app-container /deep/ .el-switch__label{
  cursor: default;
}
</style>
