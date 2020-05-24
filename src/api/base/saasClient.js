import {createAPI, createFormAPI} from '@/utils/request'

export const list = data => createAPI('/company', 'get', data)
export const detail = data => createAPI(`/company/${data.id}`, 'get', data)
export const putState = data => createAPI(`/company/${data.id}/state/${data.state}`, 'put', data)
export const updateCompany = data => createAPI(`/company/${data.id}`, 'put', data)