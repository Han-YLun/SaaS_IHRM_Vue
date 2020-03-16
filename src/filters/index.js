function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }

  if ((time + '').length === 10) {
    time = +time * 1000
  }

  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    date = new Date(parseInt(time))
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') {
      return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}
export function getNowFormatDate() {
  var date = new Date()
  var seperator1 = '-'
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate
  return currentdate
}
/* 数字 格式化 */
export function nFormatter(num, digits) {
  const si = [{
      value: 1e18,
      symbol: 'E'
    },
    {
      value: 1e15,
      symbol: 'P'
    },
    {
      value: 1e12,
      symbol: 'T'
    },
    {
      value: 1e9,
      symbol: 'G'
    },
    {
      value: 1e6,
      symbol: 'M'
    },
    {
      value: 1e3,
      symbol: 'k'
    }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (
        (num / si[i].value + 0.1)
        .toFixed(digits)
        .replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
      )
    }
  }
  return num.toString()
}

export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

export function toThousandslsFilter(num) {
  return (+num || 0)
    .toString()
    .replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}
// 验证手机号
export function checkPhone(rule, value, callback) {
  if (!value) {
    return callback(new Error('手机号不能为空'))
  } else {
    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
    if (reg.test(value)) {
      callback()
    } else {
      return callback(new Error('请输入正确的手机号'))
    }
  }
}
export function checkPassword(rule, value, callback) {
  if (!value) {
    return callback(new Error('密码不能为空'))
  } else if (value.length < 6) {
    callback(new Error('请至少输入 6 个字符。请不要使用容易被猜到的密码'))
  } else {
    callback()
  }
}
// 手机号证验证
export function checkTel(value, callback) {
  var reg = /^1[3|4|5|7|8][0-9]\d{8}$/
  return reg.test(value)
}
// 身份证验证
export function checkiDNumber(value, callback) {
  var reg = /\d{17}[\d|x]|\d{15}/
  return reg.test(value)
}
// 身份证验证
export function checkEmails(value, callback) {
  var reg = /^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/
  return reg.test(value)
}
// 邮箱验证
export function checkEmail(rule, value, callback) {
  if (!value) {
    return callback(new Error('邮箱不能为空'))
  } else {
    var reg = /^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/
    if (reg.test(value)) {
      callback()
    } else {
      return callback(new Error('请输入正确的邮箱'))
    }
  }
}
// 英文验证
export function checkCode(value, callback) {
  var reg = /^[A-Za-z]+$/g
  return reg.test(value)
}
// qq验证
export function checkQq(value, callback) {
  var reg = /^[0-9]+$/g
  return reg.test(value)
}
// 银行卡号
export function formatBankNo(BankNo, callback) {
  var num = /^\d+$/g
  var strBin = '10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99'
  return strBin
}
export function getStrleng(str, max) {
  var myLen = 0
  for (var i = 0; i < str.length && myLen <= max * 2; i++) {
    if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128) {
      myLen++
    } else myLen += 2
  }
  return myLen
}
// 上传图片格式控制
export function updatedImg(file, obj, callback, func) {
  if (file.size < 10100000) {
    var fileName = file.name
    var suffix = fileName
      .substring(fileName.lastIndexOf('.') + 1)
      .toUpperCase()
    if (
      suffix === 'PDF' ||
      suffix === 'JPG' ||
      suffix === 'JPEG' ||
      suffix === 'PNG' ||
      suffix === 'GIF'
    ) {
      return true
    } else {
      var tipType = '文件类型不正确,请重新上传'
      callback(tipType)
      return false
    }
  } else {
    var tipSize = '文件大小超过5M,请重新上传'
    callback(tipSize)
    return false
  }
}
// 上传文档格式控制
export function updatedFile(file, obj, callback, func) {
  if (file.size < 10100000) {
    var fileName = file.name
    var suffix = fileName
      .substring(fileName.lastIndexOf('.') + 1)
      .toUpperCase()
    if (
      suffix === 'DOC' ||
      suffix === 'DOCX' ||
      suffix === 'XLS' ||
      suffix === 'XLSX' ||
      suffix === 'PDF' ||
      suffix === 'ZIP' ||
      suffix === 'RAR'
    ) {
      return true
    } else {
      var tipType = '文件类型不正确,请重新上传'
      callback(tipType)
      return false
    }
  } else {
    var tipSize = '文件大小超过5M,请重新上传'
    callback(tipSize)
    return false
  }
}
export function importFile(file, obj, callback, func) {
  if (file.size < 10100000) {
    var fileName = file.name
    var suffix = fileName
      .substring(fileName.lastIndexOf('.') + 1)
      .toUpperCase()
    if (
      suffix === 'XLS' ||
      suffix === 'XLSX'
    ) {
      return true
    } else {
      var tipType = '文件类型不正确,请重新上传'
      callback(tipType)
      return false
    }
  } else {
    var tipSize = '文件大小超过10M,请重新上传'
    callback(tipSize)
    return false
  }
}
export function minHeight(resfile) {
  return document.body.clientHeight - 180 + 'px'
}

export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
};

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

function createFile(urlData, fileType) {
  var bytes = window.atob(urlData)
  var n = bytes.length
  var u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bytes.charCodeAt(n)
  }
  return new Blob([u8arr], {
    type: fileType
  })
}
export function getBlob(name, wb, xlsxr, FileSavers) { // name,wb,xlsxr,FileSavers

  var wbout = xlsxr(wb, {
    bookType: 'xlsx',
    bookSST: true,
    type: 'array'
  })
  try {
    FileSavers(
      new Blob([wbout], {
        type: 'application/octet-stream'
      }),
      name + '.xlsx'
    )
  } catch (e) {
    if (typeof console !== 'undefined') console.log(e, wbout)
  }
  return wbout
}
// 图片 blob 流转化为可用 src
export function imgHandle(obj) {
  return window.URL.createObjectURL(obj)
}

export function getInteger(e, callback) {
  let boolean = new RegExp('^[1-9][0-9]*$').test(e.target.value)
  if (!boolean) {
    var tipType = '请输入正整数'
    callback(tipType)
    e.target.value = ''
  }
}
export function getIntegerPoint(e, callback) {
  e.target.value = e.target.value.match(/^\d*(\.?\d{0,1})/g)[0] || null
}
