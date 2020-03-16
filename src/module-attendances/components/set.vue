<template>
  <div class="add-form">
    <el-dialog title="设置" :visible.sync="dialogFormVisible">
      <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-left:20px">
        <el-tab-pane label="出勤设置" name="first">
          <el-form
            ref="dataForm"
            :rules="rules"
            :model="formBase"
            label-position="right"
            label-width="100px"
            style="width:700px;"
            class="titmInfo"
          >
            <el-form-item label="部门：" prop="departmentId">
              <el-select v-model="formBase.departmentId" placeholder="请选择" @change="handleChange">
                <el-option
                  v-for="item in departmentData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="出勤时间：" prop="morningStartTime" style="">
              <el-time-select
                v-model="formBase.morningStartTime"
                :picker-options="{
                start: '00:00',
                step: '00:05',
                end: '23:59'
              }"
                :placeholder="formBase.morningStartTime"
                class="timePicker"
              ></el-time-select>-
              <el-time-select
                v-model="formBase.morningEndTime"
                :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30'
              }"
                :placeholder="formBase.morningEndTime"
                class="timePicker"
              ></el-time-select>
              <el-time-select
                v-model="formBase.afternoonStartTime"
                :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30'
              }"
                :placeholder="formBase.afternoonStartTime"
                class="timePicker"
              ></el-time-select>-
              <el-time-select
                v-model="formBase.afternoonEndTime"
                :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30'
              }"
                :placeholder="formBase.afternoonEndTime"
                class="timePicker"
              ></el-time-select>
            </el-form-item>
          </el-form>
          <div class="el-dialog__footer dialog-footer">
            <el-button type="primary" @click="handleAttendance">保存更新</el-button>
            <el-button @click="handleClose">{{$t('table.cancel')}}</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="请假设置" name="second">
          <el-form
            ref="leaveForm"
            :rules="rules"
            :model="leaveBase"
            label-position="right"
            label-width="80px"
            class="titmInfo"
          >
            <el-form-item label="部门：" prop="departmentId">
              <el-select
                v-model="leaveBase.departmentId"
                placeholder="请选择"
                @change="handleChangeLeave"
              >
                <el-option
                  v-for="item in departmentData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <p>假期类型</p>
          <el-table ref="singleTable" :data="stateData.type" style="width: 100%">
            <el-table-column prop="name" label="类型" width="200"></el-table-column>
            <el-table-column label="是否可用">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.isEnable"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                ></el-switch>
              </template>
            </el-table-column>
          </el-table>
          <div class="el-dialog__footer dialog-footer">
            <el-button type="primary" @click="handleLeave">保存更新</el-button>
            <el-button @click="handleClose">{{$t('table.cancel')}}</el-button>
          </div>
          <el-alert type="warning" show-icon :closable="false" title>
            <template>
              <div class="tipInfo">
                <p>事假 请假单位为0.5天 只能提交工作日内的请假单</p>
                <p>当请假开关关闭后，员工则不可在员工端提交请假申请</p>
              </div>
            </template>
          </el-alert>
        </el-tab-pane>
        <el-tab-pane label="扣款设置" name="third">
          <el-form
            ref="deductionsForm"
            :rules="rules"
            :model="deductionsBase"
            label-position="right"
            label-width="80px"
            class="titmInfo"
          >
            <el-form-item label="部门：" prop="departmentId">
              <el-select
                v-model="deductionsBase.departmentId"
                placeholder="请选择"
                @change="handleChangeDeductions"
              >
                <el-option
                  v-for="item in departmentData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-table ref="singleTable" :data="stateData.departmentType" style="width: 100%">
            <!-- <el-table-column prop="name" label="类型" width="200"></el-table-column> -->
            <el-table-column>
              <template slot-scope="scope">
                <div>
                  {{scope.row.name}}
                  <el-switch
                    v-model="scope.row.isEnable"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    @change="handleStatus($event,scope.row)"
                  ></el-switch>
                </div>

                <div class="attentInfo" v-if="scope.row.dedTypeCode==='51000'">
                  <p>
                    迟到≤
                    <el-input
                      v-model="scope.row.periodUpperLimit"
                      class="inputInfo"
                      value="30"
                      @input.native="handleInput($event)"
                    ></el-input>分钟
                  </p>
                  <div class="deductionInfo">
                    <p>
                      迟到≤
                      <el-input
                        v-model="scope.row.timesUpperLimit"
                        class="inputInfo"
                        @input.native="handleInput($event)"
                      ></el-input>次，每次扣款
                      <el-input
                        v-model="scope.row.dedAmonutUpperLimit"
                        class="inputInfo"
                        @input.native="handleInput($event)"
                      ></el-input>元
                    </p>
                    <p>
                      迟到>
                      <el-input
                        v-model="scope.row.timesLowerLimit"
                        class="inputInfo"
                        @input.native="handleInput($event)"
                        disabled
                      ></el-input>次，每次扣款
                      <el-input
                        v-model="scope.row.dedAmonutLowerLimit"
                        class="inputInfo"
                        @input.native="handleInput($event)"
                      ></el-input>元
                    </p>
                  </div>
                  <p>
                    迟到>
                    <el-input v-model="scope.row.periodLowerLimit" class="inputInfo" disabled></el-input>分钟
                  </p>
                  <div class="deductionInfo">
                    <p>
                      迟到>
                      <el-input
                        v-model="scope.row.absenceTimesUpperLimt"
                        class="inputInfo"
                        disabled
                      ></el-input>次，每次矿工
                      <el-input
                        v-model="scope.row.absenceDays"
                        class="inputInfo"
                        @input.native="handleInputPoint($event)"
                      ></el-input>天
                    </p>
                  </div>
                </div>
                <div class="attentInfo" v-if="scope.row.dedTypeCode==='52000'">
                  <p>
                    早退≤
                    <el-input
                      v-model="scope.row.periodUpperLimit"
                      class="inputInfo"
                      @input.native="handleInput($event)"
                      value="30"
                    ></el-input>分钟
                  </p>
                  <div class="deductionInfo">
                    <p>
                      早退≤
                      <el-input
                        v-model="scope.row.timesUpperLimit"
                        class="inputInfo"
                        @input.native="handleInput($event)"
                      ></el-input>次，每次扣款
                      <el-input
                        v-model="scope.row.dedAmonutUpperLimit"
                        class="inputInfo"
                        @input.native="handleInput($event)"
                      ></el-input>元
                    </p>
                    <p>
                      早退>
                      <el-input v-model="scope.row.timesLowerLimit" class="inputInfo" disabled></el-input>次，每次扣款
                      <el-input
                        v-model="scope.row.dedAmonutLowerLimit"
                        class="inputInfo"
                        @input.native="handleInput($event)"
                      ></el-input>元
                    </p>
                  </div>
                  <p>
                    早退>
                    <el-input v-model="scope.row.periodLowerLimit" class="inputInfo" disabled></el-input>分钟
                  </p>
                  <div style="padding-left:120px;">
                    <p>
                      早退>
                      <el-input
                        v-model="scope.row.absenceTimesUpperLimt"
                        class="inputInfo"
                        disabled
                      ></el-input>次，每次矿工
                      <el-input
                        v-model="scope.row.absenceDays"
                        class="inputInfo"
                        @input.native="handleInputPoint($event)"
                      ></el-input>天
                    </p>
                  </div>
                </div>
                <div class="attentInfo" v-if="scope.row.dedTypeCode==='53000'">
                  <p>
                    矿工按
                    <el-input
                      v-model="scope.row.fineSalaryMultiples"
                      class="inputInfo"
                      @input.native="handleInput($event)"
                    ></el-input>倍工资处罚
                  </p>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="el-dialog__footer dialog-footer">
            <el-button type="primary" @click="handleDeductions">保存更新</el-button>
            <el-button @click="handleClose">{{$t('table.cancel')}}</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="加班设置" name="fourth">
          <el-form
            ref="overtimeForm"
            :model="overtimeBase"
            :rules="overtimeRule"
            label-width="110px"
          >
            <!-- <el-form-item label="日时长折算">
              <div class="ruleInfo">
                <el-input v-model="baseTime.time" style="width:40px"></el-input>小时 = 1天
              </div>
            </el-form-item>-->
            <el-form-item label="部门：" prop="departmentId">
              <el-select
                v-model="overtimeBase.departmentId"
                placeholder="请选择"
                @change="handleChangeovertime"
              >
                <el-option
                  v-for="item in departmentData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="加班规则：">
              <div class="ruleInfo" v-for="item in overtimeBase.rules" :key="item.id">
                <el-row>
                  <el-col :span="8">
                    <div class="grid-content bg-purple">
                      <el-switch v-model="item.isEnable"></el-switch>
                      &nbsp;&nbsp;{{item.rule}}
                    </div>
                  </el-col>
                  <el-col :span="16">
                    <div class="grid-content bg-purple-light">
                      <span class="pad">
                        <el-checkbox v-model="item.isTimeOff">调休假</el-checkbox>
                      </span>
                      <template>
                        <el-time-select
                          v-model="item.ruleStartTime"
                          :picker-options="{
                              start: '01:00',
                              step: '00:15',
                              end: '23:59'
                            }"
                          style="width:100px;"
                          :disabled="item.isTimeOff===false"
                        ></el-time-select>
                        <el-time-select
                          v-model="item.ruleEndTime"
                          :picker-options="{
                              start: '01:00',
                              step: '00:15',
                              end: '23:59',
                              minTime: item.startTime
                            }"
                          style="width:100px;"
                          :disabled="item.isTimeOff===false"
                        ></el-time-select>
                      </template>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>
            <el-form-item label="打卡验证：" prop="isClock">
              <el-switch v-model="overtimeBase.isClock"></el-switch>&nbsp;&nbsp;加班需要有打卡记录
            </el-form-item>
            <el-form-item label="开启补偿：" prop="isCompensationint">
              <el-switch v-model="overtimeBase.isCompensationint"></el-switch>
            </el-form-item>
            <el-form-item label="调休假设置：" prop="latestEffectDate">
              <div class="ruleInfo">
                最晚有效期： 次年
                <el-date-picker
                  v-model="overtimeBase.latestEffectDate"
                  type="date"
                  placeholder="选择日期"
                  style="width:150px;"
                ></el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label prop="unit">
              <div class="ruleInfo">
                <p>
                  请假最小单位
                  <el-input v-model="overtimeBase.unit" style="width:50px"></el-input>天
                </p>
              </div>
            </el-form-item>
          </el-form>
          <div class="el-dialog__footer dialog-footer">
            <el-button type="primary" @click="handleOvertime">保存更新</el-button>
            <el-button @click="handleClose">{{$t('table.cancel')}}</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import { add, jobnumber } from "@/api/base/employees";
