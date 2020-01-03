<template>
  <div class="dashboard-container">
    <el-card class="sales-card">
      <div class="clearfix">
        <div class='fl headL'>
          <div class="headImg">
            <img src="../../assets/head.jpg"/>
          </div>
          <div class="headInfoTip">
            <p class="firstChild">早安，HR 专员，祝你开心每一天！</p>
            <p class="lastChild">HR 专员  |  传智播客-总部-人力资源中心-招聘专员</p>
          </div>
        </div>
        <div class="fr">
          <div class="headInfo numMs">
            <p class="fontS">56</p>
            <p>今日面试</p>
          </div>
          <div class="headInfo numRz">
            <p class="fontS">56/24</p>
            <p>今日入职</p>
          </div>
          <div class="headInfo numZ">
            <p class="fontS">880</p>
            <p>在职人数</p>
          </div>
        </div>
      </div>
    </el-card>
    <div style="margin-top:20px;" class="clearfix">
      <div style="width:55%; float:left">
        <el-card class="box-card">
            <div slot="header" class="header">
              <span>工作日历</span>
            </div>
            <div class="total">
              <DateIndex />
            </div>
          </el-card>
          <el-card style="margin-top:20px;">
            <div class="advContent">
              <div class="title">
                公告
              </div>
              <div class="contentItem">
                <!-- <ul class="noticeList">
                  <li v-for="item in filteredItems" :key="item.id">
                    <router-link :to="{'path':'./noticeDetails'}">
                      <div class="item">
                        <img :src="item.addPersonHeaderImage" alt="">
                        <div>
                          <p><span class="col">{{item.addPerson}}</span> 发布了 {{item.bulletinTitle}}</p>
                          <p>{{item.latestOperationTime}}</p>
                        </div>
                      </div>
                    </router-link>
                  </li>
                </ul> -->
                <ul class="noticeList">
                  <li>
                    <div class="item">
                        <img  src="./../../assets/img.jpeg" alt="">
                        <div>
                          <p><span class="col">朱继柳</span> 发布了 第二十期“传智大讲堂”互动讨论获奖名单公布</p>
                          <p>2018-07-21 15:21:38</p>
                        </div>
                      </div>
                  </li>
                  <li>
                    <div class="item">
                        <img  src="./../../assets/img.jpeg" alt="">
                        <div>
                          <p><span class="col">朱继柳</span> 发布了 第二十期“传智大讲堂”互动讨论获奖名单公布</p>
                          <p>2018-07-21 15:21:38</p>
                        </div>
                      </div>
                  </li>
                  <li>
                    <div class="item">
                        <img  src="./../../assets/img.jpeg" alt="">
                        <div>
                          <p><span class="col">朱继柳</span> 发布了 第二十期“传智大讲堂”互动讨论获奖名单公布</p>
                          <p>2018-07-21 15:21:38</p>
                        </div>
                      </div>
                  </li>
                  <li>
                    <div class="item">
                        <img  src="./../../assets/img.jpeg" alt="">
                        <div>
                          <p><span class="col">朱继柳</span> 发布了 第二十期“传智大讲堂”互动讨论获奖名单公布</p>
                          <p>2018-07-21 15:21:38</p>
                        </div>
                      </div>
                  </li>
                  <li>
                    <div class="item">
                        <img  src="./../../assets/img.jpeg" alt="">
                        <div>
                          <p><span class="col">朱继柳</span> 发布了 第二十期“传智大讲堂”互动讨论获奖名单公布</p>
                          <p>2018-07-21 15:21:38</p>
                        </div>
                      </div>
                  </li>
                  <li>
                    <div class="item">
                        <img  src="./../../assets/img.jpeg" alt="">
                        <div>
                          <p><span class="col">朱继柳</span> 发布了 第二十期“传智大讲堂”互动讨论获奖名单公布</p>
                          <p>2018-07-21 15:21:38</p>
                        </div>
                      </div>
                  </li>
                </ul>
                
              </div>
            </div>
          </el-card>
      </div>
      <div style="width:44%;float:right;margin-left:1%;">
        <el-card class="box-card">
            <div class="header headTit">
              <span>快速开始/便捷导航</span>
            </div>
            <div class="sideNav">
              <!-- <ul class="clearfix">
                <li v-for="item in linkList" :key="item.id">
                  <a :href="item.url">{{item.title}}</a>
                </li> -->
                <!-- <li class="addLinks"><a href="javascript:" @click="addLinks">+添加</a></li> -->
              <!-- </ul> -->
              <ul class="clearfix">
                <li>
                  <a href="#">人事月报</a>
                </li>
                <li>
                  <a href="#">考勤查询</a>
                </li>
                <li>
                  <a href="#">考勤统计</a>
                </li>
                <li>
                  <a href="#">员工审核</a>
                </li>
                <li>
                  <a href="#">组织架构</a>
                </li>
              </ul>
            </div> 
        </el-card>
        <el-card class="box-card" style="margin-top:20px;">
            <div slot="header" class="header">
              <span>绩效指数</span>
            </div>
            <div class="sidePerformance">
              <div class="chart">
              <bar-chart></bar-chart>
            </div>
                <div class="performInfo">
                  <ul class="clearfix">
                    <li>
                      <p class="radioInfo"><em class=" user"></em>56</p>
                      <p>个人</p>
                    </li>
                    <li>
                      <p class="radioInfo"><em class="department"></em>28</p>
                      <p>部门</p>
                    </li>
                    <li>
                      <p class="radioInfo"><em class="company"></em>33</p>
                      <p>公司</p>
                    </li>
                  </ul>
                </div>
            </div> 
        </el-card>
        <el-card class="box-card" style="margin-top:20px;">
            <div class="header headTit">
              <span>帮助链接</span>
            </div>
            <div class="sideLink">
              <el-row>
                <el-col :span="8">
                  <a href="#">
                    <span class="icon iconGuide"></span>
                    <p>入门指南</p>
                  </a>
                </el-col>
                <el-col :span="8">
                  <a href="#">
                    <span class="icon iconHelp"></span>
                    <p>在线帮助手册</p>
                  </a>
                </el-col>
                <el-col :span="8">
                  <a href="#">
                    <span class="icon iconTechnology"></span>
                    <p>联系技术支持</p>
                  </a>
                </el-col>
              </el-row>
              
            </div> 
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import BarChart from './../components/dashboardAreaChart'
import DateIndex from './../components/DateIndex'
import { list, links, addLinks } from '@/api/base/notices'
let _this = null
export default {
  name: 'dashboard',
  components: {
    DateIndex,
    BarChart
  },
  data() {
    return {
      dataList: [],
      linkList: []
    }
  },
  computed: {
    // filteredItems: function() {
    //   return this.dataList.slice(0, 6)
    // }
  },
  methods: {
    // 业务方法
    doQuery(params) {
      this.listLoading = true
      list(this.requestParameters)
        .then(data => {
          this.dataList = data.data.items
        })
        .catch(e => {
          this.$message.e('错了哦，这是一条错误消息')
        })
    },
    linkData(params) {
      this.listLoading = true
      links(this.requestParameters)
        .then(data => {
          this.linkList = data.data
        })
        .catch(e => {
          this.$message.e('错了哦，这是一条错误消息')
        })
    },
    // 表单提交
    addLinks() {
      addLinks().then(() => {
        this.linkData()
      })
    }
    // 界面交互
  },
  // 挂载结束
  mounted: function() {},
  // 创建完毕状态
  created: function() {
    _this = this
    // this.doQuery()
    // this.linkData()
  },
  // 组件更新
  updated: function() {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-container {
  margin: 10px;
  .headImg {
    float: left;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: #999;
  }

  .headInfoTip {
    padding: 25px 0 0;
    margin-left: 120px;
    p {
      padding: 0 0 15px;
      margin: 0;
      &.firstChild {
        font-size: 24px;
      }
      &.lastChild {
        font-size: 20px;
        color: #7f8c8d;
      }
    }
  }
}

.box-card {
  padding: 5px 10px;
  .header {
    span {
      color: #2c3e50;
      font-size: 24px;
    }
    .item {
      color: #97a8be;
      float: right;
      padding: 3px 0;
    }
  }
  .headTit {
    span {
      border-bottom: 4px solid #8a97f8;
      padding-bottom: 10px;
    }
  }
}

// 销售额
.sales-card {
  position: relative;
  .header {
    position: absolute;
    right: 20px;
    top: 15px;
    z-index: 1;
  }
  .chart {
    widows: 100%;
    height: 300px;
  }
  .table {
    color: rgba(0, 0, 0, 0.65);
    h4 {
      color: #000;
      font-weight: 500;
    }
    ul {
      list-style: none;
      margin: 0px;
      padding: 0px;
      .row {
        margin-bottom: 10px;
      }
    }
    .circular {
      width: 20px;
      height: 20px;
      background-color: #314659;
      color: #fff;
      text-align: center;
      font-size: 12px;
      line-height: 20px;
      font-weight: 600;
      border-radius: 50%;
    }
    .light {
      background-color: #f5f5f5;
      color: rgba(0, 0, 0, 0.65);
    }
  }
}

.headInfo {
  width: 100px;
  height: 100px;
  border-radius: 50px;
  padding: 20px 0 0;
  margin: 0 15px;
  display: inline-block;
  color: #fff;
  text-align: center;
  p {
    padding: 0 0 5px;
    margin: 0;
    font-size: 16px;
  }
  .fontS {
    font-size: 30px;
  }
}
.headInfo.numMs {
  background: #8a97f8;
  box-shadow: 1px 1px 5px #8a97f8;
}
.headInfo.numRz {
  background: #ffc100;
  box-shadow: 1px 1px 5px #ffc100;
}
.headInfo.numZ {
  background: #fa8564;
  box-shadow: 1px 1px 5px #fa8564;
}
.advContent {
  background: #fff;
  border-radius: 5px 5px 0px 0px;
  .title {
    font-size: 16px;
    padding: 20px;
    font-weight: bold;
    border-bottom: solid 1px #ccc;
  }
  .contentItem {
    padding: 0 30px;
    min-height: 350px;
    .item {
      display: flex;
      padding:18px 0 10px;
      border-bottom: solid 1px #ccc;
      .col {
        color: #8a97f8;
      }
      img {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        margin-right: 10px;
      }
      p{
        padding: 0 0 8px;
      }
    }
  }
}
.noticeList {
  margin: 0;
  padding: 0;
}
.sideNav,
.sideLink {
  padding: 30px 0 12px;
  li {
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 137px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    margin: 0 15px 10px 0;
    font-size: 16px;
    float: left;
    a {
      display: block;
      height: 50px;
      color: #777;
    }
    &.addLinks{
      border: 1px dashed #8a97f8;
      a{
        color: #8a97f8;
      }
    }
  }
}
.sideLink {
  text-align: center;
  .icon {
    display: inline-block;
    width: 76px;
    height: 76px;
    background: url('../../assets/icon.png') no-repeat;
  }
  .iconGuide {
    background-position: 0 0;
  }
  .iconHelp {
    background-position: -224px 0;
  }
  .iconTechnology {
    background-position: -460px 0;
  }
}
.performInfo {
  border: 1px solid #e9e9e9;
  li {
    width: 33%;
    float: left;
    text-align: center;
    border-right: 1px solid #e9e9e9;
    &:last-child {
      border: 0 none;
    }
    padding: 10px 0;
    p {
      &:first-child {
        font-size: 40px;
      }
    }
  }
}
.radioInfo {
  em {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 3px;
    vertical-align: middle;
    margin-right: 10px;
    &.user {
      background: #2ec7c9;
    }
    &.department {
      background: #b6a2de;
    }
    &.company {
      background: #5db3ef;
    }
  }
}
</style>
