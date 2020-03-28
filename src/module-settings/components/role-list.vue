<template>
  <div class="boxInfo">
    <!-- 表单内容 -->
    <div class="formInfo">
      <div>
        <!-- 头部信息  -->
        <div class="userInfo">
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="handlerAdd">新增角色</el-button>
          <el-table :data="dataList" border fit highlight-current-row style="width:100%; margin-top:10px;">
                <el-table-column type="index" :index="1" label="序号" width="150"> </el-table-column>
                <el-table-column sortable prop="name" label="角色名" width="150"></el-table-column>
                <el-table-column sortable prop="description" label="描述"></el-table-column>
                <el-table-column fixed="right" label="操作" align="center" width="250">
                  <template slot-scope="scope">
                    <el-button @click="handlerPerm(scope.row)" type="text" size="small">分配权限</el-button>
                    <el-button @click="handleUpdate(scope.row)" type="text" size="small">修改</el-button>
                    <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
                  </template>
                </el-table-column>
          </el-table>
          <div class="pagination">
            <PageTool :paginationPage="requestParameters.page" :paginationPagesize="requestParameters.pagesize" :total="counts" @pageChange="handleCurrentChange" @pageSizeChange="handleSizeChange">
            </PageTool>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="编辑角色" :visible.sync="dialogFormVisible" style="hight:100px;line-height:1px">
      <el-form :model="formData" label-width="90px" style="margin-top:20px">
        <el-form-item label="角色名称">
          <el-input v-model="formData.name" autocomplete="off" style="width:90%"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="formData.description" autocomplete="off" style="width:90%"></el-input>
        </el-form-item>    
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="'为【'+formData.name+'】分配权限'" :visible.sync="permFormVisible" style="hight:100px;line-height:1px">
      <el-tree
        :data="treeData"
        default-expand-all	
        show-checkbox
        node-key="id"
        ref="tree"
        :default-checked-keys="checkNodes"
        :props="{label:'name'}">
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="permFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="assignPrem">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {list,add,update,remove,detail,assignPrem} from "@/api/base/role"
import * as permApi from "@/api/base/permissions"
import commonApi from "@/utils/common"
import PageTool from './../../components/page/page-tool'
var _this = null
export default {
  name: 'roleList',
  components: {PageTool},
  props: ['objId'],
  data() {
    return {
      formData:{},
      treeData:[],
      checkNodes:[],
      dialogFormVisible: false,
      permFormVisible:false,
      dataList:[],
      counts:0,
      requestParameters:{
        page: 1,
        pagesize: 10
      }    
    }
  },
  methods: {
    assignPrem() {
      assignPrem({id:this.formData.id,permIds:this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())}).then(res => {
         this.$message({message:res.data.message,type:res.data.success?"success":"error"});
         this.permFormVisible=false
      })
    },
    handlerPerm(obj) {
       detail({id:obj.id}).then(res=>{
         this.formData = res.data.data;
         this.checkNodes = res.data.data.permIds
          permApi.list({type:0,pid:null,enVisible:1}).then(res => {
            this.treeData = commonApi.transformTozTreeFormat(res.data.data)
            this.permFormVisible=true
          })
       })
    },
    handlerAdd() {
      this.formData={}
      this.dialogFormVisible = true
    },
    handleDelete(obj) {
      this.$confirm(
        `本次操作将删除${obj.name},删除后角色将不可恢复，您确认删除吗？`
      ).then(() => {
          remove({id: obj.id}).then(res => {
              this.$message({message:res.data.message,type:res.data.success?"success":"error"});
              this.doQuery()
          })
      })
    },
    handleUpdate(obj) {
      detail({id:obj.id}).then(res=>{
        this.formData = res.data.data;
        this.formData.id = obj.id;
        this.dialogFormVisible = true
      })
    },
    saveOrUpdate() {
      if(this.formData.id == null || this.formData.id == undefined) {
          this.save()
      }else{
          this.update();
      }
    },
    update(){
      update(this.formData).then(res=>{
        this.$message({message:res.data.message,type:res.data.success?"success":"error"});
        if(res.data.success){
          this.formData={};
          this.dialogFormVisible=false;
          this.doQuery();
        }
      })
    },
    save() {
      add(this.formData).then(res=>{
        this.$message({message:res.data.message,type:res.data.success?"success":"error"});
        if(res.data.success){
          this.formData={};
          this.dialogFormVisible=false;
          this.doQuery();
        }
      })
    },
    // 获取详情
    doQuery() {
      list(this.requestParameters).then(res => {
          this.dataList = res.data.data.rows
          this.counts = res.data.data.total
        })
    },
    // 每页显示信息条数
    handleSizeChange(pageSize) {
      this.requestParameters.pagesize = pageSize
      if (this.requestParameters.page === 1) {
        _this.doQuery(this.requestParameters)
      }
    },
    // 进入某一页
    handleCurrentChange(val) {
      this.requestParameters.page = val
      _this.doQuery()
    },
  },
  // 挂载结束
  mounted: function() {},
  // 创建完毕状态
  created: function() {
    _this = this
    this.doQuery()
  },
  // 组件更新
  updated: function() {}
}
</script>

<style rel="stylesheet/scss" lang="scss">
.el-collapse-item__arrow {
  float: left;
}

.el-collapse-item {
  position: relative;
  // width: 80%;
  // .el-collapse-item__header{width: 80%;}
  .infoR {
    position: absolute;
    background: #fff;
    display: inline-block;
    width: 100px;
    height: 35px;
    line-height: 35px;
    text-align: right;
    right: -100px;
    top: 0px;
  }
}
// .el-input--medium {
//   width: 80%;
// }
.linkage {
  display: inline-block;
}
.textBotm {
  vertical-align: text-bottom;
}
.navInfo {
  height: auto;
  font-size: 30px;
  color: #333;
  background-color: #e4e4e4;
  text-align: center;
  border-bottom: 1px solid #333;
}
.step {
  position: fixed;
  left: 220px;
  top: 50%;
  margin-top: -150px;
  background: #fff;
  z-index: 9;
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
