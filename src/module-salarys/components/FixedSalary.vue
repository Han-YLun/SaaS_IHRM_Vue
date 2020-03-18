<template>
  <div class="fixedDalary">
    <el-form :label-position="labelPosition" label-width="120px" :model="formLabelAlign">
      <el-form-item label="当前基本工资">
        <el-input
          v-model="formLabelAlign.currentBasicSalary"
          placeholder="当前基本工资"
          style="width: 60%"
          type="number"
        ></el-input>
      </el-form-item>
      <el-form-item label="当前岗位工资">
        <el-input v-model="formLabelAlign.currentPostWage" placeholder="当前岗位工资" style="width: 60%" type="number"></el-input>
      </el-form-item>
      <el-form-item label="当前工资合计">
        <el-input v-model="computeCurrentTotal" placeholder="当前工资合计, 自动计算" style="width: 60%" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="转正基本工资">
        <el-input
          v-model="formLabelAlign.correctionOfBasicWages"
          placeholder="转正基本工资"
          style="width: 60%"
          type="number"
        ></el-input>
      </el-form-item>
      <el-form-item label="转正岗位工资">
        <el-input v-model="formLabelAlign.turnToPostWages" placeholder="转正岗位工资" style="width: 60%" type="number"></el-input>
      </el-form-item>
      <el-form-item label="转正工资合计">
        <el-input v-model="computeTurnTotal" placeholder="当前基本工资, 自动计算" style="width: 60%" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认</el-button>
        <el-button @click="onClose">关闭</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { initSalary } from "@/api/hrm/salarysApi";

export default {
  name: "users-table-index",
  props:[
    'userId'
  ],
  data() {
    return {
      labelPosition: "left",
      formLabelAlign: {},
      turnTotal: 0
    };
  },
  computed: {
    computeCurrentTotal(){
      let base = 0
      if (this.formLabelAlign.currentBasicSalary != null){
        base = Number(this.formLabelAlign.currentBasicSalary)
      }
      let post= 0
      if(this.formLabelAlign.currentPostWage !=null){
        post=Number(this.formLabelAlign.currentPostWage)
      }
      return base+post
    },
    computeTurnTotal(){
      let base = 0
      if (this.formLabelAlign.correctionOfBasicWages != null){
        base = Number(this.formLabelAlign.correctionOfBasicWages)
      }
      let post= 0
      if(this.formLabelAlign.turnToPostWages !=null){
        post=Number(this.formLabelAlign.turnToPostWages)
      }
      return base+post
    }
  },
  methods: {
    async onSubmit(){
      this.formLabelAlign.userId=this.userId
      let sendData=this.formLabelAlign
      const { data: initRes } = await initSalary(sendData)
      let suc = initRes.success
      if(suc == true){
        this.$message({message: '保存成功',type: 'success'})
        this.onClose()
      }
    },
    onClose(){
      this.formLabelAlign={}
      this.$emit('onDialogCancel')
    }
  },
  mounted() {
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "./../../styles/variables";
.fixedDalary {
  .infoBox {
    display: flex;
    border-bottom: solid 1px #ccc;
    margin-bottom: 20px;
    padding: 10px 0 20px 0;
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
    .logo {
      border: solid 1px #ccc;
      width: 102px;
      height: 102px;
      border-radius: 50%;
      margin-right: 20px;
    }
    .info {
      p {
        line-height: 30px;
        .name {
          font-size: 16px;
        }
        span {
          font-weight: bold;
          display: inline-block;
          margin-right: 0px;
          margin-left: 10px;
        }
      }
    }
    .buttones {
      text-align: center;
    }
  }
  .Label {
    margin: 0 20px;
    color: #999;
  }
}
</style>
