
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
