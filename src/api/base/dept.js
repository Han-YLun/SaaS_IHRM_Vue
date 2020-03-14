import {createAPI,createFormAPI} from '@/utils/request'

// 查询部门列表
export const list = data => createAPI('/company/department', 'get', data)
// 保存部门
// data  {id：“”，name：“”}
export const save = data => createAPI('/company/department', 'post', data)
// 根据id查询部门 {id：“”}
export const find = data => createAPI(`/company/department/${data.id}`, 'get', data)
// 根据id删除部门 {id:""}
export const deleteById = data => createAPI(`/company/department/${data.id}`, 'delete', data)
// 根据id更新部门 {id:"",name:"",code:""}
export const update = data => createAPI(`/company/department/${data.id}`, 'put', data)
// 保存或更新的方法
export const saveOrUpdate = data => { return data.id ? update(data) : save(data) }
// 考勤配置保存更新
export const attendanceSave = data => createAPI(`/cfg/atte`, 'put', data)
export const getAttendance = data => createFormAPI(`/cfg/atte/item`, 'post', data)
// 请假配置保存更新
export const leaveSave = data => createAPI(`/cfg/leave`, 'put', data)
export const getLeave = data => createFormAPI(`/cfg/leave/list`, 'post', data)
// 扣款配置保存更新
export const deductionsSave = data => createAPI(`/cfg/deduction`, 'put', data)
export const getDeductions = data => createFormAPI(`/cfg/ded/list`, 'post', data)
// 加班配置保存更新
export const overtimeSave = data => createAPI(`/cfg/extDuty`, 'put', data)
export const getOvertime = data => createFormAPI(`/cfg/extDuty/item`, 'post', data)
export const archive = data => createAPI(`/attendances/archive/item`, 'get', data)
