import {createAPI, createFormAPI} from '@/utils/request'

// 登录
export const login = data => createAPI('/sys/login', 'post', data)
// 获取用户信息
export const profile = data => createAPI('/sys/profile', 'post', data)
export const registerStep1 = data => createAPI('/frame/register/step1', 'post', data)
export const registerStep2 = data => createAPI('/frame/register/step2', 'post', data)
export const regCode = data => createAPI('/frame/register/verification_code', 'post', data)
export const logout = data => createAPI('/frame/logout', 'post', data)
export const passwd = data => createAPI('/frame/passwd', 'post', data)
