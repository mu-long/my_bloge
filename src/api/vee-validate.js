/**
 * 表单验证
 */

import {
  extend,
  localize,
  ValidationObserver,
  ValidationProvider
} from 'vee-validate'
import CN from 'vee-validate/dist/locale/zh_CN.json'
// 导入规则
// 验证规则可作为 ES6 导出在vee-validate/dist/rules，如果您使用的是 IDE 或 VSCode，您应该在导入时大致了解哪些规则可用
import { numeric } from 'vee-validate/dist/rules'
import Vue from 'vue'

// 配置中文
// 注意如果配置中文，规则名称要使用官方的，不能乱改，比如 numeric 不能写成 num
localize('CN', CN)
// localize('CN', {
//   messages: {
//     ...CN.messages,
//     required: '请输入{_field_}'
//   },
//   names: {
//     email: '邮箱',
//     username: '用户名'
//   },
//   fields: {
//     email: {
//       email: '请输入正确的{_field_}！！！',
//       required: '请输入{_field_}！！！'
//     }
//   }
// })

// 使用官方规则
// extend('numeric', numeric)
// 或者 自定义规则信息
extend('numeric', {
  ...numeric,
  message: '{_field_}必须为数字！'
})

// 添加规则
// extend函数接受规则的名称和用于该规则的验证器函数
// rules="length:3" name="email"
extend('length', {
  // 字符数为3
  validate(value, args) {
    return value.length >= args.length && value.length < args.length + 1
  },
  params: ['length'],
  // 插值机制，您可以{_field_}在字符串中使用占位符，它将自动替换为您的字段名称
  // {xxxx} 参数占位符
  message: '字符数为{length}'
})

// 多个参数 rules="minmax:3,8"
extend('minmax', {
  validate(value, args) {
    const length = value.length

    return length >= args.min && length <= args.max
  },
  params: ['min', 'max'],
  message: '{_field_}字符长度介于{min}~{max}位之间！'
})

// required 必需的
extend('required', {
  // 此规则报告字段的“必需”状态
  computesRequired: true,
  validate: value => {
    return {
      // required 必需的
      required: true,
      // valid 有效的
      valid: value.trim() !== ''
    }
  },
  // 使用扩展格式来传递专用message属性
  message: '{_field_}为必填项！'
})

extend('email', {
  // 此规则报告字段的“必需”状态
  computesRequired: true,
  validate: value => {
    return {
      // required 必需的
      required: true,
      // valid 有效的
      valid: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value)
    }
  },
  // 使用扩展格式来传递专用message属性
  message: '{_field_}格式错误！'
})

// 全局注册
Vue.component('ValidationProvider', ValidationProvider)
// 提交前验证表单 (Observer 观察者)
Vue.component('ValidationObserver', ValidationObserver)
