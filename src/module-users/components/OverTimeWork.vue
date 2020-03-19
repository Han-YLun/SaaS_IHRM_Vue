<template>
  <div class="usersContainer">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm2" label-width="110px" class="demo-ruleForm">
      <el-form-item label="申请类型" prop="region">
        <el-select v-model="ruleForm.value" placeholder="请选择" style="width: 220px;">
          <el-option v-for="item in ruleForm.options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="加班开始时间" prop="times">
        <el-col :span="8">
          <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.time1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="1" style="text-align: center">-</el-col>
        <el-col :span="8">
          <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.time1" style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="加班结束时间" prop="times">
        <el-col :span="8">
          <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.time1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="1"  style="text-align: center">-</el-col>
        <el-col :span="8">
          <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.time1" style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="补偿方式">
        <span>调休</span>
      </el-form-item>
      <el-form-item label="加班时长">
        <div>1小时 <span style="color:#f00;"> 加班时长根据开始时间与结束时间自动计算，最小0.5小时</span></div>
      </el-form-item>
      <el-form-item label="加班原因" prop="reason">
        <el-input type="textarea" style="width: 340px;" :autosize="{ minRows: 3, maxRows: 8}" placeholder="请输入内容" v-model="ruleForm.textarea">
        </el-input>
      </el-form-item>
      <el-form-item label="图片" prop="age">
        <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
          <div slot="tip" class="el-upload__tip" style="color:#f00;">注： 只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { list } from '@/api/example/table'

  export default {
    name: 'users-table-index',
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        ruleForm: {
          value: '',
          textarea: '',
          time1: '',
          time2: '',
          options: [{
            value: '离职',
            label: '离职'
          }, {
            value: '加班',
            label: '加班'
          }]
        },
        rules: {
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          times: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          reason: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "./../../styles/variables";
  .usersContainer{
    .el-form-item{
      margin-bottom: 20px;
      .el-form-item__error{
        position: relative;
        margin-left: 300px;
      }
    }
  }
</style>
