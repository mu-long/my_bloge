/*
  该文件为项目的配置文件，保存通用配置，以及变量
*/

/*
  发送请求基本路径
     当前在开发环境，给自己的代理服务器发请求，若项目上线，配置成真正服务器的地址
*/
const baseURL = {
  // dev: 'http://localhost:3000',
  // mock server 地址
  dev: 'http://localhost:36742',
  pro: 'http://your.domain.com'
}

// 定义公共路径，不需要登录
const publicPath = [/^\/public/, /^\/login/]

export { baseURL, publicPath }
