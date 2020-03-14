
import {createAPI, createImgAPI} from '@/utils/request'

export const imgUpload = data => createAPI('/system/upfile', 'post', data)
export const imgDownload = data => createImgAPI(`/system/upfile/${data.id}`, 'get', data)
export const cityList = data => createAPI('/sys/city', 'get', data)
