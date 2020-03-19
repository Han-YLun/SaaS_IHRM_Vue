<template>
  <div class="myInfo">
    <div class="myInfoTop">
      <div class="topLab" ><span class="act">推荐详情</span></div>
    </div>
    <div class="myInfoCont">
      <div class="topInfoBox">
        <div class="myInfoPic"><img src="" width="150" alt=""></div>
        <div class="infoItem">
          <div><span>高飞</span>3年工作经验/高中</div>
          <div><span>公司/职位</span>有田(北京)科技有限公司/产品经理 学校/专业</div>
          <div><span>手机/邮箱</span>13484875171</div>
          <div><span>招聘负责人</span></div>
          <div><span>备注</span>3年工作经验/高中</div>
          <div><span>推荐有效期</span>1天</div>
        </div>
      </div>
      <div class="resume">简历区域</div>
      <div class="feedback"><span>反馈：</span><el-input type="textarea" style="width: 90%;" :rows="2" placeholder="填写你对候选人的反馈" v-model="textarea"> </el-input></div>
      <div class="operations"><el-button type="primary">通过</el-button><el-button>不通过</el-button></div>
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
        textarea: '',
        form: {
          name: '张三',
          phone: '15116921204',
          region: '本科',
          sex: '男'
        }
      }
    },
    methods: {
      onSubmit() {
        console.log(2345678)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "./../../styles/variables";
  .myInfo{
    padding:15px;
    .myInfoTop{
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
    .myInfoCont{
      background: #fff;
      padding: 20px;
      .topInfoBox{
        display: flex;
        .myInfoPic{
          width: 150px;
          height: 150px;
          border-radius: 50%;
          border:solid 1px #ccc;
          margin-right: 40px;
          img{
            width: 100px;
            height: 100px;
          }
        }
        .infoItem{
          div{
            line-height: 2;
            span{
              display: inline-block;
              width: 100px;
              font-weight: bold;
            }
          }
        }
      }
      .resume{
        padding: 50px 0;
        text-align: center;
      }
      .feedback{
        span{
          width: 60px;
          float:left;
        }
      }
      .operations{
        text-align: center;
        padding: 20px;
      }
    }
  }
</style>
