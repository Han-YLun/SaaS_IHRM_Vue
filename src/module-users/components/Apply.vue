<template>
  <div class="usersContainer">
    <el-form
      :model="ruleForm"
      status-icon
      ref="ruleForm2"
      label-width="110px"
      class="demo-ruleForm"
    >
      <el-form-item label="申请类型">
        <el-select v-model="opType" placeholder="请选择" style="width: 220px;">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <!--离职表单-->
      <el-form-item label="期望离职时间" :class="computeOpType?'item-enable':'item-dismiss'">
        <el-date-picker v-model="ruleForm.expectedDepartureTime" type="date" format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="离职原因"  :class="computeOpType?'item-enable':'item-dismiss'">
        <el-input
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 8}"
          style="width: 70%;"
          placeholder="请输入内容"
          v-model="ruleForm.reasonsForLeaving"
        ></el-input>
      </el-form-item>
      <!--离职表单-->
      <!--加班表单-->
      <el-form-item label="加班开始时间" :class="computeOpType?'item-dismiss':'item-enable'">
        <el-date-picker v-model="ruleForm.overtimeStartTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="加班结束时间" :class="computeOpType?'item-dismiss':'item-enable'">
        <el-date-picker v-model="ruleForm.overtimeTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="补偿方式" :class="computeOpType?'item-dismiss':'item-enable'">
        <span>调休</span>
      </el-form-item>
      <el-form-item label="加班原因"  :class="computeOpType?'item-dismiss':'item-enable'">
        <el-input
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 8}"
          style="width: 70%;"
          placeholder="请输入内容"
          v-model="ruleForm.overtimeCause">
      </el-input>
      </el-form-item>
      <!--加班表单-->
      <el-form-item label="图片">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
          <div slot="tip" class="el-upload__tip" style="color:#f00;">注： 只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { applyOvertime,applyDimission } from "@/api/hrm/approvalsApi";

export default {
  name: "users-table-index",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      value: "加班",
      opType: 15,
      ruleForm: {},
      options: [
        {
          value: 3,
          label: "离职"
        },
        {
          value: 15,
          label: "加班"
        }
      ]
    };
  },
  computed:{
    computeOpType() {
      return this.opType == 3
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    submitForm(){
      console.log("optype:",this.opType)
      if(this.opType == 15){
        this.applyOvertime()
      }else{
        this.applyDimission()
      }
    },
    resetForm(){
      this.ruleForm = {}
    },
    async applyOvertime(){
      let sendForm = this.ruleForm
      const { data: saveRes } = await applyOvertime(sendForm)
      if(saveRes.success){
        this.ruleForm = {}
        this.$emit("closeDialog");
      }
    },
    async applyDimission(){
      console.log("申请离职")
      let sendForm = this.ruleForm
      const { data: saveRes } = await applyDimission(sendForm)
      if(saveRes.success){
        this.ruleForm = {}
        this.$emit("closeDialog");
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "./../../styles/variables";
.usersContainer {
  .el-form-item {
    margin-bottom: 20px;
    .el-form-item__error {
      position: relative;
      margin-left: 300px;
    }
  }
}
.item-enable{
  display: block;
}
.item-dismiss{
  display: none;
}
</style>
