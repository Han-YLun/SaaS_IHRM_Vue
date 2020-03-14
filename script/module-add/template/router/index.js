
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
