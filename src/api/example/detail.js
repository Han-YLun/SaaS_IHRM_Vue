import {createAPI, createFormAPI} from '@/utils/request'

export const list = data => createAPI('/details/list', 'get', data)
