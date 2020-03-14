import {createAPI, createFormAPI} from '@/utils/request'

export const list = data => createAPI('/notices', 'get', data)
