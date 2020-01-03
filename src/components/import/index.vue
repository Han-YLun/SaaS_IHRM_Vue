<template>
  <div class="uploadBox clearfix">
    <el-upload
      class="upload-demo upload-text"
      :action="baseData.upUrl"
      :headers="myheader"
      :before-upload="beforeUpload"
      :on-error="uploadFail"
      :on-success="handleFileSuccess"
      :show-file-list="false"
      :file-list="fileList"
      >
      <el-button size="small" type="primary" :disabled="processing">{{uploadTip}}</el-button>
      <div slot="tip" class="el-upload__tip">
        (推荐<span class="colRed pointer"><a :href="baseData.fileUrl">下载模板文件</a></span>，填写后上传)<br>
        <span @click="handleUpload" class="colRed pointer">点击查看文件上传要求</span>
      </div>
    </el-upload>
    <el-upload
      class="upload-demo"
      drag
      :action="baseData.upUrl"
      :headers="myheader"
      :before-upload="beforeUpload"
      :on-error="uploadFail"
      :on-success="handleFileSuccess"
      :show-file-list="false"
      :file-list="fileList">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处</div>
    </el-upload>
    <el-dialog
    title="文件上传要求"
    :visible.sync="centerDialogVisible"
    width="30%"
    center>
      <div class="upInfoTip">
        <p><strong>重要提示：</strong></p>
        <p>支持WPS、excel2003以上版本文件</p>
        <p>请将要上传的内容放在第一个sheet中</p>
        <p>请不要加密模板文件，将导致错误</p>
        <p>请不要上传带宏的文件，将导致错误</p>
        <p>请不要过多的使用格式，如背景色和边框，将可能导致超时</p>
        <p>请将手机号、身份证号、银行卡号等内容设置为文本格式</p>
        <p>示例行的内容无需删除，将不会上传到系统中</p>
        <p><strong>格式说明：</strong></p>
        <p>聘用形式：只能填写“正式”或“非正式”</p>
        <p>部门编码：必须是系统里已存在的部门编码，否则会报错</p>
        <p>开户行：至少给出总行名字，最好细化到支行</p>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { importFile } from '@/filters/index'
import { getToken } from '@/utils/auth'
export default {
  name: 'import',
  props: ['baseData'],
  data() {
    return {
      resume: '',
      centerDialogVisible: false,
      fileList: [],
      processing: false,
      uploadTip: '点击上传',
      importFlag: 1,
      errorResults: [],
      positiveList: []
    }
  },
  computed: {
    myheader: function() {
      return {
        Authorization: `Bearer ${getToken()}`
      }
    }
  },
  methods: {
    // 业务方法
    // 下载模板
    download() {
      this.$emit('handleExport')
    },
    // 文件上传完成
    typeTip(obj) {
      this.$message.error(obj)
    },
    beforeUpload(file, obj) {
      importFile(file, obj, this.typeTip)
    },
    // 上传错误
    uploadFail(err, file, fileList) {
      this.uploadTip = '点击上传'
      this.processing = false
      this.$message.error(err)
    },
    // 上传成功
    handleFileSuccess(obj, file, fileList) {
      this.uploadTip = '点击上传'
      this.processing = false
      this.dialogImportVisible = false
      if (obj.code === 0) {
        this.$message.success('导入成功' + '!')
      } else {
        this.$message.error('导入失败' + '!')
      }
    },
    // 查看上传文件要求
    handleUpload: function() {
      this.centerDialogVisible = true
    }
  }
}
</script>
<style>
.upInfoTip {
  line-height: 30px;
}
.upload-text {
  margin: 50px 0 0;
}
</style>
