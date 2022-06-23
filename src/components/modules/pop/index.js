import PopComponent from './Pop.vue'

// 初始化组件
const Pop = {}

// 注册组件 绑定 install 方法
Pop.install = Vue => {
  // 创建构造器
  // 使用 Vue.extend 来创建全局的Vue组件
  const PopConstructor = Vue.extend(PopComponent)
  // 创建实例 (instance 实例)
  const instance = new PopConstructor()
  // 把实例挂载到一个元素上
  instance.$mount(document.createElement('div.msg'))
  // 动态添加到body
  document.body.appendChild(instance.$el)

  // 添加实例方法
  // 气泡弹框 (vue.$pop('我是标题', [shake]))
  Vue.prototype.$pop = (msg, type) => {
    instance.msg = msg
    instance.type = type
    instance.isShow = true
  }
}

export default Pop
