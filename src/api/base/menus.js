import {createAPI} from '@/utils/request'

export const list = data => createAPI('/base/menus', 'get', data)
export const add = data => createAPI('/base/menus', 'post', data)
export const update = data => createAPI(`/base/menus/${data.id}`, 'put', data)
export const remove = data => createAPI(`/base/menus/${data.id}`, 'delete', data)
export const detail = data => createAPI(`/base/menus/${data.id}`, 'get', data)

export const search = data => {
  return [
  ]
}
