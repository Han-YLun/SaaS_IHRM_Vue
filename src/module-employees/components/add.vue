<template>
  <div class="add-form">
    <el-dialog title="编辑员工" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="formBase" label-position="left" label-width="120px" style='margin-left:120px; width:500px;'>
        <el-form-item label="姓名：">
          <el-input v-model="formBase.username" placeholder='1-30个字符'></el-input>
        </el-form-item>
        <el-form-item label="手机：">
            <el-input v-model="formBase.mobile" placeholder='请输入手机号' class="inputW"></el-input>
        </el-form-item>
        <el-form-item label="入职时间：">
          <el-date-picker v-model="formBase.timeOfEntry" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="聘用形式：">
          <el-select class="filter-item" v-model="formBase.formOfEmployment">
            <el-option v-for="item in employeesData" :key="item.id" :label="item.value" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工号：">
          <el-input type="number" v-model="formBase.workNumber" placeholder="1-20个字符"></el-input>
        </el-form-item>
        <el-form-item label="部门：">
          <el-input placeholder="请选择"  v-model="formBase.departmentName" icon="caret-bottom" class="inputW" @click.native="isShowSelect = !isShowSelect"></el-input>
          <input v-model="formBase.departmentId" type="hidden" >
          <el-tree v-if="isShowSelect"
            :expand-on-click-node="false"
            :data="depts"
            :props="{label:'name'}"
            default-expand-all
            @node-click="handleNodeClick"
            class="objectTree"
            ref="tree2">
          </el-tree>
        </el-form-item>
        <el-form-item label="转正时间：">
          <el-date-picker v-model="formBase.correctionTime" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="createData">提交</el-button>
        <el-button @click="dialogFormVisible=false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { add, jobnumber } from '@/api/base/users'
import  * as deptApi  from '@/api/base/dept'
import employeesData from '@/api/constant/employees'
import commonApi from '@/utils/common'
var _this = null
export default {
  name: 'add',
  data() {
    return {
      formBase:{},
      dialogFormVisible: false,
      isShowSelect: false,
      depts: [],
      employeesData : employeesData.hireType,
    }
  },
  methods: {
    createData() {
      add(this.formBase).then(res => {
        this.$message({message:res.data.message,type:res.data.success?"success":"error"});
        if(res.data.success) {
          this.dialogFormVisible = false
          this.$emit('doQuery', {})
        }
      })
    },
    handleNodeClick(data) {
      this.formBase.departmentName = data.name
      this.formBase.departmentId = data.id
      this.isShowSelect = false
    },
  },
  // 创建完毕状态
  created: function() {
    deptApi.list().then(ret => {
      this.depts = commonApi.transformTozTreeFormat(ret.data.data.depts)
    })
  }
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
.objectTree{
  position: absolute;
  width:300px;
  z-index:999;
  border: 1px solid #dddee1;
  left: 0;
  border-radius: 5px;
}
</style>
