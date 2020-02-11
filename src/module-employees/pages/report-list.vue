<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card :style="{minHeight:boxHeight}">
        <h2 class="centInfo">{{this.$route.params.month}}月人事报表</h2>
        <el-tabs v-model="activeName" class="infoPosin">
          <el-tab-pane name="first">
            <span slot="label">全数据</span>
            <component v-bind:is="allList" :showHeight='showHeight' @archivingReportForm='archivingReportForm' :baseData='baseData'></component>
            </el-tab-pane>

        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { fileUpdate } from '@/api/base/employees'
import allList from './../components/refort-all-list'
import { minHeight } from '@/filters/index'
var _this = null
export default {
  name: 'refortList',
  components: { allList },
  data() {
    return {
      allList: 'allList',
      activeName: 'first',
      boxHeight: '',
      showHeight: 40,
      baseData: {
        month: '',
        type: ''
      }
    }
  },
  methods: {
    // 业务方法
    // 归档报表
    archivingReportForm(type) {
      this.$confirm(
        '您确定要归档' +
          this.baseData.month +
          '月报表？报表归档将覆盖上一次归档记录，无法恢复。',
        '归档确认',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }
      )
        .then(() => {
          fileUpdate(this.baseData)
            .then(res => {
              this.$message.success('归档报表成功')
            })
            .catch(e => {
              this.$message.error('归档报表失败')
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消'
          })
        })
    },
    // 界面交互
    getYearM() {
      var date = new Date()
      var year = date.getFullYear()
      this.baseData.month = year + '-' + this.$route.params.month
    }
  },
  // 挂载结束
  mounted: function() {},
  // 创建完毕状态
  created: function() {
    _this = this
    this.boxHeight = minHeight() // 右边内容高度
    this.getYearM()
  },
  // 组件更新
  updated: function() {}
}
</script>

<style rel="stylesheet/scss" lang="scss">
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
