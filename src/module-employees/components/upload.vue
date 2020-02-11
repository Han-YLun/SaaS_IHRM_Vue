<template>
  <div class=''>
    <div v-if="positiveText===5">
      <el-upload action="/api/system/upfile" :data= "fullUpType" multiple :on-exceed='handleFile' :limit='limits' :class="{disabled:uploadDisabled}" :headers="myheader" :on-success="handleFileSuccess" :file-list="fileList" :on-remove="handleRemove">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">文件格式为DOC/DOCX/XLS/XLSX/PDF/ZIP/RAR 大小在5MB内 数量在5个以内</div> 
    </el-upload>
    </div>
    <div v-else>
      <el-upload action="/api/system/upfile" :data= "fullUpType" multiple :on-exceed='handleFileP' :limit='limit' :class="{disabled:uploadDisabled}" :headers="myheader" :on-success="handleFileSuccess" :file-list="fileList" :on-remove="handleRemove">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">文件格式为DOC/DOCX/XLS/XLSX/PDF/ZIP/RAR 大小在5MB内</div> 
    </el-upload>
    </div>
    
    <!-- <ul class="upload-list">
        <li v-for="(item,index) in fileData" :key="index" class="ivu-upload-list-file ivu-upload-list-file-finish">
            <span><i class="fa fa-file-text-o"></i>&nbsp;{{item}} </span>
            <i @click.stop="handelFileDelete(item.fid)" class="fa fa-times"></i>
        </li>
    </ul> -->
  </div>

</template>

<script >
import { updatedFile, imgHandle } from '@/filters/index'
import { getToken } from '@/utils/auth'
export default {
  data: function() {
    return {
      imgPhone: '',
      textTip: '',
      uploadDisabled: '',
      fullUpType: { type: 1, extension: 'doc' },
      businessLicense: '',
      limit: 1,
      limits: 5,
      fileList: [],
      positiveList: []
    }
  },
  props: ['positiveText'],
  computed: {
    myheader: function() {
      return {
        Authorization: `Bearer ${getToken()}`
      }
    }
  },
  methods: {
    // 文件上传完成
    typeTip(obj) {
      this.$message.error(obj)
    },
    handleFileSuccess(obj, file) {
      this.positiveList.push(obj.fid)
      this.businessLicense = obj.fid
      // this.fileList.push(obj.title)
      updatedFile(file, obj, this.typeTip, function() {
        // this.fillDownload(ids)
        // console.log(ids)
      })
    },
    handleFile() {
      this.$message.error('只允许上传5个文件')
    },
    handleFileP() {
      this.$message.error('只允许上传1个文件')
    },
    // 删除文件
    handelFileDelete(fid) {
      if (fid) {
        this.fileList = this.fileList.filter(item => {
          if (item.fid !== fid) {
            return true
          }
        })
      }
    },
    // 图片下载
    fillDownload(fid, name) {

    },
    handleRemove(file, fileList) {
      this.uploadDisabled = false
    }
  },
  // 创建完毕状态
  created: function() {}
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.upload-list {
  padding: 0;
  margin: 0;
  li {
    list-style: none;
  }
}
</style>
