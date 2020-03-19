<template>
  <div class="AdjustThePost">
    <div class="infoBox">
      <div class="logo"><img src="./../../assets/img.jpeg" alt=""></div>
      <div class="info">
        <p><span class="name">{{ ruleForm.fullName }}</span></p>
        <p><span>部门：</span> {{ ruleForm.department }}      <span>岗位：</span> {{ ruleForm.post }} </p>
        <p><span>入职时间：</span> {{ ruleForm.timeOfEntry }} </p>
      </div>
    </div>
    <div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="申请人：" prop="applicant">
          <el-input v-model="ruleForm.applicant" style="width: 220px;"></el-input>
        </el-form-item>
        <el-form-item label="工作经验：" prop="handsOnBackground">
          <el-input v-model="ruleForm.handsOnBackground" style="width: 220px;"></el-input>
        </el-form-item>
        <el-form-item label="专业：" prop="major">
          <el-input v-model="ruleForm.major" style="width: 220px;"></el-input>
        </el-form-item>
        <el-form-item label="工资基数：" prop="wageBase">
          <el-input v-model="ruleForm.wageBase" style="width: 220px;"></el-input>
        </el-form-item>
        <el-form-item label="聘用形式：" prop="formOfEmployment">
          <el-input v-model="ruleForm.formOfEmployment" style="width: 220px;"></el-input>
        </el-form-item>
        <el-form-item label="职级：" prop="rank">
          <el-input v-model="ruleForm.rank" style="width: 220px;"></el-input>
        </el-form-item>
        <el-form-item label="当前公司：" prop="currentCompany">
          <el-input v-model="ruleForm.currentCompany" style="width: 220px;"></el-input>
        </el-form-item>
        <el-form-item label="当前职位：" prop="currentPosition">
          <el-input v-model="ruleForm.currentPosition" style="width: 220px;"></el-input>
        </el-form-item>
        <el-form-item label="其他福利：" prop="otherBenefits">
          <el-input type="textarea" style="width: 400px;" placeholder="显示加班人填写的加班原因" v-model="ruleForm.otherBenefits"></el-input>
        </el-form-item>
        <el-form-item label="附件：" prop="types">
          点击查看
        </el-form-item>
        <el-form-item label="简历预览：" prop="types">
          点击查看
        </el-form-item>

        <div class="buttones" style="text-align: center;margin-top: 40px">
          <el-form-item>
            <el-button type="primary" >通过</el-button>
            <el-button type="primary" >驳回</el-button>
            <el-button type="primary" >撤销</el-button>
            <el-button type="primary" >转发</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { list } from '@/api/example/table'
  import { employ } from '@/api/hrm/usersApi'

  export default {
    name: 'users-table-index',
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        timeValue: '',
        ruleForm: {},
        rules: {
          applicant: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      init () {
        employ({})
          .then(res => {
            this.ruleForm = res.data
            console.log(res.data)
            this.loading = false
          })
          .catch(err => {
            console.log(err)
            this.loading = false
          })
      },
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      }
    },
    mounted() {
      this.init()
    }
  }
</script>
<style>
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "./../../styles/variables";
  .AdjustThePost{
    .infoBox{
      display: flex;
      border-bottom: solid 1px #ccc;
      margin-bottom: 20px;
      padding: 10px 0 20px 0;
      img{
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
      .logo{
        border:solid 1px #ccc;
        width: 102px;
        height: 102px;
        border-radius: 50%;
        margin-right: 20px;
      }
      .info{
        p{
          line-height: 30px;
          .name{font-size: 16px;}
          span{
            font-weight: bold;
            display: inline-block;
            margin-right: 0px;
            margin-left: 10px;
          }
        }
      }
      .buttones{
        text-align: center;
      }
    }
  }
</style>
