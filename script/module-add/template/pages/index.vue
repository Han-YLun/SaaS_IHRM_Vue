<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card shadow="never" v-loading="loading">
        <!-- 搜索栏 -->
        <el-form :inline="true" :model="formSearch">
          <el-form-item label="审批人">
            <el-input v-model="formSearch.user" placeholder="审批人"></el-input>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-select v-model="formSearch.region" placeholder="活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动时间" v-if="barSearch.expandInputs">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="formSearch.date1" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker type="fixed-time" placeholder="选择时间" v-model="formSearch.date2" style="width: 100%;"></el-time-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="即时配送" v-if="barSearch.expandInputs">
            <el-switch v-model="formSearch.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="活动状态" v-if="barSearch.expandInputs">
            <el-select v-model="formSearch.state" placeholder="活动状态">
              <el-option label="开启" value="1"></el-option>
              <el-option label="关闭" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button @click="handleRest">重置</el-button>
            <el-button type="text" @click="handleExpand">{{barSearch.expandBtnText}}</el-button>
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-plus" @click="handleNew">新建</el-button>
        <el-alert 
          v-if="barSearch.alertText !== ''" 
          :title="barSearch.alertText" 
          type="info" 
          class="alert" 
          :closable='false' 
          show-icon>
        </el-alert>
        <!-- 搜索栏 / -->
        <!-- 数据表格 -->
        <el-table 
          :data="items" 
          border 
          style="width: 100%; margin-top:10px;" 
          @selection-change="handleSelectionChange"
          >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="title" label="标题" ></el-table-column>
          <el-table-column prop="type" label="类型" width="60"></el-table-column>
          <el-table-column prop="author" label="作者" width="80"></el-table-column>
          <el-table-column prop="reviewer" label="审核" width="80"></el-table-column>
          <el-table-column prop="pageviews" label="浏览" width="80"></el-table-column>
          <el-table-column prop="display_time" label="日期" width="160"></el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination 
          class="pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-sizes="pagination.pageSizes"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total">
        </el-pagination>
        <!-- 数据表格 / -->
      </el-card>
    </div>
    <!-- 弹出窗 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form :rules="rules" ref="dataForm" :model="formData" label-width="50px" label-position="right">
        <el-form-item label="标题" prop="title">
          <el-input v-model="formData.title" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="formData.author" placeholder="作者"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="formData.type" placeholder="类型">
            <el-option label="CN" value="CN"></el-option>
            <el-option label="US" value="US"></el-option>
            <el-option label="JP" value="JP"></el-option>
            <el-option label="EU" value="EU"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleSave(false)">取 消</el-button>
        <el-button type="primary" @click="handleSave(true)">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 弹出窗 / -->
  </div>
</template>

<script>
import {list} from '@/api/example/table'

export default {
  name: '{{name}}-table-index',
  data() {
    return {
      formSearch: {
        user: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        state: ''
      },
      barSearch: {
        expandInputs: false,
        expandBtnText: '',
        alertText: ''
      },
      items: [],
      pagination: {
        total: 0,
        pageSize: 20,
        pageSizes: [20, 50, 80, 120],
        currentPage: 1
      },
      loading: false,
      multipleSelection: [],
      dialogVisible: false,
      formData: [],
      rules: {
        title: [
          {required: true, message: '请输入标题', trigger: 'blur'},
          {min: 5, max: 45, message: '长度在 5 到 45 个字符', trigger: 'blur'}
        ],
        author: [
          {required: true, message: '请输入作者', trigger: 'blur'},
          {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
        ],
        type: [{required: true, message: '请选择类型', trigger: 'change'}]
      }
    }
  },
  methods: {
    // 业务方法
    doQuery(page = 1, limit = 20) {
      this.pagination.currentPage = page
      this.pagination.pageSize = limit
      this.loading = true
      this.barSearch.alertText = ''
      this.items = []
      list({page, limit})
        .then(res => {
          console.log(res.data)
          this.items = res.data.items
          this.pagination.total = res.data.total
          this.barSearch.alertText = `共 ${this.pagination.total} 条记录`
          this.loading = false
        })
        .catch(err => {
          console.log(err)
          this.loading = false
        })
    },
    // UI方法
    handleRest() {
      this.formSearch = {
        user: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        state: ''
      }
    },
    handleExpand() {
      this.barSearch.expandInputs = !this.barSearch.expandInputs
      this.barSearch.expandBtnText = this.barSearch.expandInputs
        ? '收起▲'
        : '展开▼'
    },
    handleSearch() {
      this.doQuery()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(val, this.multipleSelection)
    },
    handleSizeChange(val) {
      this.doQuery(1, val)
    },
    handleCurrentChange(val) {
      this.doQuery(val, this.pagination.pageSize)
    },
    handleClose() {
      this.$confirm('确认关闭？')
        .then(ret => {
          console.log(ret)
          this.dialogVisible = false
        })
        .catch(ret => {
          console.log(ret)
        })
    },
    handleNew() {
      this.formData = {
        title: '',
        author: '',
        type: ''
      }
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleEdit(item) {
      this.formData = {
        ...item
      }
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleSave(isSave) {
      if (isSave) {
        this.$refs['dataForm'].validate(valid => {
          if (valid) {
            this.dialogVisible = false
            this.$message({
              message: '保存成功',
              type: 'success'
            })
          } else {
            return false
          }
        })
      } else {
        this.dialogVisible = false
      }
    },
    handleDelete(item) {
      this.$confirm('确认删除？')
        .then(ret => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          console.log(ret)
        })
        .catch(ret => {
          console.log(ret)
        })
    }
  },
  created() {
    this.barSearch.expandInputs = false
    this.barSearch.expandBtnText = '展开▼'
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
