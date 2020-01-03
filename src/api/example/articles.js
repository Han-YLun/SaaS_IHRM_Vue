import {createAPI, createFormAPI} from '@/utils/request'

export const list = data => createAPI('/articles/list', 'get', data)
export const types = [
  '类型一',
  '类型二',
  '类型三',
  '类型四',
  '类型五',
  '类型六',
  '类型七',
  '类型八',
  '类型九',
  '类型十',
  '类型十一',
  '类型十二',
  '类型十三',
  '类型十四',
  '类型十五',
  '类型十六'
]
