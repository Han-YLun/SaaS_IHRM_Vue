<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card :style="{minHeight:boxHeight}">
        <h2 class="centInfo">{{month}}月人事报表</h2>
        <el-tabs v-model="activeName" class="infoPosin">
          <el-tab-pane name="first">
            <span slot="label">考勤统计</span>
            <allList
              ref="socialPageTool"
              :showHeight="showHeight"
              :month="month"
              :yearMonth="yearMonth"
            ></allList>
            <!-- <component v-bind:is="allList"></component> -->
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { fileUpdate } from "@/api/base/employees";
import allList from "./../components/refort-all-list";
import { minHeight } from "@/filters/index";
import commonApi from "@/utils/common";
var _this = null;
export default {
  name: "refortList",
  components: { allList },
  data() {
    return {
      allList: "allList",
      activeName: "first",
      boxHeight: "",
      showHeight: 40,
      yearMonth: "",
      month: ""
    };
  },
  watch: {
    $route(to, from) {
      this.yearMonth = this.$route.query.yearMonth;
      this.month = commonApi.dateaMonth(this.yearMonth).month;
    }
  },
  methods: {
    // 业务方法
    // 界面交互
  },
  // 挂载结束
  mounted: function() {
  },
  // 创建完毕状态
  created: function() {
    _this = this;
    this.yearMonth = this.$route.query.yearMonth;
    this.month = this.$route.query.yearMonth;
    this.boxHeight = minHeight(); // 右边内容高度
  },
  // 组件更新
  updated: function() {}
};
</script>

<style rel="stylesheet/scss" lang="scss">
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
