import {createAPI, createFormAPI} from '@/utils/request'

export const form = data => createAPI('/form/user', 'post', data)
export const city = data => createAPI('./../../static/json/map.json', 'get', data)
