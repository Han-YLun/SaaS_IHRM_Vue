import {createAPI} from '@/utils/request'
import { get } from 'https';

export const list = data => createAPI('/sys/role', 'get', data)
export const simple = data => createAPI('/sys/role/simple', 'get', data)
export const add = data => createAPI('/sys/role', 'post', data)
export const update = data => createAPI(`/sys/role/${data.id}`, 'put', data)
export const remove = data => createAPI(`/sys/role/${data.id}`, 'delete', data)
export const detail = data => createAPI(`/sys/role/${data.id}`, 'get', data)
export const assignPrem = data => createAPI(`/sys/role/assignPrem`, 'put', data)
export const findAll = data => createAPI(`/sys/role/list`,'get',data)
export const findRolesByUserId = data => createAPI(`/sys/role/userId/${data.id}`,'get',data)
