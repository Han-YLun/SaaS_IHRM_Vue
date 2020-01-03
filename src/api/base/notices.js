import {createAPI} from '@/utils/request'

export const list = data => createAPI('/notices', 'get', data)
export const sassDetail = data => createAPI('/saas-clients/:id', 'get', data)
export const reviewDetail = data => createAPI('/saas-clients/:id', 'get', data)
export const performance = data => createAPI('/dashboard/performance', 'get', data)
export const links = data => createAPI('/dashboard/links', 'get', data)
export const addLinks = data => createAPI('/dashboard/links', 'post', data)
