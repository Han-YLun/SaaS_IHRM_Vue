<template>
  <div class="dashboard-container">
    <div class="app-container">
      <ScoialPageTool ref="socialPageTool" />
      <div class="cont-bod-box">
        <el-table @row-click="goDetail" :data="tableData" style="width: 100%">
          <el-table-column type="index" width="50" label="序号"></el-table-column>
          <el-table-column prop="username" label="姓名" sortable></el-table-column>
          <el-table-column prop="mobile" label="手机" width="130" sortable></el-table-column>
          <el-table-column prop="workNumber" label="工号" sortable></el-table-column>
          <el-table-column prop="departmentName" label="部门" sortable width="120"></el-table-column>
          <el-table-column prop="timeOfEntry" :formatter="dateFormat" label="入职时间" width="120" sortable></el-table-column>
          <el-table-column prop="leaveTime" :formatter="dateFormat" label="离职时间"  width="120"  sortable></el-table-column>
          <el-table-column prop="participatingInTheCity" label="社保城市" width="120"></el-table-column>
          <el-table-column prop="providentFundCity" label="公积金城市" width="120"></el-table-column>
          <el-table-column prop="socialSecurityBase" label="社保基数"></el-table-column>
          <el-table-column prop="providentFundBase" label="公积金基数" width="120" ></el-table-column>
        </el-table>
        <div class="page-list">
          <el-pagination
            @size-change="onPageSizeChange"
            @current-change="onPageChange"
            background
            :total="Number(total)"
            :page-sizes="[10,20,30, 50]"
            layout="sizes, prev, pager, next, jumper"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { list } from "@/api/hrm/socialSecuritys";
import ScoialPageTool from "../components/ScoialPageTool";

export default {
  name: "social-securitys-list",
  components: { ScoialPageTool },
  data() {
    return {
      yearMonth:"",
      tableData: [],
      total: 100,
      selectParams:{}
    };
  },
  // computed: {
  //   computeList(){
  //     return this.tableData
  //   }
  // },
  methods: {
    // 初始化数据
    async init() {
      let {
        departmentChecks,
        keyword,
        providentFundChecks,
        socialSecurityChecks,
        page,
        pageSize
      } = this.selectParams;
      const { data: listRes } = await list({
        departmentChecks: departmentChecks,
        keyword: keyword,
        providentFundChecks: providentFundChecks,
        socialSecurityChecks: socialSecurityChecks,
        page: page,
        pageSize: pageSize
      });
      this.tableData = listRes.data.rows;
      this.total = listRes.data.total;
    },
    changeSelectParams(selectParams){
      this.selectParams.keyword=selectParams.keyword
      this.selectParams.departmentChecks=selectParams.departmentChecks
      this.selectParams.providentFundChecks=selectParams.providentFundChecks
      this.selectParams.socialSecurityChecks=selectParams.socialSecurityChecks
      this.page=1
      this.init()
    },
    goDetail(row, event, column) {
      this.$router.push({ path: "detail/"+row.userId });
    },
    onPageSizeChange(pageSize) {
      this.selectParams.pageSize=pageSize
      this.init()
    },
    onPageChange(page) {
      this.selectParams.page=page
      this.init()
    }
  },
  created() {
    this.selectParams.page=1
    this.selectParams.pageSize=10
    this.yearMonth=this.$route.query.yearMonth
    this.init()
  },
  mounted() {
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.cont-bod-box {
  padding: 20px;
  background: #fff;
  border-radius: 3px;
  margin-top: 15px;
  margin-bottom: 15px;
  border: 1px solid #ebeef5;
}
.page-list {
  text-align: right;
  margin-top: 10px;
}
</style>