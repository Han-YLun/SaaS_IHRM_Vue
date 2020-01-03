/*
 * @Author: hans.taozhiwei
 * @Description: 模块安装 itheima-module Add <module-name>
 * @Date: 2018-04-13 16:13:27 
 * @Last Modified by: hans.taozhiwei
 * @Last Modified time: 2018-09-20 14:49:21
 */

module.exports = {
  prompts: {
    name: {
      type: 'string',
      required: true,
      message: '模块名称'
    },
    author: {
      type: 'string',
      required: false,
      message: '作者',
      default: 'yourname <yourname@xxxx.xxx>'
    },
    description: {
      type: 'string',
      required: false,
      message: '说明',
      default: 'xxx业务模块'
    }
  }
}
