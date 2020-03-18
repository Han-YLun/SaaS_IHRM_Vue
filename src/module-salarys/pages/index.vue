<template>
  <div class="salarys-container">
    <div class="salarys">
      <div class="">开始做 <el-input v-model="dataMonth" style="width: 100px;" size="mini" placeholder="201808"></el-input> 工资 <el-button type="primary" size = "mini" @click="onSubmit">确定</el-button></div>
    </div>
  </div>
</template>

<script>
import { getCompanySettings,saveCompanySettings } from "@/api/hrm/salarysApi";

export default {
  name: 'salarys-table-index',
  data() {
    return {
      dataMonth: ""
    }
  },
  methods: {
    onSubmit() {
      // this.$router.push({ path: "./list" });
      this.saveData()
    },
    async getData() {
      const { data: getDataRes } = await getCompanySettings()
      if (getDataRes.data != null) {
        let dataMonth = getDataRes.data.dataMonth
        this.$router.push({ path: "./list",query:{'yearMonth':dataMonth}})
      }
    },
    async saveData() {
      if (this.dataMonth != "") {
        let dataMonth = this.dataMonth
        const { data: saveDataRes } = await saveCompanySettings({ dataMonth })
        this.$router.push({ path: "./list",query:{'yearMonth':this.dataMonth}})
      }else{
        this.$message.error('请输入月份')
      }
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.salarys-container {
  padding: 25px;
  .salarys{
    text-align: center;
    background: #fff;
    min-height: 600px;
    border-radius: 3px;
    padding-top: 200px;
    input{
      margin: 0 10px;
    }
  }
}
</style>
