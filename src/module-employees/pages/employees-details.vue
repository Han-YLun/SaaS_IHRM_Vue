<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card  :style="{minHeight:boxHeight}">
        <!-- <div class="logInfo">
          <h2>更新日志</h2>
          <ul class="logList">
            <li>
              <div class="logRinfo">
                <span class="time">2016-09-01</span>
                <div class="logContent">
                  员工入职
                </div>
              </div>
            </li>
            <li>
              <div class="logRinfo">
                <span class="time">2016-09-01</span>
                <div class="logContent">
                  员工离职
                </div>
              </div>
            </li>
          </ul>
        </div> -->
        <!-- <el-tabs v-model="activeName" class="infoPosin" style="margin-right:250px;"> -->
          <el-tabs v-model="activeName" class="infoPosin">
          <el-tab-pane name="first" class="rInfo">
            <div class="fr">
              <router-link :to="{'path':'/employees/print/' + printId,query: {name: userName}}" class="fa fa-print" aria-hidden="true"  title="打印"></router-link>
              <el-tooltip class="item" effect="dark" content="点击打印按钮->右击打印预览界面->点击'打印'" placement="top-end">
                  <i class="fa fa-question-circle-o" aria-hidden="true"></i>
              </el-tooltip>
            </div>
            <span slot="label">个人信息</span>
            <component v-bind:is="userInfo" :objId='objId' ref="user"></component>
            
          </el-tab-pane>
          <el-tab-pane name="second" class="rInfo">
            <div class="fr">
              <router-link :to="{'path':'/employees/print/' + printId,query: {name: postName}}" class="fa fa-print" aria-hidden="true"  title="打印"></router-link>
              <el-tooltip class="item" effect="dark" content="点击打印按钮->右击打印预览界面->点击'打印'" placement="top-end">
                  <i class="fa fa-question-circle-o" aria-hidden="true"></i>
              </el-tooltip>
            </div>
            <span slot="label">岗位信息</span>
            <component v-bind:is="postInfo" :objId='objId' :headImg='headImg'></component>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { minHeight } from '@/filters/index'
import { list } from '@/api/base/employees'
import userInfo from './../components/details-user-info'
import postInfo from './../components/details-post-info'
var _this = null
export default {
  name: 'employeesDetails',
  components: { userInfo, postInfo },
  data() {
    return {
      userInfo: 'userInfo',
      postInfo: 'postInfo',
      activeName: 'first',
      activeSecond: 'two',
      userName: 'user',
      postName: 'post',
      printId: '',
      boxHeight: '',
      headImg: '',
      objId: this.$route.params.id,
      dataList: []
    }
  },
  methods: {
    // 业务方法
    listDate(params) {
      list().then(data => {
        this.dataList = data.data.items
      })
    }
    // 界面交互
  },
  // 挂载结束
  mounted: function() {
    this.headImg = this.$refs.user.formData.staffPhoto
  },
  // 创建完毕状态
  created: function() {
    _this = this
    this.printId = this.$route.params.id
    this.boxHeight = minHeight() // 右边内容高度
    this.listDate()
  },
  // 组件更新
  updated: function() {}
}
</script>

<style rel="stylesheet/scss" lang="scss">
.el-tabs__content {
  overflow: initial;
}
.logInfo {
  width: 250px;
  float: right;

  h2 {
    margin: 0 0 0 20px;
    padding: 0 0 0 20px;
    height: 40px;
    line-height: 40px;
    border-bottom: 2px solid #e4e7ed;
    font-size: 14px;
    font-weight: normal;
  }
}
.logList {
  li {
    list-style: none;
    padding-left: 80px;
    .logRinfo {
      position: relative;
      padding: 25px 0 0;
      margin-left: 15px;
      .time {
        position: absolute;
        left: -100px;
        top: 25px;
      }
      .logContent {
        position: relative;
      }
      .logContent:before {
        content: '';
        width: 14px;
        height: 14px;
        display: block;
        border-radius: 50px;
        position: absolute;
        left: -24px;
        top: 0;
        z-index: 20;
        border: 1px solid #26a69a;
        background: #fff;
      }
    }
    .logRinfo:before {
      content: '';
      position: absolute;
      left: -18px;
      top: -15px;
      width: 2px;
      height: 40px;
      background-color: #e0e0e0;
    }
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
