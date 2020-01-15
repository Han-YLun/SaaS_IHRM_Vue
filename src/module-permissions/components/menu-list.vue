<template>
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
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small">编辑</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
import {list} from "@/api/base/permissions"
import commonApi from "@/utils/common"
export default {
    data () {
        return {
            dataList:[],
            pointEnable:{}
        }
    },
    created () {
        this.getList();
    },
    methods: {
        getList() {
            list({type:1,pid:0}).then(res=> {
                this.dataList = res.data.data
            })
        },
        show(index,id) {
            if(!this.pointEnable[id] == null || this.pointEnable[id]==undefined){
                list({type:2,pid:id}).then(res=> {
                    for(var i = 0 ; i <res.data.data.length;i++) {
                        this.dataList.splice(index+1,0,res.data.data[i]);
                    }
                    this.pointEnable[id] = res.data.data.length;
                })
            }else{
                this.dataList.splice(index+1,this.pointEnable[id])
                this.pointEnable[id] = null;
            }
        }
    }
}
</script>