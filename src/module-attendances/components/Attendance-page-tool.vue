<template>
  <div class="cont-top-box">
    <div class="top-lable">
      <div class="careful-lab">
        <i class="el-icon-info"></i>有 0 条考勤审批尚未处理
      </div>
      <div class="lable-tit">
        <span class="serachInput">
          <i
            class="fa fa-search"
            aria-hidden="true"
            @click="searchIcon"
            v-show="iconShow"
            title="搜索"
          ></i>
          <el-input
            placeholder="搜索"
            v-model="formData.keyword"
            clearable
            v-show="searchShow"
            @clear="handleClear"
            @keyup.enter.native="dataSearch"
          ></el-input>
        </span>
        <router-link
          :to="{'path':'/employees/import/',query: {name: '考勤'}}"
          class="el-button el-button--primary el-button--mini"
          title="导入"
        >导入</router-link>
        <el-badge is-dot class="item">
          <el-button type="primary" size="mini" title="提醒" @click="handleTip">提醒</el-button>
        </el-badge>
        <el-button type="primary" size="mini" title="设置" @click="handleSet">设置</el-button>
        <router-link
          :to="{'path':'/attendances/archiving/'}"
          class="el-button el-button--primary el-button--mini"
          title="历史归档"
        >历史归档</router-link>
        <router-link
          :to="{'path':'/attendances/report',query:{'yearMonth':this.$parent.yearMonth}}"
          class="el-button el-button--primary el-button--mini"
        >{{this.$parent.month}}月份报表</router-link>
      </div>
    </div>
    <el-dialog title="提醒" :visible.sync="centerDialogVisible" width="280px" center>
      <div class="attenInfo">
        <p>系统将通过邮件与短信的形式，对全体员工中存在旷工的考勤进行提醒，该提醒每月仅可发送 1 次。</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSub">我知道了</el-button>
        <el-button @click="centerDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 设置 -->
    <component
      v-bind:is="employeesSet"
      ref="set"
      @handleCloseModal="handleCloseModal"
      @dataSearch="dataSearch"
    ></component>
        <br />
    <div>
      <li>
      <b>部门 ：</b>
      <el-checkbox-group v-model="departmentChecks" style="display:inline-block">
        <el-checkbox v-for="item in departmentList" :label="item.id" :key="item.id" >{{item.name}}</el-checkbox>
      </el-checkbox-group>
      </li>
      <br>
      <br>
      <li>
      <b>考勤状态 ：</b>
                <el-radio-group
                  v-model="formData.stateID"
                  @change="handleStateChange(formData.stateID)"
                >
                  <el-radio
                    v-for="item in stateData.holidayType"
                    :label="item.id"
                    :key="item.id"
                    :value="item.value"
                  >{{item.value}}</el-radio>
                </el-radio-group>
      </li>
      </div>
  </div>
  
</template>

<script>
import { cityList as getCityList } from "@/api/base/baseApi";
import { list as getDepartmentList } from "@/api/base/dept";
import { alert } from "@/api/hrm/attendances";
import attendanceApi from "@/api/constant/attendance";
import employeesSet from "./set";
export default {
  name: "AttendancesPageTool",
  props: ["monthOfReport", "formData", "yearMonth" ,'month'],
  components: {
    employeesSet
  },
  data() {
    return {
      employeesSet: "employeesSet",
      dataes: "",
      iconShow: true,
      searchShow: false,
      centerDialogVisible: false,
      cityList: [],
      departmentList: [],
      departmentChecks: [],
      socialSecurityChecks:[],
      providentFundChecks:[],
      stateData: []
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      // 城市列表获取
      const { data: cityRes } = await getCityList({})
      this.cityList = cityRes.data
      const { data: departmentRes} = await getDepartmentList({})
      this.departmentList=departmentRes.data.depts
      this.stateData = attendanceApi;
    },
    handleSub() {
      alert().then(() => {
        this.centerDialogVisible = false;
        this.$emit("dataList", this.formData);
      });
    },
    // 集合搜索
    searchIcon() {
      this.iconShow = false;
      this.searchShow = true;
    },
    // 清除搜索数据
    handleClear() {
      this.iconShow = true;
      this.searchShow = false;
      this.$emit("dataList", this.formData);
    },
    dataSearch() {
      this.$emit("dataList", this.formData);
    },
    handleTip() {
      this.centerDialogVisible = true;
    },
    handleSet() {
      this.$refs.set.dialogFormV();
    },
    // 弹框关闭
    handleCloseModal() {
      this.$refs.set.dialogFormH();
    }
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
    // display: inline-block;
    margin: 0;
  }
  // i{
  //   padding: 0 5px;
  // }
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
.serachInput {
  .el-input--medium {
    width: 150px;
    .el-input__inner {
    }
  }
}
.serachInput .el-input--medium .el-input__inner {
  height: 26px;
  line-height: 26px;
}
.attenInfo {
  p {
    line-height: 30px;
  }
}
</style>
