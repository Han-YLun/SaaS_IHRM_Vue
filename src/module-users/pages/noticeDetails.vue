<template>
  <div class="noticeDetails">
    <div class="noticeDetailsTop">
      <div class="topLab" ><span class="act">公告</span></div>
    </div>
    <div class="noticeDetailsCentent">
      <div class="title">{{form.title}}</div>
      <div class="time">{{form.lastUpdateTime}}</div>
      <div class="content">
        {{form.content}}
      </div>
    </div>
        <div style="text-align: center;margin-top: 40px;">
            <el-button type="primary" @click="onClose">关闭</el-button>
        </div>
  </div>
</template>

<script>
  import {list} from '@/api/example/table'
  export default {
    name: 'users-table-index',
    components: {},
    data() {
      return {
        form: {
        }
      }
    },
    methods: {
      onClose() {
        this.$router.back(-1)
      }
    },
    created() {
      var _this = this
      this.$bus.on("noticeDetail",(content) =>{
        _this.$parent.form=content
      })
      this.form=this.$parent.form
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "./../../styles/variables";
  .noticeDetails{
    padding:15px;
    .noticeDetailsTop{
      color:#666;
      background: #fff;
      border-bottom:solid 1px #ccc;
      line-height: 40px;
      span{
        display: inline-block;
        padding: 0 25px;
        font-size: 18px;
        cursor:pointer;
      }
      .act{
        color:$green;
        border-bottom: solid 2px $green;
      }
    }
    .noticeDetailsCentent{
      background: #fff;
      padding: 25px;
      min-height: 500px;
      line-height: 2;
      .title{
        font-size: 18px;
        line-height: 40px;
        font-weight: bold;
      }
      .time{
        font-size: 16px;
        color:#999;
        line-height: 40px;
      }
    }
  }
</style>
