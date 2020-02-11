<template>
  <div class="head">
    <div class="userHead" v-if="headImg===null||headImg===''"><img src="@/assets/img.jpeg" width="100px" height="100px"></div>
    <div class="userHead" v-else>
      <span  class="fileImg">
        <img :src="headImg" width="100px" height="100px">
      </span>
    </div>
  </div>
</template>
<script>
import { imgHandle } from '@/filters/index'
export default {
  name: 'userHead',
  data() {
    return {
      fileList: []
    }
  },
  props: ['headImg'],
  methods: {
    // 图片下载
    fillDownload(fid) {

    }
  }
}
</script>

<style>
.userHead {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid #ccc;
    background: #e1e1e1;
    overflow: hidden;
    margin: 0 0 0 50px;
    text-align: right;
}
</style>
