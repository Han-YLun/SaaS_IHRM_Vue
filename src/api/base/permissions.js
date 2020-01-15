import {createAPI} from '@/utils/request'

const api = "/sys/permission"
export const list = data => createAPI(`${api}`, 'get', data)
export const add = data => createAPI(`${api}`, 'post', data)
export const update = data => createAPI(`${api}/${data.id}`, 'put', data)
export const remove = data => createAPI(`${api}/${data.id}`, 'delete', data)
export const detail = data => createAPI(`${api}/${data.id}`, 'get', data)
export const saveOrUpdate = data => {return data.id?update(data):add(data)}
