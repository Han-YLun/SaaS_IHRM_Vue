import {createAPI} from '@/utils/request'

//查询部门列表
export const list = data => createAPI('/company/department', 'GET', data)
//保存部门
export const save = data => createAPI('/company/department', 'POST', data)
//根据id查询部门
export const find = data => createAPI(`/company/department/${data.id}`, 'GET', data)
//根据id删除部门
export const deleteById = data => createAPI(`/company/department/${data.id}`, 'DELETE', data)
//根据id更新部门
export const update = data => createAPI(`/company/department/${data.id}`, 'PUT', data)
//保存或更新的方法
export const saveOrUpdate = data => {return data.id ? update(data) : save(data)}