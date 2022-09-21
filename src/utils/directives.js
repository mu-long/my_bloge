/**
 * vue 自定义指令
 */
import convertHtml from '@/utils/convertHtml'

export default {
  // 转换为HTML (使用 v-convertHtml)
  convertHtml: {
    // 每当指令绑定到元素上的时候
    bind: function(el, binding) {
      el.innerHTML = convertHtml(binding.value)
    },
    // 组件已更新
    componentUpdated: function(el, binding) {
      el.innerHTML = convertHtml(binding.value)
    }
  }
}
