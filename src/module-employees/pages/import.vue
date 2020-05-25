<template>
<div class="dashboard-container">
    <div class="app-container">
      <el-card :style="{minHeight:boxHeight}" class="rInfo">
        <div>
        <div class="infoTip">
          <div v-if="this.$route.query.name === '员工'">
            <h2 class="text-center">员工导入</h2>
            <el-alert
              title="每次导入仅可添加1000名员工，姓名、手机、入职时间、聘用形式为必填项"
              type="warning"
              show-icon
              :closable="false">
            </el-alert>
          </div>
          <div v-if="this.$route.query.name === '考勤'">
            <h2 class="text-center">考勤导入</h2>
            <el-alert
            title="如果某员工已有打卡记录，最新上传的不覆盖原有数据。可上传多名员工的打卡记录。每名员工可上传多条记录，同考勤日内取员工第一次和最后一次打卡时间。"
            type="warning"
            show-icon
            :closable="false">
          </el-alert>
          </div>
        </div>
        <component v-bind:is="importCompon" ref="import" :baseData='baseData'>
        </component>
        </div>
      </el-card>
    </div>
</div>
</template>

<script>
import { minHeight } from '@/filters/index'
import importCompon from '@/components/import/index'
var _this = null
export default {
  name: 'refortList',
  components: {
    importCompon
  },
  data() {
    return {
      importCompon: 'importCompon',
      boxHeight: '',
      baseData: {
        upUrl: '/api/sys/user/import',
        fileUrl: 'http://research.itcast.cn/files/saas-hrm/添加员工模板.xlsx'
      }
    }
  },
  methods: {},
  // 挂载结束
  mounted: function() {},
  // 创建完毕状态
  created: function() {
    _this = this
    this.boxHeight = minHeight() // 右边内容高度
  },
  // 组件更新
  updated: function() {}
}
</script>

<style rel="stylesheet/scss" lang="scss">
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
