/*
 * @Author: {{author}} 
 * @Description: {{description}} 
 * @Date: 2018-04-13 16:13:27 
 * @Last Modified by: hans.taozhiwei
 * @Last Modified time: 2018-09-03 11:12:47
 */

import Layout from '@/module-dashboard/pages/layout'
const _import = require('@/router/import_' + process.env.NODE_ENV)

export default [
  {
    root: true,
    path: '/{{name}}',
    component: Layout,
    redirect: 'noredirect',
    name: '{{name}}',
    meta: {
      title: '{{description}}管理',
      icon: 'component'
    },
    children: [
      {
        path: 'index',
        component: _import('{{name}}/pages/index'),
        name: '{{name}}-index',
        meta: {title: '{{description}}', icon: 'component', noCache: true}
      }
    ]
  }
]
