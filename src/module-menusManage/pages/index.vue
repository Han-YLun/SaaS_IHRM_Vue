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
import {list} from '@/api/example/table'
export default {
  name: 'saas-clients-table-index',
  data() {
    return {
       tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
    }
  },
  methods: {
    
  },
  // 创建完毕状态
  created() {
    
  },
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
