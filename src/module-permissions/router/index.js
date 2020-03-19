
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
