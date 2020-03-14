import {createAPI} from '@/utils/request'

export const list = data => createAPI('/sys/user', 'get', data)
export const simple = data => createAPI('/sys/user/simple', 'get', data)
export const add = data => createAPI('/sys/user', 'post', data)
export const update = data => createAPI(`/sys/user/${data.id}`, 'put', data)
export const updateSelf = data => createAPI(`/sys/user/${data.id}/self`, 'put', data)
export const remove = data => createAPI(`/sys/user/${data.id}`, 'delete', data)
export const detail = data => createAPI(`/sys/user/${data.id}`, 'get', data)
export const assignRoles = data => createAPI(`/sys/user/assignRoles`, 'put', data)
