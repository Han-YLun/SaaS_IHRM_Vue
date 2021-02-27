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



### 3. Config API Address

编辑文件 config/index.js

修改 `api` `upfile` 转发配置

```js
module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '',
    proxyTable: {
      //企业信息请求的远程服务 //Updated 将直接对后台问服务请求,改为请求Zuul网关
      '/api': {
        target: 'http://localhost:9091',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
  
  }
```

启动教程: [https://www.cnblogs.com/ArvinYL/p/14457187.html](https://www.cnblogs.com/ArvinYL/p/14457187.html)


## 后端

后端使用微服务编写，使用SpringBoot + SpringCloud + SpringMVC + SpringData

地址为：https://github.com/Han-YLun/SaaS_IHRM
