# my_bloge

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## [项目文档](https://doc.toimc.com/web/#/2/42)

## 接口说明
- [他人接口](http://www.toimc.com:10040/html/web/controller/public/public.html#5d0666bebaa920000bb519b1)
- [本地接口](http://192.168.240.130:10000/mock/629dadfef4a691000c70c46d)
- 使用
  - 点击项目，打开设置，找到Mock，按照说明设置
```js
/*
Mock Server地址：http://192.168.240.130:10000/mock/629dadfef4a691000c70c46d
Mock Js文件： 下载 net.js (需要安装node环境)
使用方法：在本地用node运行net.js ,加上mock server地址和你需要请求的真实地址的根地址，当您的接口文档的状态为开发完成的时候，net.js不会去请求mock server地址而去请求真实地址
*/
// 举例：
node net.js http://192.168.240.130:10000/mock/629dadfef4a691000c70c46d http://localhost:3000

// 然后将您开发工程下的根地址替换为localhost:36742即可开启您的Mock之旅！
```
