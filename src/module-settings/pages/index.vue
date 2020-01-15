<template>
  <div class="settingBox">
    <div class="settingTop">
      <div class="setTop">
        <el-tabs v-model="activeName" class="topLab">
            <el-tab-pane name="role" class="rInfo">
              <span slot="label">角色管理</span>
              <component v-bind:is="roleList"></component>
            </el-tab-pane>
            <el-tab-pane name="companyInfo" class="rInfo">
              <span slot="label">公司信息</span>
              <component v-bind:is="roleList"></component>
            </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import roleList from './../components/role-list'
export default {
  name: 'settings-table-index',
  components: { roleList },
  data() {
    return {
      roleList: 'roleList',
      activeName: 'role'
    }
  },
  methods: {
 
  }
}
</script>
<style>
.disabled .el-upload--picture-card {
  display: none !important;
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
@import './../../styles/variables.scss';
.settingBox {
  padding: 20px;
  background: #fff;
  border-radius: 3px;
  margin: 15px;
  border: 1px solid #ebeef5;
  .setTop {
    color: #666;
    //border-bottom: solid 1px #ccc;
    line-height: 40px;
    span {
      display: inline-block;
      padding: 0 25px;
      font-size: 18px;
      cursor: pointer;
    }
    .act {
      color: $green;
      border-bottom: solid 2px $green;
    }
  }
  .settingCont {
    background: #fff;
    .tips {
      background: #f4f4f4;
      color: #666;
      margin: 10px 0;
      padding: 0 10px;
      line-height: 30px;
      i {
        margin-right: 5px;
        position: relative;
        top: 1px;
        color: $orange;
      }
    }
    .formList {
    }
    .jurisdictionSet {
      position: relative;
      .addAdmin {
        text-align: right;
        line-height: 40px;
        position: relative;
        top: -5px;
        i {
          border: solid 1px #666;
          color: #666;
          display: inline-block;
          margin-right: 5px;
          border-radius: 3px;
          padding: 0 3px 2px 3px;
          line-height: 12px;
        }
      }
      .jurTabLab {
        line-height: 40px;
        span {
          display: inline-block;
          margin-right: 20px;
          cursor: pointer;
        }
        .act {
          color: $green;
        }
      }
      .jurContent {
        .name-wrapper {
          span {
            display: inline-block;
            border: solid 1px #ccc;
            margin-right: 10px;
            padding: 0 10px;
            border-radius: 3px;
            background: #f4f4f4;
          }
        }
      }
    }
  }
  .inputWt {
    width: 400px;
  }
}
</style>
