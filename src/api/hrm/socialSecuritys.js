import {createAPI, createFormAPI} from '@/utils/request'

export const list = data => createAPI('/social_securitys/list', 'post', data)
export const getSettings = data => createAPI('/social_securitys/settings', 'get')
export const saveSettings = data => createAPI('/social_securitys/settings', 'post',data)
export const getTips = data => createAPI(`/social_securitys/tips/${data.yearMonth}`, 'get')

export const getContent = data => createAPI(`/social_securitys/${data.userId}`, 'get')
export const saveContent = data => createAPI(`/social_securitys/${data.userId}`, 'put', data)
export const importFill = data => createAPI('/social_securitys/import', 'post', data)
//获取社保缴费项目
export const paymentItemList = data => createAPI(`/social_securitys/payment_item/${data.id}`, 'get')

// 历史归档接口
export const getArchivingList = data => createAPI(`/social_securitys/historys/${data.year}/list`, 'get', data)
export const getArchivingCont = data => createAPI(`/social_securitys/historys/${data.yearMonth}`, 'get', data)
export const getArchivingExport = data => createAPI(`/social_securitys/historys/${data.yearMonth}/export`, 'get', data)
export const getArchivingFirst = data => createAPI(`/social_securitys/historys/${data.yearMonth}/first`, 'get', data)
export const getArchivingArchive = data => createAPI(`/social_securitys/historys/${data.yearMonth}/archive`, 'post', data)
export const newReport = data => createAPI(`/social_securitys/historys/${data.yearMonth}/newReport`, 'put', data)