import { getInteger, getIntegerPoint } from "@/filters/index";
import {
  list,
  attendanceSave,
  getAttendance,
  leaveSave,
  getLeave,
  deductionsSave,
  getDeductions,
  overtimeSave,
  getOvertime
} from "@/api/base/dept";
import attendanceApi from "@/api/constant/attendance";
import commonApi from "@/utils/common";
var _this = null;
export default {
  name: "add",
  props: [],
  data() {
    return {
      dialogFormVisible: false,
      isShowSelect: false,
      formOfEmployment: "",
      activeName: "first",
      formBase: {
        morningStartTime: "",
        morningEndTime: "",
        afternoonStartTime: "",
        afternoonEndTime: "",
        departmentId: ""
      },
      leaveBase: {
        departmentId: ""
      },
      deductionsBase: {
        departmentId: ""
      },
      overtimeBase: {
        departmentId: "",
        isClock: false,
        isCompensationint: false,
        latestEffectDate: "",
        unit: "",
        rules: attendanceApi.overtimeType
      },
      departmentData: [],
      stateData: [],
      tylelist: [],
      deductionList: [],
      oldNum: "",
      rules: {
        //表单验证
        // name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        departmentId: [
          { required: true, message: "请选择部门", trigger: "change" }
        ],
        morningStartTime: [
          { required: true, message: "请选择时间", trigger: "change" }
        ]
      },
      overtimeRule: {
        //表单验证
        unit: [
          { required: true, message: "调休单位不能为空(", trigger: "blur" }
        ],
        departmentId: [
          { required: true, message: "请选择部门", trigger: "change" }
        ],
        isClock: [
          { required: true, message: "请选择打卡验证", trigger: "change" }
        ],
        isCompensationint: [
          { required: true, message: "请选择补偿", trigger: "change" }
        ],
        latestEffectDate: [
          { required: true, message: "请选择时间", trigger: "change" }
        ]
      }
    };
  },
  computed: {
    inpNum() {
      return this.oldNum;
    }
  },
  methods: {
    init() {},
    // 业务方法
    // 获取部门
    async getdepartment() {
      await list().then(data => {
        this.departmentData = data.data.data.depts;
        this.formBase.departmentId = this.leaveBase.departmentId = this.deductionsBase.departmentId = this.overtimeBase.departmentId = this.departmentData[0].id;
      });
      this.handleChange(this.leaveBase.departmentId);
    },
    // 弹层显示
    dialogFormV() {
      this.dialogFormVisible = true;
    },
    // 弹层隐藏
    dialogFormH() {
      this.dialogFormVisible = false;
    },
    clearFormDate() {
      this.formBase = {};
    },
    // 退出
    handleClose() {
      this.dialogFormH();
      this.clearFormDate();
    },
    // 界面交互
    // 表单提交
    createData() {
      this.formBase.formOfEmployment = this.formOfEmployment;
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          add(this.formBase).then(() => {
            this.$emit("clearFormDate", this.formBase);
            this.formBase = {};
            this.$emit("doQuery", this.requestParameters);
          });
          this.dialogFormVisible = false;
        } else {
          this.$message.error("*号为必填项!");
          return false;
        }
      });
    },
    // 出勤选择部门
    handleChange(val) {
      getAttendance({ departmentId: val }).then(res => {
        if (res.data.code === 10000) {
          this.formBase = res.data.data;
        } else {
          this.formBase.morningStartTime = "";
          this.formBase.morningEndTime = "";
          this.formBase.afternoonStartTime = "";
          this.formBase.afternoonEndTime = "";
        }
      });
    },
    // 请假选择部门
    handleChangeLeave(val) {
      this.leaveBase.departmentId = val;
      this.stateData.type.forEach(item => {
        item.isEnable = false;
        item.departmentId = val;
      });
      getLeave({ departmentId: val }).then(res => {
        if (res.data.code === 10000) {
          var data = res.data.data;
          data.forEach(item => {
            if (item.isEnable === 0) {
              item.isEnable = true;
            } else {
              item.isEnable = false;
            }
            this.stateData.type.forEach(val => {
              if (val.leaveType === item.leaveType) {
                val.isEnable = item.isEnable;
              }
            });
          });
        }
      });
    },
    // 扣款选择部门
    handleChangeDeductions(val) {
      this.deductionsBase.departmentId = val;
      this.stateData.departmentType.forEach(item => {
        item.departmentId = val;
        item.isEnable = false;
      });
      getDeductions({ departmentId: val }).then(res => {
        if (res.data.code === 10000) {
          var data = res.data.data;
          data.forEach(item => {
            if (item.isEnable === 0) {
              item.isEnable = true;
            } else {
              item.isEnable = false;
            }
            this.stateData.departmentType.forEach(val => {
              if (val.dedTypeCode === item.dedTypeCode) {
                val.isEnable = item.isEnable;
              }
            });
          });
        }
      });
    },
    // 加班选择部门
    handleChangeovertime(val) {
      this.overtimeBase.departmentId = val;
      this.overtimeBase.rules.forEach(item => {
        item.departmentId = val;
        item.isEnable = item.isTimeOff = false;
        item.ruleEndTime = item.ruleStartTime = "";
      });
      this.overtimeBase.latestEffectDate = "";
      this.overtimeBase.unit = "";
      this.overtimeBase.isClock = this.overtimeBase.isCompensationint = false;
      getOvertime({ departmentId: val }).then(res => {
        if (res.data.code === 10000) {
          var data = res.data.data;
          if (data.dayOffConfigs !== null || data.extraDutyConfig !== null) {
            this.overtimeBase.departmentId = data.dayOffConfigs.departmentId;
            this.overtimeBase.latestEffectDate =
              data.dayOffConfigs.latestEffectDate;
            this.overtimeBase.unit = data.dayOffConfigs.unit;
            this.overtimeBase.isClock = data.extraDutyConfig.isClock;
            this.overtimeBase.isCompensationint =
              data.extraDutyConfig.isCompensationint;
          }

          if (this.overtimeBase.isClock === 0) {
            this.overtimeBase.isClock = true;
          } else {
            this.overtimeBase.isClock = false;
          }
          if (this.overtimeBase.isCompensationint === 0) {
            this.overtimeBase.isClock = true;
          } else {
            this.overtimeBase.isCompensationint = false;
          }
          if (data.extraDutyRuleList.length > 0) {
            data.extraDutyRuleList.forEach(item => {
              if (item.isEnable === 0) {
                item.isEnable = true;
              } else {
                item.isEnable = false;
              }
              if (item.isTimeOff === 0) {
                item.isTimeOff = true;
              } else {
                item.isTimeOff = false;
              }
            });
            this.overtimeBase.rules = data.extraDutyRuleList;
          }
        }
      });
    },
    // 考勤配置保存更新
    handleAttendance() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          attendanceSave(this.formBase).then(() => {
            this.$emit("dataSearch");
            this.handleClose();
          });
        } else {
          this.$message.error("*号为必填项!");
          return false;
        }
      });
    },
    // 请假配置保存更新
    handleLeave() {
      this.$refs["leaveForm"].validate(valid => {
        if (valid) {
          this.tylelist = this.stateData.type;
          this.tylelist.forEach(item => {
            if (item.isEnable == true) {
              item.isEnable = "0";
            } else {
              item.isEnable = "1";
            }
          });
          leaveSave(this.tylelist).then(() => {
            this.$emit("dataSearch");
            this.handleClose();
          });
        } else {
          this.$message.error("*号为必填项!");
          return false;
        }
      });
    },
    // 扣款配置保存更新
    handleDeductions() {
      this.$refs["deductionsForm"].validate(valid => {
        if (valid) {
          var deductionList = this.stateData.departmentType;
          deductionList.forEach(item => {
            if (item.isEnable == true) {
              item.isEnable = "0";
            } else {
              item.isEnable = "1";
            }
          });
          deductionsSave(deductionList).then(() => {
            this.$emit("dataSearch");
            this.handleClose();
          });
        } else {
          this.$message.error("*号为必填项!");
          return false;
        }
      });
    },
    // 加班配置保存更新
    handleOvertime() {
      this.$refs["overtimeForm"].validate(valid => {
        if (valid) {
          var deductionList = this.overtimeBase;
          deductionList.latestEffectDate = commonApi.dateFormat(
            deductionList.latestEffectDate
          );
          if (deductionList.isClock === true) {
            deductionList.isClock = "0";
          } else {
            deductionList.isClock = "1";
          }
          if (deductionList.isCompensationint === true) {
            deductionList.isCompensationint = "0";
          } else {
            deductionList.isCompensationint = "1";
          }
          deductionList.rules.forEach(item => {
            if (item.isEnable == true) {
              item.isEnable = "0";
            } else {
              item.isEnable = "1";
            }
            if (item.isTimeOff == true) {
              item.isTimeOff = "0";
            } else {
              item.isTimeOff = "1";
            }
          });
          overtimeSave(deductionList).then(() => {
            this.$emit("dataSearch");
            this.handleClose();
          });
        } else {
          this.$message.error("*号为必填项!");
          return false;
        }
      });
    },
    // 点击设置标签
    handleClick(tab, event) {
      if (tab.index === "0") {
        if (this.formBase.departmentId !== "") {
          this.handleChange(this.formBase.departmentId);
        }
      }
      if (tab.index === "1") {
        if (this.leaveBase.departmentId !== "") {
          this.handleChangeLeave(this.leaveBase.departmentId);
        }
      } else if (tab.index === "2") {
        if (this.deductionsBase.departmentId !== "") {
          this.handleChangeDeductions(this.deductionsBase.departmentId);
        }
      } else {
        if (this.overtimeBase.departmentId !== "") {
          this.handleChangeovertime(this.overtimeBase.departmentId);
        }
      }
    },
    typeTip(obj) {
      this.$message.error(obj);
    },
    // 验证输入正整数
    handleInput: function(e) {
      getInteger(e, this.typeTip);
    },
    // 获取小数点后1位
    handleInputPoint(e) {
      getIntegerPoint(e);
    },
    //
    handleStatus(e, obj) {
      obj.departmentId = this.deductionsBase.departmentId;
      if (this.deductionsBase.departmentId === "") {
        this.$message.error("请选择部门");
        return false;
      } else {
        // if (e === true) {
        //   this.deductionList.push(obj);
        // } else {
        //   if (this.deductionList.length > 0) {
        //     this.deductionList.forEach((item, index) => {
        //       if (item.leaveType === obj.leaveType) {
        //         item.departmentId = this.leaveBase.departmentId;
        //         this.deductionList.splice(index, 1);
        //       }
        //     });
        //   }
        // }
      }
    }
  },
  // 挂载结束
  mounted: function() {
    this.getdepartment();
    this.stateData = attendanceApi;
  },
  // 创建完毕状态
  created: function() {
    _this = this;
  },
  // 组件更新
  updated: function() {}
};
</script>

<style rel="stylesheet/scss" lang="scss">
.attentInfo {
  p {
    padding: 3px 0;
  }
  .el-input--medium {
    .el-input__inner {
      height: 24px;
      line-height: 24px;
    }
  }
}
.titmInfo {
  .el-date-editor--timerange.el-input__inner {
    width: 280px;
  }
  .el-date-editor .el-range-separator {
    padding: 0 15px 0 0;
  }
}
.ruleInfo {
  .el-input--medium .el-input__inner {
    height: 30px;
    line-height: 30px;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.tipInfo {
  p {
    padding: 5px 0;
  }
}
.titInfo {
  border-bottom: 1px solid #dcdfe6;
  height: 30px;
  line-height: 30px;
  padding: 0 0 15px;
}
.attentInfo {
  padding: 30px 15px 15px 80px;
}
.ruleInfo {
  .pad {
    padding-left: 80px;
  }
}
</style>
