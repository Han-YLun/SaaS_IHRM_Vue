<template>
  <div class='finish_room'>
    <div class='finish_room2'>
        <div class="imgInfo" v-if="imgs!==''">
          <img :src="imgs" @click='delete_img'>
        </div>
        <div v-else>
            <el-upload :action="'/api/sys/user/upload/'+uid" :data= "fullUpType" :file-list="fileList" :class="{disabled:uploadDisabled}" :headers="myheader" :on-success="uploadSuccess" :on-remove="handleRemove" list-type="picture-card">
             <span>{{textTip}}</span>
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
    </div>
  </div>

</template>

<script >
import { updatedImg, imgHandle } from '@/filters/index'
import { getToken } from '@/utils/auth'
export default {
  data: function() {
    return {
      imgs: '',
      imgPhone: '',
      textTip: '',
      uploadDisabled: '',
      fullUpType: { type: 7, extension: 'img' },
      fileList: [],
      businessLicense: '',
      uid:this.$route.params.id
    }
  },
  props: ['imgs'],
  computed: {
    myheader: function() {
      return {
        Authorization: `Bearer ${getToken()}`
      }
    }
  },
  methods: {
    delete_img(item) {
      // console.log(item)
      // this.imgs.splice(item, 1)
      this.imgs = ''
    },
    // 图片下载
    fillDownload(fid) {
      if (fid) {

      }
    },
    handleRemove(file, fileList) {
      this.uploadDisabled = false
    },
    // 文件上传完成
    typeTip(obj) {
      this.$message.error(obj)
    },
    uploadSuccess(obj, file) {
      this.businessLicense = obj.fid
      this.uploadDisabled = true
      updatedImg(file, obj, this.typeTip)
    }
  },
  // 创建完毕状态
  mounted: function() {
    // console.log(this.imgN)
    if (this.imgN === 0) {
      this.textTip = '身份证正面'
    }
    if (this.imgN === 1) {
      this.textTip = '身份证反面'
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.finish_room {
  .el-upload--picture-card {
    i {
      font-size: 12px;
    }
  }
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
.finish_room {
  float: left;
  width: 150px;
  height: 150px;
  line-height: 100px;
  display: inline-block;
  overflow: hidden;
  // border: 1px dashed #d9d9d9;
  // border-radius: 6px;
  cursor: pointer;
  position: relative;
  margin-right: 10px;
}

.finish_room2 {
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  position: relative;
  .room_img {
    width: 150px;
    height: 150px;
    margin-right: 10px;
    position: relative;
    overflow: hidden;

    span {
      position: absolute;
      width: auto;
      height: auto;
      right: 5px;
      bottom: 3px;
    }
  }
  .imgInfo {
    position: absolute;
    left: 0;
    top: 0;
    width: 150px;
    height: 150px;
    background: #fff;
    border: 1px dashed #c0ccda;
    border-radius: 8px;
    z-index: 9;
    img {
      width: 100%;
      height: 100%;
    }
  }
}

.room_add_img {
  width: 100px;
  height: 98px;
  line-height: 98px;
  text-align: center;
  span {
    color: #999;
  }
  input {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 99999;
    opacity: 0;
  }
}
</style>
