# SaaS IHRM 系统

## Run

### 1. Install  node.js

https://nodejs.org/en/





### 2.Run Project

先安装依赖包，然后安装mockjs依赖包，最后运行

```shell
cnpm install 
cnpm install mockjs
npm run dev
```



### 4. Config API Address

编辑文件 config/index.js

修改 `api` `upfile` 转发配置

```js
module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '',
    proxyTable: {
      '/api': {
        target: 'https://mock.boxuegu.com/mock/29',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/upfile': {
        target: 'http://172.17.0.65/system/upfile',
        changeOrigin: true,
        pathRewrite: {
          '^/upfile': ''
        }
      }
    },
```



## 后端

后端使用微服务编写，使用SpringBoot + SpringCloud + SpringMVC + SpringData

地址为：https://github.com/Han-YLun/SaaS_IHRM