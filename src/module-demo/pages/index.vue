<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card shadow="never">
        <el-table :data="dataList"  fit highlight-current-row style="width: 100%" border>
          <el-table-column align="center" :label="$t('table.operationType')">
            <template slot-scope="scope">
              <span>{{scope.row.type}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('table.operator')">
            <template slot-scope="scope">
              <span>{{scope.row.author}}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.results')">
            <template slot-scope="scope">
              <span>{{scope.row.title}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('table.operationDate')">
            <template slot-scope="scope">
              <span>{{scope.row.display_time}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('table.describe')">
            <template slot-scope="scope">
              <span>{{scope.row.forecast}}</span>
            </template>
          </el-table-column>
        </el-table>
         demo页面
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
      dataList: []
    }
  },
  methods: {
    // 获取列表数据
    getList() {
      list().then(res => {
          this.dataList = res.data.items
          console.log(this.dataList)
      })
    }
  },
  // 创建完毕状态
  created() {
    //console.log("created方法执行")
    this.getList()
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
