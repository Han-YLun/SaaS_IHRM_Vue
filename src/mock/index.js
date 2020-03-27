import Mock from 'mockjs'
import TableAPI from './table'
import ProfileAPI from './profile'
import LoginAPI from './login'
import CompanyAPI from './company'

Mock.setup({
  //timeout: '1000'
})

//如果发送请求的api路径匹配，拦截
//第一个参数匹配的请求api路径，第二个参数匹配请求的方式，第三个参数相应数据如何替换
Mock.mock(/\/table\/list\.*/, 'get', TableAPI.list)
//获取用户信息
//Mock.mock(/\/frame\/profile/, 'post', ProfileAPI.profile)
//Mock.mock(/\/frame\/login/, 'post', LoginAPI.login)

//配置模拟数据接口
//  /company/12
//Mock.mock(/\/company\/+/, 'get', CompanyAPI.sassDetail)//根据id查询
//Mock.mock(/\/company/, 'get', CompanyAPI.list)  //访问企业列表


