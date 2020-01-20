<template>
  <div class="add-form">
    <el-dialog title="分配角色" :visible.sync="roleFormVisible" style="height:300px">
      <el-form  :model="formBase"  label-position="left" label-width="120px" style='margin-left:120px; width:500px;'>
          <el-checkbox-group 
            v-model="checkedRoles">
            <el-checkbox v-for="(item,index) in roles" :label="item.id" :key="index">{{item.name}}</el-checkbox>
          </el-checkbox-group>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="createData">提交</el-button>
        <el-button @click="roleFormVisible=false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {findAll} from "@/api/base/role"
import {assignRoles,detail} from "@/api/base/users"
export default {
    data () {
        return {
            roleFormVisible:false,
            formBase:{},
            checkedRoles:[],
            data:[],
            roles:[],
            id:null
        }
    },
    methods: {
        toAssignPrem(id) {
            detail({id:id}).then(res1 => {
                this.checkedRoles = res1.data.data.roleIds;
                findAll().then(res => {
                    this.id = id;
                    this.roles = res.data.data
                    this.roleFormVisible=true
                })
            })
        },
        createData() {
            assignRoles({id:this.id,roleIds:this.checkedRoles}).then(res => {
                this.$message({message:res.data.message,type:res.data.success?"success":"error"});
                this.roleFormVisible=false
            })
        }
    }
}
</script>
