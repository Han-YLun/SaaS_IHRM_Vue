import {
  createAPI,
  createDown,
  imgUpload
} from '@/utils/request'

export const list = data => createAPI('/employees', 'get', data)
export const add = data => createAPI('/employees', 'post', data)
export const employeesSimpleList = data => createAPI('/employees/simple', 'get', data)
export const jobnumber = data => createAPI('/employees/jobnumber', 'get', data)
export const accountStatus = data => createAPI(`/employees/${data.id}/accountStatus`, 'PUT', data)
// export const update = data => createAPI(`/employees/${data.id}`, 'put', data)
export const leave = data => createAPI(`/employees/${data.id}/leave`, 'PUT', data) // 离职
export const leaveDetail = data => createAPI(`/employees/${data.id}/leave`, 'get', data) // 离职详情

export const adjustPost = data => createAPI(`/employees/${data.id}/transferPosition`, 'PUT', data) // 调岗
export const adjustDetail = data => createAPI(`/employees/${data.id}/transferPosition`, 'get', data) // 调岗详情

export const personalDetail = data => createAPI(`/employees/${data.id}/personalInfo`, 'get', data)
export const personal = data => createAPI(`/employees/${data.id}/personalInfo`, 'PUT', data) // 员工信息

export const jobsDetail = data => createAPI(`/employees/${data.id}/jobs`, 'get', data)
export const postDetail = data => createAPI(`/employees/${data.id}/jobs`, 'PUT', data) // 岗位信息

export const positiveDetail = data => createAPI(`/employees/${data.id}/positive`, 'get', data) // 转正详情
export const positive = data => createAPI(`/employees/${data.id}/positive`, 'PUT', data) // 转正
export const edit = data => createAPI(`/employees/${data.id}`, 'PUT', data) // 编辑

export const importDown = data => createDown(`/employees/export/${data.month}`, 'get', data) // 导出

// export const importReport = data => createAPI(`/employees/import`, 'post', data) // 导入

export const settDetail = data => createAPI(`/employees/setting`, 'get', data) // 设置详细信息
export const settSave = data => createAPI(`/employees/setting`, 'PUT', data) // 设置

export const refort = data => createAPI(`/employees/archives/${data.month}`, 'get', data) // 报表
export const getArchivingList = data => createAPI('/employees/archives', 'get', data) // 归档
export const fileUpdate = data => createAPI(`/employees/archives/${data.month}`, 'PUT', data) // 归档
