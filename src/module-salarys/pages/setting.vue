<template>
  <div class="settingContent">
    <div class="settingTop">
      <div class="topLab" ><span @click="tabSwitch('launch')" :class="[tabLab == 'launch' ? 'act' : '']">计薪设置</span><span @click="tabSwitch('approvals')" :class="[tabLab == 'approvals' ? 'act' : '']">津贴设置</span></div>
    </div>
    <div class="content" v-show="tabLab == 'launch'">
      <el-form :label-position="labelPosition" label-width="140px" :model="sendForm">
        <el-form-item label="对应社保自然月">
          <el-select v-model="sendForm.socialSecurityType" style="width: 280px;">
            <el-option label="当月" :value="1"></el-option>
            <el-option label="次月" :value="2"></el-option>
          </el-select>
          <ul><span>?</span><li>如果201606月工资中扣除2016年6月自然月的社保公积金，请选择当月；如果扣除2016年7月自然月的社保公积金，请选择次月。</li></ul>
        </el-form-item>
        <el-form-item label="社保数据来源" style="width: 450px;">
          <el-input placeholder="社保模块" style="width: 280px;" :disabled="true"></el-input>
          <ul><span>?</span><li>计算工资时的五险一金金额将取自社保报表</li></ul>
        </el-form-item>
        <el-form-item label="考勤数据来源" style="width: 450px;">
          <el-input placeholder = "考勤模块"  style="width: 280px;" :disabled="true"></el-input>
          <ul><span>?</span><li>计算工资时的考勤数据将取自考勤统计表</li></ul>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">提交</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="content" v-show="tabLab == 'approvals'">
      <el-form :model="sendForm" status-icon label-width="100px" class="demo-ruleForm">
        <el-form-item label="通用方案">
          <el-input v-model="sendForm.subsidyName" style="width: 400px;" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="sendForm.subsidyRemark" style="width: 400px;" value = "适用于全体" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="津贴名称" class="nameList">
          <p>
            <el-input placeholder="交通补贴" style="width: 200px;" :disabled="true"></el-input>
            <el-select v-model="sendForm.transportationSubsidyScheme" placeholder="请选择">
              <el-option v-for="item in subsidySchemes" :key="item.id" :label="item.name" :value="item.id"> </el-option>
            </el-select>
          <ul><span>?</span><li>{{ text }}</li></ul>
          <el-input v-model="sendForm.transportationSubsidyAmount" placeholder="请输入内容" style="width: 200px;"></el-input>
          </p>
          <p>
            <el-input placeholder="通讯补贴" style="width: 200px;" :disabled="true"></el-input>
            <el-select v-model="sendForm.communicationSubsidyScheme" placeholder="请选择">
              <el-option v-for="item in subsidySchemes" :key="item.id" :label="item.name" :value="item.id"> </el-option>
            </el-select>
            <ul><span>?</span><li>{{ text }}</li></ul>
            <el-input v-model="sendForm.communicationSubsidyAmount" placeholder="请输入内容" style="width: 200px;"></el-input>
          </p>
          <p>
            <el-input placeholder="午餐补贴" style="width: 200px;" :disabled="true"></el-input>
            <el-select v-model="sendForm.lunchAllowanceScheme" placeholder="请选择">
              <el-option v-for="item in subsidySchemes" :key="item.id" :label="item.name" :value="item.id"> </el-option>
            </el-select>
          <ul><span>?</span><li>{{ text }}</li></ul>
          <el-input v-model="sendForm.lunchAllowanceAmount" placeholder="请输入内容" style="width: 200px;"></el-input>
          </p>
          <p>
            <el-input placeholder="住房补助" style="width: 200px;" :disabled="true"></el-input>
            <el-select v-model="sendForm.housingSubsidyScheme" placeholder="请选择">
              <el-option v-for="item in subsidySchemes" :key="item.id" :label="item.name" :value="item.id"> </el-option>
            </el-select>
          <ul><span>?</span><li>{{ text }}</li></ul>
          <el-input v-model="sendForm.housingSubsidyAmount" placeholder="请输入内容" style="width: 200px;"></el-input>
          </p>
        </el-form-item>
        <el-form-item label="适用计税方式">
          <template>
            <el-radio-group v-model="sendForm.taxCalculationType">
              <el-radio label="1">税前</el-radio>
              <el-radio label="2">税后</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">提交</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getSettings,saveSettings } from "@/api/hrm/salarysApi";
  export default {
    name: 'users-table-index',
    components: { },
    data() {
      return {
        sendForm:{
          socialSecurityType:1,
          transportationSubsidyScheme:1,
          communicationSubsidyScheme:1,
          lunchAllowanceScheme:1,
          housingSubsidyScheme:1,
          taxCalculationType:"1",
          transportationSubsidyAmount:2.1,
          communicationSubsidyAmount:1.2,
          lunchAllowanceAmount:1.3,
          housingSubsidyAmount:1.5
        },
        subsidySchemes:[
          {"id":1,"name":"每出勤日"},
          {"id":2,"name":"每计薪日"},
          {"id":3,"name":"每月固定"},
        ],
        topLabel: 'launch',
        tabLab: 'launch',
        labelPosition: 'left',
        radio: '1',
        text: '每出勤日：金额*实际出勤天数； 每计薪日：金额*计薪天数； 每月固定：固定金额；',
      }
    },
    methods: {
     async init () {
        const { data: getDataRes } = await getSettings()
        this.sendForm=getDataRes.data
      },
      tabSwitch(obj) {
        this.tabLab = obj
      },
      async saveData() {
      const { data: saveRes } = await saveSettings(this.sendForm)
      let suc=saveRes.success
      if(suc==true){
        this.$message({
        message: '保存成功',
        type: 'success'
      })
      }
      },
      submitForm(){
        this.saveData()
      },
      resetForm(){
        this.init()
      }
    },
    mounted() {
      this.init()
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "./../../styles/variables";
  .settingContent{
    padding: 20px;
    .settingTop{
      color:#666;
      background: #fff;
      border-bottom:solid 1px #ccc;
      line-height: 40px;
      span{
        display: inline-block;
        padding: 0 25px;
        font-size: 16px;
        cursor:pointer;
      }
      .act{
        color:$blue;
        border-bottom: solid 2px $blue;
      }
    }
    .content{
      background: #fff;
      padding: 20px;
      margin-top: 10px;
      ul{
        display: inline-block;
        position: relative;
        margin-left: 5px;
        margin-right: 5px;
        span{
          display: block;
          width: 15px;
          height: 15px;
          line-height: 15px;
          text-align: center;
          border:solid 1px #ccc;
          border-radius: 50%;
          color: #ccc;
          cursor:pointer;
        }
        li{
          display: none;
          position: absolute;
          background: #fdfdfd;
          width: 300px;
          left: -30px;
          top: 27px;
          border: solid 1px #ccc;
          line-height: 24px;
          padding:5px 10px;
          border-radius: 3px;
          z-index: 1;
        }
        li:after{
          content: '∧';
          position: absolute;
          left: 31px;
          top: -12px;
          background: #fdfdfd;
          color:#ccc;
          width: 10px;
          line-height: 14px;
        }
      }
      ul:hover li{
        cursor:pointer;
        display: block;
      }
      .nameList p{
        margin: 10px 0;
      }
    }
  }
</style>
