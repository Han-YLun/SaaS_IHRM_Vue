<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card shadow="never">
            <el-tabs v-model="activeName">
                <el-tab-pane label="企业信息" name="first">
                  <!--form表单
                      model ： 双向绑定的数据对象
                  -->
                  <el-form ref="form" :model="formData" label-width="200px">
                    <el-form-item label="企业名称" >
                      <el-input v-model="formData.name" style="width:250px" ></el-input>
                    </el-form-item>
                    <el-form-item label="公司地址">
                      <el-input v-model="formData.companyAddress"  style="width:250px"  ></el-input>
                    </el-form-item>
                    <el-form-item label="公司电话">
                      <el-input v-model="formData.companyPhone"  style="width:250px"  ></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                      <el-input v-model="formData.mailbox"  style="width:250px"  ></el-input>
                    </el-form-item>
                    <el-form-item label="启/禁用">
                       <el-select v-model="a">
                          <el-option
                            v-for="(item,index) in options" :key="index"
                            :value="item.label">
                          </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注">
                      <el-input v-model="formData.remarks"  style="width:250px" ></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="update">提交</el-button>
                    </el-form-item>
                  </el-form>
                </el-tab-pane>
            </el-tabs>
      </el-card>
     </div>
  </div>
</template>

<script>
import {detail,updateCompany} from '@/api/base/saasClient'
export default {
  name: 'saas-clients-detail',
  data () {
    return {
        activeName: 'first',a:'',
        formData:{},
        options:[{
          value: 0,
          label: '禁用'
        },{
          value: 1,
          label: '启用'
        }]
    }
  },
  methods: {
    detail(id) {
      detail({id:id}).then(res => {
        this.formData = res.data.data
        this.a= this.formData.state==this.options[0].value?this.options[0].label:this.options[1].label
      })
    },
    update(){
      this.formData.state = this.a == this.options[0].label ? this.options[0].value : this.options[1].value;
      updateCompany(this.formData).then(res => {
        this.$message({message:res.data.message,type:res.data.success?"success":"error"});
      })
    }
  },
  // 创建完毕状态
  created() {
    var id = this.$route.params.id
    this.detail(id);
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.alert {
  margin: 10px 0px 0px 0px;
}
.pagination {
  margin-top: 10px;
  text-align: right;
}
</style>
