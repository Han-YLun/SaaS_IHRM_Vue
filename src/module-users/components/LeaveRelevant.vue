<template>
  <div class="usersContainer">
    <el-form
      :model="ruleForm"
      status-icon
      ref="ruleForm2"
      label-width="110px"
      class="demo-ruleForm"
    >
      <el-form-item label="假期类型">
        <el-select v-model="opType" placeholder="请选择" style="width: 220px;">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-col :span="8">
          <el-date-picker
            type="datetime"
            placeholder="选择日期"
            v-model="ruleForm.startTime"
            style="width: 100%;"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-col :span="8">
          <el-date-picker
            type="datetime"
            placeholder="选择日期"
            v-model="ruleForm.endTime"
            style="width: 100%;"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="时长">
        <div>
          {{computeDuration}} 天
          <span style="color:#f00;">请假时长根据开始时间与结束时间自动计算，最小0.5天</span>
        </div>
      </el-form-item>
      <el-form-item label="申请理由">
        <el-input
          type="textarea"
          style="width: 340px;"
          :autosize="{ minRows: 3, maxRows: 8}"
          placeholder="请输入内容"
          v-model="ruleForm.reasonsForApplication"
        ></el-input>
      </el-form-item>
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
        <el-button type="primary" @click="submitForm()">提交</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { applyeLave } from "@/api/hrm/approvalsApi";

export default {
  name: "users-table-index",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      ruleForm: {
      },
      opType: 7,
      options: [
        {
          value: 7,
          label: "请假"
        },
        {
          value: 18,
          label: "调休"
        }
      ],
      duration: 0
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    submitForm() {
      console.log("optype:", this.opType);
      this.applyLeave()
    },
    resetForm() {
      this.ruleForm = {};
    },
    async applyLeave(){
      let sendForm = this.ruleForm
      sendForm.holidayType = this.opType
      const { data: saveRes } = await applyeLave(sendForm)
      if(saveRes.success){
        this.ruleForm = {}
        this.$emit("closeDialog");
      }
    }
  },
  computed: {
    computeDuration() {
      let duration = 0
      if(this.ruleForm.startTime&&this.ruleForm.endTime){
        let durationStamp=this.ruleForm.endTime-this.ruleForm.startTime
        let fourHours=1000*60*60*4
        let total=Math.floor(durationStamp/fourHours)
        duration=Math.floor(total/2)+(total%2*0.5)
      }
      return duration;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "./../../styles/variables";
// .usersContainer {
// }
</style>
