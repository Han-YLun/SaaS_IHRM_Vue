<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card shadow="never">
        <el-button class="filter-item fr" size="small" style="margin-left: 10px;" @click="handleCreate(null,1);setPid(1,'0')" type="primary" icon="el-icon-edit">添加菜单</el-button>
            <el-table :data="dataList" fit style="width: 100%;" highlight-current-row>
                <el-table-column fixed prop="name" label="菜单名称" width="200px">
                    <template slot-scope="scope">
                        <i :class="scope.row.type==1?'ivu-icon fa fa-folder-open-o fa-fw':'ivu-icon  el-icon-view'" 
                            :style="scope.row.type==1?'margin-left: 0px':'margin-left: 20px'"></i>
                        <span @click="show(scope.$index,scope.row.id)">{{scope.row.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column fixed prop="code" label="权限标识" width="200"></el-table-column>
                <el-table-column fixed prop="description" label="描述" width="200"></el-table-column>        
                <el-table-column fixed="right" label="操作">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.type==1" @click="handleCreate(null,2);setPid(2,scope.row.id)" type="text" size="small">添加权限点</el-button>
                        <el-button @click="handlerApiList(scope.row.id)" type="text" size="small">查看api权限</el-button>
                        <el-button @click="handleCreate(scope.row.id,scope.row.type);setPid(scope.row.type,scope.row.pid)" type="text" size="small">查看</el-button>
                        <el-button @click="handleDelete(scope.row.id)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
      </div>

      <el-dialog title="编辑权限" :visible.sync="dialogFormVisible" style="hight:100px;line-height:1px">
          <el-form :model="formData" label-width="90px" style="margin-top:20px">
            <el-form-item label="权限名称">
              <el-input v-model="formData.name" autocomplete="off" style="width:90%"></el-input>
            </el-form-item>
            <el-form-item label="权限标识">
              <el-input v-model="formData.code" autocomplete="off" style="width:90%"></el-input>
            </el-form-item>
            <el-form-item label="权限描述">
              <el-input v-model="formData.description" autocomplete="off" style="width:90%"></el-input>
            </el-form-item>
            <el-form-item label="企业可见">
              <el-switch
                v-model="formData.enVisible"
                active-value="1"
                inactive-value="0"
                active-text="可见"
                inactive-text="不可见">
              </el-switch>
            </el-form-item>  
            <div v-if="type==1">
              <el-form-item label="菜单顺序">
                <el-input v-model="formData.menuOrder" autocomplete="off" style="width:90%"></el-input>
              </el-form-item> 
              <el-form-item label="菜单icon">
                <el-input v-model="formData.menuIcon" autocomplete="off" style="width:90%"></el-input>
              </el-form-item> 
            </div>
            <div v-else-if="type==2">
              <el-form-item label="按钮样式">
                <el-input v-model="formData.pointClass" autocomplete="off" style="width:90%"></el-input>
              </el-form-item> 
              <el-form-item label="按钮icon">
                <el-input v-model="formData.pointIcon" autocomplete="off" style="width:90%"></el-input>
              </el-form-item>  
              <el-form-item label="按钮状态">
                <el-input v-model="formData.pointStatus" autocomplete="off" style="width:90%"></el-input>
              </el-form-item> 
            </div>
            <div v-else-if="type==3">
              <el-form-item label="api请求地址">
                <el-input v-model="formData.apiUrl" autocomplete="off" style="width:90%"></el-input>
              </el-form-item> 
              <el-form-item label="api请求方式">
                <el-input v-model="formData.apiMethod" autocomplete="off" style="width:90%"></el-input>
              </el-form-item>  
              <el-form-item label="api类型">
                <el-input v-model="formData.apiLevel" autocomplete="off" style="width:90%"></el-input>
              </el-form-item>               
            </div>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
          </div>
      </el-dialog>

      <el-dialog  title="API权限列表" :visible.sync="apiDialogVisible" style="hight:400px;line-height:1px">
            <el-button class="filter-item fr" size="small" style="margin-left: 10px;" @click="handleCreate(null,1);setPid(3,pid)" type="primary" icon="el-icon-edit">添加api权限</el-button>
            <el-table :data="apiList" fit style="width: 100%;" max-height="250" >
                <el-table-column fixed prop="name" label="菜单名称" width="120px"></el-table-column>
                <el-table-column fixed prop="code" label="权限标识" width="200"></el-table-column>
                <el-table-column fixed prop="description" label="描述" width="200"></el-table-column>        
                <el-table-column fixed="right" label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button @click="handleCreate(scope.row.id,scope.row.type);setPid(scope.row.type,scope.row.pid)" type="text" size="small">查看</el-button>
                        <el-button @click="handleDelete(scope.row.id);handlerApiList(pid)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>        
      </el-dialog>
  </div>
</template>

<script>
import {saveOrUpdate,list,detail,remove} from "@/api/base/permissions"
export default {
  name: 'permissions-table-index',
  data() {
    return {
      MenuList: 'menuList',
      type:0,
      pid:"",
      dialogFormVisible:false,
      apiDialogVisible:false,
      formData:{},
      dataList:[],
      apiList:[],
      pointEnable:{}
    }
  },
  methods: {
    setPid(type,pid){
      this.pid = pid;
      this.type = type
    },
    handleCreate(id) {
      if(id && id !=undefined) {
        detail({id}).then(res => {
          this.formData = res.data.data
          this.dialogFormVisible=true
        })
      }else{
        this.formData = {}
        this.dialogFormVisible=true
      }
    },
    saveOrUpdate() {
      this.formData.type = this.type
      this.formData.pid = this.pid
      saveOrUpdate(this.formData).then(res => {
        this.$message({message:res.data.message,type:res.data.success?"success":"error"});
        if(res.data.success){
          this.formData={};
          this.dialogFormVisible=false;
        }
        if(this.type ==3){
          this.handlerApiList(this.pid);
        }else{
          this.getList();
          this.pointEnable = {}
        }
      })
    },
    handleDelete(id) {
      remove({id}).then(res=> {
        this.$message({message:res.data.message,type:res.data.success?"success":"error"});
      })
    },
    getList() {
      list({type:1,pid:0}).then(res=> {
          this.dataList = res.data.data
      })
    },
    show(index,id) {
        if(!this.pointEnable[id] == null || this.pointEnable[id]==undefined){
            list({type:2,pid:id}).then(res=> {
                if(res.data.data.length <=0) {
                  this.$message.error("无子权限")
                }else{
                  for(var i = 0 ; i <res.data.data.length;i++) {
                      this.dataList.splice(index+1,0,res.data.data[i]);
                  }
                  this.pointEnable[id] = res.data.data.length;
                }
            })
        }else{
            this.dataList.splice(index+1,this.pointEnable[id])
            this.pointEnable[id] = null;
        }
    },
    handlerApiList(id) {
      this.pid = id;
      list({type:3,pid:id}).then(res=> {
          this.apiList = res.data.data
          this.apiDialogVisible = true;
      })
    }
  },
  created () {
    this.getList();
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.alert {
  margin: 10px 0px;
}
.pagination {
  margin-top: 10px;
  // text-align: right;
}
</style>

<style>
.el-table th {
  background-color: #fafafa;
}
.el-table th.is-leaf {
  border-bottom: 2px solid #e8e8e8;
}
.el-table__row i{ font-style:normal}
</style>