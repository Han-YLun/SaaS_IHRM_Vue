import Layout from '@/module-dashboard/pages/layout'
const _import = require('@/router/import_' + process.env.NODE_ENV)

export default [
  {
    root: true,
    path: '/saas-demo',
    component: Layout,
    redirect: 'noredirect',
    name: 'demo',
    meta: {
      title: 'xxx业务模块管理',
      icon: 'component'
    },
    children: [
      {
        path: 'index',  //请求地址
        component: _import('demo/pages/index'), //跳转的vue视图
        name: 'demo-index',
        meta: {title: 'demo', icon: 'component', noCache: true}
      }
    ]
  }
]
