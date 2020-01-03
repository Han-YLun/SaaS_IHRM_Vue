import {createAPI, createFormAPI} from '@/utils/request'

export const list = data => createAPI('https://mock.boxuegu.com/mock/29/table/list', 'get', data)
  