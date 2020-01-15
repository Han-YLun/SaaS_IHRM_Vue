/*
 * @Author: 陶峙巍 <taoshiwei@itcast.cn> 
 * @Description: 公司设置 
 * @Date: 2018-04-13 16:13:27 
 * @Last Modified by: hans.taozhiwei
 * @Last Modified time: 2018-09-03 11:13:19
 */

import Layout from '@/module-dashboard/pages/layout'
const _import = require('@/router/import_' + process.env.NODE_ENV)

export default [
  {
    root: true,
    path: '/permissions',
    component: Layout,
    redirect: 'noredirect',
    name: 'permissions',
    meta: {
      title: '权限设置',
      icon: 'set'
    },
    children: [
      {
        path: 'index',
        component: _import('permissions/pages/index'),
        name: 'permissions-index',
        meta: {title: '权限设置', icon: 'set', noCache: true}
      }
    ]
  }
]
