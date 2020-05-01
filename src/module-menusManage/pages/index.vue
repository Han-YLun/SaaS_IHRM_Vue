<template>
  <el-radio-group v-model="radio">
    <el-radio :label="3">备选项</el-radio>
    <el-radio :label="6">备选项</el-radio>
    <el-radio :label="9">备选项</el-radio>
  </el-radio-group>
</template>
<script>
import {list} from '@/api/example/table'
export default {
  name: 'saas-clients-table-index',
  data() {
    return {
      dataList: [],
      radio: '3'
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
