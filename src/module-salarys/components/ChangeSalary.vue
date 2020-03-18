<template>
  <div class="changeSalary">
    <div class="infoBox">
      <div class="logo">
        <img src="./../../assets/img.jpeg" alt />
      </div>
      <div class="info">
        <p>
          <span class="name">{{userSalary.username}}</span>
        </p>
        <p>
          <span>部门：</span>
          {{userSalary.departmentName}}
          <span>岗位：</span>
          {{userSalary.post}}
        </p>
        <p>
          <span>入职时间：</span>
          {{userSalary.timeOfEntry}}
        </p>
      </div>
    </div>
    <div>
      <el-form :model="ruleForm" label-width="110px" class="demo-ruleForm">
        <el-form-item label="调整基本工资">
          <el-input v-model="userSalary.currentBasicSalary" style="width: 220px;" :disabled="true"></el-input>
          <span class="Label">-></span>
          <el-input
            v-model="ruleForm.currentBasicSalary"
            style="width: 220px;"
            placeholder="请输入调整后基本工资"
            type="number"
          ></el-input>
        </el-form-item>
        <el-form-item label="调整岗位工资">
          <el-input v-model="userSalary.currentPostWage" style="width: 220px;" :disabled="true"></el-input>
          <span class="Label">-></span>
          <el-input
            v-model="ruleForm.currentPostWage"
            style="width: 220px;"
            placeholder="请输入调整后岗位工资"
            type="number"
          ></el-input>
        </el-form-item>
        <el-form-item label="工资合计">
          <el-input v-model="computeCurrentTotal" style="width: 220px;" :disabled="true"></el-input>
          <span class="Label">-></span>
          <el-input v-model="computeChangeTotal" style="width: 220px;" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="调整幅度">
          <el-input v-model="computeChangeSize" style="width: 220px;" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="调薪生效时间">
          <el-date-picker
            v-model="ruleForm.effectiveTimeOfPayAdjustment"
            type="datetime"
            style="width: 220px;"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="调整原因">
          <el-input
            v-model="ruleForm.causeOfSalaryAdjustment"
            style="width: 220px;"
            type="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item label="附件">
          <img src="./../../assets/img.jpeg" width="300" alt />
        </el-form-item>
        <div class="buttones" style="text-align: center;margin-top: 40px;">
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button @click="onClose">关闭</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { changeSalary } from "@/api/hrm/salarysApi";
export default {
  name: "users-table-index",
  props: ["userSalary"],
  data() {
    return {
      ruleForm: {},
      changeSize: 0
    };
  },
  computed: {
    computeCurrentTotal() {
      let base = 0;
      if (this.userSalary.currentBasicSalary != null) {
        base = Number(this.userSalary.currentBasicSalary);
      }
      let post = 0;
      if (this.userSalary.currentPostWage != null) {
        post = Number(this.userSalary.currentPostWage);
      }
      return base + post;
    },
    computeChangeTotal() {
      let base = 0;
      if (this.ruleForm.currentBasicSalary != null) {
        base = Number(this.ruleForm.currentBasicSalary);
      }
      let post = 0;
      if (this.ruleForm.currentPostWage != null) {
        post = Number(this.ruleForm.currentPostWage);
      }
      return base + post;
    },
    computeChangeSize() {
      return this.computeChangeTotal - this.computeCurrentTotal;
    }
  },
  methods: {
    async saveData() {
      let sendData = this.ruleForm;
      sendData.userId = this.userSalary.userId;
      const { data: saveRes } = await changeSalary(sendData);
      if (saveRes.success == true) {
        this.ruleForm = {};
        this.$emit("onDialogCancel");
      }
    },
    onSubmit() {
      this.saveData();
    },
    onClose() {
      this.ruleForm = {};
      this.$emit("onDialogCancel");
    }
  },
  mounted() {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "./../../styles/variables";
.changeSalary {
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
