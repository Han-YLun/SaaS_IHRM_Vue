# SAAS IRHM 系统

## 运行

### 1. 安装 nodejs

https://nodejs.org/en/

### 2. 安装包依赖

```sh
yarn
```

### 3. 配置 API 地址

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

### 4. 运行

```sh
npm start
```




