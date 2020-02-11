<template>
  <div class="add-form">
    <el-dialog title="员工设置" :visible.sync="dialogFormVisible">
      <el-tabs v-model="activeName" class="infoPosin">
        <el-tab-pane name="first" class="rInfo">
          <span slot="label">个人信息</span>
          <!-- 信息提示 -->
        <div class="infoTip">
          <el-alert
            title="当选择员工/管理可见时，员工/管理可在员工端的找人页面看到相关信息"
            type="warning"
            show-icon
            :closable="false">
          </el-alert>
        </div>
      <el-form ref="dataForm" :model="formData" label-position="right" label-width="100px">
          <el-row :gutter="20">
                  <el-col :span="4">
                    <div class="userHead"><img src="./../../assets/img.jpeg" width="100px" height="100px"></div>
                    </el-col>
                  <el-col :span="20">
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="姓名：" prop="fullName" class="setInfo">
                          员工：<el-checkbox label="可见" v-model="setData.fullName.user"></el-checkbox>
                          管理员：<el-checkbox label="可见" v-model="setData.fullName.manager"></el-checkbox>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                          <el-form-item label="性别：" prop="sex" class="setInfo">
                            员工：<el-checkbox label="可见" v-model="setData.sex.user"></el-checkbox>
                            管理员：<el-checkbox label="可见" v-model="setData.sex.manager"></el-checkbox>
                          </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="手机：" prop="fullName" class="setInfo">
                          员工：<el-checkbox label="可见" v-model="setData.mobilePhone.user"></el-checkbox>
                          管理员：<el-checkbox label="可见" v-model="setData.mobilePhone.manager"></el-checkbox>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                          <el-form-item label="出生日期：" prop="dateOfBirth">
                            员工：<el-checkbox label="可见" v-model="setData.dateOfBirth.user"></el-checkbox>
                            管理员：<el-checkbox label="可见" v-model="setData.dateOfBirth.manager"></el-checkbox>
                          </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="最高学历：" prop="fullName" class="setInfo">
                          员工：<el-checkbox label="可见" v-model="setData.theHighestDegreeOfEducation.user"></el-checkbox>
                          管理员：<el-checkbox label="可见" v-model="setData.theHighestDegreeOfEducation.manager"></el-checkbox>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
        
      </el-form>
        </el-tab-pane>
      </el-tabs>
      
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveBtn">保存</el-button>
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { settSave } from '@/api/base/employees'
var _this = null
export default {
  name: 'setting',
  props: ['setData'],
  data() {
    return {
      dialogFormVisible: false,
      activeName: 'first',
      formData: {}
    }
  },
  methods: {
    // 业务方法
    // 弹层显示
    dialogFormV() {
      this.dialogFormVisible = true
    },
    // 弹层隐藏
    dialogFormH() {
      this.dialogFormVisible = false
    },
    // 界面交互
    // 表单提交
    saveBtn() {
      settSave(this.setData)
        .then(() => {
          this.$message.success('保存成功！')
          this.$emit('newDataes')
          this.dialogFormVisible = false
        })
        .catch(e => {
          this.$message.error('保存失败！')
        })
    }
  },
  // 挂载结束
  mounted: function() {},
  // 创建完毕状态
  created: function() {
    _this = this
  },
  // 组件更新
  updated: function() {}
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
.setInfo {
  label {
    margin-right: 15px;
    padding: 0;
  }
}
.el-checkbox + .el-checkbox {
  margin: 0;
}
</style>
