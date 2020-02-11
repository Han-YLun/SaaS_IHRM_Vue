<template>
  <div class='finish_room'>
    <div class='finish_room2'>
        <div class="imgInfo" v-if="imgs!==''">
          <img :src="imgs" @click='delete_img'>
        </div>
        <div class='room_add_img'>
            <!-- <span><img src="./imgs/add_img.png"></span> -->
            <span>{{textTip}}</span>
            <i class="el-icon-plus avatar-uploader-icon"></i>
            <input @change='add_img'  type="file">
        </div>
    </div>
  </div>

</template>

<script >
module.exports = {
  data: function() {
    return {
      imgs: '',
      imgPhone: '',
      textTip: ''
    }
  },
  props: ['imgN'],
  methods: {
    delete_img(item) {
      // console.log(item)
      // this.imgs.splice(item, 1)
      this.imgs = ''
    },
    add_img(event) {
      // console.log(event.target.files)
      if (event.target.files.length !== 0) {
        if (event.target.files[0].size < 5100000) {
          // console.log(event.target.files[0].size)
          // 判断图片格式是否为jpg,png,jepg,gif
          var fileName = event.target.files[0].name
          var suffix = fileName
            .substring(fileName.lastIndexOf('.') + 1)
            .toUpperCase()
          this.imgPhone = event.target.files[0].name
          if (
            suffix === 'PDF' ||
            suffix === 'JPG' ||
            suffix === 'JPEG' ||
            suffix === 'PNG' ||
            suffix === 'GIF'
          ) {
            var reader = new FileReader()
            var img1 = event.target.files[0]
            reader.readAsDataURL(img1)
            var that = this
            reader.onloadend = function() {
              that.imgs = reader.result
            }
            // console.log(this.imgN)
          } else {
            this.$message.error('文件类型不正确,请重新上传！')
          }
        } else {
          this.$message.error('图片大小超过5M,请重新上传')
        }
      } else {
        return false
      }
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
<style rel="stylesheet/scss" lang="scss" scoped>
.finish_room {
  width: 100px;
  height: 100px;
  display: inline-block;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
}

.finish_room2 {
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  position: relative;
  .room_img {
    width: 150px;
    height: 100px;
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
    width: 100%;
    height: 100%;
    background: #fff;
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
  span{
    color: #999
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
