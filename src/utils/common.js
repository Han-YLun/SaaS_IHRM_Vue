export default {
  timestampToTime: (timestamp) => {
    let date = new Date(timestamp * 1000)
    let Y = date.getFullYear() + '-'
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    let D = date.getDate() + ' '
    let h = date.getHours() + ':'
    let m = date.getMinutes() + ':'
    let s = date.getSeconds()
    return Y + M + D + h + m + s
  },
  dateFormat: function (time) {
    var date = new Date(time);
    var year = date.getFullYear();
    /* 在日期格式中，月份是从0开始的，因此要加0
     * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
     * */
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    // 拼接
    return year + "-" + month + "-" + day
  },
  
  dateaMonth: function (time) {
    var date = new Date(time);
    var year = date.getFullYear();
    /* 在日期格式中，月份是从0开始的，因此要加0
     * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
     * */
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    // 拼接
    return {
      month: month,
      year: year + "-" + month + "-" + day
    }
  },
  getMonth: function () {
    /* 默认显示上个月的日期 */
    var nowdays = new Date()
    var year = nowdays.getFullYear()
    var month = nowdays.getMonth()
    if (month === 0) {
      month = 12
      year = year - 1
    }
    if (month < 10) {
      month = '0' + month
    }
    var preYear = year // 年
    var preDates = year + '-' + month // 上个月
    var preMonth = month // 上个月
    month++
    return {
      preDates: preDates,
      preYear: preYear,
      preMonth: preMonth
    }
  },
  // 获取下一个月
  getNextMonth: function(date) {
    var arr = date.split('-')
    var year = arr[0] // 获取当前日期的年份
    var month = arr[1] // 获取当前日期的月份
    var days = new Date(year, month)
    days = days.getDate() // 获取当前日期中的月的天数
    var year2 = year
    var month2 = parseInt(month) + 1
    if (month2 === 13) {
        year2 = parseInt(year2) + 1
        month2 = 1
    }
    var days2 = new Date(year2, month2)
    days2 = days2.getDate()

    if (month2 < 10) {
        month2 = '0' + month2
    }

    var datas = year2 + month2
    var months = month2
    return {
      datas: datas,
      months: months
    }
},
  transformTozTreeFormat: function (sNodes) {
    var i, l;
    var r = [];
    var tmpMap = {};
    for (i = 0, l = sNodes.length; i < l; i++) {
      tmpMap[sNodes[i].id] = sNodes[i];
    }
    for (i = 0, l = sNodes.length; i < l; i++) {
      var p = tmpMap[sNodes[i].pid];
      if (p && sNodes[i].id != sNodes[i].pid) {
        var children = this.nodeChildren(p);
        if (!children) {
          children = this.nodeChildren(p, []);
        }
        children.push(sNodes[i]);
      } else {
        r.push(sNodes[i]);
      }
    }
    return r;
  },
  nodeChildren: function (node, newChildren) {
    if (typeof newChildren !== 'undefined') {
      node.children = newChildren;
    }
    return node.children;
  }
}
