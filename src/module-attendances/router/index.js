/*
 * @Author: 陶峙巍 <taoshiwei@itcast.cn> 
 * @Description: 考勤 
 * @Date: 2018-04-13 16:13:27 
 * @Last Modified by: hans.taozhiwei
 * @Last Modified time: 2018-09-03 11:12:47
 */

import Layout from '@/module-dashboard/pages/layout'
const _import = require('@/router/import_' + process.env.NODE_ENV)

export default [{
  root: true,
  path: '/attendances',
  component: Layout,
  redirect: 'noredirect',
  name: 'attendances',
  meta: {
    title: '考勤管理',
    icon: 'excel'
  },
  children: [{
      path: 'index',
      component: _import('attendances/pages/index'),
      name: 'attendances-index',
      meta: {
        title: '考勤',
        icon: 'excel',
        noCache: true
      }
    },
    // 归档
    {
      path: 'archiving',
      component: _import('attendances/pages/historical-archiving'),
      name: 'archiv',
      meta: {
        title: '归档'
      }
    },
    // 报表
    {
      path: 'report',
      component: _import('attendances/pages/report-list'),
      name: 'reports',
      meta: {
        title: '报表'
      }
    }
  ]
}]
