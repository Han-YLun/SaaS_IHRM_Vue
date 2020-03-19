<template>
  <div class="AdjustThePost">
    <div class="infoBox">
      <div class="logo">
        <img src="./../../assets/img.jpeg" alt />
      </div>
      <div class="info">
        <p>
          <span class="name">{{ ruleForm.username }}</span>
        </p>
        <p>
          <span>部门：</span>
          {{ ruleForm.department }}
          <span>岗位：</span>
          {{ ruleForm.post }}
        </p>
        <p>
          <span>入职时间：</span>
          {{ ruleForm.timeOfEntry }}
        </p>
      </div>
    </div>
    <div>
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="申请类型：" prop="type">
          <el-input v-model="ruleForm.applicationType" style="width: 220px;" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="聘用形式：" prop="formOfEmployment">
          <el-input v-model="ruleForm.formOfEmployment" style="width: 220px;" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="转正状态：" prop="stateOfCorrection">
          <el-input v-model="ruleForm.stateOfCorrection" style="width: 220px;" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="期望离职时间：" prop="expectedDepartureTime">
          <el-date-picker
            v-model="ruleForm.startTime"
            type="date"
            format="yyyy-MM-dd"
            placeholder="选择日期"
            :disabled="computeOpType"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="离职原因：" prop="reasonsForLeaving">
          <el-input
            type="textarea"
            style="width: 400px;"
            placeholder="显示提交人填写的离职原因"
            v-model="ruleForm.cause"
            :disabled="computeOpType"
          ></el-input>
        </el-form-item>
        <el-form-item label="图片：">
          <img src="./../../assets/404_images/404.png" width="300" alt />
        </el-form-item>
        <div class="buttones" style="text-align: center;margin-top: 40px">
          <el-form-item>
            <el-button
              type="primary"
              @click="btnClick"
              v-show="(this.ruleForm.stateOfApproval == '待审批' || this.ruleForm.stateOfApproval == '已驳回') && this.tabLab =='launch'"
            >撤销</el-button>
            <el-button
              type="primary"
              @click="btnPass"
              v-show="this.ruleForm.stateOfApproval == '待审批' && this.tabLab =='approvals'"
            >通过</el-button>
            <el-button
              type="primary"
              @click="btnReject"
              v-show="this.ruleForm.stateOfApproval == '待审批' && this.tabLab =='approvals'"
            >驳回</el-button>
          <el-button
              type="primary"
              @click="btnSave"
              v-show="this.ruleForm.stateOfApproval == '已撤销' && this.tabLab =='launch'"
            >提交</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  approvalsDetail,
  approvalsDel,
  approvalsPass,
  approvalsReject,
  applyDimission
} from "@/api/hrm/approvalsApi";

export default {
  name: "users-table-index",
  props: ["selectedId", "tabLab"],
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      timeValue: "",
      ruleForm: {}
    };
  },
  computed: {
    computeOpType() {
      return this.ruleForm.stateOfApproval == "已撤销" ? false : true;
    }
  },
  methods: {
    async init(id) {
      this.id = id;
      const { data: detailRes } = await approvalsDetail({ id });
      if (detailRes.success) {
        this.ruleForm = detailRes.data;
      }
    },
    async btnClick() {
      let id = this.id;
      const { data: delRes } = await approvalsDel({ id });
      if (delRes.success) {
        this.$message.success("撤销成功");
        this.$emit("closeDialog");
      }
    },
    async btnPass() {
      let id = this.id;
      const { data: passRes } = await approvalsPass({ id });
      if (passRes.success) {
        this.$message.success("操作成功");
        this.$emit("closeDialog");
      }
    },
    async btnReject() {
      let id = this.id;
      const { data: rejectRes } = await approvalsReject({ id });
      if (rejectRes.success) {
        this.$message.success("操作成功");
        this.$emit("closeDialog");
      }
    },
    async btnSave() {
      let sendForm = {}
      sendForm.processInstanceId=this.id
      sendForm.expectedDepartureTime=this.ruleForm.startTime
      sendForm.reasonsForLeaving=this.ruleForm.cause
      const { data: saveRes } = await applyDimission(sendForm)
      if(saveRes.success){
        this.ruleForm = {}
        this.$emit("closeDialog");
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    updateData(id) {
      this.init(id);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  },
  mounted() {
    this.init(this.selectedId);
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "./../../styles/variables";
.AdjustThePost {
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
}
</style>
