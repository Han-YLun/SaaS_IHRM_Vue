import {createAPI, createFormAPI} from '@/utils/request'

export const list = data => createAPI('/attendances/:month', 'get', data)
export const attendancesList = data => createAPI('/attendances', 'get', data)
export const importFill = data => createAPI('/attendances/import', 'post', data)
// 考勤修改
export const modify = data => createAPI(`/attendances/${data.userId}`, 'put', data)
export const alert = data => createAPI('/notify/mail', 'post', data)
export const getArchivingList = data => createAPI('/attendances/reports/year', 'get', data) // 归档
export const getArchivingCont = data => createAPI(`/attendances/reports/${data.atteArchiveMonthlyId}`, 'post', data)
export const reportFormList = data => createAPI(`/attendances/reports`, 'get', data)
export const importAccount = data => createAPI('/attendances/import', 'post', data)
export const archives = data => createAPI('/attendances/archives', 'get', data)
export const newReports = data => createAPI('/attendances/newReports', 'get', data)
export const importReport = data => createAPI('/report/atte/export', 'post', data)
export const importArchive = data => createAPI('/archive/atte/export', 'post', data)
