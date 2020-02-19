<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
          <el-tabs v-model="activeName" class="infoPosin">
            <el-tab-pane name="first" class="rInfo">
              
              <div class="fr">
                <a  class="fa fa-print" aria-hidden="true"  title="打印" @click='handleExport()'></a>
                <el-tooltip class="item" effect="dark" content="点击打印按钮->右击打印预览界面->点击'打印'" placement="top-end">
                    <i class="fa fa-question-circle-o" aria-hidden="true"></i>
                </el-tooltip>
              </div>
        
              <span slot="label">登录账户设置</span>
              <component v-bind:is="accountInfo" :objId='objId' ref="user"></component>
            </el-tab-pane>
            <el-tab-pane name="two" class="rInfo">
                <span slot="label">个人详情</span>
                <component v-bind:is="userInfo" :objId='objId' ref="user"></component>
            </el-tab-pane>
            <el-tab-pane name="third" class="rInfo">
                <span slot="label">岗位信息</span>
                <component v-bind:is="postInfo" :objId='objId'></component>
            </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import accountInfo from './../components/details-account-info'
import userInfo from './../components/details-user-info'
import postInfo from './../components/details-post-info'
export default {
  name: 'employeesDetails',
  components: { accountInfo, userInfo, postInfo},
  data() {
    return {
      accountInfo:'accountInfo',
      userInfo: 'userInfo',
      postInfo: 'postInfo',  
      activeName: 'first',
      objId: this.$route.params.id,
      dataList: []
    }
  },
    methods: {
        // 下载文件
    handleExport() {
      let id = this.$route.params.id;
      location.href="http://localhost:9003/employees/"+id+"/pdf"
    },
  }
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
