import Layout from '@/module-dashboard/pages/layout'
const _import = require('@/router/import_' + process.env.NODE_ENV)

export default [
  {
    root: true,
    path: '/menusManage',
    component: Layout,
    redirect: 'noredirect',
    name: 'menusManage',
    meta: {
      title: 'xxx业务模块管理',
      icon: 'component'
    },
    children: [
      {
        path: 'index',  //请求地址
        component: _import('menusManage/pages/index'), //跳转的vue视图
        name: 'menusManage-index',
        meta: {title: '模块管理', icon: 'component', noCache: true}
      }
    ]
  }
]
