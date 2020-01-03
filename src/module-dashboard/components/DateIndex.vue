<template>
  <div class="dateIndex">
     <div class="dateTop">
       <el-select v-model="currentYear" @change="pickPre" clearable placeholder="请选择" style="width: 100px" size="mini">
         <el-option v-for="(item, index) in selectYearList" :key="index" :label="item" :value="item"> </el-option>
       </el-select>
       <el-select v-model="currentMonth" @change="pickPre" clearable placeholder="请选择" style="width: 70px" size="mini">
         <el-option v-for="(item, index) in selectDayList" :key="index" :label="item" :value="item"> </el-option>
       </el-select>
     </div>
    <div class="dateCont">
      <ul class="weekdays">  <li>一</li> <li>二</li> <li>三</li> <li>四</li> <li>五</li> <li style="color:orangered">六</li> <li  style="color: orangered">日</li> </ul>
      <ul class="days">
        <li v-for="(dayobject, index) in days" :key="index">
          <!--本月-->
          <!--如果不是本月  改变类名加灰色-->
          <span v-if="dayobject.day.getMonth()+1 != currentMonth" class="other-month">{{ dayobject.day.getDate() }}</span>
          <!--如果是本月  还需要判断是不是这一天-->
          <span v-else>
          <!--今天  同年同月同日-->
            <span v-if="dayobject.day.getFullYear() == new Date().getFullYear() &&
            dayobject.day.getMonth() == new Date().getMonth() &&
            dayobject.day.getDate() == new Date().getDate()"
            >
              <span class="active">{{ dayobject.day.getDate() }}</span>
              <span v-if="dayobject.rest == 1" class="rest">休</span>
              <span v-if="dayobject.rest == 2" class="rest overTime">班</span>
            </span>
            <span v-else>
              <span class="dateDay">{{ dayobject.day.getDate() }}</span>
              <span v-if="dayobject.rest == 1" class="rest">休</span>
              <span v-if="dayobject.rest == 2" class="rest overTime">班</span>
            </span>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'users-table-index',
    data() {
      return {
        currentDay: 1,
        currentMonth: 1,
        currentYear: 1970,
        currentWeek: 1,
        selectYearList: [],
        selectDayList: [],
        days: []
      }
    },
    methods: {
      init (cur) {
        let leftcount = 0
        let date
        if (this.currentYear.length === 0) {
          for (let i = this.currentYear; i <= 2030; i++) {
            this.selectYearList.push(i)
          }
        }
        if (this.selectDayList.length === 0) {
          for (let i = 0; i <= 11; i++) {
            this.selectDayList.push(i + 1)
          }
        }

        if (cur) {
          date = new Date(cur)
        } else {
          let now = new Date()
          let d = new Date(this.formatDate(now.getFullYear(), now.getMonth(), 1))
          d.setDate(35)
          date = new Date(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
        }

        this.currentDay = date.getDate()
        this.currentYear = date.getFullYear()
        this.currentMonth = date.getMonth() + 1

        this.currentWeek = date.getDay() // 1...6,0
        if (this.currentWeek === 0) {
          this.currentWeek = 7
        }
        let str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay)
        this.days.length = 0
        // 今天是周日，放在第一行第7个位置，前面6个
        // 初始化本周
        for (var i = this.currentWeek - 1; i >= 0; i--) {
          var d = new Date(str)
          d.setDate(d.getDate() - i)
          let dayobject = {} // 用一个对象包装Date对象  以便为以后预定功能添加属性
          dayobject.day = d
          dayobject.rest = this.getRest(d)
          this.days.push(dayobject) // 将日期放入data 中的days数组 供页面渲染使用
        }
        // 其他周
        let num = 35
        let dat = new Date(this.currentYear, this.currentMonth, 0)
        let ifNum = this.currentWeek === 0 ? 7 : this.currentWeek
        if (ifNum + dat.getDate() > 36) {
          num = 42
        }
        for (let i = 1; i <= num - this.currentWeek; i++) {
          let d = new Date(str)
          d.setDate(d.getDate() + i)
          let dayobject = {}
          dayobject.day = d
          dayobject.rest = this.getRest(d)
          this.days.push(dayobject)
        }
      },
      // 手动设置，加班或者国假
      getRest(dat) {
        let restList = [{y: 2017, m: 11, d: 30, rest: 1}, {y: 2017, m: 11, d: 31, rest: 1}, {y: 2018, m: 0, d: 1, rest: 1}, {y: 2018, m: 8, d: 24, rest: 1}, {y: 2018, m: 8, d: 29, rest: 2}, {y: 2018, m: 8, d: 30, rest: 2}, {y: 2018, m: 9, d: 1, rest: 1}, {y: 2018, m: 9, d: 2, rest: 1}, {y: 2018, m: 9, d: 3, rest: 1}, {y: 2018, m: 9, d: 4, rest: 1}, {y: 2018, m: 9, d: 5, rest: 1}, {y: 2018, m: 9, d: 6, rest: 1}, {y: 2018, m: 9, d: 7, rest: 1}]
        let lab = false

        restList.forEach((n) => {
          if (dat.getFullYear() === n.y && dat.getMonth() === n.m && dat.getDate() === n.d) {
            lab = n.rest
          }
        })

        if (lab) {
          return lab
        } else if (dat.getDay() === 0 || dat.getDay() === 6) {
          return 1
        } else {
          return ''
        }
      },
      pickPre: function() {
        // setDate(0); 上月最后一天
        // setDate(-1); 上月倒数第二天
        // setDate(dx) 参数dx为 上月最后一天的前后dx天
        let year = this.currentYear
        let month = this.currentMonth + 1
        let d = new Date(this.formatDate(year, month, 1))
        d.setDate(0)
        this.init(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
      },
      // 返回 类似 2016-01-02 格式的字符串
      formatDate: function (year, month, day) {
        var y = year
        var m = month
        if (m < 10)m = '0' + m
        var d = day
        if (d < 10)d = '0' + d
        return y + '-' + m + '-' + d
      }
    },
    mounted() {
      this.init()
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "./../../styles/variables";
  .dateIndex{
   .dateTop{
      padding: 10px;
     text-align: right;
   }
  .dateCont{
    .weekdays{
      margin: 0px;
      padding: 0px;
      display: flex;
      li{
        line-height: 50px;
        color:#000;
        list-style: none;
        text-align: center;
        font-weight: bold;
        flex: 1;
      }
    }
    .days{
      display: flex;
      flex-wrap: wrap;
      margin: 0px;
      padding: 0px;
      li{
        width: 14.28%;
        color:#000;
        line-height: 40px;
        list-style: none;
        text-align: center;
      }
      .other-month{
        display: inline-block;
        width: 20px;
        margin-right: 5px;
        color:#999;
      }
      .dateDay{
        display: inline-block;
        width: 20px;
        margin-right: 5px;
      }
      .active{
        background: $blue;
        display: inline-block;
        position: relative;
        left: -3px;
        width: 25px;
        height: 25px;
        line-height: 25px;
        border-radius: 50%;
        color:#fff;
      }
      .rest{
        background: $orange;
        display: inline-block;
        position: relative;
        top: -1px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        font-size: 10px;
        border-radius: 50%;
        color:#fff;
      }
      .overTime{
        background: #999;
      }
    }
  }
  }
</style>
