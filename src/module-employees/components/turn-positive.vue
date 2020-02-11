<template>
  <div class="add-form">
    
    <el-dialog title="转正" :visible.sync="dialogFormVisible">
      <div class="leaveInfo">
        <el-row>
          <el-col :span="4">
              <!-- 头像 -->
              <component v-bind:is="userHead" headImg="http://pic.nipic.com/2008-05-29/20085299247191_2.jpg"></component>
          </el-col>
          <el-col :span="20">
            <div class="headInfo">
              <p><strong>{{userData.username}}</strong></p>
              <p><span>手机</span><em>{{userData.mobile}}</em><span>部门</span><em>{{userData.departmentName}}</em></p>
              <p><span>入职时间</span><em>{{userData.timeOfEntry}}</em></p>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-form ref="dataForm" :model="formData" label-position="right" label-width="120px" style='margin-left:120px; width:500px;'>
        <el-form-item label="转正时间：" prop="dateOfCorrection">
          <el-date-picker v-model="formData.dateOfCorrection" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="转正评价：">
          <el-input v-model="formData.correctionEvaluation" type='textarea' placeholder="请输入要搜索的城市"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="formBtn">提交</el-button>
        <el-button @click="dialogFormVisible=false">取消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { imgHandle } from '@/filters/index'
import { positive, positiveDetail } from '@/api/base/employees'
import * as userApi from "@/api/base/users"
import fileUpload from './upload'
import userHead from './component/user-head.vue'
var _this = null
export default {
  name: 'upload',
  components: {
    fileUpload,
    userHead
  },
  props: ['formBase', 'objInfoDataes'],
  data() {
    return {
      fileUpload: 'fileUpload',
      userHead: 'userHead',
      dialogFormVisible: false,
      positiveId: '',
      positiveData:{},
      formData:{},
      userData:{}
    }
  },
  methods: {
    // 业务方法
    // 弹层显示
    dialogFormV(id) {
      this.positiveData.id = id
      positiveDetail({ id: id }).then(ret => {
        this.formData = ret.data.data
      })
      userApi.detail({ id: id }).then(res => {
          this.userData = res.data.data
      })
      this.dialogFormVisible = true
    },
    // 表单提交
    formBtn() {
        positive(this.formData)
          .then(() => {
            this.$message.success('转正成功！')
          })
        this.dialogFormVisible = false
    }
  },
}
</script>

<style rel="stylesheet/scss" lang="scss">
.inputText {
  width: 400px;
  height: 32px;
  resize: none;
  line-height: 22px;
  overflow: hidden;
  font-size: 12px;
  border: 1px solid #dddee1;
  padding: 4px 7px;
  border-radius: 5px;
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.upload-list {
  padding: 0;
  margin: 0;
  li {
    list-style: none;
  }
}
</style>
