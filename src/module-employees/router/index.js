import Layout from '@/module-dashboard/pages/layout'
const _import = require('@/router/import_' + process.env.NODE_ENV)

export default [

  {
    root: true,
    path: '/employees',
    component: Layout,
    name: 'employees',
    meta: {
      title: 'employees',
      icon: 'people'
    },
    children: [
      // 列表
      {
        path: 'index',
        component: _import('employees/pages/index'),
        name: 'employees-index',
        meta: {
          title: '员工',
          icon: 'people',
          noCache: true
        }
      },
      // 详情
      {
        path: 'details/:id',
        component: _import('employees/pages/details'),
        // hidden: true // 是否显示在左侧菜单
        name: 'details',
        meta: {
          title: '详情'
        }
      },
      // 报表
      {
        path: 'report/:month',
        component: _import('employees/pages/report-list'),
        name: 'report',
        meta: {
          title: '报表'
        }
      },
      // 归档
      {
        path: 'archiving',
        component: _import('employees/pages/historical-archiving'),
        name: 'archiving',
        meta: {
          title: '报表'
        }
      },
      {
        path: 'print/:id',
        component: _import('employees/pages/print'),
        name: 'print',
        meta: {
          title: '打印'
        }
      },
      // 离职
      {
        path: 'leave/:id',
        component: _import('employees/pages/employees-leave'),
        // hidden: true // 是否显示在左侧菜单
        name: 'leave',
        meta: {
          title: '离职'
        }
      },
      // 导入
      {
        path: 'import',
        component: _import('employees/pages/import'),
        // hidden: true, // 是否显示在左侧菜单
        name: 'import',
        meta: {
          title: '导入'
        }
      }
    ]
  }
]
