<template>
  <div class="cont-top-box">
    <div class="top-lable">
      <div class="careful-lab">
        <i class="el-icon-info"></i>本月{{tips.dateRange}}：社保在缴 {{tips.socialSecurityCount}} 公积金在缴 {{tips.providentFundCount}} 增员 {{tips.newsCount}} 减员 {{tips.reducesCount}} 入职 {{tips.worksCount}} 离职 {{tips.leavesCount}}
      </div>
      <div class="lable-tit">
        <el-input
          placeholder="请输入内容"
          suffix-icon="el-icon-search"
          v-model="keyword"
          style="width:120px"
          @change="checkChange"
        ></el-input>
        <!-- <a href="/employees/import/?name=社保">导入</a> -->
        <router-link :to="{'path':'/employees/import/',query: {name: '社保'}}" title="导入">导入</router-link>
        <router-link :to="{'path':'/social-securitys/historicalArchiving'}">历史归档</router-link>
        <router-link :to="{'path':'/social-securitys/monthStatement',query:{'yearMonth':this.$parent.yearMonth}}">{{tips.strMonth}}月报表</router-link>
      </div>
    </div>
    <br />
    <div>
      <li>
      <b>部门 ：</b>
      <el-checkbox-group v-model="departmentChecks" style="display:inline-block">
        <el-checkbox v-for="item in departmentList" :label="item.id" :key="item.id" @change="checkChange">{{item.name}}</el-checkbox>
      </el-checkbox-group>
      </li>
      <br>
      <li>
      <b>社保城市 ：</b>
      <el-checkbox-group v-model="socialSecurityChecks" style="display:inline-block">
          <el-checkbox v-for="item in cityList" :label="item.id" :key="item.id" @change="checkChange">{{item.name}}</el-checkbox>
      </el-checkbox-group>
      </li>
      <br>
      <li>
      <b>公积金城市 ：</b>
      <el-checkbox-group v-model="providentFundChecks" style="display:inline-block">
          <el-checkbox v-for="item in cityList" :label="item.id" :key="item.id" @change="checkChange">{{item.name}}</el-checkbox>
      </el-checkbox-group>
      </li>
      </div>
  </div>
</template>

<script>
import { cityList as getCityList } from "@/api/base/baseApi";
import { list as getDepartmentList } from "@/api/base/dept";
import { getTips as getTips } from "@/api/hrm/socialSecuritys";

export default {
  name: "pageToolScoial",
  data() {
    return {
      tips:{},
      keyword: "",
      departmentChecks: [],
      socialSecurityChecks:[],
      providentFundChecks:[],
      cityList: [],
      departmentList: []
    }
  },
  methods: {
    async init() {
      // 城市列表获取
      const { data: cityRes } = await getCityList({})
      this.cityList = cityRes.data
      const { data: departmentRes} = await getDepartmentList({})
      this.departmentList=departmentRes.data.depts
      let yearMonth=this.$parent.yearMonth
      const { data: tipsRes } = await getTips({yearMonth})
      this.tips=tipsRes.data
    },
    checkChange(){
      let selectParams={
        "keyword":this.keyword,
        "departmentChecks": this.departmentChecks,
        "socialSecurityChecks": this.socialSecurityChecks,
        "providentFundChecks": this.providentFundChecks
      }
      this.$parent.changeSelectParams(selectParams)
      // this.$emit("init",selectParams)
    }
  },
  created: function() {
    this.init();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.cont-top-box {
  padding: 20px;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.top-lable {
  position: relative;
  line-height: 2;
  a {
    display: inline-block;
    padding: 0 10px;
  }
  .careful-lab {
    i {
      margin-right: 5px;
      color: #409eff;
    }
    display: inline-block;
    padding: 0px 10px;
    border-radius: 3px;
    border: 1px solid rgba(145, 213, 255, 1);
    background: rgba(230, 247, 255, 1);
  }
  .lable-tit {
    position: absolute;
    right: 0;
    top: 0px;
  }
}
</style>
