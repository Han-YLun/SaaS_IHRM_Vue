<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card shadow="never">
        <!--elementui的table组件
          data：数据模型
         -->
        <el-table  :data="dataList"  border style="width: 100%">
            <!--el-table-column : 构造表格中的每一列 
              prop： 数组中每个元素对象的属性名
            -->
            <el-table-column fixed type="index" label="序号" width="50"></el-table-column>
            <el-table-column fixed prop="name" label="企业名称"  width="200"></el-table-column>
            <el-table-column fixed prop="version" label="版本"  width="150"></el-table-column>
            <el-table-column fixed prop="companyPhone" label="联系电话"  width="150"></el-table-column>
            <el-table-column fixed :formatter="formatterDate" prop="expirationDate" label="截至时间"  width="150"></el-table-column>
            <el-table-column prop="state" label="状态"  width="150">
              <template slot-scope="scope">
                <el-switch
                    :disabled="true"
                    v-model="scope.row.state"
                    @click.native="changeSwitch($event , scope.row ,  scope.$index,scope.row.state)"
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
      dataList:[]
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
    async changeSwitch($event , row  , index,state){    

      const info = await this.$confirm('是否禁用此公司所有账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err=>err);

      if(info!='confirm'){
          this.state = false;
          return this.$message.info("用户取消了操作");
      }else{
          this.state = true;
          putState(row).then(res => {
          this.$message.success("更新成功");
          this.state = true;
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
</style>
