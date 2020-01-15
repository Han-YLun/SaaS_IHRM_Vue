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
    path: '/settings',
    component: Layout,
    redirect: 'noredirect',
    name: 'settings',
    meta: {
      title: '公司设置管理',
      icon: 'set'
    },
    children: [
      {
        path: 'index',
        component: _import('settings/pages/index'),
        name: 'settings-index',
        meta: {title: '公司设置', icon: 'set', noCache: true}
      }
    ]
  }
]
